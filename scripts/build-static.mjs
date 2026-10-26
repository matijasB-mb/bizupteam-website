/**
 * Paket za Apache hosting s PHP-om (MyDataKnox).
 *
 * Što radi:
 *   1. privremeno makne src/app/api (Next ruta ne postoji u statičkom izvozu;
 *      na Vercelu ostaje) i vrati je čim build završi — i ako pukne
 *   2. napravi statički izvoz u out/ s obrascem spojenim na /upiti.php
 *   3. u out/ doda deploy/upiti.php i deploy/.htaccess
 *   4. složi bizupteam-hosting.zip: sadržaj te mape, spreman za raspakirati
 *      u public_html
 *
 * Vidi DEPLOY.md za korake na hostingu.
 */
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative, sep } from "node:path";
import { crc32, deflateRawSync } from "node:zlib";

const root = process.cwd();
const api = join(root, "src", "app", "api");
const parked = join(root, ".api.parked");
const out = join(root, "out");

if (existsSync(parked)) rmSync(parked, { recursive: true, force: true });
const moved = existsSync(api);
if (moved) renameSync(api, parked);

try {
  rmSync(out, { recursive: true, force: true });
  // Next čuva generirane tipove ruta iz prethodnog builda; da ne traži mapu
  // koju smo upravo maknuli, cijeli .next ide u stranu.
  rmSync(join(root, ".next"), { recursive: true, force: true });

  execFileSync("npx", ["next", "build"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      BUILD_TARGET: "static",
      NEXT_PUBLIC_CONTACT_ENDPOINT: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/upiti.php",
    },
  });
} finally {
  if (moved) {
    rmSync(api, { recursive: true, force: true });
    renameSync(parked, api);
  }
}

/* ── Datoteke za hosting ─────────────────────────────────────────────── */
for (const name of ["upiti.php", ".htaccess"]) {
  cpSync(join(root, "deploy", name), join(out, name));
}

/* ── Provjera prije pakiranja ────────────────────────────────────────── */
const must = ["index.html", "404.html", "upiti.php", ".htaccess", "robots.txt", "sitemap.xml", "llms.txt", "kontakt/index.html"];
const missing = must.filter((f) => !existsSync(join(out, f)));
if (missing.length) {
  console.error("\nU paketu nedostaje:", missing.join(", "));
  process.exit(1);
}
const endpointOk = readFileSync(join(out, "kontakt", "index.html"), "utf8").includes("upiti.php") ||
  readdirSync(join(out, "_next", "static", "chunks")).some((f) =>
    readFileSync(join(out, "_next", "static", "chunks", f), "utf8").includes("/upiti.php"),
  );
if (!endpointOk) {
  console.error("\nObrazac nije spojen na /upiti.php.");
  process.exit(1);
}

/* ── ZIP ─────────────────────────────────────────────────────────────── */
/* Vlastiti zapisivač: PowerShell Compress-Archive na Windowsu zapisuje
   obrnute kose crte u imena, pa se na Linux hostingu raspakira u pogrešne
   datoteke umjesto mapa. Ovdje su putanje uvijek s "/" i imena u UTF-8. */
function files(dir) {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? files(f) : [f];
  });
}

const entries = [];
const chunks = [];
let offset = 0;
const stamp = new Date();
const dosTime = (stamp.getHours() << 11) | (stamp.getMinutes() << 5) | (stamp.getSeconds() >> 1);
const dosDate = ((stamp.getFullYear() - 1980) << 9) | ((stamp.getMonth() + 1) << 5) | stamp.getDate();

for (const f of files(out).sort()) {
  const name = relative(out, f).split(sep).join("/");
  const raw = readFileSync(f);
  const packed = deflateRawSync(raw, { level: 9 });
  const useDeflate = packed.length < raw.length;
  const data = useDeflate ? packed : raw;
  const nameBuf = Buffer.from(name, "utf8");
  const crc = crc32(raw);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6); // UTF-8 imena
  local.writeUInt16LE(useDeflate ? 8 : 0, 8);
  local.writeUInt16LE(dosTime, 10);
  local.writeUInt16LE(dosDate, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(data.length, 18);
  local.writeUInt32LE(raw.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);

  chunks.push(local, nameBuf, data);
  entries.push({ nameBuf, crc, size: raw.length, csize: data.length, method: useDeflate ? 8 : 0, offset });
  offset += local.length + nameBuf.length + data.length;
}

const centralStart = offset;
for (const e of entries) {
  const c = Buffer.alloc(46);
  c.writeUInt32LE(0x02014b50, 0);
  c.writeUInt16LE(20, 4);
  c.writeUInt16LE(20, 6);
  c.writeUInt16LE(0x0800, 8);
  c.writeUInt16LE(e.method, 10);
  c.writeUInt16LE(dosTime, 12);
  c.writeUInt16LE(dosDate, 14);
  c.writeUInt32LE(e.crc, 16);
  c.writeUInt32LE(e.csize, 20);
  c.writeUInt32LE(e.size, 24);
  c.writeUInt16LE(e.nameBuf.length, 28);
  c.writeUInt32LE(e.offset, 42);
  chunks.push(c, e.nameBuf);
  offset += c.length + e.nameBuf.length;
}
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(entries.length, 8);
end.writeUInt16LE(entries.length, 10);
end.writeUInt32LE(offset - centralStart, 12);
end.writeUInt32LE(centralStart, 16);
chunks.push(end);

const zipPath = join(root, "bizupteam-hosting.zip");
writeFileSync(zipPath, Buffer.concat(chunks));
const mb = (statSync(zipPath).size / 1024 / 1024).toFixed(1);

console.log(`\nGotovo: ${entries.length} datoteka, ${mb} MB.`);
console.log("Paket: bizupteam-hosting.zip — raspakirati u public_html (vidi DEPLOY.md).");
