"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * The hero's 3D scene: a glossy printer with a face, inside a cloud of red and
 * white particles. Eyes follow the pointer and blink, a sheet feeds out of the
 * slot, and as the hero scrolls away the printer shrinks out of view while the
 * cloud pulls itself into concentric rings.
 *
 * Ported from the client's prototype (BizUp Hero Printer Scroll), written
 * against three r149 and built as a whole-page scroll story with a fixed
 * canvas. The site's own sections have solid backgrounds, so the canvas lives
 * inside the hero and only the first leg of that story — cloud to rings — is
 * kept, driven by how far the hero has scrolled.
 *
 * Moving to a current three needed these pinned so the look does not drift:
 *   • colour management is switched off, as it was by default in r149
 *   • lights are multiplied by π ("legacy lights" are gone), and the point
 *     light keeps its old linear decay
 *
 * three loads in its own chunk after first paint. Without WebGL the hero is
 * still complete — the scene is decoration, which is why it is aria-hidden.
 */

type Mouse = { x: number; y: number; sx: number; sy: number };

const VERT = `
attribute vec3 aB;
attribute float aR;
attribute float aS;
attribute vec3 color;
uniform float uMix, uTime, uSize, uPR;
varying vec3 vC;
varying float vA;
void main() {
  float m = smoothstep(aR * .45, aR * .45 + .55, uMix);
  vec3 p = mix(position, aB, m);
  float sw = sin(3.14159 * m);
  p += vec3(sin(aR * 40. + uTime * .6), cos(aR * 31. + uTime * .5), sin(aR * 23. + uTime * .7)) * (.035 + sw * 1.1 * aR);
  p += normalize(p + .001) * sw * .5 * aR;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aS * uPR * 10. / -mv.z;
  vC = color;
  vA = .6 + .4 * sin(uTime * 1.5 + aR * 50.);
}`;

const FRAG = `
varying vec3 vC;
varying float vA;
void main() {
  float d = length(gl_PointCoord - .5);
  float a = smoothstep(.5, 0., d);
  gl_FragColor = vec4(vC * (.7 + .8 * a), a * vA);
}`;

export default function ParticleScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const T = await import("three");
      if (disposed) return;

      const family =
        getComputedStyle(host).getPropertyValue("--font-archivo").trim() || "sans-serif";
      try {
        await document.fonts.load(`600 20px ${family}`);
      } catch {
        /* carry on with whatever the browser has */
      }
      if (disposed) return;

      T.ColorManagement.enabled = false;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL — the hero stands on its own without the scene
      }
      const PR = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(PR);
      renderer.outputColorSpace = T.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(30, 1, 0.1, 100);
      cam.position.set(0, 0, 12);

      /* ── Particles ─────────────────────────────────────────────── */

      const N = window.innerWidth < 700 ? 4500 : 7500;
      let sd = 11;
      const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
      const tilt = (p: number[], a: number) => {
        const c = Math.cos(a);
        const s = Math.sin(a);
        return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
      };
      const build = (fn: (i: number) => number[]) => {
        const a = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const p = fn(i);
          a[i * 3] = p[0];
          a[i * 3 + 1] = p[1];
          a[i * 3 + 2] = p[2];
        }
        return a;
      };

      /* Start: a loose cloud around where the printer sits. */
      const cloud = build(() => {
        const a = rnd() * 6.283;
        const c = Math.acos(2 * rnd() - 1);
        const r = 2 + rnd() * 1.3;
        return [r * Math.sin(c) * Math.cos(a), r * Math.sin(c) * Math.sin(a) * 0.9, r * Math.cos(c) * 0.6 - 0.5];
      });
      /* End: six concentric rings, tipped towards the viewer. */
      const radii = [0.35, 0.9, 1.4, 1.9, 2.4, 2.6];
      const rings = build((i) => {
        const r = radii[i % 6] + (rnd() - 0.5) * 0.06;
        const a = rnd() * 6.283;
        return tilt([r * Math.cos(a), r * Math.sin(a), Math.sin(r * 3) * 0.3 + (rnd() - 0.5) * 0.05], 1.0);
      });

      const col = new Float32Array(N * 3);
      const rr = new Float32Array(N);
      const ss = new Float32Array(N);
      const pal = [
        [0.89, 0.12, 0.14],
        [1, 1, 1],
        [0.7, 0.7, 0.72],
        [0.55, 0.07, 0.09],
      ];
      for (let i = 0; i < N; i++) {
        const q = rnd();
        const c =
          i < 220 || (i >= 520 && i < 780)
            ? [1, 1, 1]
            : q < 0.45
              ? pal[0]
              : q < 0.75
                ? pal[1]
                : q < 0.93
                  ? pal[2]
                  : pal[3];
        col.set(c, i * 3);
        rr[i] = rnd();
        ss[i] = i < 220 ? 2.2 : 0.7 + rnd() * 0.9;
      }

      const geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.BufferAttribute(cloud, 3));
      geo.setAttribute("aB", new T.BufferAttribute(rings, 3));
      geo.setAttribute("color", new T.BufferAttribute(col, 3));
      geo.setAttribute("aR", new T.BufferAttribute(rr, 1));
      geo.setAttribute("aS", new T.BufferAttribute(ss, 1));
      const mob0 = window.innerWidth < 700;
      const mat = new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: T.AdditiveBlending,
        uniforms: {
          uMix: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: mob0 ? 2.6 : 3.2 },
          uPR: { value: PR },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
      });
      const pts = new T.Points(geo, mat);
      scene.add(pts);

      /* ── Studio light, only ever seen as reflections on the printer ── */

      const ec = document.createElement("canvas");
      ec.width = 1024;
      ec.height = 512;
      const eg = ec.getContext("2d")!;
      eg.fillStyle = "#17110f";
      eg.fillRect(0, 0, 1024, 512);
      const band = (x: number, y: number, w: number, h: number, al: number) => {
        const R = Math.max(w, h);
        const gr = eg.createRadialGradient(0, 0, 0, 0, 0, R);
        gr.addColorStop(0, `rgba(255,246,240,${al})`);
        gr.addColorStop(1, "rgba(255,246,240,0)");
        eg.save();
        eg.translate(x, y);
        eg.scale(w / R, h / R);
        eg.fillStyle = gr;
        eg.fillRect(-R, -R, 2 * R, 2 * R);
        eg.restore();
      };
      band(180, 140, 160, 60, 1);
      band(520, 90, 220, 40, 0.8);
      band(820, 200, 120, 90, 0.9);
      band(350, 380, 200, 50, 0.4);
      const envTex = new T.CanvasTexture(ec);
      envTex.mapping = T.EquirectangularReflectionMapping;
      envTex.colorSpace = T.SRGBColorSpace;
      const pmrem = new T.PMREMGenerator(renderer);
      const envRT = pmrem.fromEquirectangular(envTex);
      scene.environment = envRT.texture;
      envTex.dispose();
      pmrem.dispose();

      const key = new T.DirectionalLight(0xffffff, 1.1 * Math.PI);
      key.position.set(-3, 4, 6);
      scene.add(key);
      /* Red rim from behind, the one place the brand colour lights the object. */
      const rim = new T.PointLight(0xe31e24, 18 * Math.PI, 30, 1);
      rim.position.set(6, 1, -2);
      scene.add(rim);

      /* ── Printer ───────────────────────────────────────────────── */

      const rr2 = (w: number, h: number, d: number, r: number, bev: number) => {
        const sh = new T.Shape();
        const x = -w / 2;
        const y = -h / 2;
        sh.moveTo(x + r, y);
        sh.lineTo(x + w - r, y);
        sh.quadraticCurveTo(x + w, y, x + w, y + r);
        sh.lineTo(x + w, y + h - r);
        sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        sh.lineTo(x + r, y + h);
        sh.quadraticCurveTo(x, y + h, x, y + h - r);
        sh.lineTo(x, y + r);
        sh.quadraticCurveTo(x, y, x + r, y);
        const g = new T.ExtrudeGeometry(sh, {
          depth: d - bev * 2,
          bevelEnabled: true,
          bevelThickness: bev,
          bevelSize: bev,
          bevelSegments: 3,
          curveSegments: 10,
        });
        g.translate(0, 0, -(d - bev * 2) / 2);
        return g;
      };
      const pm = (c: string, r: number, mt = 0) =>
        new T.MeshStandardMaterial({ color: c, roughness: r, metalness: mt, envMapIntensity: 0.9 });

      const pr = new T.Group();
      const hd = new T.Group();
      pr.add(hd);
      scene.add(pr);
      const ad = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number) => {
        const o = new T.Mesh(g, m);
        o.position.set(x, y, z);
        hd.add(o);
        return o;
      };
      ad(rr2(3.1, 2.9, 2.3, 0.2, 0.06), pm("#f4f3f0", 0.35), 0, 0, 0);
      ad(rr2(3.0, 0.5, 2.2, 0.1, 0.04), pm("#dcdad5", 0.4), 0, 1.6, -0.05);
      ad(rr2(2.3, 0.08, 1.3, 0.03, 0.02), pm("#ffffff", 0.7), 0, 2.0, -0.3).rotation.x = -0.25;
      ad(rr2(3.14, 0.22, 2.34, 0.08, 0.03), pm("#E31E24", 0.35), 0, -1.22, 0);
      for (const x of [-1.2, 1.2]) ad(rr2(0.5, 0.2, 0.5, 0.05, 0.02), pm("#0B0B0C", 0.6), x, -1.45, 0.6);
      ad(rr2(2.3, 1.3, 0.12, 0.14, 0.03), pm("#0a0a0b", 0.15, 0.2), 0, 0.5, 1.17);
      const eyeM = new T.MeshBasicMaterial({ color: 0xffffff });
      const eyes = [-0.52, 0.52].map((x) => {
        const e = new T.Mesh(new T.CircleGeometry(0.24, 32), eyeM);
        e.scale.set(1, 1.15, 1);
        e.position.set(x, 0.5, 1.25);
        hd.add(e);
        return e;
      });

      const label = document.createElement("canvas");
      label.width = 256;
      label.height = 40;
      const lg = label.getContext("2d")!;
      lg.fillStyle = "#e4e2dd";
      lg.fillRect(0, 0, 256, 40);
      lg.fillStyle = "#0B0B0C";
      lg.font = `600 20px ${family}`;
      lg.fillText("BIZ UP · PRINT", 12, 28);
      lg.fillStyle = "#E31E24";
      lg.fillRect(222, 14, 22, 12);
      ad(
        new T.PlaneGeometry(1.8, 0.28),
        new T.MeshStandardMaterial({ map: new T.CanvasTexture(label), roughness: 0.6 }),
        -0.2,
        -0.38,
        1.19,
      );
      ad(new T.CylinderGeometry(0.1, 0.1, 0.04, 20), pm("#0B0B0C", 0.4), 0.95, -0.38, 1.19).rotation.x =
        Math.PI / 2;
      ad(rr2(2.1, 0.18, 0.1, 0.05, 0.02), pm("#0B0B0C", 0.4), 0, -0.82, 1.17);

      const sheet = document.createElement("canvas");
      sheet.width = 128;
      sheet.height = 96;
      const sg = sheet.getContext("2d")!;
      sg.fillStyle = "#fff";
      sg.fillRect(0, 0, 128, 96);
      sg.fillStyle = "#0B0B0C";
      sg.fillRect(10, 12, 44, 6);
      sg.fillStyle = "#bbb";
      for (let i = 0; i < 5; i++) sg.fillRect(10, 30 + i * 11, 96, 3);
      sg.fillStyle = "#E31E24";
      sg.fillRect(10, 84, 20, 3);
      const paper = new T.Mesh(
        new T.PlaneGeometry(1.8, 1.2),
        new T.MeshStandardMaterial({ map: new T.CanvasTexture(sheet), roughness: 0.9, side: T.DoubleSide }),
      );
      paper.rotation.x = -1.25;
      paper.position.set(0, -1.05, 1.55);
      hd.add(paper);

      /* ── Placement ─────────────────────────────────────────────── */

      let printerScale = 1;
      let printerY = 0;
      const size = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        const mob = w < 700;
        const half = 3.2 * cam.aspect;
        const s = mob ? (half * 0.8) / 2.6 : Math.min(1, 0.17 * half);
        const px = mob ? 0 : half * 0.5;
        const py = mob ? -1.3 : 0;
        pts.scale.setScalar(s * 1.15);
        pts.position.set(px, py, -1.5);
        printerScale = s * 0.82;
        printerY = py;
        pr.scale.setScalar(printerScale);
        pr.position.set(px, py, 0);
        mat.uniforms.uSize.value = mob ? 2.6 : 3.2;
        cam.updateProjectionMatrix();
      };
      size();
      const resizeObserver = new ResizeObserver(() => {
        size();
        renderer.render(scene, cam);
      });
      resizeObserver.observe(host);

      const m: Mouse = { x: 0, y: 0, sx: 0, sy: 0 };
      const onMove = (e: PointerEvent) => {
        m.x = (e.clientX / window.innerWidth) * 2 - 1;
        m.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(host);

      const clock = new T.Clock();
      let t = 0;
      let sm = 0; // scroll progress, smoothed: 0 = top of page, 1 = hero scrolled away
      let frame = 0;

      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) {
          clock.getDelta();
          return;
        }
        const dt = clock.getDelta();
        if (!reduce) t += dt;

        const span = Math.max(1, host.clientHeight * 0.9);
        const target = reduce ? 0 : Math.max(0, Math.min(1, window.scrollY / span));
        sm += (target - sm) * Math.min(1, dt * 5);

        mat.uniforms.uMix.value = sm;
        mat.uniforms.uTime.value = t;

        m.sx += (m.x - m.sx) * 0.05;
        m.sy += (m.y - m.sy) * 0.05;
        pts.rotation.y = -m.sx * 0.2 + t * 0.08 - sm * 0.35;
        pts.rotation.x = m.sy * 0.15;

        pr.rotation.y = m.sx * 0.4 + Math.sin(t * 0.4) * 0.1 + sm * 0.45;
        pr.rotation.x = m.sy * 0.15;
        hd.position.y = Math.sin(t * 1.2) * 0.06;

        eyes.forEach((e, i) => {
          e.position.x = (i ? 0.52 : -0.52) + m.sx * 0.26;
          e.position.y = 0.5 - m.sy * 0.14;
          const ph = t % 4.2;
          const blink = ph > 4 ? Math.abs(Math.cos(((ph - 4) / 0.2) * (Math.PI / 2))) : 1;
          e.scale.y = 1.15 * Math.max(0.06, blink);
        });

        /* The printer shrinks and lifts away as the hero scrolls out. */
        const kk = Math.max(0, Math.min(1, 1 - sm * 1.8));
        pr.visible = kk > 0.01;
        pr.scale.setScalar(printerScale * kk);
        pr.position.y = printerY + (1 - kk) * 1.5;

        const cy = (t % 6) / 6;
        const fd = cy < 0.25 ? Math.sin((cy / 0.25) * Math.PI) : 0;
        paper.position.z = 1.55 + fd * 0.35 + sm * 0.22;
        paper.position.y = -1.05 - fd * 0.12 - sm * 0.05;

        renderer.render(scene, cam);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);

        geo.dispose();
        mat.dispose();
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const material of materials) {
            (material as THREE.MeshStandardMaterial).map?.dispose();
            material.dispose();
          }
        });
        envRT.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
