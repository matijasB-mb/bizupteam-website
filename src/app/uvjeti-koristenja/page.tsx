import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import PravniTekst, { type Tocka } from "@/components/ui/PravniTekst";
import Dopuniti from "@/components/ui/Dopuniti";
import { contact, site, uredi } from "@/lib/site";
import { og } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Uvjeti korištenja",
  description:
    "Uvjeti korištenja web stranice Biz Up Team d.o.o. — što sadržaj stranice jest, a što nije, kako se koriste cijene i podaci o uređajima te na koga se obratiti.",
  alternates: { canonical: "/uvjeti-koristenja" },
  openGraph: og({
    title: "Uvjeti korištenja",
    description: "Uvjeti korištenja web stranice Biz Up Team d.o.o.",
    url: "/uvjeti-koristenja",
  }),
};

const AZURIRANO = "21. listopada 2026.";

const A =
  "underline underline-offset-4 transition-colors duration-300 hover:text-[var(--red-on-light)]";

const sjediste = uredi.find((u) => u.hq)!;

/* Ovo su uvjeti korištenja STRANICE. Opći uvjeti poslovanja — za najam,
   kupnju i servis — poseban su dokument i nisu ovdje; točka 02 to i kaže
   naglas, jer bi suprotno moglo navesti nekoga da misli da je ugovor već
   sklopljen klikom. */

const tocke: Tocka[] = [
  {
    id: "opcenito",
    n: "01",
    naslov: "Tko upravlja ovom stranicom",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Ovom stranicom upravlja <strong>{site.legalName}</strong>, {sjediste.street},{" "}
          {sjediste.cityLine}, OIB <Dopuniti>upisati OIB</Dopuniti>.
        </p>
        <p className="t-body mt-4">
          Korištenjem stranice prihvaćate ove uvjete. Ako se s njima ne slažete,
          molimo vas da stranicu ne koristite.
        </p>
        <p className="t-body mt-4">
          Za sva pitanja javite se na{" "}
          <a href={contact.emailHref} className={A}>
            {contact.email}
          </a>{" "}
          ili na {contact.phone}.
        </p>
      </>
    ),
  },
  {
    id: "svrha",
    n: "02",
    naslov: "Što ova stranica jest, a što nije",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Stranica je <strong>informativna</strong>. Predstavlja usluge koje
          nudimo poslovnim korisnicima i omogućuje vam da nas kontaktirate. Na
          njoj se ne može ništa kupiti, naručiti ni ugovoriti — nema košarice,
          nema plaćanja i nema sklapanja ugovora na daljinu.
        </p>
        <p className="t-body mt-4">
          Sadržaj stranice <strong>nije obvezujuća ponuda</strong> u smislu
          Zakona o obveznim odnosima, nego poziv da nam se javite. Ugovorni
          odnos nastaje tek pisanom ponudom i njezinim prihvatom, a prava i
          obveze iz najma, kupnje i servisa uređuju se posebnim ugovorom i
          općim uvjetima poslovanja, koji nisu dio ove stranice.
        </p>
        <p className="t-body mt-4">
          Slanjem obrasca ne preuzimate nikakvu obvezu, a ni mi — upit je upit.
        </p>
      </>
    ),
  },
  {
    id: "cijene",
    n: "03",
    naslov: "Cijene i podaci o uređajima",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Cijene paketa najma navedene na stranici su{" "}
          <strong>primjer unaprijed definiranih paketa</strong> i služe za
          usporedbu. Konačna cijena ovisi o broju uređaja, stvarnom opsegu
          ispisa i trajanju suradnje te se potvrđuje u pisanoj ponudi.
        </p>
        <p className="t-body mt-4">
          Navedene cijene su <Dopuniti>potvrditi: s PDV-om ili bez PDV-a</Dopuniti>.
        </p>
        <p className="t-body mt-4">
          Tehničke specifikacije uređaja preuzete su iz službene dokumentacije
          proizvođača. Proizvođač ih može promijeniti bez prethodne najave, pa
          prije narudžbe uvijek vrijedi podatak iz naše pisane ponude. Dostupnost
          pojedinog modela ovisi o stanju na tržištu.
        </p>
        <p className="t-body mt-4">
          Fotografije uređaja su ilustrativne. Isporučena oprema može se
          razlikovati po dodacima i konfiguraciji.
        </p>
      </>
    ),
  },
  {
    id: "vlasnistvo",
    n: "04",
    naslov: "Autorska prava i znakovi",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Tekstovi, raspored, grafika i programski kod ove stranice vlasništvo
          su {site.legalName} i zaštićeni su propisima o autorskom pravu.
          Možete ih slobodno čitati, ispisati i podijeliti poveznicu. Za
          preuzimanje, umnožavanje ili objavu sadržaja u komercijalne svrhe
          potrebno je naše pisano dopuštenje.
        </p>
        <p className="t-body mt-4">
          <strong>A1</strong> i <strong>Canon</strong> zaštitni su znakovi svojih
          vlasnika. Biz Up Team njihov je partner i koristi te znakove isključivo
          radi označavanja usluga i opreme koje posreduje. Ova stranica nije
          službena stranica A1-a ni Canona i oni ne odgovaraju za njezin sadržaj.
        </p>
      </>
    ),
  },
  {
    id: "poveznice",
    n: "05",
    naslov: "Poveznice na druge stranice",
    sadrzaj: (
      <p className="t-body mt-5">
        Na pojedinim mjestima upućujemo na stranice proizvođača, prije svega na
        službene tehničke specifikacije. Te stranice nisu pod našom kontrolom i
        ne odgovaramo za njihov sadržaj, dostupnost ni za način na koji one
        postupaju s vašim podacima. Otvaranjem takve poveznice napuštate ovu
        stranicu.
      </p>
    ),
  },
  {
    id: "odgovornost",
    n: "06",
    naslov: "Dostupnost i odgovornost",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Trudimo se da podaci na stranici budu točni i ažurni, ali ne jamčimo
          da su u svakom trenutku potpuni ni da stranica radi bez prekida.
          Održavanje, kvar na poslužitelju ili smetnja kod davatelja usluge mogu
          je privremeno učiniti nedostupnom.
        </p>
        <p className="t-body mt-4">
          Ne odgovaramo za štetu nastalu oslanjanjem na informativni sadržaj
          stranice bez prethodne pisane ponude s naše strane. Ovo ograničenje ne
          isključuje odgovornost koja se prema propisima ne može isključiti.
        </p>
      </>
    ),
  },
  {
    id: "podaci",
    n: "07",
    naslov: "Osobni podaci",
    sadrzaj: (
      <p className="t-body mt-5">
        Podatke koje pošaljete kroz kontakt obrazac koristimo isključivo za
        odgovor na vaš upit. Što se točno prikuplja, koliko se čuva, tko mu još
        ima pristup i koja su vaša prava — sve stoji u{" "}
        <Link href="/privatnost" className={A}>
          Izjavi o privatnosti
        </Link>
        . Ova stranica ne postavlja kolačiće i ne koristi analitiku.
      </p>
    ),
  },
  {
    id: "pravo",
    n: "08",
    naslov: "Mjerodavno pravo",
    sadrzaj: (
      <p className="t-body mt-5">
        Na ove uvjete i na korištenje stranice primjenjuje se pravo Republike
        Hrvatske. Sporove ćemo nastojati riješiti dogovorom, a ako to ne uspije,
        nadležan je stvarno nadležan sud u Republici Hrvatskoj.
      </p>
    ),
  },
  {
    id: "izmjene",
    n: "09",
    naslov: "Izmjene uvjeta",
    sadrzaj: (
      <p className="t-body mt-5">
        Uvjete možemo izmijeniti kada se promijeni sadržaj ili način rada
        stranice. Izmijenjena verzija vrijedi od objave na ovoj adresi, a datum
        zadnje izmjene stoji na vrhu stranice. Zadnja izmjena: {AZURIRANO}
      </p>
    ),
  },
];

export default function UvjetiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Uvjeti korištenja" }]}
        eyebrow={`Ažurirano ${AZURIRANO}`}
        title="Uvjeti korištenja"
        lead="Ova stranica predstavlja naše usluge i omogućuje vam da nas kontaktirate. Ništa se na njoj ne kupuje i ništa se klikom ne ugovara."
      />

      <PravniTekst tocke={tocke} />
    </>
  );
}
