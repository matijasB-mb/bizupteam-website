/**
 * Generira OG sliku i ikone iz istog vizualnog jezika koji stranica koristi.
 *
 * Pokreće se ručno (`node scripts/make-images.mjs`), ne pri svakom buildu —
 * rezultat se commita. Tako build nema mrežnu ovisnost, a slike se mijenjaju
 * samo kad ih netko namjerno promijeni.
 *
 * Archivo se preuzima jednom i sprema u scripts/assets/. Bez pravog fonta
 * satori bi posegnuo za zamjenom i wordmark bi se razišao sa stranicom.
 */
import { ImageResponse } from "next/og.js";
import React from "react";
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "scripts", "assets");
const app = join(root, "src", "app");

const INK = "#0B0B0C";
const RED = "#E31E24";

/* ── Font ──────────────────────────────────────────────────────────────── */

async function archivo(weight) {
  const file = join(assets, `archivo-${weight}.ttf`);
  if (existsSync(file)) return readFileSync(file);

  mkdirSync(assets, { recursive: true });

  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}`, {
      // Bez ovog zaglavlja Google vraća woff2, koji satori ne čita.
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    })
  ).text();

  const url = css.match(/src: url\((https:[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Archivo ${weight}: TTF nije pronađen u CSS-u.`);

  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(file, buf);
  console.log(`preuzeto  scripts/assets/archivo-${weight}.ttf (${buf.length} B)`);
  return buf;
}

async function render(element, { width, height, fonts }) {
  const res = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await res.arrayBuffer());
}

const h = React.createElement;

/* ── Wordmark ──────────────────────────────────────────────────────────── */

function wordmark(size) {
  return h(
    "div",
    { style: { display: "flex", alignItems: "flex-end", lineHeight: 1 } },
    h("span", { style: { fontSize: size, fontWeight: 700, letterSpacing: -size * 0.055, color: "#FFFFFF" } }, "biz"),
    h("span", { style: { fontSize: size, fontWeight: 700, letterSpacing: -size * 0.055, color: RED, marginLeft: size * 0.11 } }, "up"),
    h(
      "span",
      {
        style: {
          fontSize: size * 0.34,
          fontWeight: 500,
          letterSpacing: size * 0.34 * 0.34,
          color: "rgba(255,255,255,0.65)",
          marginLeft: size * 0.3,
          marginBottom: size * 0.16,
          textTransform: "uppercase",
        },
      },
      "team",
    ),
  );
}

/* ── OG slika ──────────────────────────────────────────────────────────── */

function ogCard() {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        padding: "72px 80px",
        fontFamily: "Archivo",
      },
    },
    h("div", { style: { display: "flex" } }, wordmark(44)),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h("div", { style: { width: 72, height: 4, background: RED, marginBottom: 36 } }),
      /* Svaki redak svoj element: satori pri prelomu retka s negativnim
         letter-spacingom razvuče razmak na spoju, pa se prelom bira ovdje. */
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            fontSize: 70,
            fontWeight: 600,
            letterSpacing: -2.4,
            lineHeight: 1.1,
            color: "#FFFFFF",
          },
        },
        h("div", { style: { display: "flex" } }, "Telekomunikacije"),
        h("div", { style: { display: "flex" } }, "i uredska tehnologija."),
      ),
      h(
        "div",
        { style: { fontSize: 29, fontWeight: 400, color: "rgba(255,255,255,0.58)", marginTop: 26, maxWidth: 820 } },
        "Ugovorni partner A1-a i partner Canona za poslovne korisnike.",
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.14)",
          paddingTop: 28,
          fontSize: 21,
          letterSpacing: 2.4,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 500,
        },
      },
      h("div", { style: { display: "flex" } }, "Osijek · Zagreb"),
      h("div", { style: { display: "flex", color: "rgba(255,255,255,0.8)" } }, "bizupteam.hr"),
    ),
  );
}

/* ── Ikona ─────────────────────────────────────────────────────────────── */

/* Ikona je pravi logotip (public/brand/logo-biz-up.png), ne naš nacrt: logo se
   izreže po sadržaju, stavi na bijelu podlogu s malim rubom i skalira na
   traženu veličinu. Izvor je raster od 142 px, pa je povećanje za velike ikone
   mekano — vektorski logo (SVG) bi to riješio. */
const LOGO = join(root, "public", "brand", "logo-biz-up.png");
const LOGO_BOX = { left: 9, top: 11, width: 124, height: 55 }; // sadržaj bez prozirnog ruba

async function logoIcon(size, pad = 0.09) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(LOGO)
    .extract(LOGO_BOX)
    .resize({ width: inner, kernel: "lanczos3" })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: "#FFFFFF" },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

/* ── ICO ───────────────────────────────────────────────────────────────── */

/** ICO spremnik s ugrađenim PNG-ovima — podržano od Windows Viste naovamo.
    Više veličina u jednoj datoteci: preglednik uzme onu koja mu odgovara. */
function ico(images) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0); // rezervirano
  head.writeUInt16LE(1, 2); // tip: ikona
  head.writeUInt16LE(images.length, 4);

  let offset = head.length + images.length * 16;
  const entries = images.map(({ png, size }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // ravnine
    e.writeUInt16LE(32, 6); // bitova po pikselu
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });

  return Buffer.concat([head, ...entries, ...images.map((i) => i.png)]);
}

/* ── Izvedba ───────────────────────────────────────────────────────────── */

const [w500, w600, w700] = await Promise.all([archivo(500), archivo(600), archivo(700)]);
const fonts = [
  { name: "Archivo", data: w500, weight: 500, style: "normal" },
  { name: "Archivo", data: w600, weight: 600, style: "normal" },
  { name: "Archivo", data: w700, weight: 700, style: "normal" },
];

const og = await render(ogCard(), { width: 1200, height: 630, fonts });
writeFileSync(join(app, "opengraph-image.png"), og);
console.log(`napisano  src/app/opengraph-image.png (1200×630, ${og.length} B)`);

const icon512 = await logoIcon(512);
writeFileSync(join(app, "icon.png"), icon512);
console.log(`napisano  src/app/icon.png (512×512, ${icon512.length} B)`);

const apple = await logoIcon(180, 0.12);
writeFileSync(join(app, "apple-icon.png"), apple);
console.log(`napisano  src/app/apple-icon.png (180×180, ${apple.length} B)`);

const sizes = [16, 32, 48];
const icons = [];
for (const size of sizes) icons.push({ size, png: await logoIcon(size, size <= 32 ? 0.04 : 0.07) });
writeFileSync(join(app, "favicon.ico"), ico(icons));
console.log(`napisano  src/app/favicon.ico (${sizes.join(", ")} px)`);
