"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * The hero's 3D scene: a glossy printer with a face. It rises into place and
 * turns to face the viewer on load, the eyes follow the pointer and blink, and
 * a sheet feeds out of the slot. As the page scrolls the printer shrinks and
 * lifts away while the hero copy fades, so the hero hands over to the page.
 *
 * Ported from the client's prototype (BizUp Hero Printer Scroll), written
 * against three r149. Moving to a current three needed these pinned so the
 * look does not drift:
 *   • colour management is switched off, as it was by default in r149
 *   • lights are multiplied by π ("legacy lights" are gone), and the point
 *     light keeps its old linear decay
 *
 * The scene fades the copy itself: it looks for an element marked
 * `data-hero-copy` inside the same section. three loads in its own chunk after
 * first paint; without WebGL the hero is still complete, which is why the
 * canvas is aria-hidden.
 */

type Mouse = { x: number; y: number; sx: number; sy: number };

/* Overshoot-and-settle for the entrance. */
const ease = (x: number) => 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2);

export default function PrinterScene({ className = "" }: { className?: string }) {
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = T.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(30, 1, 0.1, 100);
      cam.position.set(0, 0, 12);

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
      /* Red rim from behind: the one place the brand colour lights the object. */
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

      /* Desktop: a large printer on the right, vertically centred. Phone: a
         small one in the top-right corner, beside the headline. Scale and
         position are applied in the loop, because the entrance and the scroll
         both modulate them. */
      let baseScale = 1;
      let baseX = 0;
      let baseY = 0;
      const size = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        const mob = w < 700;
        const half = 3.22 * cam.aspect;
        if (mob) {
          const s = (half * 0.2) / 0.82;
          baseScale = s * 0.82;
          baseX = half * 0.6;
          baseY = 3.22 * (1 - (2 * (88 + 0.19 * window.innerHeight)) / h);
        } else {
          const s = Math.min(1, 0.17 * half);
          baseScale = s * 0.82;
          baseX = half * 0.5;
          baseY = 0;
        }
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

      const copy = host.closest("section")?.querySelector<HTMLElement>("[data-hero-copy]") ?? null;

      const clock = new T.Clock();
      let t = 0;
      let frame = 0;

      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) {
          clock.getDelta();
          return;
        }
        const dt = clock.getDelta();
        t += dt;

        const vh = window.innerHeight;
        const p = reduce ? 0 : Math.max(0, Math.min(1, window.scrollY / (vh * 0.55)));
        const en = reduce ? 1 : Math.max(0, Math.min(1, (t - 0.15) / 1.5));
        const e = ease(en);
        const k = Math.max(0.001, e) * (1 - p);

        m.sx += (m.x - m.sx) * 0.05;
        m.sy += (m.y - m.sy) * 0.05;

        pr.visible = k > 0.01;
        pr.scale.setScalar(baseScale * k);
        pr.position.set(baseX, baseY + (1 - e) * -2.2 + p * 1.4, 0);
        pr.rotation.y = (1 - e) * -1.6 + p * 0.9 + m.sx * 0.4 + (reduce ? 0 : Math.sin(t * 0.4) * 0.1);
        pr.rotation.x = m.sy * 0.15 - p * 0.3;
        hd.position.y = reduce ? 0 : Math.sin(t * 1.2) * 0.06;

        eyes.forEach((q, n) => {
          q.position.x = (n ? 0.52 : -0.52) + m.sx * 0.26;
          q.position.y = 0.5 - m.sy * 0.14;
          const ph = t % 4.2;
          const bl = !reduce && ph > 4 ? Math.abs(Math.cos(((ph - 4) / 0.2) * (Math.PI / 2))) : 1;
          q.scale.y = 1.15 * Math.max(0.06, bl);
        });

        const cy = (t % 6) / 6;
        const fd = !reduce && cy < 0.25 ? Math.sin((cy / 0.25) * Math.PI) : 0;
        paper.position.z = 1.55 + fd * 0.35;
        paper.position.y = -1.05 - fd * 0.12;

        if (copy && !reduce) {
          copy.style.opacity = String(Math.max(0, 1 - p * 1.2));
          copy.style.transform = `translateY(${-p * 30}px)`;
        }

        renderer.render(scene, cam);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        if (copy) {
          copy.style.opacity = "";
          copy.style.transform = "";
        }

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
