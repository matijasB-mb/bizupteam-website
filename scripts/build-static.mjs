/**
 * Build za Apache hosting s PHP-om (MyDataKnox).
 *
 * Zašto skripta, a ne samo `output: "export"`: statički izvoz ne podnosi
 * Next rute, a /api/kontakt je ruta. Na Vercelu ona radi i treba ostati, pa
 * je ovdje samo privremeno maknemo s puta i vratimo je čim build završi —
 * i ako build pukne.
 *
 * Rezultat je mapa `out/`. Njezin se sadržaj zipa i raspakira u korijen
 * hostinga (public_html). upiti.php i .htaccess izlaze iz public/ zajedno sa
 * stranicom, pa ih ne treba kopirati ručno.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const api = join(root, "src", "app", "api");
const parked = join(root, ".api.parked");

if (existsSync(parked)) {
  rmSync(parked, { recursive: true, force: true });
}

const moved = existsSync(api);
if (moved) renameSync(api, parked);

try {
  rmSync(join(root, "out"), { recursive: true, force: true });

  /* Next zadrži generirane tipove rute iz prethodnog builda; da se ne traži
     datoteka koju smo upravo maknuli, cijeli .next ide u stranu. */
  rmSync(join(root, ".next"), { recursive: true, force: true });

  execFileSync("npx", ["next", "build"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      BUILD_TARGET: "static",
      NEXT_PUBLIC_CONTACT_ENDPOINT:
        process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/upiti.php",
    },
  });
} finally {
  if (moved) {
    rmSync(api, { recursive: true, force: true });
    renameSync(parked, api);
  }
}

/* Dotfile iz public/ ne mora proći kroz izvoz, pa se dodaje za svaki slučaj. */
const htaccess = join(root, "public", ".htaccess");
if (existsSync(htaccess)) {
  mkdirSync(join(root, "out"), { recursive: true });
  cpSync(htaccess, join(root, "out", ".htaccess"));
}

console.log("\nGotovo. Zipaj SADRŽAJ mape out/ i raspakiraj ga u public_html.");
