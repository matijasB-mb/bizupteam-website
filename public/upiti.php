<?php
/**
 * Biz Up Team — zaprimanje upita s kontakt obrasca.
 *
 * Namijenjeno Apache hostingu s PHP-om (MyDataKnox). Datoteka je samostalna:
 * nema composera, nema biblioteka, nema baze. Kopira se zajedno sa stranicom
 * i radi.
 *
 * Obrazac šalje JSON (fetch), pa i odgovor ide kao JSON. Oblik odgovora je
 * identičan onome koji vraća Next ruta /api/kontakt, tako da front-end ne zna
 * — i ne mora znati — gdje je stranica hostana.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  PODESITI PRIJE OBJAVE — samo ova četiri retka ispod.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Adresa na koju stižu upiti. Može ih biti više, odvojene zarezom. */
const PRIMATELJ = 'webshop@bizupteam.hr';

/**
 * Adresa s koje mail odlazi. MORA biti na domeni ovog hostinga
 * (bizupteam.hr), inače ga primateljev poslužitelj odbacuje ili šalje u spam.
 * Ne stavljati ovdje Gmail ni adresu pošiljatelja upita.
 */
const POSILJATELJ = 'web@bizupteam.hr';

/** Ime koje se vidi u pretincu. */
const POSILJATELJ_IME = 'Biz Up Team — web obrazac';

/** Automatska potvrda pošiljatelju upita. Postaviti na false za isključivanje. */
const AUTOODGOVOR = true;

/* ───────────────────────────────────────────────────────────────────────── */

const MARKA       = 'Biz Up Team';
const WEB         = 'https://bizupteam.hr';
const TELEFON     = '091 636 7770';
const CRVENA      = '#E31E24';
const TINTA       = '#0B0B0C';

/* Rate limit: najviše 5 upita s iste IP adrese u 10 minuta. Stanje se drži u
   privremenoj datoteci jer baze nema — dovoljno da zaustavi skriptu koja
   udara u obrazac, a ništa se trajno ne pohranjuje. */
const LIMIT_BROJ   = 5;
const LIMIT_SEKUNDI = 600;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function odgovor($status, array $tijelo)
{
    http_response_code($status);
    echo json_encode($tijelo, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    odgovor(405, ['ok' => false, 'message' => 'Dopuštena je samo POST metoda.']);
}

/* ── Rate limit ───────────────────────────────────────────────────────── */

function ip_klijenta()
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $prva = trim(explode(',', $_SERVER[$k])[0]);
            if (filter_var($prva, FILTER_VALIDATE_IP)) {
                return $prva;
            }
        }
    }
    return 'nepoznato';
}

function ogranicen($ip)
{
    $put = sys_get_temp_dir() . '/bizup-upiti-' . hash('sha256', $ip) . '.txt';
    $sad = time();

    $prije = is_readable($put) ? array_filter(
        array_map('intval', explode("\n", (string) file_get_contents($put))),
        static function ($t) use ($sad) { return $t > 0 && $sad - $t < LIMIT_SEKUNDI; }
    ) : [];

    if (count($prije) >= LIMIT_BROJ) {
        return true;
    }

    $prije[] = $sad;
    @file_put_contents($put, implode("\n", $prije), LOCK_EX);

    return false;
}

$ip = ip_klijenta();

if (ogranicen($ip)) {
    odgovor(429, ['ok' => false, 'message' => 'Previše pokušaja. Pokušajte ponovno za nekoliko minuta.']);
}

/* ── Ulaz ─────────────────────────────────────────────────────────────── */

$sirovo = file_get_contents('php://input');

/* Obrazac šalje JSON, ali datoteka prihvaća i običan POST — tako radi i ako
   se jednog dana obrazac pošalje bez JavaScripta. */
$tijelo = json_decode((string) $sirovo, true);
if (!is_array($tijelo)) {
    $tijelo = $_POST;
}
if (!is_array($tijelo)) {
    odgovor(400, ['ok' => false, 'message' => 'Neispravan zahtjev.']);
}

/** Miče kontrolne znakove i ograničava duljinu. Klijentu se nikad ne vjeruje. */
function ocisti($vrijednost, $max, $visered = false)
{
    if (!is_string($vrijednost)) {
        return '';
    }

    $dopusteni = $visered ? "\n" : '';
    $izlaz = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', ' ', $vrijednost) ?? '';
    $izlaz = str_replace("\r", $visered ? '' : ' ', $izlaz);
    if ($dopusteni === '') {
        $izlaz = str_replace("\n", ' ', $izlaz);
    }

    return mb_substr(trim($izlaz), 0, $max);
}

/* Honeypot: pravi ljudi ovo polje ne vide. Odgovara se s 200 da bot nema
   signal da je uhvaćen. */
if (ocisti($tijelo['website'] ?? '', 200) !== '') {
    odgovor(200, ['ok' => true]);
}

$podaci = [
    'ime'     => ocisti($tijelo['ime'] ?? '', 100),
    'tvrtka'  => ocisti($tijelo['tvrtka'] ?? '', 120),
    'email'   => ocisti($tijelo['email'] ?? '', 200),
    'telefon' => ocisti($tijelo['telefon'] ?? '', 40),
    'usluga'  => ocisti($tijelo['usluga'] ?? '', 60),
    'poruka'  => ocisti($tijelo['poruka'] ?? '', 4000, true),
];

$greske = [];
if (mb_strlen($podaci['ime']) < 2) {
    $greske['ime'] = 'Unesite ime i prezime.';
}
if (!filter_var($podaci['email'], FILTER_VALIDATE_EMAIL)) {
    $greske['email'] = 'Unesite ispravnu e-mail adresu.';
}
if (mb_strlen($podaci['poruka']) < 10) {
    $greske['poruka'] = 'Napišite nam nekoliko rečenica o upitu.';
}

if ($greske !== []) {
    odgovor(422, ['ok' => false, 'errors' => $greske]);
}

/* ── Sastavljanje e-maila ─────────────────────────────────────────────── */

function e($t)
{
    return htmlspecialchars($t, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Zaglavlja se sastavljaju iz korisničkog unosa, pa prijelomi retka ispadaju. */
function zaglavlje_sigurno($t)
{
    return trim(str_replace(["\r", "\n", "\0"], '', $t));
}

/** RFC 2047 — dijakritika u Subjectu i u imenu pošiljatelja. */
function mime_rijec($t)
{
    return '=?UTF-8?B?' . base64_encode($t) . '?=';
}

/* Ime stoji kao naslov e-maila, pa ga tablica ne ponavlja. */
$polja = [
    ['Tvrtka',        $podaci['tvrtka']],
    ['E-mail',        $podaci['email']],
    ['Telefon',       $podaci['telefon']],
    ['Vrsta usluge',  $podaci['usluga']],
];

$tinta          = TINTA;
$crvena         = CRVENA;
$web            = WEB;
$telefon        = TELEFON;
$ipPrikaz       = e($ip);
$naslovIme      = e($podaci['ime']);
$emailZaOdgovor = e($podaci['email']);

$vrijeme = (new DateTimeImmutable('now', new DateTimeZone('Europe/Zagreb')))
    ->format('d.m.Y. \u H:i');

/* ── HTML verzija ─────────────────────────────────────────────────────── */

$retci = '';
foreach ($polja as [$oznaka, $vrijednost]) {
    if ($vrijednost === '') {
        continue; // prazno polje ne dobiva redak s crticom
    }

    $prikaz = e($vrijednost);
    if ($oznaka === 'E-mail') {
        $prikaz = '<a href="mailto:' . e($vrijednost) . '" style="color:' . TINTA . ';text-decoration:underline;">' . $prikaz . '</a>';
    } elseif ($oznaka === 'Telefon') {
        $tel = preg_replace('/[^0-9+]/', '', $vrijednost) ?? '';
        $prikaz = '<a href="tel:' . e($tel) . '" style="color:' . TINTA . ';text-decoration:underline;">' . $prikaz . '</a>';
    }

    $retci .= '<tr>'
        . '<td style="padding:14px 0;border-bottom:1px solid #E8E6E3;font:500 11px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#6B6B70;white-space:nowrap;vertical-align:top;width:40%;">'
        . e($oznaka)
        . '</td>'
        . '<td style="padding:14px 0;border-bottom:1px solid #E8E6E3;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:' . TINTA . ';vertical-align:top;">'
        . $prikaz
        . '</td>'
        . '</tr>';
}

$porukaHtml = nl2br(e($podaci['poruka']), false);

$html = <<<HTML
<!doctype html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Novi upit s web stranice</title>
</head>
<body style="margin:0;padding:0;background:#F4F2EF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Upit od {$naslovIme} — {$vrijeme}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2EF;padding:32px 16px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;">

    <tr><td style="background:{$tinta};padding:28px 32px;">
      <div style="font:700 17px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#FFFFFF;">BIZ&nbsp;UP&nbsp;TEAM</div>
      <div style="height:2px;width:34px;background:{$crvena};margin-top:14px;"></div>
      <div style="font:400 13px/1.4 Arial,Helvetica,sans-serif;color:rgba(255,255,255,.6);margin-top:14px;">Novi upit s web stranice</div>
    </td></tr>

    <tr><td style="padding:32px 32px 8px;">
      <div style="font:600 24px/1.25 Arial,Helvetica,sans-serif;color:{$tinta};">{$naslovIme}</div>
      <div style="font:400 13px/1.4 Arial,Helvetica,sans-serif;color:#6B6B70;margin-top:8px;">Zaprimljeno {$vrijeme}</div>
    </td></tr>

    <tr><td style="padding:16px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid {$tinta};">
        {$retci}
      </table>
    </td></tr>

    <tr><td style="padding:32px;">
      <div style="font:500 11px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#6B6B70;">Poruka</div>
      <div style="border-left:2px solid {$crvena};padding:4px 0 4px 18px;margin-top:14px;font:400 16px/1.65 Arial,Helvetica,sans-serif;color:{$tinta};">{$porukaHtml}</div>
    </td></tr>

    <tr><td style="padding:0 32px 36px;">
      <a href="mailto:{$emailZaOdgovor}?subject=Odgovor%20na%20Va%C5%A1%20upit" style="display:inline-block;background:{$crvena};color:#FFFFFF;font:500 15px/1 Arial,Helvetica,sans-serif;padding:15px 26px;text-decoration:none;">Odgovorite na upit</a>
      <div style="font:400 13px/1.5 Arial,Helvetica,sans-serif;color:#6B6B70;margin-top:14px;">Ili jednostavno pritisnite „Reply" — odgovor ide izravno pošiljatelju.</div>
    </td></tr>

    <tr><td style="border-top:1px solid #E8E6E3;padding:20px 32px;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#8A8A90;">
      Poslano s obrasca na <a href="{$web}" style="color:#8A8A90;">bizupteam.hr</a> &nbsp;·&nbsp; IP {$ipPrikaz}
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>
HTML;

/* ── Tekstualna verzija ───────────────────────────────────────────────── */

$tekstRetci = [];
foreach ($polja as [$oznaka, $vrijednost]) {
    if ($vrijednost !== '') {
        $tekstRetci[] = $oznaka . ': ' . $vrijednost;
    }
}

$tekst = implode("\n", [
    'NOVI UPIT S WEB STRANICE',
    'Zaprimljeno ' . $vrijeme,
    '',
    'Ime i prezime: ' . $podaci['ime'],
    implode("\n", $tekstRetci),
    '',
    'PORUKA',
    '------',
    $podaci['poruka'],
    '',
    '--',
    'Poslano s obrasca na ' . WEB . ' · IP ' . $ip,
]);

/* ── Slanje ───────────────────────────────────────────────────────────── */

/** Multipart/alternative: čitači koji ne prikazuju HTML dobiju uredan tekst. */
function posalji($za, $naslov, $tekst, $html, $odgovorNa = '')
{
    $granica = '=_bizup_' . bin2hex(random_bytes(12));

    $zaglavlja = [
        'MIME-Version: 1.0',
        'From: ' . mime_rijec(POSILJATELJ_IME) . ' <' . POSILJATELJ . '>',
        'Content-Type: multipart/alternative; boundary="' . $granica . '"',
        'X-Mailer: bizupteam.hr',
    ];

    if ($odgovorNa !== '') {
        $zaglavlja[] = 'Reply-To: ' . zaglavlje_sigurno($odgovorNa);
    }

    $tijelo = "--{$granica}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($tekst)) . "\r\n"
        . "--{$granica}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html)) . "\r\n"
        . "--{$granica}--";

    return mail(
        $za,
        mime_rijec($naslov),
        $tijelo,
        implode("\r\n", $zaglavlja),
        '-f' . POSILJATELJ
    );
}

$naslov = 'Novi upit — ' . $podaci['ime']
    . ($podaci['tvrtka'] !== '' ? ' (' . $podaci['tvrtka'] . ')' : '')
    . ($podaci['usluga'] !== '' ? ' · ' . $podaci['usluga'] : '');

$poslano = posalji(PRIMATELJ, $naslov, $tekst, $html, $podaci['email']);

if (!$poslano) {
    error_log('[upiti] mail() nije uspio za ' . $podaci['email']);
    odgovor(502, [
        'ok' => false,
        'message' => 'Slanje trenutno nije uspjelo. Pokušajte ponovno ili nam pišite na ' . PRIMATELJ . '.',
    ]);
}

/* ── Automatska potvrda pošiljatelju ──────────────────────────────────── */

if (AUTOODGOVOR) {
    $potvrdaHtml = <<<HTML
<!doctype html>
<html lang="hr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vaš upit je zaprimljen</title></head>
<body style="margin:0;padding:0;background:#F4F2EF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2EF;padding:32px 16px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;">
    <tr><td style="background:{$tinta};padding:28px 32px;">
      <div style="font:700 17px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#FFFFFF;">BIZ&nbsp;UP&nbsp;TEAM</div>
      <div style="height:2px;width:34px;background:{$crvena};margin-top:14px;"></div>
    </td></tr>
    <tr><td style="padding:36px 32px 8px;">
      <div style="font:600 24px/1.3 Arial,Helvetica,sans-serif;color:{$tinta};">Hvala na upitu.</div>
      <div style="font:400 16px/1.65 Arial,Helvetica,sans-serif;color:#3A3A3F;margin-top:16px;">Poštovani/a {$naslovIme},<br><br>zaprimili smo vaš upit i javljamo vam se u najkraćem mogućem roku. Ako je stvar hitna, nazovite nas na <a href="tel:+385916367770" style="color:{$tinta};">{$telefon}</a>.</div>
    </td></tr>
    <tr><td style="padding:24px 32px 0;">
      <div style="font:500 11px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#6B6B70;">Vaša poruka</div>
      <div style="border-left:2px solid #E8E6E3;padding:4px 0 4px 18px;margin-top:14px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:#6B6B70;">{$porukaHtml}</div>
    </td></tr>
    <tr><td style="padding:36px 32px;">
      <div style="border-top:1px solid #E8E6E3;padding-top:20px;font:400 13px/1.7 Arial,Helvetica,sans-serif;color:#8A8A90;">
        Biz Up Team d.o.o. · <a href="{$web}" style="color:#8A8A90;">bizupteam.hr</a><br>
        Ovo je automatska potvrda — na nju nije potrebno odgovarati.
      </div>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>
HTML;

    $potvrdaTekst = implode("\n", [
        'Hvala na upitu.',
        '',
        'Poštovani/a ' . $podaci['ime'] . ',',
        '',
        'zaprimili smo vaš upit i javljamo vam se u najkraćem mogućem roku.',
        'Ako je stvar hitna, nazovite nas na ' . TELEFON . '.',
        '',
        'VAŠA PORUKA',
        '-----------',
        $podaci['poruka'],
        '',
        '--',
        'Biz Up Team d.o.o. · ' . WEB,
        'Ovo je automatska potvrda — na nju nije potrebno odgovarati.',
    ]);

    // Neuspjela potvrda ne smije srušiti upit koji je već stigao.
    @posalji($podaci['email'], 'Zaprimili smo vaš upit — ' . MARKA, $potvrdaTekst, $potvrdaHtml);
}

odgovor(200, ['ok' => true]);
