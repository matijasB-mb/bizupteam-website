"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * The hero's 3D character: a figure in a grey blazer whose head is a Canon-ish
 * office printer. The eyes follow the pointer, blink every few seconds and a
 * sheet slides out of the output slot on a loop.
 *
 * Ported from the client-approved prototype (BizUp Hero Printer), which was
 * written against three r149. Two things changed with the move to a current
 * three and both are pinned below so the look does not drift:
 *   • colour management is switched off, as it was by default in r149
 *   • light intensities are multiplied by π, because "legacy lights" are gone
 *
 * three is imported dynamically, so it is a separate chunk that only the hero
 * loads and never blocks first paint. Until it arrives, and anywhere WebGL is
 * unavailable, the hero is still a complete composition — the canvas is
 * decoration, not content, which is why it is aria-hidden.
 */

type Mouse = { x: number; y: number; sx: number; sy: number };

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
        /* fall through with whatever the browser has */
      }
      if (disposed) return;

      T.ColorManagement.enabled = false;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL — the hero stands on its own without the figure
      }
      renderer.outputColorSpace = T.LinearSRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);

      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(30, 1, 0.1, 100);
      cam.position.set(0, 0.2, 15);
      scene.add(new T.HemisphereLight(0xffffff, 0x8a8b8d, 0.6 * Math.PI));
      const sun = new T.DirectionalLight(0xffffff, 0.65 * Math.PI);
      sun.position.set(-4, 6, 8);
      scene.add(sun);

      /* Rounded box: extruded rounded rectangle with a small bevel. */
      const rr = (w: number, h: number, d: number, r: number, bev = 0.04) => {
        const s = new T.Shape();
        const x = -w / 2;
        const y = -h / 2;
        s.moveTo(x + r, y);
        s.lineTo(x + w - r, y);
        s.quadraticCurveTo(x + w, y, x + w, y + r);
        s.lineTo(x + w, y + h - r);
        s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        s.lineTo(x + r, y + h);
        s.quadraticCurveTo(x, y + h, x, y + h - r);
        s.lineTo(x, y + r);
        s.quadraticCurveTo(x, y, x + r, y);
        const g = new T.ExtrudeGeometry(s, {
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
      const mat = (c: string, r = 0.85) =>
        new T.MeshStandardMaterial({ color: c, roughness: r, metalness: 0 });
      const add = (
        parent: THREE.Object3D,
        geo: THREE.BufferGeometry,
        m: THREE.Material,
        x: number,
        y: number,
        z: number,
      ) => {
        const o = new T.Mesh(geo, m);
        o.position.set(x, y, z);
        parent.add(o);
        return o;
      };

      const root = new T.Group();
      scene.add(root);
      const body = new T.Group();
      root.add(body);

      // torso, blazer, shirt, neck
      add(body, rr(3.9, 3.4, 1.4, 0.5, 0.08), mat("#74767a", 0.95), 0, -2.5, 0);
      add(body, rr(1.15, 2.5, 0.1, 0.1, 0.02), mat("#eeeeec", 0.9), 0, -1.75, 0.74);
      const lapel = rr(0.7, 2.3, 0.12, 0.12, 0.03);
      add(body, lapel, mat("#5f6165", 0.95), -0.78, -1.8, 0.78).rotation.z = -0.2;
      add(body, lapel, mat("#5f6165", 0.95), 0.78, -1.8, 0.78).rotation.z = 0.2;
      add(body, new T.CylinderGeometry(0.34, 0.4, 0.7, 24), mat("#c9a595", 0.8), 0, -0.62, 0);

      // printer head
      const head = new T.Group();
      head.position.y = 1.1;
      body.add(head);
      add(head, rr(3.1, 2.9, 2.3, 0.2, 0.06), mat("#dcd9d2", 0.6), 0, 0, 0);
      add(head, rr(3.0, 0.5, 2.2, 0.1, 0.04), mat("#c7c4bc", 0.6), 0, 1.6, -0.05); // lid
      add(head, rr(2.3, 0.08, 1.3, 0.03, 0.02), mat("#f4f3f0", 0.8), 0, 2.0, -0.3).rotation.x =
        -0.25; // paper in the tray
      add(head, rr(3.14, 0.22, 2.34, 0.08, 0.03), mat("#E31E24", 0.6), 0, -1.22, 0); // red base band

      // screen + eyes
      add(head, rr(2.3, 1.3, 0.12, 0.14, 0.03), mat("#262726", 0.35), 0, 0.5, 1.17);
      const eyeM = new T.MeshBasicMaterial({ color: 0xffe6e8 });
      const eyes = [-0.52, 0.52].map((x) => {
        const e = new T.Mesh(new T.CircleGeometry(0.24, 32), eyeM);
        e.scale.set(1, 1.15, 1);
        e.position.set(x, 0.5, 1.25);
        head.add(e);
        return e;
      });

      // label strip + button
      const label = document.createElement("canvas");
      label.width = 256;
      label.height = 40;
      const lg = label.getContext("2d")!;
      lg.fillStyle = "#b9b6ae";
      lg.fillRect(0, 0, 256, 40);
      lg.fillStyle = "#4a4745";
      lg.font = `600 20px ${family}`;
      lg.fillText("BIZ UP · PRINT", 12, 28);
      lg.fillStyle = "#E31E24";
      lg.fillRect(222, 14, 22, 12);
      add(
        head,
        new T.PlaneGeometry(1.8, 0.28),
        new T.MeshStandardMaterial({ map: new T.CanvasTexture(label), roughness: 0.7 }),
        -0.2,
        -0.38,
        1.19,
      );
      add(head, new T.CylinderGeometry(0.1, 0.1, 0.04, 20), mat("#2b2b2b", 0.5), 0.95, -0.38, 1.19)
        .rotation.x = Math.PI / 2;

      // output slot + the sheet that feeds out of it
      add(head, rr(2.1, 0.18, 0.1, 0.05, 0.02), mat("#2b2c2b", 0.5), 0, -0.82, 1.17);
      const sheet = document.createElement("canvas");
      sheet.width = 128;
      sheet.height = 96;
      const sg = sheet.getContext("2d")!;
      sg.fillStyle = "#fbfaf8";
      sg.fillRect(0, 0, 128, 96);
      sg.fillStyle = "#0B0B0C";
      sg.fillRect(10, 12, 44, 6);
      sg.fillStyle = "#bbb";
      for (let i = 0; i < 5; i++) sg.fillRect(10, 30 + i * 11, 96, 3);
      sg.fillStyle = "#E31E24";
      sg.fillRect(10, 84, 20, 3);
      const paper = new T.Mesh(
        new T.PlaneGeometry(1.8, 1.2),
        new T.MeshStandardMaterial({
          map: new T.CanvasTexture(sheet),
          roughness: 0.9,
          side: T.DoubleSide,
        }),
      );
      paper.rotation.x = -1.25;
      paper.position.set(0, -1.05, 1.55);
      head.add(paper);

      /* Placement: the figure sits to the right on desktop and drops behind
         its own band above the copy on a phone. */
      const size = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        const cs = renderer.domElement.style;
        cs.position = "absolute";
        cs.inset = "0";
        cs.width = "100%";
        cs.height = "100%";
        cam.aspect = w / h;
        const mob = w < 700;
        const tab = !mob && w < 1100;
        const half = 4.02 * cam.aspect;
        const s = mob ? 0.9 : tab ? 0.42 : Math.min(0.98, 0.2 * half);
        /* On a phone the figure has a band of its own above the copy, so it is
           centred and sized to the band instead of floating behind the text. */
        root.position.set(
          mob ? 0 : (half - 2.25 * s * 1.1) * 0.97,
          mob ? 0.55 : tab ? 1.7 : -0.6 * s,
          0,
        );
        root.scale.setScalar(s);
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

      /* Drawing stops while the hero is off screen — a 3D scene nobody can see
         should cost nothing. */
      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(host);

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
        if (!reduce) t += dt;

        m.sx += (m.x - m.sx) * 0.06;
        m.sy += (m.y - m.sy) * 0.06;

        body.position.y = Math.sin(t * 1.3) * 0.04;
        body.rotation.y = m.sx * 0.12;
        head.rotation.y = m.sx * 0.4;
        head.rotation.x = m.sy * 0.16;

        eyes.forEach((e, i) => {
          e.position.x = (i ? 0.52 : -0.52) + m.sx * 0.26;
          e.position.y = 0.5 - m.sy * 0.14;
          const phase = t % 4.2;
          const blink = phase > 4.0 ? Math.abs(Math.cos(((phase - 4.0) / 0.2) * (Math.PI / 2))) : 1;
          e.scale.y = 1.15 * Math.max(0.06, blink);
        });

        const cycle = (t % 6) / 6;
        const feed = cycle < 0.25 ? Math.sin((cycle / 0.25) * Math.PI) : 0;
        paper.position.z = 1.55 + feed * 0.35;
        paper.position.y = -1.05 - feed * 0.12;

        renderer.render(scene, cam);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);

        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const material of materials) {
            if (!material) continue;
            (material as THREE.MeshStandardMaterial).map?.dispose();
            material.dispose();
          }
        });
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
