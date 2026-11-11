import React, { useState, useMemo, useEffect } from 'react';
import { 
  UserPlus, Play, Flame, Zap, Sparkles, Skull, ArrowRight, X, Settings, 
  ChevronLeft, Dice5, Heart, Bomb, Ghost, Gamepad2, Dices, MessageCircleQuestion
} from 'lucide-react';

// ==========================================
// 1. BAZE PODATAKA (Proceduralni Generator)
// ==========================================

const VREMENA = ["10 sekundi", "15 sekundi", "30 sekundi", "45 sekundi", "1 minutu", "do kraja kruga"];

// --- ISTINA ILI IZAZOV DODACI (3000+ pitanja) ---
const DODACI_ISTINA = [
  "", " (Budi potpuno iskren/a).", " (Zna li {drugi_igrac} za to?)", " (Objasni detaljno, svi slušaju!).", 
  " (Slaže li se {drugi_igrac} s tvojim mišljenjem?)", " (Gledaj u oči onoga tko te pita dok odgovaraš).", 
  " (Imaš {vrijeme} za odgovor).", " (Jesi li to ikada ikome priznao/la?).", " (Zakuni se da govoriš istinu)."
];
const DODACI_IZAZOV = [
  "", " (Imaš {vrijeme}!).", " (Neka ti {drugi_igrac} pomaže ako zapneš).", " (Radi to dok stojiš na jednoj nozi).", 
  " (Gledajući u {drugi_igrac} cijelo vrijeme).", " (Zatvorenih očiju).", " (Smijući se kao manijak).", 
  " (Najbrže što možeš unutar {vrijeme}).", " (Dok {drugi_igrac} odlučuje kada je dosta)."
];

const BAZE_PITANJA = {
  Lagano: { Istina: ["Koja ti je najneugodnija navika?", "Koji ti je najdraži crtić iz djetinjstva?", "Što najviše voliš jesti u tajnosti?", "Koga bi odavde poveo/la na pusti otok?", "Tko je tvoja prva slavna simpatija?", "Čega se najviše bojiš, a totalno je glupo?", "Jesi li ikad lagao/la da izbjegneš druženje?", "Koji je najgori komad odjeće u tvom ormaru?", "Koliko najduže nisi prao/la zube?", "Koji ti je najsramotniji nadimak?", "Imaš li još uvijek plišanu igračku u krevetu?", "Jesi li ikada okrivio/la ljubimca za svoj prdež?", "Pjevaš li pod tušem i koju pjesmu?", "Da možeš zamijeniti život s {drugi_igrac}, bi li to napravio/la?", "Koji je tvoj najveći talent koji nitko ne zna?", "Koju čudnu kombinaciju hrane voliš?", "Jesi li ikada piškio/la u bazenu?", "Pričaš li u snu?", "Kome si poslao/la zadnju poruku?", "Gdje si najviše škakljiv/a?", "Vjeruješ li u duhove?", "Koju si najgoru ocjenu dobio/la u školi?", "Jesi li ikada ukrao/la nešto sitno?", "Tko u sobi izgleda najviše prijateljski?", "Koji ti je najgori rođendanski poklon koji si dobio/la?", "Jesi li ikada slagao/la {drugi_igrac} u vezi nečeg glupog?", "Što je najdjetinjastija stvar koju radiš?", "Voliš li miris benzina ili nečeg čudnog?"], Izazov: ["Oponašaj neku životinju po izboru grupe.", "Govori s čudnim naglaskom do sljedećeg kruga.", "Dopusti da ti {drugi_igrac} da novi nadimak.", "Napravi 10 sklekova dok pjevaš abecedu.", "Pokušaj polizati vlastiti lakat.", "Govori bez zatvaranja usta jedan cijeli krug.", "Ponašaj se kao majmun pred svima.", "Slovkaj svoje ime unatrag.", "Nosi {drugi_igrac} na leđima kroz sobu.", "Vikni prvu riječ koja ti padne na pamet.", "Balansiraj žlicu na nosu.", "Pleši robot ples.", "Hodaj unatrag svugdje gdje ideš do sljedećeg kruga.", "Zavrti se 10 puta i daj pet osobi {drugi_igrac}.", "Dopusti da ti {drugi_igrac} nacrta brkove.", "Zagrizi krišku limuna.", "Govori kao Yoda iz Ratova Zvijezda.", "Odigraj pantomimu u tišini.", "Zagrli zid s puno ljubavi.", "Zijevni najglasnije što možeš.", "Ponašaj se kao beba.", "Stavi čarape na ruke za jedan krug.", "Pokušaj žonglirati s 3 predmeta.", "Pjevaj sve što želiš reći.", "Zadrži dah koliko god možeš.", "Daj iskren kompliment za {drugi_igrac}.", "Pretvaraj se da si konobar.", "Daj svima u sobi 'peticu'."] },
  Vruće: { Istina: ["Tko je u ovoj sobi po tebi najzgodniji?", "Što te najviše uzbuđuje kod ljudi?", "Jesi li ikada imao/la simpatiju na osobu {drugi_igrac}?", "Koji je tvoj najromantičniji fantazi?", "Opiši svoj savršeni prvi spoj.", "Koji je najprivlačniji dio tijela?", "S kim si se najbolje poljubio/la?", "Jesi li se ikada izvukao/la iz problema flertovanjem?", "Koje je najluđe mjesto gdje si se s nekim ljubio/la?", "Preferiraš li spori ili agresivni poljubac?", "Što te najviše odbija u vezi?", "Koji je najseksi komad odjeće?", "Jesi li se ikada kupao/la gol/a?", "Vjeruješ li u ljubav na prvi pogled?", "Bi li izlazio/la s nekim tko je 10 godina stariji?", "Jesi li ikada vježbao/la flertovanje pred ogledalom?", "Što misliš o fizičkom izgledu osobe {drugi_igrac}?", "Jesi li ikada slao/la romantične poruke pijan/a?", "Što misliš tko se u ovoj sobi najbolje ljubi?", "Koji ti je 'guilty pleasure' u ljubavi?", "Jesi li ikada napisao/la tajno pismo?", "Koliko ti je važna predigra od 1 do 10?", "Jesi li ikada osjetio/la napetost s {drugi_igrac}?", "Koji je tvoj najuspješniji ulet?", "Bi li volio/la da te {drugi_igrac} odvede na spoj?", "Jesi li ikada flertovao/la na poslu/faksu?", "Koja tvoja fizička osobina privlači najviše pažnje?", "Voliš li kad partner preuzme inicijativu?"], Izazov: ["Poljubi u obraz osobu {drugi_igrac}.", "Masiraj ramena za {drugi_igrac}.", "Šapni nešto zavodljivo na uho osobi {drugi_igrac}.", "Dopusti da ti {drugi_igrac} nacrta srce na vratu.", "Oponašaj hod manekenke preko sobe.", "Pjevaj romantičnu serenadu za {drugi_igrac}.", "Drži se za ruke s osobom {drugi_igrac} jedan puni krug.", "Daj osobi {drugi_igrac} vrlo senzualan kompliment.", "Demonstriraj kako bi flertovao/la u klubu.", "Sjedi u krilu osobe {drugi_igrac}.", "Pošalji flertujuću poruku nasumičnom kontaktu.", "Namigni osobi {drugi_igrac} svaki put kad progovoriš.", "Pojedi komadić hrane koristeći usne s nečijeg dlana.", "Gledaj duboko u oči osobi {drugi_igrac} bez smijanja.", "Zapleši spori ples s osobom {drugi_igrac}.", "Prstom pređi preko linije čeljusti osobe {drugi_igrac}.", "Ostavi trag usana na obrazu osobe {drugi_igrac}.", "Igraj se s kosom osobe {drugi_igrac}.", "Govori strastvenim šapatom cijeli krug.", "Pošalji zračni poljubac svima.", "Nježno ugrizi vlastitu usnu gledajući u {drugi_igrac}.", "Pruži masažu ruku osobi {drugi_igrac}.", "Sjedni tako da ti se noge dodiruju s osobom {drugi_igrac}.", "Priznaj lažnu vječnu ljubav osobi {drugi_igrac}.", "Pomiriši vrat osobe {drugi_igrac}.", "Otpleši senzualni ples.", "Učini najzavodljiviji mogući pogled kameri.", "Stavi ruku na koljeno osobe {drugi_igrac} i drži je tamo."] },
  Teško: { Istina: ["Koju mračnu tajnu nitko ovdje ne zna?", "Koja je najveća laž koju si rekao/la roditeljima?", "Jesi li ikada išta ukrao/la i što?", "Za koga u sobi misliš da bi bio najgori partner?", "Koji je najgori trač koji si širio/la?", "Koja je tvoja najveća nesigurnost?", "Koga si zadnjeg 'stalkao/la' na mrežama?", "Koja je najokrutnija stvar koju si napravio/la?", "Koliko si najviše novca bacio/la na glupost?", "Jesi li ikada sabotirao/la tuđu vezu?", "Što je najsramotnije u tvojoj povijesti pretraživanja?", "Jesi li ikada čitao/la tuđe poruke?", "Jesi li ikada varao/la na ispitu ili u vezi?", "Koju užasnu naviku skrivaš od svih?", "S kim iz sobe bi najmanje volio/la ostati nasamo?", "Jesi li ikada izdao/la tajnu osobe {drugi_igrac}?", "Jesi li ikada bio/la 'druga osoba' u aferi?", "Koja je najgora uvreda koju si nekome rekao/la iza leđa?", "Jesi li ikada glupio/la da si bolestan/na da izbjegneš nekoga?", "Kome u sobi najviše zavidiš i zašto?", "Jesi li ikada upropastio/la iznenađenje iz zlobe?", "Koji ti je bio najgori susret s policijom?", "Jesi li ikada namjerno ignorirao/la prijatelja?", "Što misliš o životnim odlukama osobe {drugi_igrac}?", "Koje je tvoje najlicemjernije uvjerenje?", "Jesi li ikada povraćao/la pred svima?", "Koju si priliku uništio/la zbog vlastitog ega?", "Za što te ljudi krivo osuđuju, a u pravu su?"], Izazov: ["Dopusti grupi da pregleda tvoju galeriju slika.", "Nazovi nasumični kontakt i pričaj potpunu besmislicu.", "Daj {drugi_igrac} da pošalje poruku s tvog mobitela.", "Pojedi žlicu nečeg odvratnog po izboru grupe.", "Dopusti da ti {drugi_igrac} napiše riječ na čelo flomasterom.", "Zamiijeni jedan komad odjeće s osobom {drugi_igrac}.", "Pomiriši stopala osobe {drugi_igrac}.", "Objavi sramotnu sliku na svoj Story.", "Stoj u kutu okrenut prema zidu jedan krug.", "Drži 'plank' izdržaj punu minutu.", "Dopusti da ti {drugi_igrac} razbije jaje na glavu.", "Daj mobitel grupi da pročitaju tvoje zadnje poruke.", "Stavi kocku leda u hlače.", "Dopusti da ti nacrtaju spojene obrve.", "Zagrizi sirovi luk ili češnjak.", "Pročitaj naglas zadnju bilješku u mobitelu.", "Dopusti da ti iščupaju jednu dlaku.", "Nosi čarape na ušima do kraja igre.", "Popij čašu vode pune soli.", "Dopusti da te {drugi_igrac} škaklja dok ne kažeš stop.", "Pokaži svima najsramotniju aplikaciju na mobitelu.", "Nazovi bilo koju lokalnu dostavu i postavi glupo pitanje.", "Zadrži dah i neka te {drugi_igrac} drži za nos.", "Liži pod na jednu sekundu.", "Pojedi komad hrane s poda.", "Neka ti {drugi_igrac} odabere frizuru za ostatak večeri.", "Skini čarape zubima.", "Gledaj {drugi_igrac} u oči i reci im sve što ne voliš na njima."] },
  Ekstremno: { Istina: ["Koja je najmračnija misao koju si ikada imao/la?", "Da znaš da te neće uhvatiti, koji bi zločin počinio/la?", "Koja je najsramotnija stvar koju si napravio/la za novac?", "Koga u ovoj sobi potajno najmanje podnosiš?", "Koju si granicu prešao/la a duboko žališ?", "Koja je najmanipulativnija stvar koju si napravio/la?", "Da je smak svijeta, koga bi u sobi ostavio/la da umre?", "Koje tvoje uvjerenje bi uvrijedilo većinu ljudi?", "Jesi li ikada nekome namjerno pokušao/la uništiti život?", "Što bi bilo najteže objasniti u web-povijesti?", "Koju veliku laž trenutno živiš?", "Za što osuđuješ druge, a sam/a to potajno radiš?", "Koja je najbolnija stvar koju si ikada rekao/la roditeljima?", "Koju tajnu čuvaš koja bi ti mogla uništiti reputaciju?", "Tko je najveći 'lažnjak' ovdje?", "Jesi li ikada iskoristio/la nekoga tko te volio?", "Koja je najtoksičnija osobina koju donosiš u veze?", "Koliko si najbliže bio/la smrti?", "Jesi li ikada izbacio/la nekoga iz života bez razloga?", "Koja je najsebičnija misao koju si imao/la danas?", "Jesi li ikada povrijedio/la {drugi_igrac} iza leđa?", "Koju si najveću prevaru ikada izveo/la?", "Jesi li ikada ostao/la u vezi iz čiste koristi?", "Koja je najodvratnija stvar koju si napravio/la u privatnosti?", "Koga ovdje bi prvo prodao/la za novac?", "Što bi sakrio/la u sobi da sada upadne policija?", "Koje ti je najveće razočaranje u životu?", "Jesi li ikada lagao/la o nečemu ozbiljnom samo da ispadneš faca?"], Izazov: ["Pošalji glasovnu poruku šefu/profesoru s gluposti.", "Dopusti grupi da ti obrije ili depilira dio dlaka.", "Nazovi roditelje i reci im da si uhićen/a.", "Popij misteriozni napitak koji grupa smiješa.", "Dopusti da ti {drugi_igrac} crta po licu trajnim flomasterom.", "Obuci svu odjeću naopako i tako ostani.", "Dopusti da ti {drugi_igrac} ubaci led niz leđa ispod majice.", "Pošalji poruku bivšem/bivšoj: 'Jako mi nedostaješ'.", "Dopusti grupi da objavi što god želi na tvom profilu.", "Odi se tuširati u hladnoj vodi potpuno odjeven/a.", "Daj svima otključan mobitel na 3 minute.", "Dopusti da te zatvorenih očiju hrane čim god žele.", "Nazovi rodbinu i reci da se sutra udaješ/ženiš.", "Pojedi punu žlicu majoneze s ljutim umakom.", "Dopusti da ti {drugi_igrac} lupi jedan lagani šamar.", "Objavi video na kojem lažno plačeš na svoj Story.", "Stavi bosu nogu u WC školjku na 5 sekundi.", "Dopusti grupi da ti trajno izbriše aplikaciju.", "Izađi van i proderi svoju najdublju tajnu.", "Pojedi žlicu hrane za kućne ljubimce.", "Dopusti da ti {drugi_igrac} nacrta lažnu tetovažu na čelu.", "Liži đon tuđe cipele.", "Popij ostatak tekućine iz svih čaša na stolu.", "Dopusti da te {drugi_igrac} ugrize za ruku.", "Predaj kontrolu nad svojim TikTok/IG računom na 5 min.", "Nazovi pizzeriju i viči da ti je pizza uništila život.", "Skoči u kantu za smeće na 30 sek.", "Pojedi jaje sirovo."] },
  Pikantno: { Istina: ["Koja ti je najdraža romantična fantazija?", "Jesi li ikada razmišljao/la o odnosu s više osoba?", "Koje ti je najdraže mjesto za poljubac?", "Koji dio tijela na partneru te najviše uzbuđuje?", "Jesi li ikada vodio/la ljubav na javnom mjestu?", "Koje ti je omiljeno donje rublje?", "Jesi li ikada koristio/la igračke za odrasle?", "Koliko si najviše puta imao/la intimne odnose u danu?", "Koji ti je bio najneugodniji intimni trenutak?", "Jesi li ikada bio/la uhvaćen/a tijekom intimnosti?", "Bi li snimao/la privatni video s partnerom?", "Koja je tvoja definicija savršene predigre?", "Jesi li ikada imao/la avanturu za jednu noć?", "Voliš li dominirati ili biti dominiran/a?", "Koju neobičnu pozu bi volio/la isprobati?", "Što misliš o igranju uloga u krevetu?", "Jesi li ikada odglumio/la zadovoljstvo?", "Privlači li te netko ovdje na 'taj' način?", "Koja ti je najdraža 'prljava' psovka u krevetu?", "S kim bi u ovoj sobi imao/la tajnu aferu?", "Koja je najluđa stvar koju bi napravio/la u krevetu?", "Što misliš o otvorenim vezama?", "Jesi li ikada poljubio/la više od tri osobe na zabavi?", "Koji ti je najveći intimni turn-on kod {drugi_igrac}?", "Jesi li ikada maštao/la o osobi iz ove sobe?", "Jesi li ikada vezao/la nekoga u krevetu?", "Koja je tvoja najveća 'kink' tajna?", "Što je najperverznije što si gledao/la?"], Izazov: ["Daj senzualan lap-dance igraču {drugi_igrac}.", "Demonstriraj na jastuku svoju omiljenu tehniku ljubljenja.", "Masiraj bedra za {drugi_igrac}.", "Zaveži oči i prepoznaj {drugi_igrac} opipavanjem lica.", "Odglumi najglasniji 'lažni uzdah' zadovoljstva.", "Napravi lažni ljubavni ugriz na ruci od {drugi_igrac}.", "Dopusti da ti {drugi_igrac} prstom iscrta oblik na trbuhu.", "Šapni osobi {drugi_igrac} najprljaviju stvar koje se možeš sjetiti.", "Skini jedan komad odjeće senzualno.", "Stavi ruku na unutarnju stranu bedra osobe {drugi_igrac}.", "Zatvori oči i neka te poljube; pogodi je li to {drugi_igrac}.", "Lizni prst i pređi preko ključne kosti osobe {drugi_igrac}.", "Otpleši striptiz do majice.", "Dopusti da ti {drugi_igrac} nježno puhne u vrat i uho.", "Lezi na pod dok {drugi_igrac} stoji iznad tebe.", "Posluži se tijelom osobe {drugi_igrac} da pojedeš komad hrane.", "Učini osobi {drugi_igrac} zavodljiv pogled.", "Gricni uho osobi {drugi_igrac}.", "Ispričaj priču o najboljem intimnom iskustvu.", "Usporedi osobe u sobi s njihovom 'vibrom u krevetu'.", "Neka ti {drugi_igrac} odveže vezice zubima.", "Simuliraj strastveni poljubac sa dlanom.", "Priđi {drugi_igrac} i reci što bi mu radio/la (iz šale).", "Prođi prstima kroz kosu {drugi_igrac}.", "Gledaj {drugi_igrac} u oči i diši usklađeno s njim/njom.", "Dopusti da ti {drugi_igrac} otkopča gumb.", "Poliži usne polako gledajući u {drugi_igrac}.", "Stavi led u usta i poljubi {drugi_igrac} u vrat."] },
  Divlje: { Istina: ["Koja je najpijanija stvar koju si napravio/la?", "Jesi li ikada bio/la izbačen/a iz kluba?", "Koji ti je bio najgori mamurluk?", "Jesi li spavao/la na javnom mjestu nakon izlaska?", "Jesi li uništio/la tuđu imovinu pijan/a?", "Koji je tvoj najluđi party trik?", "Koliko dana zaredom si najviše partijao/la?", "Koje ti je najčudnije mjesto gdje si zaspao/la?", "Jesi li ikada bio/la s nekim koga si upoznao/la u klubu?", "Jesi li ušao/la nepozvan/a na tulum?", "Jesi li ikada plesao/la na stolu?", "Koja je najveća laž redaru u klubu?", "Jesi li ikada povraćao/la po autu?", "Jesi li ikada bježao/la od policije?", "Tko te vidio u najgorem pijanom stanju?", "Jesi li probao/la nešto nezakonito na zabavi?", "Jesi li pjevao/la karaoke očajno?", "Najgluplja ozljeda u izlasku?", "Jesi li ostao/la sam/a u gradu bez novca?", "Koji alkohol više ne piješ?", "Najgora priča s taksistom?", "Jesi li ukrao/la čašu iz kluba?", "S kim iz sobe bi otišao/la na pijanku u Vegas?", "Jesi se potukao/la u izlasku?", "Jesi li zvao/la bivše pijan/a?", "Najveći blackout (propust pamćenja)?", "Najviše novca spiskano u jednoj noći?", "Prevara zbog zabave na partiju?"], Izazov: ["Eksiraj punu čašu bilo kojeg pića.", "Otvori prozor i zavičaj se kao vuk.", "Napravi stoj na rukama uz zid.", "Popij tequilu suicide (ili odglumi vodu).", "Stavi led u usta i prebaci ga {drugi_igrac}.", "Zapleši najluđi ples na stolu.", "Neka te zavrte 20 puta i hodaj pravo.", "Pojedi žlicu najljućeg umaka.", "Snimi video 'worm' plesa i stavi na Story.", "Trči u krug vičući 'Ja sam avion!'.", "Pomiješaj 4 pića i popij.", "Stavi majicu na glavu kao ninđa.", "Udahni iz helij balona (ili odglumi) i repaj.", "Zazvoni susjedu i traži toalet papir.", "Razbij jaje o vlastito čelo.", "Neka te {drugi_igrac} gađa jastukom.", "Odgrmi najjači TARZAN urlik.", "Obuci čarape na ruke i jedi.", "Objavi status 'Trebam pomoć hitno'.", "Stavi led u hlače i pleši Macarenu.", "Neka ti {drugi_igrac} nacrta brkove.", "Popij vodu na glavi.", "Pokaži breakdance potez.", "Neka te {drugi_igrac} nosi po sobi.", "Glumi da si opsjednut/a demonom.", "Popij 2 čaše vode zaredom.", "Uklizaj na podu s nevidljivom gitarom.", "Zagrli drvo vičući hvala za kisik."] }
};

// --- UNO IZAZOVI DODACI (200+ kazni po kategoriji) ---
const UNO_DODACI = [
  " do kraja iduće runde.", " dok te pobjednik snima.", " sa zatvorenim očima.", 
  " dok pjevaš omiljenu pjesmu.", " dok svi ostali navijaju.", " dok gledaš pobjednika u oči.",
  " stojeći na jednoj nozi.", " (Imaš 30 sekundi za to!).", " jako glasno."
];

const UNO_BAZA = {
  Lagani: [
    "Složi i promiješaj karte umjesto svih", "Pojedi krišku limuna", "Učini pobjedniku uslugu po želji (donesi piće itd.)", 
    "Radi sklekove (10 komada)", "Otpjevaj dječju pjesmicu", "Ne smiješ pričati", "Govori sa stranim naglaskom",
    "Slovkaj ime pobjednika unatrag", "Napravi most ili stoj na rukama", "Popij čašu vode na eks",
    "Zagrli svaku osobu u prostoriji", "Pokaži svoj najbolji plesni pokret", "Pretvaraj se da si robot",
    "Daj kompliment svakom igraču", "Skakući na jednoj nozi krug oko stola", "Pokušaj polizati svoj lakat",
    "Stavi čarapu na ruku i koristi je kao lutku", "Pričaj kao Yoda iz Star Warsa", "Oponašaj slavnu osobu",
    "Broji unatrag od 50 do 1 što brže možeš", "Zijevaj lažno dok ne zaraziš nekoga", "Reci brzalicu 3 puta bez greške"
  ],
  Teži: [
    "Popij miks 3 tekućine sa stola (bez alkohola)", "Neka ti netko nacrta brkove markerom", "Drži plank izdržaj 1 minutu",
    "Objavi neugodnu sliku na Instagram/Snapchat story", "Nazovi random broj u imeniku i reci 'Znam tvoju tajnu'",
    "Pojedi žlicu senfa ili ljutog umaka", "Dopusti pobjedniku da ti pregleda zadnjih 5 poruka na WhatsAppu",
    "Zaledi se na mjestu i ne miči se dok pobjednik ne kaže", "Snimi se kako pjevaš operu i pošalji prijatelju",
    "Neka ti pobjednik uredi kosu i tako ostani", "Pojedi komadić sirovog luka", "Daj nekome da ti namaže lice šlagom/kremom",
    "Drži kocku leda u dlanu dok se ne otopi", "Neka ti pobjednik pošalje poruku s tvog mobitela", "Plesi bez glazbe minutu",
    "Razbij jaje (ili balon s vodom) o svoju glavu", "Hodaj unazad do kraja igre", "Pojedi komad hrane s poda (pravilo 5 sek)",
    "Nosi odjeću naopako ostatak večeri", "Neka ti pobjednik zalijepi komad selotejpa na lice"
  ],
  Hot: [
    "Izmasiraj ramena pobjedniku", "Poljubi u obraz osobu s tvoje lijeve strane", "Daj lap-dance igraču po izboru grupe",
    "Šapni prljavu tajnu osobi desno od sebe", "Poljubi pobjednika u ruku i pokloni se", "Neka te netko hrani voćem (ili grickalicom)",
    "Napravi lažni uzdah zadovoljstva", "Prstom pređi preko linije čeljusti pobjedniku", "Sjedi pobjedniku u krilo iduću rundu",
    "Pošalji flert poruku na random broj", "Ostavi trag usana na nečijem obrazu", "Otpleši senzualni ples za grupu",
    "Skini jedan komad odjeće (ne donje rublje)", "Neka ti netko stavi kocku leda niz leđa", "Poliži usne dok gledaš u pobjednika",
    "Gricni pobjednika za uho (jako nježno)", "Dopusti da ti pobjednik otkopča jedan gumb", "Pokaži svoju najbolju tehniku flertovanja"
  ],
  Wild: [
    "Popij cijelu čašu pića po izboru pobjednika", "Neka te pobjednik ošamari (lagano!)", "Poliži đon cipele pobjednika",
    "Odi van i vrisni iz petnih žila", "Objavi na story: 'Posrao sam se u gaće.'", "Popij ostatke iz svih tuđih čaša (miks)",
    "Dopusti pobjedniku da ti izbriše jednu aplikaciju s mobitela", "Pošalji poruku bivšem/bivšoj 'Još te volim'",
    "Nazovi roditelje i reci da si razbio auto (ili zatrudnio/la)", "Pojedi žlicu hrane za ljubimce (ili nešto jako bljutavo)",
    "Stavi led u hlače dok se ne otopi", "Dopusti grupi da ti odreže maleni pramen kose", "Uklizaj po podu na trbuhu",
    "Pretvaraj se da si demon iz egzorcista minutu", "Zali se čašom vode po glavi", "Daj otključan mobitel pobjedniku na 3 minute",
    "Uvuci glavu u kantu za smeće", "Popij vodu iz cipele (ili odglumi)"
  ]
};

// --- BACI KOCKICE BAZA ---
const DICE_BAZA = {
  Lagano: {
    radnje: ["Poljubi", "Zagrli", "Masiraj", "Pomiriši", "Dodirni prstom", "Puhni u", "Pomiluj", "Nasloni glavu na", "Štipni (lagano)", "Šapni u"],
    tijelo: ["Rame", "Čelo", "Ruka", "Kosa", "Leđa", "Koljeno", "Dlan", "Lakat", "Obraz", "Zapešće"]
  },
  Teško: {
    radnje: ["Ugrizi", "Poliži", "Snažno uštipni", "Prisloni usne na", "Poškakljaj", "Ostavi trag usana na", "Udari (jako lagano)", "Ljubi 10 sekundi", "Ogrebi"],
    tijelo: ["Vrat", "Stomak", "Bedro", "Uho", "Stopalo", "Ključna kost", "List na nozi", "Gornji dio leđa", "Trbuh", "Bok"]
  },
  Wild: {
    radnje: ["Ugrizi i ne puštaj", "Kapni piće na pa poliži", "Protrljaj led o", "Ljubi strastveno", "Posiši (nježno)", "Zavezanih očiju poliži", "Zalij vodom i poliži"],
    tijelo: ["Unutarnja strana bedra", "Usne", "Grudi (preko majice)", "Struk", "Stražnjica", "Donji dio leđa", "Bedro", "Ispod majice"]
  },
  Extreme: {
    radnje: ["Senzualno posiši", "Ogrebi i poliži", "Trljaj nosom o", "Ljubi vrat i", "Stisni usnama", "Liži 30 sekundi", "Kapni vosak (ili led) na"],
    tijelo: ["Golo bedro", "Goli stomak", "Vrat (ispod kose)", "Usne (duboko)", "Bilo gdje po izboru partnera", "Unutarnje bedro", "Između grudi", "Zabranjeno mjesto"]
  }
};

const STILOVI = {
  Lagano: { boje: 'from-cyan-500 to-blue-600', text: 'text-cyan-400', border: 'border-cyan-500', sjena: 'shadow-cyan-500/50', sjaj: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' },
  Lagani: { boje: 'from-cyan-500 to-blue-600', text: 'text-cyan-400', border: 'border-cyan-500', sjena: 'shadow-cyan-500/50', sjaj: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' },
  Vruće: { boje: 'from-orange-500 to-amber-600', text: 'text-orange-400', border: 'border-orange-500', sjena: 'shadow-orange-500/50', sjaj: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' },
  Hot: { boje: 'from-orange-500 to-amber-600', text: 'text-orange-400', border: 'border-orange-500', sjena: 'shadow-orange-500/50', sjaj: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' },
  Teško: { boje: 'from-red-600 to-rose-700', text: 'text-red-500', border: 'border-red-600', sjena: 'shadow-red-600/60', sjaj: 'drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]' },
  Teži: { boje: 'from-red-600 to-rose-700', text: 'text-red-500', border: 'border-red-600', sjena: 'shadow-red-600/60', sjaj: 'drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]' },
  Ekstremno: { boje: 'from-purple-600 to-violet-800', text: 'text-purple-400', border: 'border-purple-600', sjena: 'shadow-purple-600/60', sjaj: 'drop-shadow-[0_0_10px_rgba(147,51,234,0.9)]' },
  Extreme: { boje: 'from-purple-600 to-violet-800', text: 'text-purple-400', border: 'border-purple-600', sjena: 'shadow-purple-600/60', sjaj: 'drop-shadow-[0_0_10px_rgba(147,51,234,0.9)]' },
  Pikantno: { boje: 'from-pink-500 to-fuchsia-600', text: 'text-pink-400', border: 'border-pink-500', sjena: 'shadow-pink-500/50', sjaj: 'drop-shadow-[0_0_10px_rgba(236,72,153,0.9)]' },
  Divlje: { boje: 'from-green-500 to-emerald-600', text: 'text-green-400', border: 'border-green-500', sjena: 'shadow-green-500/50', sjaj: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]' },
  Wild: { boje: 'from-green-500 to-emerald-600', text: 'text-green-400', border: 'border-green-500', sjena: 'shadow-green-500/50', sjaj: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]' },
};

// ==========================================
// GLAVNA APLIKACIJA I NAVIGACIJA
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('tod'); // 'tod', 'uno', 'dice'

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col relative selection:bg-pink-500 selection:text-white pb-20">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-1000">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse bg-pink-600`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse bg-cyan-600`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-md w-full mx-auto p-4 pt-8 h-full">
        {activeTab === 'tod' && <TabTruthOrDare />}
        {activeTab === 'uno' && <TabUno />}
        {activeTab === 'dice' && <TabDice />}
      </div>

      {/* BOTTOM NAVIGATION (FIXED) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-t border-gray-800">
        <div className="max-w-md mx-auto flex justify-around items-center p-3">
          
          <button onClick={() => setActiveTab('tod')} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'tod' ? 'text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] bg-pink-500/10' : 'text-gray-500 hover:text-gray-300'}`}>
            <MessageCircleQuestion size={24} />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Istina/Izazov</span>
          </button>
          
          <button onClick={() => setActiveTab('uno')} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'uno' ? 'text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-500/10' : 'text-gray-500 hover:text-gray-300'}`}>
            <Gamepad2 size={24} />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Uno Izazovi</span>
          </button>
          
          <button onClick={() => setActiveTab('dice')} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'dice' ? 'text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-cyan-400/10' : 'text-gray-500 hover:text-gray-300'}`}>
            <Dices size={24} />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Kockice</span>
          </button>

        </div>
      </div>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slide-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { 0% { opacity: 0; transform: scale(0.90); } 100% { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(236,72,153,0.6); }
      `}} />
    </div>
  );
}


// ==========================================
// TAB 1: ISTINA ILI IZAZOV (Originalna igra)
// ==========================================
function TabTruthOrDare() {
  const [faza, setFaza] = useState('setup');
  const [igraci, setIgraci] = useState([]);
  const [novoIme, setNovoIme] = useState('');
  const [razina, setRazina] = useState(null);
  const [trenutniIgracIndex, setTrenutniIgracIndex] = useState(0);
  const [trenutnoPitanje, setTrenutnoPitanje] = useState(null);
  const [tipPitanja, setTipPitanja] = useState(null);

  const generiranaBaza = useMemo(() => {
    const db = {};
    Object.keys(BAZE_PITANJA).forEach(r => {
      db[r] = { Istina: [], Izazov: [] };
      let svaIstina = [];
      BAZE_PITANJA[r].Istina.forEach(baza => DODACI_ISTINA.forEach(dodatak => svaIstina.push(baza + dodatak)));
      db[r].Istina = svaIstina.sort(() => Math.random() - 0.5).slice(0, 250);

      let savIzazov = [];
      BAZE_PITANJA[r].Izazov.forEach(baza => DODACI_IZAZOV.forEach(dodatak => savIzazov.push(baza + dodatak)));
      db[r].Izazov = savIzazov.sort(() => Math.random() - 0.5).slice(0, 250);
    });
    return db;
  }, []);

  const [iskoristenaPitanja, setIskoristenaPitanja] = useState({
    Lagano: { Istina: [], Izazov: [] }, Vruće: { Istina: [], Izazov: [] }, Teško: { Istina: [], Izazov: [] },
    Ekstremno: { Istina: [], Izazov: [] }, Pikantno: { Istina: [], Izazov: [] }, Divlje: { Istina: [], Izazov: [] }
  });

  const dodajIgraca = (e) => { e.preventDefault(); if (novoIme.trim() && !igraci.includes(novoIme.trim())) { setIgraci([...igraci, novoIme.trim()]); setNovoIme(''); } };
  const ukloniIgraca = (ime) => setIgraci(igraci.filter(p => p !== ime));
  const zapocniIgru = () => { if (igraci.length >= 2) setFaza('level_select'); };
  const odaberiRazinu = (lvl) => { setRazina(lvl); setFaza('playing'); setTrenutnoPitanje(null); setTipPitanja(null); };
  
  const popuniVarijable = (tekst) => {
    let t = tekst;
    if (t.includes('{drugi_igrac}')) {
      const ostali = igraci.filter((_, i) => i !== trenutniIgracIndex);
      t = t.replace(/\{drugi_igrac\}/g, (ostali[Math.floor(Math.random() * ostali.length)] || 'Netko').toUpperCase());
    }
    if (t.includes('{vrijeme}')) t = t.replace(/\{vrijeme\}/g, VREMENA[Math.floor(Math.random() * VREMENA.length)]);
    return t;
  };

  const dohvatiPitanje = (tip) => {
    const lista = generiranaBaza[razina][tip];
    let iskoristeno = iskoristenaPitanja[razina][tip];
    if (iskoristeno.length >= lista.length) { iskoristeno = []; setIskoristenaPitanja(p => ({ ...p, [razina]: { ...p[razina], [tip]: [] } })); }
    const dostupni = lista.map((_, i) => i).filter(i => !iskoristeno.includes(i));
    const odabrani = dostupni[Math.floor(Math.random() * dostupni.length)];
    setIskoristenaPitanja(p => ({ ...p, [razina]: { ...p[razina], [tip]: [...iskoristeno, odabrani] } }));
    setTipPitanja(tip);
    setTrenutnoPitanje(popuniVarijable(lista[odabrani]));
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full animate-fade-in">
      <header className="text-center mb-6 flex-shrink-0 animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${razina ? STILOVI[razina].boje : 'from-pink-500 to-purple-500'} drop-shadow-[0_0_10px_currentColor] transition-all`}>Istina</span>
          <span className="text-white mx-2 font-light text-2xl">ILI</span>
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${razina ? STILOVI[razina].boje : 'from-cyan-400 to-blue-500'} drop-shadow-[0_0_10px_currentColor] transition-all`}>Izazov</span>
        </h1>
        <div className="text-gray-500 text-xs tracking-[0.2em] font-bold">KLASIČNA VERZIJA</div>
      </header>

      {faza === 'setup' && (
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-2xl flex-1 flex flex-col mb-4">
          <h2 className="text-xl font-bold mb-4 text-gray-300 flex items-center"><UserPlus className="mr-2 text-pink-500" size={20} />Tko igra?</h2>
          <form onSubmit={dodajIgraca} className="flex gap-2 mb-6">
            <input type="text" value={novoIme} onChange={(e) => setNovoIme(e.target.value)} placeholder="Unesi ime..." className="flex-1 bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 font-bold" maxLength={15} />
            <button type="submit" disabled={!novoIme.trim()} className="bg-pink-600 hover:bg-pink-500 text-white rounded-xl px-4 py-3 font-black uppercase transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)] disabled:opacity-50">Dodaj</button>
          </form>
          <div className="flex-1 overflow-y-auto mb-6 space-y-2 custom-scrollbar">
            {igraci.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm italic"><UserPlus size={40} className="mb-2 opacity-20" />Minimalno 2 igrača</div> : 
             igraci.map((igrac, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 animate-slide-in">
                <span className="font-black text-lg text-white uppercase tracking-wider">{igrac}</span>
                <button onClick={() => ukloniIgraca(igrac)} className="text-gray-500 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
              </div>
            ))}
          </div>
          <button onClick={zapocniIgru} disabled={igraci.length < 2} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl py-4 font-black text-xl uppercase tracking-widest shadow-[0_0_20px_rgba(219,39,119,0.5)] hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center">Kreni <Play className="ml-2" size={20} /></button>
        </div>
      )}

      {faza === 'level_select' && (
        <div className="flex-1 flex flex-col animate-fade-in mb-4">
          <button onClick={() => setFaza('setup')} className="text-gray-400 hover:text-white mb-4 flex items-center transition-colors w-max text-sm uppercase tracking-wider font-bold"><ChevronLeft size={20} className="mr-1" /> Igrači</button>
          <div className="grid grid-cols-1 gap-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
            {[
              { ime: 'Lagano', ikona: Sparkles, opis: 'Zabavno i opušteno. Ledolomac.', bg: 'from-cyan-500 to-blue-600', glow: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]' },
              { ime: 'Vruće', ikona: Flame, opis: 'Flert i romantična napetost.', bg: 'from-orange-500 to-amber-600', glow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]' },
              { ime: 'Teško', ikona: Zap, opis: 'Sramotno, oštro i neugodno.', bg: 'from-red-600 to-rose-700', glow: 'hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]' },
              { ime: 'Ekstremno', ikona: Ghost, opis: 'Mračni demoni. Bez cenzure.', bg: 'from-purple-600 to-violet-800', glow: 'hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]' },
              { ime: 'Pikantno', ikona: Heart, opis: 'Senzualno, intimno i jako sočno.', bg: 'from-pink-500 to-fuchsia-600', glow: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]' },
              { ime: 'Divlje', ikona: Bomb, opis: 'Ludi party zadaci. Kaos.', bg: 'from-green-500 to-emerald-600', glow: 'hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]' },
            ].map(lvl => (
              <button key={lvl.ime} onClick={() => odaberiRazinu(lvl.ime)} className={`group overflow-hidden rounded-2xl p-[2px] bg-gradient-to-r ${lvl.bg} ${lvl.glow} transition-all duration-300 hover:scale-[1.02] active:scale-95`}>
                <div className="bg-gray-950 rounded-xl px-5 py-4 h-full w-full flex justify-between items-center group-hover:bg-opacity-80 transition-all">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${lvl.bg} mr-4 shadow-lg`}><lvl.ikona size={24} className="text-white drop-shadow-md" /></div>
                    <div className="text-left"><h3 className="text-xl font-black text-white uppercase tracking-wider">{lvl.ime}</h3><p className="text-xs text-gray-400 mt-1">{lvl.opis}</p></div>
                  </div>
                  <ArrowRight className="text-gray-500 group-hover:text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {faza === 'playing' && (
        <div className="flex-1 flex flex-col animate-fade-in relative mb-4">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setFaza('level_select')} className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white bg-gray-900 px-4 py-2 rounded-full flex shadow-lg border border-gray-800"><Settings size={14} className="mr-2"/> {razina}</button>
            <button onClick={() => setFaza('setup')} className="text-xs uppercase tracking-widest font-bold text-red-400 hover:text-red-300 bg-red-950/30 px-4 py-2 rounded-full border border-red-900/50 shadow-lg">Završi</button>
          </div>
          <div className="text-center mb-6">
            <p className="text-gray-400 uppercase tracking-widest text-sm mb-2 font-bold">Na redu je</p>
            <div className="inline-block relative">
              <div className={`absolute -inset-1 bg-gradient-to-r ${STILOVI[razina].boje} rounded-full blur opacity-50 animate-pulse`}></div>
              <h2 className="relative text-3xl font-black bg-gray-950 rounded-full px-10 py-3 border border-gray-800 shadow-2xl uppercase tracking-widest">{igraci[trenutniIgracIndex]}</h2>
            </div>
          </div>
          <div className={`flex-1 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-md rounded-3xl border-2 ${STILOVI[razina].border} ${STILOVI[razina].sjena} p-6 relative overflow-hidden transition-all duration-500`}>
            {!trenutnoPitanje ? (
              <div className="w-full h-full flex flex-col gap-6 animate-zoom-in justify-center">
                <button onClick={() => dohvatiPitanje('Istina')} className="relative group bg-gray-900 border-2 border-pink-500 rounded-2xl flex-1 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all">
                  <span className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">ISTINA</span>
                </button>
                <div className="flex items-center justify-center -my-6 relative z-10 pointer-events-none"><span className="bg-gray-950 border-2 border-gray-800 text-gray-400 rounded-full px-4 py-2 text-sm font-black shadow-2xl">ILI</span></div>
                <button onClick={() => dohvatiPitanje('Izazov')} className={`relative group bg-gray-900 border-2 ${STILOVI[razina].border} rounded-2xl flex-1 flex flex-col items-center justify-center shadow-[0_0_15px_currentColor] hover:-translate-y-1 transition-all`}>
                  <span className={`text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br ${STILOVI[razina].boje} ${STILOVI[razina].sjaj}`}>IZAZOV</span>
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col h-full animate-fade-in text-center justify-between py-4">
                <div className="flex-1 flex flex-col items-center justify-center mt-2">
                  <h3 className={`text-2xl font-black uppercase tracking-[0.3em] mb-8 ${tipPitanja === 'Istina' ? 'text-pink-500' : STILOVI[razina].text}`}>{tipPitanja}</h3>
                  <div className="relative w-full px-2">
                    <p className={`text-2xl font-bold leading-tight relative z-10 ${tipPitanja === 'Istina' ? 'text-pink-100' : 'text-white'} drop-shadow-md`}>"{trenutnoPitanje}"</p>
                  </div>
                </div>
                <button onClick={() => { setTrenutnoPitanje(null); setTrenutniIgracIndex((p) => (p + 1) % igraci.length); }} className="mt-8 w-full bg-white text-black font-black uppercase tracking-[0.2em] text-lg rounded-2xl py-5 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-gray-200 transition-all flex items-center justify-center">Dalje <ArrowRight className="ml-2" /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// TAB 2: UNO IZAZOVI (Kazne za gubitnika)
// ==========================================
function TabUno() {
  const [unoRazina, setUnoRazina] = useState(null);
  const [trenutniKazna, setTrenutnaKazna] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generirajUno = () => {
    setIsGenerating(true);
    setTrenutnaKazna(null);
    
    setTimeout(() => {
      const baza = UNO_BAZA[unoRazina];
      const nasumicniBaza = baza[Math.floor(Math.random() * baza.length)];
      const nasumicniDodatak = UNO_DODACI[Math.floor(Math.random() * UNO_DODACI.length)];
      setTrenutnaKazna(nasumicniBaza + nasumicniDodatak);
      setIsGenerating(false);
    }, 600); // Fake delay za vizualni efekt
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full animate-fade-in mb-4">
      <header className="text-center mb-6 flex-shrink-0 animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">UNO</span>
          <span className="text-white mx-2 font-light text-2xl">KAZNE</span>
        </h1>
        <div className="text-gray-500 text-xs tracking-[0.2em] font-bold">ZA ONOG TKO IZGUBI PARTIJU</div>
      </header>

      {!unoRazina ? (
        <div className="flex-1 flex flex-col gap-4 animate-fade-in custom-scrollbar overflow-y-auto">
          {['Lagani', 'Teži', 'Hot', 'Wild'].map(lvl => (
            <button key={lvl} onClick={() => setUnoRazina(lvl)} className={`group relative overflow-hidden rounded-2xl p-1 bg-gradient-to-r ${STILOVI[lvl].boje} ${STILOVI[lvl].sjaj} hover:scale-[1.02] active:scale-95 transition-all`}>
              <div className="bg-gray-950 rounded-xl px-5 py-6 flex flex-col items-center justify-center h-full">
                <Gamepad2 size={32} className={`mb-2 ${STILOVI[lvl].text}`} />
                <h3 className="text-2xl font-black text-white uppercase tracking-wider">{lvl}</h3>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in h-full">
          <div className="flex justify-start mb-6">
            <button onClick={() => { setUnoRazina(null); setTrenutnaKazna(null); }} className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white bg-gray-900 px-4 py-2 rounded-full flex shadow-lg border border-gray-800"><ChevronLeft size={14} className="mr-2"/> Natrag</button>
          </div>
          
          <div className={`flex-1 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-md rounded-3xl border-2 ${STILOVI[unoRazina].border} ${STILOVI[unoRazina].sjena} p-6 relative overflow-hidden text-center`}>
            
            {isGenerating ? (
              <div className="animate-spin text-red-500"><Gamepad2 size={60} /></div>
            ) : !trenutniKazna ? (
              <div className="flex flex-col items-center gap-4">
                <Gamepad2 size={60} className={STILOVI[unoRazina].text} />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Gubitnik mora izvršiti kaznu</p>
                <button onClick={generirajUno} className={`mt-4 w-full bg-gradient-to-r ${STILOVI[unoRazina].boje} text-white font-black uppercase tracking-[0.2em] text-xl rounded-2xl py-6 px-8 shadow-[0_0_30px_currentColor] hover:scale-105 active:scale-95 transition-all`}>
                  POVUCI KAZNU
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col h-full justify-between animate-zoom-in py-4">
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-red-500 uppercase font-black tracking-widest mb-4 text-sm">UNO KAZNA ({unoRazina})</p>
                  <p className={`text-3xl font-bold leading-tight ${STILOVI[unoRazina].sjaj} text-white`}>"{trenutniKazna}"</p>
                </div>
                <button onClick={generirajUno} className="mt-8 bg-gray-800 text-white font-black uppercase tracking-widest text-sm rounded-xl py-4 hover:bg-gray-700 transition-all">Nova Kazna</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// TAB 3: BACI KOCKICE (Roll a dice)
// ==========================================
function TabDice() {
  const [diceRazina, setDiceRazina] = useState(null);
  const [die1, setDie1] = useState("?");
  const [die2, setDie2] = useState("?");
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    const radnje = DICE_BAZA[diceRazina].radnje;
    const tijelo = DICE_BAZA[diceRazina].tijelo;
    
    let rolls = 0;
    const interval = setInterval(() => {
      setDie1(radnje[Math.floor(Math.random() * radnje.length)]);
      setDie2(tijelo[Math.floor(Math.random() * tijelo.length)]);
      rolls++;
      if (rolls > 15) { // vrti brze izmjene 15 puta (oko 1 sekunda)
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 60);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full animate-fade-in mb-4">
      <header className="text-center mb-6 flex-shrink-0 animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">BACI</span>
          <span className="text-white mx-2 font-light text-2xl">KOCKICE</span>
        </h1>
        <div className="text-gray-500 text-xs tracking-[0.2em] font-bold">AKCIJA + DIO TIJELA</div>
      </header>

      {!diceRazina ? (
        <div className="grid grid-cols-2 gap-4 flex-1 animate-fade-in custom-scrollbar overflow-y-auto">
          {['Lagano', 'Teško', 'Wild', 'Extreme'].map(lvl => (
            <button key={lvl} onClick={() => { setDiceRazina(lvl); setDie1("?"); setDie2("?"); }} className={`group relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br ${STILOVI[lvl].boje} ${STILOVI[lvl].sjaj} hover:scale-[1.02] active:scale-95 transition-all`}>
              <div className="bg-gray-950 rounded-[22px] p-4 flex flex-col items-center justify-center h-full text-center aspect-square">
                <Dices size={40} className={`mb-3 ${STILOVI[lvl].text}`} />
                <h3 className="text-xl font-black text-white uppercase tracking-wider">{lvl}</h3>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in h-full">
          <div className="flex justify-start mb-4">
            <button onClick={() => setDiceRazina(null)} className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white bg-gray-900 px-4 py-2 rounded-full flex shadow-lg border border-gray-800"><ChevronLeft size={14} className="mr-2"/> Natrag</button>
          </div>
          
          <div className={`flex-1 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-md rounded-3xl border-2 ${STILOVI[diceRazina].border} ${STILOVI[diceRazina].sjena} p-4 relative overflow-hidden text-center gap-6`}>
            
            {/* Kockica 1 (Radnja) */}
            <div className={`w-full flex-1 bg-gray-900 border ${STILOVI[diceRazina].border} rounded-2xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden`}>
               <div className={`absolute top-2 left-2 text-[10px] uppercase font-bold text-gray-500`}>Kockica 1 (Radnja)</div>
               <span className={`text-3xl md:text-4xl font-black uppercase ${isRolling ? 'blur-[2px] scale-95' : 'scale-100'} transition-all text-white drop-shadow-md`}>
                 {die1}
               </span>
            </div>

            {/* Kockica 2 (Tijelo) */}
            <div className={`w-full flex-1 bg-gray-900 border ${STILOVI[diceRazina].border} rounded-2xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden`}>
               <div className={`absolute top-2 left-2 text-[10px] uppercase font-bold text-gray-500`}>Kockica 2 (Tijelo)</div>
               <span className={`text-3xl md:text-4xl font-black uppercase ${isRolling ? 'blur-[2px] scale-95' : 'scale-100'} transition-all ${STILOVI[diceRazina].text} ${STILOVI[diceRazina].sjaj}`}>
                 {die2}
               </span>
            </div>

            <button onClick={rollDice} disabled={isRolling} className={`w-full bg-gradient-to-r ${STILOVI[diceRazina].boje} text-white font-black uppercase tracking-[0.2em] text-xl rounded-2xl py-5 shadow-[0_0_30px_currentColor] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex justify-center items-center`}>
              <Dices className={`mr-2 ${isRolling ? 'animate-spin' : ''}`} /> ROLAJ KOCKICE
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}