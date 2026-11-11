import React, { useState } from 'react';
import { Heart, Flame, Zap, Eye, Dice5, Layers, ArrowLeft } from 'lucide-react';

const LEVELS = {
  soft: { id: 'soft', name: 'Soft', desc: 'Lagani izazovi za zagrijavanje.', style: 'neon-pink' },
  hot: { id: 'hot', name: 'Hot', desc: 'Stvari se zakuhavaju: zabava bez srama.', style: 'neon-orange' },
  hard: { id: 'hard', name: 'Hard', desc: 'Tenzija, želja i intenzitet.', style: 'neon-red' },
  extreme: { id: 'extreme', name: 'Extreme', desc: 'Nema tabua: čisto istraživanje.', style: 'neon-purple' }
};

/* --- BAZA PODATAKA (Povećana na 400+ pitanja) --- */
const db = {
  tod: {
    soft: {
      truths: [
        "Koja je bila tvoja prva misao kada si me prvi put vidio/la?",
        "Koji ti je naš najdraži zajednički trenutak do sada?",
        "Što najviše voliš na mom licu?",
        "Koja sitnica koju radim te uvijek iznova osvoji?",
        "Što si mislio/la o meni nakon našeg prvog spoja?",
        "Koji je najljepši kompliment koji si ikada dobio/la od mene?",
        "Što te kod mene najviše nasmijava?",
        "Da moraš opisati našu vezu u tri riječi, koje bi to bile?",
        "Postoji li neka pjesma koja te uvijek podsjeti na mene?",
        "Kada si prvi put shvatio/la da si zaljubljen/a u mene?",
        "Koji je tvoj najdraži nadimak koji ti govorim?",
        "Što najviše voliš raditi sa mnom kad nitko ne gleda?",
        "Koju bi moju naviku volio/la da nikada ne promijenim?",
        "Što je najslađa stvar koju sam ikada napravio/la za tebe?",
        "Kako bi izgledao tvoj savršeni dan proveden sa mnom?",
        "Koji moj odjevni predmet ti se najviše sviđa?",
        "Što te najviše privuklo meni na samom početku?",
        "Koja je tvoja najdraža uspomena s našeg prvog poljupca?",
        "Što misliš, u čemu smo najsličniji?",
        "Koji ti je bio najneugodniji trenutak pred mnom?"
      ],
      dares: [
        "Masiraj mi ramena i vrat točno dvije minute.",
        "Gledaj me ravno u oči punu minutu bez progovorene riječi.",
        "Daj mi najduži i najnježniji zagrljaj danas.",
        "Poljubi me u obraz i zadrži usne tamo 10 sekundi.",
        "Ispričaj mi svoju najdražu uspomenu na nas.",
        "Drži me za ruku dok traje sljedeća runda igre.",
        "Pohvali tri stvari na mom tijelu koje nisu seksualne.",
        "Nježno mi prolazi prstima kroz kosu jednu minutu.",
        "Daj mi 5 brzih poljubaca u različite dijelove lica.",
        "Pjevaj mi refren romantične pjesmu držeći me za ruku.",
        "Lezi mi u krilo i dopusti da te mazim po glavi 2 minute.",
        "Poljubi me u vrh nosa i reci mi zašto me voliš.",
        "Prekriži mi ruke preko leđa i snažno me zagrli 30 sekundi.",
        "Uzmite moj mobitel i promijeni mi pozadinu u našu sliku.",
        "Mazi mi ruku i podlakticu zatvorenih očiju 1 minutu.",
        "Pokušaj me nasmijati u manje od 30 sekundi bez dodira.",
        "Opisuj moj karakter u 5 pozitivnih riječi.",
        "Pleši sa mnom spori ples jednu minutu u tišini.",
        "Daj mi poljubac na svako mjesto na licu gdje imam madež ili pjegicu.",
        "Stavi moju ruku na svoje srce i gledaj me u oči 30 sekundi."
      ]
    },
    hot: {
      truths: [
        "Koji dio mog tijela te najviše uzbuđuje?",
        "Koji je tvoj najdraži način na koji te dodirujem?",
        "Kada si zadnji put sanjao/la nešto bezobrazno o nama?",
        "Koje donje rublje koje nosim ti je najdraže?",
        "Postoji li neko mjesto u javnosti gdje bi me volio/la poljubiti?",
        "Što najviše voliš kada ti šapnem na uho?",
        "Koji je tvoj najosjetljiviji dio tijela za koji mi nisi rekao/la?",
        "Koja je tvoja najdraža fantazija koju si imao/la o meni?",
        "Sjećaš li se što sam nosio/la kad smo prvi put vodili ljubav?",
        "Kada ti je bilo najteže skinuti ruke s mene u javnosti?",
        "Koji moj pogled ili izraz lica te odmah napali?",
        "Da možeš birati, gdje bi me prvo poljubio/la kad uđemo u sobu?",
        "Jesi li ikada potajno gledao/la moje tijelo dok sam se presvlačio/la?",
        "Što je najviše seksi što sam ikada rekao/la?",
        "Koji dio tvog tijela voliš da najviše diram tijekom predigre?",
        "Kada si zadnji put razmišljao/la o meni pod tušem?",
        "Što najviše voliš da radim s tvojom kosom dok se ljubimo?",
        "Da me možeš odmah skinuti, s kojim dijelom odjeće bi počeo/la?",
        "Koja je najluđa stvar koju si pomislio/la dok smo se strastveno ljubili?",
        "Kada si prvi put pomislio/la na to da želiš spavati sa mnom?"
      ],
      dares: [
        "Otkopčaj mi jedan komad odjeće koristeći samo jednu ruku.",
        "Strastveno me poljubi u vrat i ostavi mokar trag.",
        "Pleši mi u krilu punu minutu.",
        "Skini mi majicu bez upotrebe ruku.",
        "Liži mi vrat i ključnu kost 30 sekundi.",
        "Dodiruj mi bedra polako odozdo prema gore.",
        "Zaveži mi oči i poljubi me na tri različita mjesta na tijelu.",
        "Pošalji mi najprljaviju poruku koju možeš smisliti, upravo sada.",
        "Ugrizni me lagano za ušnu resicu i diši mi u uho.",
        "Poljubi me strastveno, s jezikom, točno 30 sekundi bez prestanka.",
        "Masiraj mi stražnjicu preko odjeće jednu minutu.",
        "Neka ti ruke lutaju mojim tijelom točno jednu minutu dok me gledaš u oči.",
        "Stavi ruku na moje međunožje (preko odjeće) i ostavi je tamo iduću rundu.",
        "Zadirkuj me poljupcima oko usana bez da me stvarno poljubiš na 30 sekundi.",
        "Skini jedan svoj komad odjeće na najzavodljiviji mogući način.",
        "Ljubi me po trbuhu krećući se prema dolje, ali zaustavi se točno iznad hlača.",
        "Trljaj se o mene dok oboje sjedimo ili stojimo 30 sekundi.",
        "Približi se mom licu, prođi jezikom po mojim usnama, i odmakni se.",
        "Zgrabi me za kosu (nježno ali čvrsto) i poljubi.",
        "Ostani samo u donjem rublju za sljedeće 3 runde igre."
      ]
    },
    hard: {
      truths: [
        "Koji je tvoj najveći seksualni fetiš o kojem nismo puno pričali?",
        "Što točno želiš da ti radim večeras u krevetu?",
        "Koja je poza u kojoj najviše uživaš sa mnom?",
        "Jesi li ikada razmišljao/la o tome da nas netko gleda dok vodimo ljubav?",
        "Koji je najuzbudljiviji san koji si imao/la o meni?",
        "Koji je tvoj najdraži trenutak iz našeg seksualnog života?",
        "Da možeš birati samo jednu pozu do kraja života, koja bi to bila?",
        "Što si oduvijek htio/la da probamo, a bojao/la si se pitati?",
        "Voliš li kad sam dominantan/na ili submisivan/na?",
        "Koliko ti je važna predigra u usporedbi sa samim činom?",
        "Koje mjesto na tvom tijelu odmah izaziva trnce kad ga dodirnem usnama?",
        "Jesi li ikada zamišljao/la da igramo uloge (roleplay) i koje?",
        "Da moraš ocijeniti naš seksualni život od 1 do 10, koliko bi mu dao/la i zašto?",
        "Koja je najluđa poza koju bi volio/la isprobati sa mnom?",
        "Voliš li kad pričam prljavo dok vodimo ljubav?",
        "Što misliš o korištenju seksualnih igračaka u krevetu?",
        "Kada si zadnji put masturbirao/la razmišljajući o našem zadnjem seksu?",
        "Da imamo cijelu noć na raspolaganju, koliko puta bi volio/la voditi ljubav?",
        "Što ti prolazi kroz glavu tik prije vrhunca?",
        "Jesi li ikada probao/la nešto novo sa mnom što ti se zapravo nije svidjelo, ali si prešutio/la?"
      ],
      dares: [
        "Skini sa mene sav donji veš koristeći samo zube.",
        "Zadovoljavaj me oralno točno jednu minutu, a onda iznenada prestani.",
        "Stavi mi ruke na leđa i ne daj mi da se mičem dok me ljubiš.",
        "Trljaj se o mene dok oboje imamo samo donje rublje.",
        "Napravi mi pravi, bezobrazni lap dance.",
        "Dodiruj se pred mnom jednu minutu dok te ja samo gledam.",
        "Ostavi mi hickey (šljivu) na skrivenom mjestu.",
        "Šapni mi na uho točno ono što želiš da ti napravim kada igra završi.",
        "Dopusti mi da ti skinem majicu i zavežem ti njome oči na 2 minute.",
        "Liži i ljubi mi unutarnju stranu bedara punu minutu.",
        "Spusti se dolje i istraži me usnama na 3 minute.",
        "Stavi moju ruku tamo gdje želiš da te dodirujem i pokaži mi točno kako.",
        "Zajaši me (preko odjeće) i simuliraj seks jednu minutu.",
        "Poliži mi prst s maksimalnim intenzitetom.",
        "Lezi na leđa, raširi noge i dopusti mi da te gledam 30 sekundi bez da me prekineš.",
        "Dodiruj me jezikom svugdje, osim po genitalijama, dvije minute.",
        "Neka ti moje tijelo bude 'tanjur' - stavi neku hranu/piće na mene i pojedi/popij.",
        "Gledaj me ravno u oči dok mi polako skidaš donje rublje.",
        "Ugrizni me čvrsto (ali bezbolno) za rame ili bedro.",
        "Stisni me uza zid i strastveno me ljubi kao da se nismo vidjeli godinama."
      ]
    },
    extreme: {
      truths: [
        "Koja je tvoja najekstremnija, najdublja fantazija o nama?",
        "S kime od naših poznanika bi bio/la spreman/na imati trojac?",
        "Jesi li ikada poželio/la da budem puno grublji/a prema tebi?",
        "Što misliš o vezivanju i potpunoj dominaciji u krevetu?",
        "Koja je najperverznija stvar koju si ikada zamislio/la da mi radiš?",
        "Jesi li ikada razmišljao/la o seksu na javnom mjestu gdje bi nas mogli uloviti?",
        "Postoji li neka igračka koju očajnički želiš kupiti za nas?",
        "Koja je najprljavija stvar koju si ikada pretraživao/la na internetu?",
        "Da možeš izabrati bilo koje mjesto na svijetu za divlji seks, gdje bi to bilo?",
        "Jesi li ikada maštao/la o tome da me dijeliš s nekim drugim?",
        "Što misliš o analnom seksu i bi li ikada probao/la (opet)?",
        "Jesi li ikada zamišljao/la da nas netko drugi snima dok vodimo ljubav?",
        "Koja je najekstremnija stvar na koju bi pristao/la u krevetu da te zamolim?",
        "Voliš li osjetiti blagu bol tijekom seksa (npr. grebanje, udarci)?",
        "Koja je tvoja tajna želja u vezi seksa u javnosti?",
        "Da te vežem i ostavim bespomoćnog/nu na krevetu, što bi volio/la da ti radim?",
        "Bi li pristao/la na seks sa strancem pod maskama da smo u swinger klubu?",
        "Koliko perverzno možeš postati kad si potpuno uzbuđen/a?",
        "Jesi li ikada maštao/la o tome da netko drugi upravlja tobom seksualno na cijeli dan?",
        "Koja je najprostija riječ koju želiš da ti vrištim u krevetu?"
      ],
      dares: [
        "Potpuno me skini i istraži svaki centimetar mog tijela usnama.",
        "Zaveži mi ruke za stolicu ili krevet i radi sa mnom što god želiš tri minute.",
        "Skini se potpuno gol/a i posluži mi piće.",
        "Zadovolji me usnama do kraja, bez obzira na to koliko traje.",
        "Dopusti mi da ti stavim povez na oči do kraja igre.",
        "Upotrijebi led na mom tijelu i prati ga toplim jezikom.",
        "Skini odjeću sa mene i koristi moje tijelo kao jastuk sljedećih 5 minuta.",
        "Pruži mi najbezobrazniji oralni seks koji si ikada izveo/la.",
        "Klekni ispred mene i zadovoljavaj me rukama dok me ne zamoliš da prestanem.",
        "Skini mi donje rublje i koristi ga kao povez za moje oči.",
        "Uzmimo neki alat iz kuće (kravata, remen) i iskoristimo ga za dominaciju 5 minuta.",
        "Mazi moje intimne dijelove koristeći isključivo svoja prsa/grudi.",
        "Odaberi jednu moju erogenu zonu i siši/grizi je dok ne ostane jasan trag.",
        "Simuliraj oralni seks na mom prstu dok me gledaš pravo u oči 2 minute.",
        "Neka ti ruke budu vezane iza leđa dok me moraš zadovoljiti usnama 3 minute.",
        "Stavi led u svoja usta i spusti se dolje na mene.",
        "Potpuno se skini i sjedi mi u krilu raširenih nogu do kraja ove igre.",
        "Napravi mi masažu cijelog tijela koristeći neko ulje (ili pljuvačku) dok smo oboje goli.",
        "Slijedi svaku moju naredbu, koliko god prljava bila, u idućih 5 minuta.",
        "Neka naša sljedeća aktivnost bude seks u pozi koju do sada nikad nismo probali."
      ]
    }
  },
  uno: {
    soft: [
      "Moraš mi napraviti masažu stopala.",
      "Otiđi po grickalice i donesi mi ih u krevet.",
      "Pjevaj mi romantičnu pjesmu 30 sekundi.",
      "Moraš mi dati 10 kratkih pusa po cijelom licu.",
      "Sljedeću partiju Unoa moraš igrati držeći me za ruku.",
      "Moraš mi pripremiti omiljeno piće i poslužiti mi ga.",
      "Daj mi pet komplimenata zaredom bez prestanka.",
      "Moraš me ljubiti u vrat dok dijeliš karte.",
      "Zaveži mi cipele (ili me izmasiraj po leđima ako smo bosi).",
      "Iduću partiju smiješ pričati samo šapćući."
    ],
    hot: [
      "Moraš skinuti jedan komad odjeće po mom izboru.",
      "Moraš mi dati strastveni francuski poljubac od 20 sekundi.",
      "Igraš sljedeću partiju sjedeći mi u krilu.",
      "Moraš mi masirati bedra dok ne počne nova partija.",
      "Do kraja večeri ne smiješ nositi donji dio odjeće (hlače/suknju).",
      "Pokaži mi svoju omiljenu seksi grimasu.",
      "Skini majicu i igraj iduću partiju u toplesu/bez majice.",
      "Poljubi mi svaki prst na rukama polako.",
      "Moraš mi šaptati prljave riječi na uho svakih 5 minuta.",
      "Pošalji mi svoju seksi sliku iz druge sobe odmah sada."
    ],
    hard: [
      "Moraš skinuti svu odjeću sa sebe osim donjeg rublja.",
      "Moraš mi pružiti oralno zadovoljstvo na 2 minute prije nove runde.",
      "Moraš mi napraviti lap dance na pjesmu koju ja odaberem.",
      "Sljedeću partiju moraš igrati potpuno u donjem rublju.",
      "Moraš mi ostaviti ljubavni ugriz na bedru.",
      "Dopusti mi da ti vežem ruke za iduću partiju Unoa.",
      "Moraš igrati Unoa klečeći ispred mene.",
      "Moraš mi skinuti donje rublje dok igramo.",
      "Dok vučeš karte, moraš me dodirivati ispod stola.",
      "Ja biram što radimo u krevetu večeras."
    ],
    extreme: [
      "Moraš se potpuno skinuti za sljedeću partiju.",
      "Pobjednik (ja) bira jednu seksualnu želju koju moraš ispuniti odmah.",
      "Moraš me usmeno zadovoljiti ispod stola dok traje iduća partija.",
      "Gubiš pravo glasa u krevetu večeras – ja odlučujem o svemu.",
      "Zaveži povez preko očiju i odigraj partiju na slijepo, uz moje kazne za krivi potez.",
      "Moraš simulirati seks sa mnom točno dvije minute prije nove igre.",
      "Kazna je 5 minuta divljeg, grubog seksa sada.",
      "Ja biram igračku kojom ću te mučiti sljedećih 10 minuta.",
      "Popij piće s mog golog tijela.",
      "Moraš prekinuti igru i odmah me odvesti u krevet."
    ]
  },
  nhie: {
    soft: [
      "Nikad nisam potajno mirisao/la tvoju odjeću jer mi fali tvoj miris.",
      "Nikad nisam buljio/la u tvoju sliku dulje od minute.",
      "Nikad nisam obukao/la nešto samo zato da bi me ti primijetio/la.",
      "Nikad nisam planirao/la naš vjenčani dan u glavi.",
      "Nikad nisam bio/la lagano ljubomoran/na na nekog tko je pričao s tobom.",
      "Nikad nisam namjerno odgodio/la odlazak kući samo da budem duže s tobom.",
      "Nikad nisam čitao/la naše stare poruke s osmijehom na licu.",
      "Nikad nisam uhvatio/la sebe kako razmišljam o tebi dok me netko drugi nešto pitao.",
      "Nikad nisam guglao/la poklon za tebe tjednima unaprijed.",
      "Nikad nisam zaspao/la držeći mobitel jer sam čekao/la tvoju poruku."
    ],
    hot: [
      "Nikad nisam zamišljao/la kako vodiš ljubav sa mnom dok smo bili u društvu.",
      "Nikad nisam zaboravio/la donje rublje namjerno samo da te napalim.",
      "Nikad nisam masturbirao/la razmišljajući o tebi.",
      "Nikad nisam potajno snimio/la tvoju fotku dok si se presvlačio/la.",
      "Nikad nisam bio/la napaljen/a na nekom potpuno neprikladnom mjestu.",
      "Nikad nisam poslao/la prljavu poruku dok si bio/la u istoj sobi.",
      "Nikad nisam zamišljao/la kako te strastveno ljubim u prepunom dizalu.",
      "Nikad nisam lagao/la da nisam umoran/na samo da bismo imali seks.",
      "Nikad nisam planirao/la seksi iznenađenje u spavaćoj sobi danima.",
      "Nikad nisam gledao/la tvoje usne cijelo vrijeme dok si pričao/la ozbiljnu temu."
    ],
    hard: [
      "Nikad nisam probao/la vlastiti okus nakon oralnog seksa.",
      "Nikad nisam zamišljao/la igranje uloga u kojem smo potpuni stranci.",
      "Nikad nisam gledao/la pornografiju odmah nakon što si otišao/la.",
      "Nikad nisam imao/la divlji seks u autu na javnom parkingu.",
      "Nikad nisam potajno razmišljao/la o korištenju lisica i užeta na tebi.",
      "Nikad nisam probao/la nešto novo u krevetu što mi se nije svidjelo, ali sam šutio/la.",
      "Nikad nisam zamišljao/la da nas netko gleda kroz prozor dok se seksamo.",
      "Nikad nisam predložio/la seks samo da prekinem svađu.",
      "Nikad nisam ostavio/la vrata otključana u nadi da će netko ući dok vodimo ljubav.",
      "Nikad nisam razmišljao/la o snimanju kućnog pornića."
    ],
    extreme: [
      "Nikad nisam imao/la seks na javnom mjestu gdje smo jedva izbjegli da nas uhvate.",
      "Nikad nisam ozbiljno maštao/la o trojcu s tobom i drugom djevojkom.",
      "Nikad nisam ozbiljno maštao/la o trojcu s tobom i drugim dečkom.",
      "Nikad nisam probao/la analni seks.",
      "Nikad nisam snimao/la vlastiti kućni pornić.",
      "Nikad nisam želio/la biti potpuno vezan/a i bespomoćan/na u krevetu.",
      "Nikad nisam uživao/la u blagoj boli (udaranje, grebanje) tijekom seksa.",
      "Nikad nisam zamišljao/la orgije ili swinger zabavu s tobom.",
      "Nikad nisam imao/la orgazam isključivo od gledanja tebe kako se zadovoljavaš.",
      "Nikad nisam dopustio/la potpunom strancu na internetu da mi kaže što da radim u krevetu."
    ]
  },
  wyr: {
    soft: [
      { a: "Dobivati poljupce za laku noć svaki dan", b: "Dobivati doručak u krevet svako jutro" },
      { a: "Imati zajednički filmski maraton cijeli vikend", b: "Ići na romantični izlet u planine" },
      { a: "Da uvijek spavamo zagrljeni", b: "Da se držimo za ruke gdje god idemo" },
      { a: "Da te ujutro budim nježnim dodirima", b: "Da te navečer uspavljujem masiranjem" },
      { a: "Dobiti slatku poruku svako jutro", b: "Dobiti dugi zagrljaj svaki put kad se vidimo" }
    ],
    hot: [
      { a: "Seksati se pod tušem", b: "Seksati se na stražnjem sjedalu auta" },
      { a: "Da ti šapćem prostote u kinu", b: "Da te strastveno ljubim pred svim prijateljima" },
      { a: "Dobivati prljave poruke na poslu", b: "Dobivati prljave slike na poslu" },
      { a: "Biti uhvaćen u javnosti u strastvenom poljupcu", b: "Da nitko ne zna što radimo ispod stola" },
      { a: "Imati seks na kuhinjskom pultu", b: "Imati seks na tepihu u dnevnoj sobi" }
    ],
    hard: [
      { a: "Biti vezan/a za krevet", b: "Da ti mene vežeš za krevet" },
      { a: "Imati seks pred velikim ogledalom", b: "Snimati seks kamerom" },
      { a: "Igrati ulogu profesora i studentice", b: "Igrati ulogu šefa i tajnice" },
      { a: "Da ti diktiram što ćeš obući", b: "Da ti diktiram koga smiješ gledati" },
      { a: "Da budem dominantan/na cijelu noć", b: "Da budem submisivan/na cijelu noć" }
    ],
    extreme: [
      { a: "Imati trojac s osobom po tvom izboru", b: "Imati trojac s osobom po mom izboru" },
      { a: "Seksati se u mračnom klubu", b: "Seksati se na plaži usred dana" },
      { a: "Da budem potpuno grub/a prema tebi", b: "Da ti preuzmeš apsolutnu kontrolu" },
      { a: "Analni seks", b: "Korištenje ogromnih igračaka" },
      { a: "Da te bičujem", b: "Da mi kapaš vreli vosak po tijelu" }
    ]
  },
  dice: {
    soft: { actions: ["Poljubi", "Nježno masiraj", "Pomiluj", "Puhni u", "Nasloni glavu na"], parts: ["moj vrat", "moj obraz", "moju ruku", "moju kosu", "moje rame"] },
    hot: { actions: ["Liži", "Lagano grickaj", "Strastveno poljubi", "Skini odjeću sa", "Čvrsto stisni"], parts: ["moje usne", "moj trbuh", "moj donji dio leđa", "moje bedro", "moja prsa"] },
    hard: { actions: ["Ugrizni", "Siši", "Ostavi trag (šljivu) na", "Pljesni", "Poliži usnama"], parts: ["moje unutarnje bedro", "moju stražnjicu", "moje međunožje", "moju ključnu kost", "moj vrat"] },
    extreme: { actions: ["Pruži oralno na", "Kapaj vrući vosak na", "Zadovolji", "Stavi led na", "Trljaj ulje o"], parts: ["moju najosjetljiviju zonu", "moju stražnjicu", "moje međunožje", "moje bradavice", "moj donji dio trbuha"] }
  }
};

const guessWords = {
  filmovi: ["Titanic", "Pedeset nijansi sive", "Gospodar prstenova", "Harry Potter", "Sam u kući", "Zgodna žena", "Američka pita", "Sumrak", "Brzi i žestoki", "Bilježnica", "Kum", "Matrix", "Joker", "Avatar", "Deadpool"],
  stvari: ["Lisice", "Krevet", "Mobitel", "Kondom", "Svijeća", "Bič", "Vibrator", "Donje rublje", "Posteljina", "Jastuk", "Ogledalo", "Kamera", "Štikle", "Ruž", "Vino"],
  radnje: ["Ljubljenje", "Vođenje ljubavi", "Tuširanje", "Kuhanje doručka", "Masaža", "Skidanje", "Spavanje", "Maženje", "Svađanje", "Plesanje", "Vezivanje", "Gledanje filma", "Plakanje", "Smijanje", "Trčanje"],
  dijeloviTijela: ["Vrat", "Usne", "Stražnjica", "Bedro", "Grudi", "Trbuh", "Kosa", "Leđa", "Uho", "Ruke", "Stopala", "Jezik", "Prsti", "Koljeno", "Struk"]
};

/* --- NOVE LOGIKE ZA RANDOM (BLOKADA PONAVLJANJA) --- */
const popRand = (arr) => {
  if (!arr || arr.length === 0) return "🔥 KRAJ! Sva pitanja su potrošena. Osvježi stranicu (F5) za ponovno učitavanje. 🔥";
  const index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1)[0]; // Ovo BRIŠE pitanje iz baze, ponavljanje je tehnički nemoguće!
};

// Kockice smiju imati ponavljanja da se mogu vrtjeti
const keepRand = (arr) => arr[Math.floor(Math.random() * arr.length)];


export default function App() {
  const [players, setPlayers] = useState({ p1: "", p2: "" });
  const [isSetup, setIsSetup] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  const getRandomPlayer = () => Math.random() > 0.5 ? players.p1 : players.p2;
  const getBothPlayers = () => {
    const active = getRandomPlayer();
    const other = active === players.p1 ? players.p2 : players.p1;
    return { active, other };
  };

  if (!isSetup) {
    return (
      <div className="app-container">
        <h1 className="title" style={{ fontSize: '2.5rem' }}>Tko večeras igra?</h1>
        <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Unesite svoja imena za osobnije iskustvo!</p>
        <input className="input-field" placeholder="Ime prvog igrača..." value={players.p1} onChange={(e) => setPlayers({...players, p1: e.target.value})} />
        <input className="input-field" placeholder="Ime drugog igrača..." value={players.p2} onChange={(e) => setPlayers({...players, p2: e.target.value})} />
        <button className="btn-main bg-truth" style={{ marginTop: '20px' }} onClick={() => { if(players.p1.trim() && players.p2.trim()) setIsSetup(true); }}>
          ZAPOČNI IGRU
        </button>
      </div>
    );
  }

  const LevelSelector = ({ onSelect }) => (
    <div className="app-container">
      <h2 className="subtitle" style={{ color: 'white' }}>Odaberi Razinu</h2>
      <div className="grid-menu">
        {Object.values(LEVELS).map((lvl) => (
          <button key={lvl.id} onClick={() => onSelect(lvl.id)} className={`card ${lvl.style}`}>
            <span className="card-title">{lvl.name}</span>
            <span className="card-desc">{lvl.desc}</span>
          </button>
        ))}
      </div>
      <button onClick={() => setActiveGame(null)} className="back-btn"><ArrowLeft size={20} /> Natrag na izbornik</button>
    </div>
  );

  const TodGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentText, setCurrentText] = useState("Odaberi Istinu ili Izazov!");
    const roll = (type) => {
      const p = getRandomPlayer();
      if (type === 'truth') {
        const text = popRand(db.tod[activeLevel].truths);
        setCurrentText(text.includes("KRAJ!") ? text : `${p}, reci istinu:\n\n${text}`);
      } else {
        const text = popRand(db.tod[activeLevel].dares);
        setCurrentText(text.includes("KRAJ!") ? text : `${p}, tvoj izazov:\n\n${text}`);
      }
    };
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#ec4899' }}>Istina ili Izazov</h2>
        <div className="game-box"><p style={{ whiteSpace: 'pre-line' }}>{currentText}</p></div>
        <div className="btn-row">
          <button onClick={() => roll('truth')} className="btn-half bg-truth">ISTINA</button>
          <button onClick={() => roll('dare')} className="btn-half bg-dare">IZAZOV</button>
        </div>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  const UnoGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentDare, setCurrentDare] = useState("Tko izgubi partiju Unoa, mora odraditi izazov!");
    const roll = () => {
      const text = popRand(db.uno[activeLevel]);
      setCurrentDare(text.includes("KRAJ!") ? text : `Kazna za gubitnika:\n\n${text}`);
    };
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#ea580c' }}>Uno Izazovi</h2>
        <div className="game-box" style={{ borderColor: '#ea580c' }}><p style={{ whiteSpace: 'pre-line' }}>{currentDare}</p></div>
        <button onClick={roll} className="btn-main bg-uno">GENERIRAJ KAZNU</button>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  const NhieGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentText, setCurrentText] = useState("Pritisni gumb za prvo pitanje!");
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#a855f7' }}>Nikad Nisam</h2>
        <div className="game-box" style={{ borderColor: '#a855f7' }}><p>{currentText}</p></div>
        <button onClick={() => setCurrentText(popRand(db.nhie[activeLevel]))} className="btn-main bg-nhie">SLJEDEĆE</button>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  const WyrGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [header, setHeader] = useState("");
    const [opts, setOpts] = useState({ a: "Opcija A", b: "Opcija B" });
    const generateWYR = () => {
      const item = popRand(db.wyr[activeLevel]);
      if (typeof item === 'string' && item.includes("KRAJ!")) {
        setHeader(""); setOpts({ a: item, b: item });
      } else {
        setHeader(`${getRandomPlayer()} bira:`); setOpts(item);
      }
    };
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#ec4899' }}>Što bi radije?</h2>
        {header && <p style={{ color: '#9ca3af', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.2rem' }}>{header}</p>}
        <div className="game-box" style={{ borderColor: '#3b82f6', marginBottom: '15px', minHeight: '130px' }}><p>{opts.a}</p></div>
        <div style={{ fontWeight: 'bold', color: '#9ca3af', marginBottom: '15px' }}>ILI</div>
        <div className="game-box" style={{ borderColor: '#ec4899', minHeight: '130px' }}><p>{opts.b}</p></div>
        <button onClick={generateWYR} className="btn-main bg-wyr">NOVA DILEMA</button>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  const GuessGame = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [word, setWord] = useState("");
    const [instruction, setInstruction] = useState("");

    if (!activeCategory) {
      return (
        <div className="app-container">
          <h2 className="subtitle" style={{ color: '#10b981' }}>Pogodi Riječ</h2>
          <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Jedan drži mobitel na čelu, drugi objašnjava!</p>
          <div className="grid-menu">
            {Object.keys(guessWords).map((cat) => (
              <button key={cat} onClick={() => { 
                setActiveCategory(cat); 
                const { active, other } = getBothPlayers();
                setInstruction(`${active} drži mobitel, a ${other} objašnjava!`);
                setWord("Spremni? Dodirni za početak!"); 
              }} className="card neon-emerald">
                <span className="card-title" style={{ color: '#10b981', textTransform: 'uppercase' }}>{cat}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setActiveGame(null)} className="back-btn"><ArrowLeft size={20} /> Natrag</button>
        </div>
      );
    }
    return (
      <div className="word-guess-screen" onClick={() => setWord(popRand(guessWords[activeCategory]))}>
        <p style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '10px' }}>Kategorija: {activeCategory}</p>
        <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>{instruction}</p>
        <h1 className="word-text">{word}</h1>
        <button onClick={(e) => { e.stopPropagation(); setActiveCategory(null); }} className="back-btn" style={{ position: 'absolute', bottom: '40px', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '30px' }}><ArrowLeft size={20}/> Promijeni kategoriju</button>
      </div>
    );
  };

  const DiceGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [dice, setDice] = useState({ action: "Zavrti", part: "Kockice!" });
    const rollDice = () => {
      let rollCount = 0;
      const interval = setInterval(() => {
        setDice({ 
          action: keepRand(db.dice[activeLevel].actions), 
          part: keepRand(db.dice[activeLevel].parts) 
        });
        rollCount++;
        if (rollCount > 10) clearInterval(interval);
      }, 50);
    };
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#eab308' }}>Kockice</h2>
        <div className="btn-row" style={{ marginBottom: '30px' }}>
          <div className="game-box" style={{ flex: 1, minHeight: '150px', marginBottom: 0, padding: '10px' }}><p>{dice.action}</p></div>
          <div className="game-box" style={{ flex: 1, minHeight: '150px', marginBottom: 0, padding: '10px' }}><p>{dice.part}</p></div>
        </div>
        <button onClick={rollDice} className="btn-main bg-dice" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Dice5 size={28} /> BACI KOCKICE
        </button>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  if (!activeGame) {
    return (
      <div className="app-container">
        <h1 className="title">Couples Party</h1>
        <div className="grid-menu">
          <button onClick={() => setActiveGame('tod')} className="card neon-pink"><Heart size={40} color="#ec4899" /><span className="card-title">Istina ili Izazov</span></button>
          <button onClick={() => setActiveGame('uno')} className="card neon-orange"><Layers size={40} color="#f97316" /><span className="card-title">Uno Izazovi</span></button>
          <button onClick={() => setActiveGame('nhie')} className="card neon-purple"><Flame size={40} color="#a855f7" /><span className="card-title">Nikad Nisam</span></button>
          <button onClick={() => setActiveGame('wyr')} className="card neon-blue"><Zap size={40} color="#3b82f6" /><span className="card-title">Što Bi Radije?</span></button>
          <button onClick={() => setActiveGame('guess')} className="card neon-emerald"><Eye size={40} color="#10b981" /><span className="card-title">Pogodi Riječ</span></button>
          <button onClick={() => setActiveGame('dice')} className="card neon-yellow"><Dice5 size={40} color="#eab308" /><span className="card-title">Baci Kockice</span></button>
        </div>
        <button onClick={() => setIsSetup(false)} className="back-btn" style={{ marginTop: '30px' }}>Promijeni igrače</button>
      </div>
    );
  }

  const renderGame = () => {
    switch (activeGame) {
      case 'tod': return <TodGame />;
      case 'uno': return <UnoGame />;
      case 'nhie': return <NhieGame />;
      case 'wyr': return <WyrGame />;
      case 'guess': return <GuessGame />;
      case 'dice': return <DiceGame />;
      default: return null;
    }
  };

  return <div style={{ width: '100%' }}>{renderGame()}</div>;
}