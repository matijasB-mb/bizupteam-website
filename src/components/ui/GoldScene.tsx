"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * The hero's 3D scene: gold metal branches and drifting leaves lit by a small
 * warm studio environment, with a little dust in the air. The whole thing
 * leans a few degrees towards the pointer and the branches sway.
 *
 * Ported from the client's prototype (BizUp Hero Gold), written against
 * three r149. Moving to a current three needed two things pinned so the look
 * does not drift:
 *   • colour management is switched off, as it was by default in r149
 *   • the key light is multiplied by π, because "legacy lights" are gone
 *
 * three is imported dynamically so it is a separate chunk the hero loads after
 * first paint. Without WebGL the hero is still complete: the scene is
 * decoration, which is why it is aria-hidden.
 */

type Mouse = { x: number; y: number; sx: number; sy: number };
type Leaf = { m: THREE.Mesh; q: THREE.Quaternion; ph: number; sp: number };
type Loose = { m: THREE.Mesh; vr: THREE.Vector3; by: number; ph: number };

export default function GoldScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const T = await import("three");
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
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      host.appendChild(renderer.domElement);

      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(30, 1, 0.1, 100);
      cam.position.set(0, 0, 12);

      /* A tiny hand-painted studio: a few soft warm light bands on near-black.
         It is only ever seen as reflections in the metal, so it needs no
         detail — but those reflections are the whole look. */
      const ec = document.createElement("canvas");
      ec.width = 1024;
      ec.height = 512;
      const g = ec.getContext("2d")!;
      g.fillStyle = "#0a0806";
      g.fillRect(0, 0, 1024, 512);
      const band = (x: number, y: number, w: number, h: number, a: number) => {
        const R = Math.max(w, h);
        const gr = g.createRadialGradient(0, 0, 0, 0, 0, R);
        gr.addColorStop(0, `rgba(255,236,200,${a})`);
        gr.addColorStop(1, "rgba(255,236,200,0)");
        g.save();
        g.translate(x, y);
        g.scale(w / R, h / R);
        g.fillStyle = gr;
        g.fillRect(-R, -R, 2 * R, 2 * R);
        g.restore();
      };
      band(180, 140, 160, 60, 1);
      band(520, 90, 220, 40, 0.8);
      band(820, 200, 120, 90, 0.9);
      band(350, 380, 200, 50, 0.45);
      band(700, 400, 160, 40, 0.35);
      const envTex = new T.CanvasTexture(ec);
      envTex.mapping = T.EquirectangularReflectionMapping;
      envTex.colorSpace = T.SRGBColorSpace;
      const pmrem = new T.PMREMGenerator(renderer);
      const envRT = pmrem.fromEquirectangular(envTex);
      scene.environment = envRT.texture;
      envTex.dispose();
      pmrem.dispose();

      const key = new T.DirectionalLight(0xffe2b0, 1.4 * Math.PI);
      key.position.set(-3, 4, 6);
      scene.add(key);

      /* One leaf: a gently curved, pointed surface. */
      const NU = 14;
      const NV = 6;
      const pos: number[] = [];
      const idx: number[] = [];
      for (let i = 0; i <= NU; i++) {
        const u = i / NU;
        const w = Math.pow(Math.sin(Math.PI * Math.pow(u, 0.75)), 0.9) * 0.3;
        for (let j = 0; j <= NV; j++) {
          const v = (j / NV) * 2 - 1;
          pos.push(
            v * w,
            u,
            Math.abs(v) * w * 0.45 + u * u * 0.22 - 0.02 * Math.sin(u * 9) * Math.abs(v),
          );
        }
      }
      for (let i = 0; i < NU; i++) {
        for (let j = 0; j < NV; j++) {
          const a = i * (NV + 1) + j;
          const b = a + NV + 1;
          idx.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
      const geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
      geo.setIndex(idx);
      geo.computeVertexNormals();

      const mats = ["#d9a640", "#c8932f", "#e6bd62", "#b98427"].map(
        (c) =>
          new T.MeshStandardMaterial({
            color: c,
            metalness: 1,
            roughness: 0.26,
            side: T.DoubleSide,
            envMapIntensity: 1.5,
          }),
      );
      const stemM = new T.MeshStandardMaterial({ color: "#a9791f", metalness: 1, roughness: 0.35 });

      const root = new T.Group();
      scene.add(root);

      /* Seeded, so the arrangement is the same on every load. */
      const rnd = (() => {
        let s = 7;
        return () => (s = (s * 16807) % 2147483647) / 2147483647;
      })();
      const Y = new T.Vector3(0, 1, 0);
      const leaves: Leaf[] = [];
      const branches: THREE.Group[] = [];

      const makeBranch = (pts: number[][], n: number, scale: number, ph: number) => {
        const grp = new T.Group();
        const curve = new T.CatmullRomCurve3(pts.map((p) => new T.Vector3(p[0], p[1], p[2])));
        grp.add(new T.Mesh(new T.TubeGeometry(curve, 40, 0.022 * scale, 6), stemM));
        for (let k = 0; k < n; k++) {
          const t = 0.08 + (0.92 * k) / (n - 1);
          const p = curve.getPoint(t);
          const tg = curve.getTangent(t);
          for (const side of [-1, 1]) {
            if (k === n - 1 && side === 1) continue;
            const ang = k === n - 1 ? 0 : side * (0.75 + rnd() * 0.3);
            const d = tg.clone().applyAxisAngle(new T.Vector3(0, 0, 1), ang).normalize();
            const m = new T.Mesh(geo, mats[Math.floor(rnd() * 4)]);
            const q = new T.Quaternion().setFromUnitVectors(Y, d);
            q.multiply(
              new T.Quaternion().setFromAxisAngle(Y, (rnd() - 0.5) * 1.2 + (side > 0 ? 0 : Math.PI)),
            );
            m.quaternion.copy(q);
            m.position.copy(p);
            const s = scale * (1.25 - 0.75 * t) * (0.85 + rnd() * 0.3);
            m.scale.set(s, s, s);
            grp.add(m);
            leaves.push({ m, q: q.clone(), ph: rnd() * 6.28, sp: 0.6 + rnd() * 0.6 });
          }
        }
        grp.userData.ph = ph;
        root.add(grp);
        branches.push(grp);
      };
      makeBranch([[2.2, -3.2, 0], [1.6, -1.6, 0.3], [1.9, 0.2, 0], [1.0, 1.9, -0.3], [-0.2, 3.0, 0]], 11, 1.15, 0);
      makeBranch([[3.6, -2.0, -0.4], [2.6, -0.6, 0.2], [2.5, 1.2, 0.1], [1.8, 2.8, -0.2]], 9, 0.95, 1.7);
      makeBranch([[0.6, -3.4, 0.6], [0.2, -2.0, 0.8], [-0.6, -0.8, 0.5], [-1.5, 0.2, 0.6]], 8, 0.8, 3.2);

      /* Loose leaves drifting between the branches. */
      const loose: Loose[] = [];
      for (let i = 0; i < 16; i++) {
        const m = new T.Mesh(geo, mats[i % 4]);
        const s = 0.35 + rnd() * 0.55;
        m.scale.set(s, s, s);
        m.position.set(-1.5 + rnd() * 6, -3 + rnd() * 6.4, -1.5 + rnd() * 3.5);
        m.rotation.set(rnd() * 6, rnd() * 6, rnd() * 6);
        root.add(m);
        loose.push({
          m,
          vr: new T.Vector3((rnd() - 0.5) * 0.5, (rnd() - 0.5) * 0.5, (rnd() - 0.5) * 0.4),
          by: m.position.y,
          ph: rnd() * 6.28,
        });
      }

      /* Dust */
      const N = 140;
      const dp = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        dp[i * 3] = -2 + rnd() * 8;
        dp[i * 3 + 1] = -3.5 + rnd() * 7;
        dp[i * 3 + 2] = -2 + rnd() * 4;
      }
      const dg = new T.BufferGeometry();
      dg.setAttribute("position", new T.BufferAttribute(dp, 3));
      const dust = new T.Points(
        dg,
        new T.PointsMaterial({
          color: 0xf0cd7a,
          size: 0.035,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        }),
      );
      root.add(dust);

      /* Placement: to the right on desktop; on a phone the scene sits at the
         top and the copy runs over its lower half, under the hero's scrim. */
      const size = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        const mob = w < 700;
        const half = 3.2 * cam.aspect;
        const s = mob ? Math.min(0.72, 0.42 * cam.aspect + 0.42) : Math.min(1, 0.2 * half);
        root.scale.setScalar(s);
        root.position.set(
          mob ? -0.15 : (half - 2.9 * s) * 0.95 - 0.2,
          mob ? 3.2 - 3.2 * s : 0,
          0,
        );
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

      /* Nothing is drawn while the hero is off screen. */
      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(host);

      const clock = new T.Clock();
      let t = 0;
      let frame = 0;
      const eu = new T.Euler();
      const qe = new T.Quaternion();

      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) {
          clock.getDelta();
          return;
        }
        const dt = clock.getDelta();
        if (!reduce) t += dt;

        m.sx += (m.x - m.sx) * 0.05;
        m.sy += (m.y - m.sy) * 0.05;
        root.rotation.y = m.sx * 0.22;
        root.rotation.x = m.sy * 0.1;

        for (const b of branches) {
          b.rotation.z = Math.sin(t * 0.5 + b.userData.ph) * 0.025;
          b.rotation.y = Math.sin(t * 0.4 + b.userData.ph) * 0.05;
        }
        for (const l of leaves) {
          eu.set(Math.sin(t * l.sp + l.ph) * 0.06, 0, Math.cos(t * l.sp * 0.8 + l.ph) * 0.05);
          qe.setFromEuler(eu);
          l.m.quaternion.copy(l.q).multiply(qe);
        }
        for (const l of loose) {
          if (!reduce) {
            l.m.rotation.x += l.vr.x * dt;
            l.m.rotation.y += l.vr.y * dt;
            l.m.rotation.z += l.vr.z * dt;
          }
          l.m.position.y = l.by + Math.sin(t * 0.5 + l.ph) * 0.25;
        }
        dust.rotation.y = t * 0.03;
        dust.position.y = Math.sin(t * 0.3) * 0.12;

        renderer.render(scene, cam);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);

        geo.dispose();
        dg.dispose();
        for (const mat of mats) mat.dispose();
        stemM.dispose();
        (dust.material as THREE.Material).dispose();
        scene.traverse((obj) => {
          if (obj instanceof T.Mesh && obj.geometry instanceof T.TubeGeometry) obj.geometry.dispose();
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
