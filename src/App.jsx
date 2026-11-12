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
        "Koja sitnica te u toku dana najčešće podsjeti na mene?",
        "Da možemo sutra otputovati bilo gdje zajedno, kamo bismo išli?",
        "Koji moj fizički atribut si prvo primijetio/la kad smo se upoznali?",
        "Kada si se točno počeo/la zaljubljivati u mene?",
        "Koju moju manu zapravo smatraš jako simpatičnom?",
        "Koji naš dosadašnji spoj ti je ostao u najljepšem sjećanju?",
        "Da moraš izdvojiti jednu stvar kojom te uvijek smirim, koja bi to bila?",
        "Koju bi moju naviku volio/la da nikada ne promijenim?",
        "Što je najslađa stvar koju sam ikada napravio/la za tebe?",
        "Kako bi izgledao tvoj savršeni dan proveden sa mnom?",
        "Koji moj odjevni predmet najviše voliš vidjeti na meni?",
        "Koju si pjesmu slušao/la i pomislio/la na nas?",
        "Što najviše voliš raditi sa mnom kad nitko ne gleda?",
        "Koji je najljepši kompliment koji si dobio/la od mene?",
        "Što te kod mene najviše nasmijava?",
        "Koja je tvoja najdraža uspomena s našeg prvog poljupca?",
        "Što misliš, u čemu smo nas dvoje najsličniji?",
        "Koji ti je bio najneugodniji trenutak pred mnom na početku veze?",
        "Da možeš birati, kako bismo proslavili našu iduću godišnjicu?",
        "Što te najviše iznenadilo kod mene nakon što smo se bolje upoznali?",
        "Koji moj izraz lica ti je najdraži?",
        "Kada bi pisao/la knjigu o nama, kako bi se zvalo prvo poglavlje?",
        "Što si pomislio/la kad sam te prvi put uhvatio/la za ruku?",
        "Koja ti je moja poruka izmamila najveći osmijeh na lice?",
        "Zbog čega se uz mene osjećaš najsigurnije?"
      ],
      dares: [
        "Masiraj mi ramena i vrat točno dvije minute.",
        "Gledaj me ravno u oči punu minutu bez progovorene riječi.",
        "Daj mi najduži i najnježniji zagrljaj danas.",
        "Poljubi me u obraz i zadrži usne tamo 10 sekundi.",
        "Ispričaj mi svoju najdražu uspomenu na nas zatvorenih očiju.",
        "Drži me za ruku dok traje sljedeća runda igre.",
        "Pohvali tri stvari na mom tijelu koje nisu seksualne.",
        "Nježno mi prolazi prstima kroz kosu cijelu minutu.",
        "Daj mi 5 brzih poljubaca u različite dijelove lica.",
        "Pjevaj mi refren romantične pjesmu držeći me za ruku.",
        "Lezi mi u krilo i dopusti da te mazim po glavi 2 minute.",
        "Poljubi me u vrh nosa i reci mi točno zašto me voliš.",
        "Prekriži mi ruke preko leđa i snažno me zagrli 30 sekundi.",
        "Uzmite moj mobitel i promijeni mi pozadinu u našu zajedničku sliku.",
        "Mazi mi ruku i podlakticu zatvorenih očiju 1 minutu.",
        "Pokušaj me nasmijati u manje od 30 sekundi bez ikakvog dodira.",
        "Opiši moj karakter u 5 pozitivnih riječi bez previše razmišljanja.",
        "Pleši sa mnom spori ples jednu minutu u tišini sobe.",
        "Daj mi poljubac na svako mjesto na licu gdje imam madež ili pjegicu.",
        "Stavi moju ruku na svoje srce i gledaj me u oči 30 sekundi.",
        "Nasloni glavu na moje rame i nemoj se pomicati do kraja runde.",
        "Poljubi me u čelo i reci mi jednu stvar kojom se ponosiš kod mene.",
        "Nacrtaj mi srca prstom po dlanu.",
        "Spoji svoj nos s mojim i trljaj ih 15 sekundi.",
        "Zagrli me s leđa i šapni mi nešto lijepo."
      ]
    },
    hot: {
      truths: [
        "Koji dio mog tijela te najviše uzbuđuje kada ga slučajno dodirneš?",
        "Koji je tvoj najdraži način na koji te dodirujem u javnosti?",
        "Kada si zadnji put sanjao/la nešto izrazito vruće o nama?",
        "Koje donje rublje koje posjedujem bi volio/la da nosim svaku večer?",
        "Postoji li neko mjesto u javnosti gdje bi me volio/la poljubiti, ali nismo?",
        "Što najviše voliš kada ti prljavo šapnem na uho?",
        "Koji je tvoj najosjetljiviji dio tijela na kojem obožavaš moje poljupce?",
        "Koja je tvoja najdraža seksualna fantazija koju si imao/la o meni?",
        "Sjećaš li se točno što sam nosio/la kad smo prvi put vodili ljubav?",
        "Kada ti je bilo apsolutno najteže skinuti ruke s mene u društvu?",
        "Koji moj pogled ili izraz lica te odmah i bez greške napali?",
        "Da me možeš odmah skinuti, s kojim dijelom odjeće bi počeo/la?",
        "Jesi li ikada potajno gledao/la moje tijelo kroz odškrinuta vrata kupaonice?",
        "Što je nešto najviše seksi što sam ti ikada rekao/la?",
        "Koji dio tvog tijela voliš da najviše diram tijekom predigre?",
        "Kada si zadnji put razmišljao/la o meni dok si bio/la pod tušem?",
        "Što najviše voliš da radim s tvojom kosom dok se strastveno ljubimo?",
        "Koja je najluđa stvar koju si pomislio/la dok smo se ljubili?",
        "Kada si prvi put u glavi pomislio/la da želiš spavati sa mnom?",
        "Voliš li kada preuzmem inicijativu u krevetu bez najave?",
        "Koji parfem koji nosim te najviše izluđuje?",
        "Jesi li ikada masturbirao/la razmišljajući o nečemu što smo radili dan ranije?",
        "Koju pozu u kojoj me vidiš preko dana smatraš nevjerojatno privlačnom?",
        "Što misliš da je moja najprivlačnija kvaliteta u spavaćoj sobi?",
        "Kako bi opisao/la naš prvi seks u jednoj jedinoj riječi?"
      ],
      dares: [
        "Otkopčaj mi jedan komad odjeće koristeći isključivo jednu ruku.",
        "Strastveno me poljubi u vrat, zadrži se tamo i ostavi mokar trag.",
        "Pleši mi u krilu punu minutu onako kako znaš da volim.",
        "Skini mi majicu preko glave bez upotrebe ruku (samo zubima).",
        "Liži mi vrat i ključnu kost polako idućih 30 sekundi.",
        "Dodiruj mi bedra polako odozdo prema gore, ali stani prije cilja.",
        "Zaveži mi oči nečim i poljubi me na tri različita mjesta na tijelu.",
        "Pošalji mi najprljaviju poruku koju možeš smisliti, upravo sada, i gledaj me dok je čitam.",
        "Ugrizni me lagano za ušnu resicu i diši mi u uho.",
        "Poljubi me strastveno, s jezikom, točno 30 sekundi bez prestanka.",
        "Masiraj mi stražnjicu preko hlača jednu minutu.",
        "Neka ti ruke lutaju mojim tijelom točno jednu minutu dok me gledaš pravo u oči.",
        "Stavi ruku na moje međunožje (preko odjeće) i ostavi je tamo cijelu iduću rundu.",
        "Zadirkuj me poljupcima oko usana bez da me stvarno poljubiš punih 30 sekundi.",
        "Skini jedan svoj komad odjeće na najzavodljiviji mogući način.",
        "Ljubi me po trbuhu krećući se prema dolje, ali zaustavi se točno iznad ruba hlača.",
        "Trljaj se o mene dok oboje stojimo priljubljeni jedno uz drugo 30 sekundi.",
        "Približi se mom licu, prođi jezikom po mojim usnama i odmah se odmakni.",
        "Zgrabi me za kosu (nježno ali čvrsto) i privuci me u strastven poljubac.",
        "Ostani samo u donjem rublju za sljedeće 3 runde igre.",
        "Stavi moju ruku ispod svoje majice na minutu.",
        "Poljubi me svugdje po licu osim po usnama, na usne smiješ tek na samom kraju.",
        "Skini mi čarape koristeći samo svoje usne i zube.",
        "Liži mi prst jedan po jedan, jako polako.",
        "Stavi moje ruke na svoje grudi/prsa i natjeraj me da te gledam u oči."
      ]
    },
    hard: {
      truths: [
        "Koji je tvoj najveći seksualni fetiš o kojem do sada nismo puno pričali?",
        "Što točno i detaljno želiš da ti radim večeras u krevetu nakon igre?",
        "Koja je poza u kojoj daleko najviše uživaš sa mnom?",
        "Jesi li ikada zamišljao/la kako nas netko gleda dok vodimo ljubav?",
        "Koji je daleko najuzbudljiviji mokri san koji si imao/la o meni?",
        "Koji ti je najdraži, najprljaviji trenutak iz našeg dosadašnjeg seksualnog života?",
        "Da možeš birati samo jednu pozu do kraja života sa mnom, koja bi to bila?",
        "Što si oduvijek htio/la da probamo, a bojao/la si se pitati iz srama?",
        "Voliš li više kad sam strogo dominantan/na ili submisivan/na?",
        "Koje mjesto na tvom tijelu odmah izaziva jake trnce kad ga dodirnem jezikom?",
        "Jesi li ikada zamišljao/la da igramo uloge (roleplay) i koje točno?",
        "Da moraš ocijeniti naš seksualni život od 1 do 10, koliko bi mu dao/la i zašto (iskreno)?",
        "Koja je najluđa, najteža poza koju bi volio/la isprobati sa mnom?",
        "Voliš li kad pričam ekstremno prljavo dok vodimo ljubav?",
        "Što stvarno misliš o korištenju različitih seksualnih igračaka u našem krevetu?",
        "Kada si zadnji put masturbirao/la razmišljajući isključivo o našem zadnjem seksu?",
        "Da imamo cijelu noć samo za to, koliko puta zaredom bi volio/la voditi ljubav?",
        "Što ti točno prolazi kroz glavu onih par sekundi tik prije vrhunca?",
        "Jesi li ikada probao/la nešto novo sa mnom što ti se zapravo nije svidjelo, ali si šutio/la?",
        "Bi li ikada snimao/la naš seks da znaš da će snimka biti 100% sigurna?",
        "Koliko perverzan/na možeš postati kad si potpuno i neograničeno uzbuđen/a?",
        "Što najviše voliš da radim s tvojim intimnim dijelovima tijekom predigre?",
        "Jesi li ikada namjerno obukao/la nešto da me izludiš i natjeraš na seks?",
        "Da možemo uvesti jedno novo pravilo u našu spavaću sobu, koje bi to bilo?",
        "Postoji li neko određeno mjesto u kući gdje najviše voliš voditi ljubav osim kreveta?"
      ],
      dares: [
        "Skini sa mene sav donji veš koristeći apsolutno samo svoje zube.",
        "Zadovoljavaj me oralno točno jednu minutu, a onda iznenada i potpuno prestani.",
        "Stavi mi ruke na leđa, drži ih čvrsto i ne daj mi da se mičem dok me ljubiš.",
        "Trljaj se jako o mene dok oboje na sebi imamo samo donje rublje.",
        "Napravi mi pravi, profesionalni i bezobrazni lap dance.",
        "Dodiruj se pred mnom cijelu minutu dok te ja samo šutke gledam.",
        "Ostavi mi jasnu šljivu (hickey) na mjestu koje se ne vidi u javnosti.",
        "Šapni mi na uho u detalje točno ono što želiš da ti napravim kada ovo završi.",
        "Dopusti mi da ti skinem majicu i zavežem ti njome oči na iduće 2 minute.",
        "Liži i ljubi mi unutarnju stranu bedara punu minutu, na centimetar od cilja.",
        "Spusti se dolje i istraži me usnama na točno 3 minute, bez upotrebe ruku.",
        "Stavi moju ruku tamo gdje želiš da te dodirujem i pokaži mi točan ritam.",
        "Zajaši me (preko donjeg rublja) i simuliraj seks sa mnom jednu minutu.",
        "Poliži mi dva prsta s maksimalnim intenzitetom i kontaktom očima.",
        "Lezi na leđa, raširi noge i dopusti mi da te gledam 30 sekundi bez da kažeš riječ.",
        "Dodiruj me jezikom svugdje, osim po samim genitalijama, pune dvije minute.",
        "Gledaj me ravno u oči dok mi jako, jako polako skidaš donje rublje.",
        "Ugrizni me čvrsto (ali pazi da ne boli jako) za unutarnju stranu bedra.",
        "Stisni me snažno uza zid, uhvati me za kosu i strastveno me ljubi.",
        "Siđi dolje i skini mi rublje koristeći isključivo svoja usta.",
        "Legni ispod mene i dopusti mi da kontroliram svaki tvoj pokret iduće 2 runde.",
        "Spoji naša tijela i trljaj se o mene dok jedno od nas ne zatraži milost.",
        "Dopusti mi da ti namažem neki dio tijela jestivom stvari i da to oližem.",
        "Trljaj svoje prepone o moje tijelo idućih 60 sekundi u tišini.",
        "Kazna: Iduće 3 minute smiješ me dodirivati samo usnama i jezikom."
      ]
    },
    extreme: {
      truths: [
        "Koja je tvoja apsolutno najekstremnija, najmračnija fantazija o nama?",
        "S kime točno od naših poznanika bi bio/la spreman/na imati trojac?",
        "Jesi li ikada poželio/la da budem puno, puno grublji/a prema tebi u krevetu?",
        "Što misliš o teškom vezivanju (BDSM) i potpunoj dominaciji nad tobom?",
        "Koja je najperverznija moguća stvar koju si ikada zamislio/la da mi radiš?",
        "Jesi li ikada razmišljao/la o seksu na javnom mjestu gdje bi nas garantirano ulovili?",
        "Postoji li neka specifična igračka za koju misliš da bi nas izludila od užitka?",
        "Koja je najprljavija i najekstremnija stvar koju si pretraživao/la u incognito modu?",
        "Da možeš izabrati bilo koje javno mjesto na svijetu za divlji seks, gdje bi to bilo?",
        "Jesi li ikada maštao/la o tome da me na jedan dan dijeliš s nekim drugim?",
        "Što točno misliš o analnom seksu i bi li ikada probao/la (ili probao/la opet)?",
        "Jesi li ikada zamišljao/la da nas stranac s interneta gleda preko kamere dok se seksamo?",
        "Koja je najekstremnija stvar na koju bi bez razmišljanja pristao/la da te zamolim?",
        "Voliš li osjetiti pravu bol tijekom seksa (grebanje do krvi, jaki udarci, ugrizi)?",
        "Da te vežem, stavim ti povez i ostavim bespomoćnog/nu na krevetu sat vremena, što bi želio/la da osjetiš?",
        "Bi li pristao/la na seks sa strancem pod maskama da se nađemo u swinger klubu?",
        "Jesi li ikada maštao/la o tome da budeš moj seksualni rob na cijeli jedan vikend?",
        "Koja je najprostija, najprljavija riječ koju želiš da ti vrištim u uho pred vrhunac?",
        "Bi li ikada volio/la isprobati 'temperature play' (kapanje vrelog voska ili trljanje leda po genitalijama)?",
        "Koja je tvoja granica u krevetu koju misliš da nikada, ali baš nikada ne bi prešao/la?",
        "Što bi napravio/la da ti kažem da noćas nema pravila i da moje tijelo pripada samo tebi?",
        "Jesi li ikada razmišljao/la o sudjelovanju u pravoj orgiji?",
        "Smatraš li gušenje (choking) tijekom odnosa uzbudljivim?",
        "Bi li dozvolio/la da kontroliram tvoje orgazme na način da odlučujem kada smiješ svršiti?",
        "Postoji li neka izrazito prljava riječ kojom bi volio/la da te zovem tijekom seksa?"
      ],
      dares: [
        "Potpuno me skini, centimetar po centimetar, i istraži svaki dio mog tijela usnama.",
        "Zaveži mi ruke jako čvrsto za krevet i radi sa mnom što god poželiš iduće tri minute.",
        "Skini se potpuno gol/a, klekni ispred mene i posluži mi piće.",
        "Zadovolji me usnama do samog kraja, bez obzira na to koliko dugo proces traje.",
        "Dopusti mi da ti stavim povez na oči i slušalice na uši do samog kraja ove igre.",
        "Upotrijebi kockicu leda na mojim genitalijama, a zatim odmah prati toplim jezikom.",
        "Skini svu odjeću sa mene i koristi moje golo tijelo kao jastuk sljedećih 5 minuta.",
        "Pruži mi apsolutno najbezobrazniji oralni seks koji si ikada izveo/la, odmah sada.",
        "Klekni ispred mene i zadovoljavaj me rukama i usnama dok te ne preklinjem da prestaneš.",
        "Skini mi donje rublje zubima i iskoristi ga kao povez za moje oči.",
        "Uzmimo remen, kravatu ili uže iz ormara i iskoristimo ga za dominaciju nad tobom 5 minuta.",
        "Mazi moje intimne dijelove koristeći isključivo svoja gola prsa/grudi.",
        "Odaberi moju najosjetljiviju zonu i siši/grizi je dok ne ostane jasan, veliki trag.",
        "Simuliraj oralni seks na moja dva prsta dok me gledaš pravo u oči 2 pune minute.",
        "Neka ti ruke budu vezane iza leđa dok me moraš zadovoljiti usnama iduće 3 minute.",
        "Stavi kockicu leda u svoja usta i spusti se dolje na mene dok se led ne otopi.",
        "Potpuno se skini i sjedi mi u krilu raširenih nogu, bez dodira, do kraja ove igre.",
        "Napravi mi masažu cijelog tijela koristeći pljuvačku ili ulje dok smo oboje potpuno goli.",
        "Od ovog trenutka pa idućih 10 minuta moraš slijediti apsolutno svaku moju bolesnu naredbu.",
        "Neka naša sljedeća aktivnost večeras bude seks u pozi za koju smo mislili da je nemoguća.",
        "Dopusti mi da odlučim koju ću igračku iskoristiti na tebi u ovom trenutku.",
        "Lezi na trbuh, stavit ću ti ruke na leđa i ne smiješ se pomaknuti dok te ne oslobodim.",
        "Priđi mi, zgrabi me za vrat (oprezno ali čvrsto) i poljubi me kao da ti o tome ovisi život.",
        "Odradi idućih 5 rundi potpuno razodjeven/a i vezanih ruku na leđima.",
        "Sada prekidamo igru i selimo se u spavaću sobu (ili na pod) – odradi sa mnom ono što si cijelu večer htio/la."
      ]
    }
  },
  uno: {
    soft: [
      "Moraš mi napraviti masažu stopala 2 minute.", "Otiđi po grickalice i donesi mi ih.", "Pjevaj mi romantičnu pjesmu 30 sekundi.", "Moraš mi dati 10 pusa po licu.", "Sljedeću partiju igraš držeći me za ruku.",
      "Pripremi mi piće po mom izboru.", "Daj mi 5 komplimenata zaredom.", "Ljubi me u vrat dok dijeliš karte.", "Izmasiraj mi leđa preko odjeće.", "Iduću partiju pričaj isključivo šapćući.",
      "Ispričaj mi najsmješniju zajedničku uspomenu.", "Priznaj jednu svoju slatku manu.", "Udijeli mi kompliment o mom karakteru.", "Daj mi zagrljaj od cijele minute.", "Složi mi kosu na smiješan način.",
      "Oponašaj neku životinju po mom izboru.", "Napiši mi kratku ljubavnu poruku na papir.", "Poljubi me u oba obraza.", "Napravi mi topli čaj ili kavu.", "Igraj 2 runde zatvorenih očiju.",
      "Masiraj mi dlanove i prste.", "Otpjevaj refren tužne pjesme dramatično.", "Nabroji 3 stvari koje jedva čekaš za vikend.", "Priznaj što si sinoć sanjao/la.", "Poljubi me u čelo.",
      "Nacrtaj mi malo srce na ruku.", "Očisti mi naočale ili ekran mobitela.", "Pohvali moj današnji izgled.", "Zagrli me s leđa na 30 sekundi.", "Iduću partiju govori samo u rimi.",
      "Ispričaj vic, ako se ne nasmijem, vučeš 4 karte.", "Priznaj koji ti je moj najdraži komad odjeće.", "Poljubi mi ruku kao džentlmen/dama.", "Zagrli me i ne puštaj dok ne završi runda.", "Reci mi što obožavaš kod mene, a čudno je.",
      "Iduću rundu stoj na jednoj nozi.", "Posudi mi svoju hudicu do kraja večeri.", "Priznaj što si pomislio/la kad smo se tek upoznali.", "Daj mi 5 brzih pusa u vrh nosa.", "Igraj držeći mene pod ruku.",
      "Sjedni mi u krilo na 30 sekundi.", "Hrani me grickalicama iduću rundu.", "Pohvali moje kulinarske vještine.", "Nasmij me u manje od 15 sekundi.", "Poljubi mi svaki prst na lijevoj ruci.",
      "Poljubi mi svaki prst na desnoj ruci.", "Igraj iduću rundu s kartama na glavi.", "Reci mi na koju slavnu osobu te podsjećam.", "Prekriži ruke na prsima i igraj laktovima.", "Priznaj koji nam je spoj bio najbolji.",
      "Oponašaj moj hod po sobi.", "Gledaj me u oči bez treptanja 30 sekundi.", "Odgovaraj sa 'Da, ljubavi' na sve iduću partiju.", "Donesi mi deku i ušuškaj me.", "Zagrli me tako jako da ostanem bez daha.",
      "Priznaj neku tajnu iz djetinjstva.", "Pjevaj mi uspavanku dok miješam karte.", "Zamijeni karte sa mnom odmah.", "Daj mi mobitel na minutu da pregledam slike.", "Upiši mi novi slatki nadimak u svoj imenik.",
      "Obećaj mi jedan spoj po mom izboru.", "Reci mi 3 stvari u kojima sam bolji/a od tebe.", "Zatvori oči i pogodi koju kartu držim.", "Zaveži ruke na leđa na minutu, ja ti vučem karte.", "Iduću rundu igraj samo lijevom rukom.",
      "Nacrtaj mi nešto na papir u 60 sekundi.", "Poljubi me u tjeme.", "Pohvali moju frizuru u 3 rečenice.", "Drži jezik isplažen dok bacaš karte.", "Pokaži mi svoju najstariju sliku na mobitelu.",
      "Izrecitiraj abecedu unatrag. Greška = +1 karta.", "Priznaj što si mislio/la o mojim prijateljima.", "Poljubi me u oba kapka.", "Igraj iduću rundu držeći se za nos.", "Reci mi koji je moj najveći talent.",
      "Nabroji 3 razloga zašto si zaljubljen/a u mene.", "Prepusti mi pobjedu u ovoj rundi.", "Poljubi me svaki put kad izvučeš kartu.", "Gledaj me zaljubljeno idućih 60 sekundi.", "Dopusti mi da ti odaberem filter za sliku.",
      "Slikajmo zajednički selfie odmah.", "Pričaj sa stranim naglaskom iduću partiju.", "Šapni mi na uho najslađu stvar koju si danas pomislio/la.", "Izmasiraj mi listove na nogama.", "Daj mi da ti napravim novu frizuru prstima.",
      "Zagrli me i reci mi da sam ti sve na svijetu.", "Poljubi mi svaki zglob na prstima ruku.", "Reci mi koju moju osobinu najviše cijeniš.", "Pleši sa mnom spori ples jednu minutu.", "Dopusti mi da ti operem ruke toplom vodom i sapunom.",
      "Reci mi što ti je najljepše na mom tijelu (neseksualno).", "Igraj iduću rundu sjedeći na podu.", "Napravi mi brzu masažu glave.", "Priznaj mi koju pjesmu najradije pjevaš pod tušem.", "Poljubi me 3 puta zaredom.",
      "Zagrli me tako da čujem tvoje srce.", "Daj mi da ti nacrtam brkove olovkom za oči.", "Priznaj mi svoj najveći strah.", "Ispričaj mi neki vic koji je toliko glup da je smiješan.", "Gledaj u mene umjesto u karte cijelu rundu.",
      "Dopusti mi da te hranim idućih 5 minuta.", "Reci mi što ti se najviše svidjelo kod mene danas.", "Poljubi me u lijevi obraz pa u desni polako.", "Moraš me zvati 'Vaše visočanstvo' iduću partiju.", "Daj mi da pregledam tvoju povijest pretraživanja (1 min).",
      "Otpjevaj mi sretan rođendan (iako mi nije).", "Sastavi mi rimu od 4 stiha o našoj ljubavi.", "Zagrli me s leđa i nasloni bradu na moje rame.", "Dopusti mi da te poškakljam po trbuhu (5 sekundi).", "Moraš mi složiti odjeću koju sam ostavio/la na krevetu.",
      "Priznaj mi na što trošiš najviše novca.", "Poljubi mi dlan.", "Iduću partiju drži karte na čelu umjesto u rukama.", "Reci mi što bi napravio/la da dobiješ na lotu.", "Daj mi da ti odaberem outfit za sutra.",
      "Moraš mi dati 20 poljubaca raspoređenih po cijelom licu.", "Priznaj mi koju moju naviku zapravo voliš.", "Donesi mi čašu vode i posluži me kao konobar.", "Složi mi origami brodić ili avion.", "Reci mi jedan detalj o meni koji nitko drugi ne primjećuje.",
      "Igraj iduću partiju prekriženih ruku.", "Poljubi me u rame.", "Dopusti mi da ti stavim malo svog parfema.", "Priznaj mi s kojom slavnom osobom bi popio/la kavu.", "Drži me za mali prst cijelu iduću rundu.",
      "Moraš mi ispričati priču za laku noć od jedne minute.", "Reci mi gdje bi volio/la da otputujemo sljedeće godine.", "Izmasiraj mi ključnu kost.", "Dopusti mi da te počešljam.", "Poljubi me svaki put kad bacim kartu u boji koju tražiš.",
      "Moraš mi priznati što te najviše razveselilo ovaj tjedan.", "Iduću rundu smiješ igrati samo koristeći kažiprste.", "Zagrli me jako i nemoj puštati 45 sekundi.", "Reci mi koju moju rečenicu stalno ponavljaš u glavi.", "Dopusti mi da ti napišem inicijale na ruku.",
      "Priznaj mi koji crtić iz djetinjstva ti je bio najdraži.", "Poljubi me u bradu.", "Igraj iduću rundu žmireći na jedno oko.", "Moraš mi reći koji ti je moj najslađi izraz lica.", "Donesi mi jastuk i postavi mi ga iza leđa.",
      "Izmasiraj mi ramena koristeći samo palčeve.", "Priznaj mi koju supermoć bi volio/la imati.", "Dopusti mi da te nahranim žlicom.", "Poljubi me u obje ruke s unutarnje strane.", "Moraš me zvati 'Ljubavi mog života' prije svakog bacanja karte.",
      "Reci mi što te kod mene najviše inspirira.", "Iduću partiju igraj stojeći leđima okrenut/a zidu.", "Priznaj mi koju igricu najviše voliš igrati na mobitelu.", "Dopusti mi da ti očistim lice vlažnom maramicom.", "Poljubi me brzo na 5 različitih mjesta.",
      "Zagrli me tako jako da oboje padnemo na krevet/kauč.", "Reci mi koji ti je naš najromantičniji trenutak.", "Igraj iduću partiju držeći olovku u ustima.", "Priznaj mi na koje mjesto u gradu te vežu najbolje uspomene sa mnom.", "Dopusti mi da te lagano uštipnem za obraz i kažem da si sladak/ka."
    ],
    hot: [
      "Moraš skinuti jedan komad odjeće po mom izboru.", "Moraš mi dati strastveni francuski poljubac od 20 sekundi.", "Igraš sljedeću partiju sjedeći mi u krilu.", "Moraš mi masirati bedra dok ne počne nova partija.", "Do kraja večeri ne smiješ nositi donji dio odjeće.",
      "Pokaži mi svoju omiljenu seksi grimasu.", "Skini majicu i igraj iduću partiju u toplesu/bez majice.", "Poljubi mi svaki prst na rukama izrazito polako.", "Moraš mi šaptati prljave riječi na uho svakih 5 minuta.", "Pošalji mi svoju seksi sliku iz druge sobe odmah sada.",
      "Zatvori oči, a ja ću te poljubiti na nepoznato mjesto.", "Skini mi čarape koristeći samo svoje zube.", "Iduću partiju Unoa igraj isključivo u donjem rublju.", "Ostavi mi malu, jedva vidljivu šljivu na ramenu.", "Dopusti mi da ti lagano zavežem ruke na 2 minute.",
      "Šapni mi što točno želiš da ti napravim večeras.", "Diši mi u vrat i polako me ljubi dok miješam karte.", "Masiraj mi stražnjicu preko odjeće dok igramo.", "Igraj s raskopčanom košuljom ili podignutom majicom.", "Stisni mi bedro ispod stola i drži ruku tamo cijelu rundu.",
      "Približi se mojim usnama, ali me nemoj poljubiti 30 sekundi.", "Skini jedan komad moje odjeće po svom izboru.", "Lezi na leđa, a ja ću sjediti na tebi dok igramo.", "Moraš mi lizati vrat točno jednu minutu.", "Natjeraj me da pocrvenim prljavim komentarom.",
      "Zajaši moje bedro i lagano se trljaj o mene 30 sekundi.", "Poljubi me svugdje po licu, ali strogo izbjegavaj usne.", "Skini se u donje rublje i napravi mi brzi, seksi hod.", "Igraj tako da ti je jedna ruka stalno pod mojom majicom.", "Dopusti mi da pređem rukom preko tvojih intimnih dijelova.",
      "Moraš mi gricnuti donju usnu i povući je zubima.", "Priznaj mi na kojem javnom mjestu bi me najradije zgrabio/la.", "Stavi moju ruku na svoje srce i pusti da osjetim kako kuca.", "Igraš iduću partiju na koljenima pokraj mene.", "Šapni mi najprljaviji san koji si imao/la o nama.",
      "Poljubi moj trbuh krećući se od pupka prema gore.", "Daj mi 5 poljubaca uzduž ključne kosti.", "Stisni moju stražnjicu s obje ruke na 15 sekundi.", "Odveži mi hlače, ali ih nemoj skidati.", "Uzmi kockicu leda i prođi njome po mom vratu.",
      "Dopusti mi da ti skinem majicu preko glave.", "Trljaj se o mene dok oboje stojimo priljubljeni.", "Iduću partiju nakon svake karte moraš strastveno uzdahnuti.", "Poljubi mi bedro iznad koljena i lagano ga ugrizi.", "Šapni mi što bi mi radio/la u mračnom kinu.",
      "Otkopčaj moj grudnjak/šlic i ostavi tako.", "Primim te za kosu, povučem unatrag i strastveno poljubim.", "Igraj okrenut/a leđima, oslanjajući se na moja prsa.", "Mazi mi trbuh ispod majice dok miješam karte.", "Dopusti mi da ti sjednem u krilo licem prema tebi.",
      "Priznaj mi koji dio predigre te najviše izluđuje.", "Sisi mi prst 10 sekundi gledajući me u oči.", "Polako mi skini cipele i čarape, pa poljubi gležanj.", "Igraj s povezom na očima, ja ti govorim karte.", "Natjeraj me da ti sama/sam skinem komad odjeće.",
      "Zgrabi me za bokove i privuci snažno na sebe.", "Daj mi francuski poljubac s puno jezika (1 min).", "Pusti me da ti ostavim mokar trag na vratu.", "Igraj bez grudnjaka/majice ispod hudice.", "Priznaj kada si zadnji put masturbirao/la misleći na mene.",
      "Polako prelazi rukama preko mog tijela od vrata do koljena.", "Šapni mi boju donjeg rublja koje nosiš.", "Zadirkuj moje usne svojima bez spajanja 1 minutu.", "Skini moj remen i privuci me njime prema sebi.", "Pokaži mi svoju najzavodljiviju pozu na krevetu.",
      "Poljubi me u vrat točno na pulsu.", "Igraš s nogama prebačenim preko mojih.", "Priznaj mi što nosiš ispod odjeće i koliko te pali.", "Stisni me uza zid i ljubi me 30 sekundi.", "Pokaži mi prstom gdje želiš da te poljubim.",
      "Neka tvoja ruka zaluta blizu mog međunožja i ostane.", "Poljubi mi vrat i ostavi trag zubima.", "Prebaci se u seksi donje rublje za ostatak večeri.", "Priznaj koju moju sliku potajno čuvaš na mobitelu.", "Poljubi me kao nakon mjesec dana razdvojenosti.",
      "Otkopčaj prva tri gumba na mojoj košulji/majici.", "Moraš mi maziti unutarnju stranu bedra 1 minutu.", "Priznaj koji ti je moj najdraži dio tijela.", "Daj mi poljubac koji počinje nježno, a završava grubo.", "Dopusti mi da ti skinem jedan komad odjeće zubima.",
      "Stavi moju ruku ispod svog donjeg rublja na 10 sekundi.", "Zatvori oči dok ti polako prelazim prstima po usnama.", "Iduću partiju moraš držati ruku na mojoj stražnjici.", "Moraš mi reći tri prostote koje te jako pale.", "Zajaši me i napravi tri spora, kružna pokreta bokovima.",
      "Pusti me da ti otkopčam hlače ispod stola.", "Moraš mi dati poljubac u trbuh točno iznad pupka.", "Poljubi me u uho i polako povuci resicu zubima.", "Dopusti mi da ti ruku stavim u džep hlača i ostavim je tamo.", "Priznaj mi jesi li ikada zamišljao/la nas na javnom mjestu.",
      "Skini čarape i trljaj svoja stopala o moja ispod stola.", "Moraš mi lizati prst jako polako, jedan po jedan.", "Iduću rundu svaka tvoja bačena karta mora biti popraćena seksi pogledom.", "Stavi mi ruku na vrat (lagano) dok me ljubiš.", "Dopusti mi da ti gurnem ruku ispod majice na leđa.",
      "Igraj iduću partiju s otkopčanim šlicom.", "Moraš me ljubiti u vrat dok ti ne kažem da staneš.", "Priznaj mi što bi mi radio/la da smo sad u liftu.", "Pusti me da ti pređem jezikom preko usana.", "Dopusti mi da te zavedem plesom od 30 sekundi.",
      "Moraš mi poljubiti unutarnju stranu zgloba na ruci.", "Reci mi koju moju pozu najviše voliš gledati.", "Iduću partiju moraš odigrati držeći moj remen.", "Daj mi 3 kratka poljupca u rame.", "Pusti me da ti zavučem ruku pod kosu i masiram tjeme.",
      "Moraš mi reći što te najviše napaljuje kod mog glasa.", "Igraš iduću rundu dok ti ja pušem hladan zrak u vrat.", "Poljubi me u ključnu kost i zadrži usne tamo.", "Priznaj mi koji ti je bio najnapetiji trenutak s početka veze.", "Dopusti mi da te ugrizem (lagano) za usnu.",
      "Moraš mi otkopčati grudnjak s jednom rukom (ili pokušati).", "Pusti me da ti pređem ledom preko usana.", "Moraš mi šapnuti što bi mi radio/la da ne igramo karte.", "Iduću rundu igraj dok ti je jedna noga prebačena preko mog ramena.", "Dopusti mi da ti skinem cipele i čarape zubima.",
      "Priznaj mi koji moj pogled te najviše uzbuđuje.", "Moraš me poljubiti svugdje osim po genitalijama iduću minutu.", "Igraj iduću rundu bez hlača/suknje, samo u majici i gaćicama.", "Dopusti mi da ti stavim ruku na unutarnju stranu bedra dok igraš.", "Moraš mi reći koju moju fantaziju bi volio/la ostvariti."
    ],
    hard: [
      "Moraš skinuti svu odjeću sa sebe osim donjeg rublja.", "Pruži mi oralno zadovoljstvo na 2 minute prije nove runde.", "Napravi mi lap dance na pjesmu koju ja odaberem.", "Sljedeću partiju moraš igrati potpuno u toplesu/bez majice.", "Ostavi mi ljubavni ugriz na bedru.",
      "Dopusti mi da ti vežem ruke za leđa za iduću partiju.", "Igraj Unoa klečeći ispred mene na podu.", "Skini mi donje rublje dok igramo i ostavi me golog/u ispod stola.", "Dok vučeš karte, dodiruj me direktno po koži ispod stola.", "Ja biram što točno radimo u krevetu večeras.",
      "Potpuno se skini i igraj golog/u iduće dvije runde.", "Pruži mi brzi oralni seks pod stolom dok ja bacam kartu.", "Dopusti mi da te pljusnem po stražnjici 5 puta jako.", "Lezi na krevet, raširi se i dopusti mi da te izludim rukama.", "Liži mi unutarnju stranu bedra dok ja držim karte.",
      "Stavi kockicu leda u usta i rastopi je na mojim intimnim dijelovima.", "Šapni mi najprostiju rečenicu koju možeš smisliti.", "Iduću partiju igraj zavezanih očiju i sputanih ruku.", "Primi me za kosu i povuci u duboki, grubi poljubac.", "Zadovoljavaj se pred mnom dok ti brojim do 60.",
      "Dopusti mi da radim s tobom što god želim iduće 3 minute.", "Skini gaćice i igraj potpuno golog/u raširenih nogu na stolici.", "Liži mi prste jednog po jednog nakon što ih staviš u usta.", "Igraj tako da ti sjedim u krilu i trljam se o tebe do ruba.", "Ostavi mi trag zuba na vratu koji će se vidjeti sutra.",
      "Dopusti mi da ti stavim štipaljke na osjetljivo mjesto.", "Liži mi pupak i lagano se spuštaj prema dolje dok ne kažem stop.", "Svaka tvoja izgubljena karta = skidanje novog komada donjeg rublja.", "Reci mi najperverzniju tajnu koju godinama skrivaš.", "Zajaši me preko odjeće i simuliraj divlji seks 2 pune minute.",
      "Liži mi stopala i gležnjeve s maksimalnom posvećenošću.", "Stavi ruku duboko u moje gaćice i ne miči je do kraja runde.", "Priredi mi jednominutni, prljavi striptiz uz stenjanje.", "Iduću partiju igraj prebačen/a preko mog krila licem prema podu.", "Ispuni mi bilo koju seksi želju, odmah sada na licu mjesta.",
      "Dopusti mi da ti pljunem u usta dok se strastveno ljubimo.", "Sisi mi bradavice preko odjeće dok ja igram svoju rundu.", "Lezi na pod da te mogu gaziti i maziti istovremeno nogama.", "Pruži mi oralni seks do ruba orgazma, a onda naglo stani.", "Skini sve sa sebe i veži se za krevet – igra Unoa pauzira.",
      "Pusti me da ti nanesem blagu bol kapanjem voska na bedra.", "Jaši me okrenut/a leđima iduće 3 minute.", "Gledaj me u oči dok oboje guramo ruke u svoje hlače.", "Trljaj mi lice svojim međunožjem 1 minutu.", "Igraj potpuno vezan/a, ja ti pokazujem tvoje karte.",
      "Skini moje gaćice zubima, bez upotrebe ruku.", "Liži mi trbuh sve dok ne počnem drhtati.", "Iduću partiju odigraj držeći moj spolni organ u ruci.", "Kleči preda mnom i moli me da ti dopustim da svršiš.", "Skini se potpuno, a ja ostajem odjeven/a.",
      "Igraj u pozi psa dok ja bacam karte s tvojih leđa.", "Dopusti mi da ti gurnem ruku duboko u donje rublje pred kraj partije.", "Polizi moj vrat od ključne kosti do uha.", "Priznaj mi točno koliko prstiju želiš u sebi večeras.", "Zadirkuj moje intimne dijelove perom ili ledom.",
      "Zaveži mi ruke i iskoristi moje tijelo na 2 minute.", "Gurni ruku u moje hlače i igraj se sa mnom dok miješaš karte.", "Pruži mi intenzivnu masažu stražnjice s uljem.", "Dopusti mi da ti stavim igračku (plug/vibrator) tijekom igre.", "Pljusni mi stražnjicu svaki put kad izvučeš kartu.",
      "Natjeraj me da kleknem i radim ti što god poželiš.", "Izaberi: oralni seks odmah ili skini svu odjeću.", "Pokaži mi najosjetljiviju točku i dopusti da je izludim.", "Trljaj se o mene potpuno gola/gol dok ne budemo ludi.", "Ugrizni me čvrsto za unutarnju stranu bedra.",
      "Zadovoljavaj me dok ne kažem tvoje ime na glas.", "Igraj s vibratorom uključenim na najjače.", "Priznaj koju moju prljavu naviku u krevetu obožavaš.", "Legni ispod stola i radi mi što god želiš dok partija traje.", "Dopusti mi da kontroliram tvoj orgazam večeras.",
      "Od sada svaka +4 karta znači 1 minutu oralnog seksa.", "Stisni moje tijelo uz svoje toliko jako da osjetim mišiće.", "Izgovori najprljaviju stvar koju želiš da ti radim dok spavaš.", "Skini me i iskoristi moje tijelo kao stol za karte.", "Poljubi mi svaki centimetar trbuha do ruba rublja.",
      "Dopusti mi da ti kapnem vrući vosak na trbuh.", "Moraš me usmeno zadovoljavati dok ne zatvorim oči od užitka.", "Igraj iduću rundu s mojim prstima u tvojim ustima.", "Skini moj donji veš i stavi ga sebi oko vrata do kraja igre.", "Dopusti mi da ti ostavim crvene tragove od prstiju na bedrima.",
      "Priznaj mi na koji način bi volio/la da budem grublji/a prema tebi.", "Moraš mi lizati bradavice dok se ne naježim.", "Zaveži me za stolicu i provociraj me poljupcima 2 minute.", "Moraš igrati Unoa dok ti ja masiram međunožje (ispod odjeće).", "Dopusti mi da ti navučem majicu preko glave i zavežem ruke u nju.",
      "Moraš mi dopustiti da te diram s ledom tamo gdje si najosjetljiviji/a.", "Kleči ispred mene s otvorenim ustima i čekaj moje upute.", "Priznaj mi koju bi moju odjeću volio/la poderati sa mene.", "Moraš se zadovoljavati pred mnom dok ja snimam (samo za nas).", "Dopusti mi da ti grizem rame dok ne kažeš stop.",
      "Igraj iduću partiju dok ja sjedim na tvom licu (u donjem rublju).", "Moraš mi pružiti oralni seks točno minutu, zatim stati na 5 minuta.", "Priznaj mi jesi li ikada razmišljao/la o analnom seksu sa mnom.", "Moraš mi lizati prste nakon što ih umočim u tvoje međunožje.", "Dopusti mi da ti odredim točno kada smiješ svršiti večeras."
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
      "Nikad nisam zaspao/la držeći mobitel jer sam čekao/la tvoju poruku.",
      "Nikad nisam lagao/la da mi se sviđa tvoja frizura iako mi se nije svidjela.",
      "Nikad nisam probao/la nešto što mrzim jesti samo zato što si ti to skuhao/la.",
      "Nikad nisam uhvatio/la sebe kako nesvjesno koristim tvoje uzrečice.",
      "Nikad nisam slušao/la tvoju omiljenu pjesmu na repeat kad mi fališ.",
      "Nikad nisam obrisao/la poruku prije slanja jer sam mislio/la da zvučim previše zaljubljeno.",
      "Nikad nisam lagao/la o tome koliko sam novca potrošio/la na tvoj poklon.",
      "Nikad nisam namjerno izgubio/la u nekoj igri samo da tebe usrećim.",
      "Nikad nisam zamišljao/la kako bi izgledala naša djeca.",
      "Nikad nisam vježbao/la pred ogledalom što ću ti reći.",
      "Nikad nisam prešutio/la da me nešto boli samo da ti ne kvarim raspoloženje.",
      "Nikad nisam lagao/la da mi se spava samo da bismo išli leći i maziti se.",
      "Nikad nisam potajno plakao/la uz romantični film misleći na nas.",
      "Nikad nisam planirao/la savršeni spoj tjednima unaprijed.",
      "Nikad nisam obukao/la tvoju majicu za spavanje čim si izašao/la iz stana.",
      "Nikad nisam bio/la ljubomoran/na na tvog kućnog ljubimca jer dobiva tvoju pažnju.",
      "Nikad nisam pratio/la tvoju lokaciju na mobitelu iz čiste dosade.",
      "Nikad nisam guglao/la tvoj horoskopski znak da vidim jesmo li kompatibilni.",
      "Nikad nisam čuvao/la neku sitnicu (kartu za kino, račun) s našeg prvog spoja.",
      "Nikad nisam pregledavao/la tvoje stare slike na društvenim mrežama iz doba prije mene.",
      "Nikad nisam namjerno prošao/la pokraj tvog posla/kuće samo da te slučajno sretnem.",
      "Nikad nisam lagao/la roditeljima/prijateljima o tome gdje smo bili.",
      "Nikad nisam mislio/la da si ti 'onaj pravi' / 'ona prava' već na prvom spoju.",
      "Nikad nisam osjetio/la leptiriće u trbuhu nakon više od godinu dana veze.",
      "Nikad nisam zaboravio/la našu mjesečnicu ili važan datum.",
      "Nikad nisam napravio/la lažni profil da ti vidim story (prije nego smo bili zajedno).",
      "Nikad nisam ostao/la budan/na satima samo gledajući te kako spavaš.",
      "Nikad nisam prešutio/la da mi se ne sviđa tvoj parfem.",
      "Nikad nisam bio/la uvjeren/a da mi čitaš misli.",
      "Nikad nisam lagao/la da volim tvoj hobi samo da provodimo više vremena zajedno.",
      "Nikad nisam probao/la pogoditi tvoju lozinku na mobitelu.",
      "Nikad nisam osjetio/la ponos kad bi te netko drugi pohvalio.",
      "Nikad nisam zamišljao/la zajedničku starost.",
      "Nikad nisam izbrisao/la našu sliku jer sam ja na njoj ispao/la loše.",
      "Nikad nisam napisao/la status ili objavu posvećenu isključivo tebi.",
      "Nikad nisam lagao/la da sam zauzet/a samo da vidim hoćeš li inzistirati da se vidimo.",
      "Nikad nisam napravio/la screenshot tvoje poruke da je pokažem prijateljima.",
      "Nikad nisam pomislio/la da imam najljepšeg partnera/partnericu na svijetu.",
      "Nikad nisam snimio/la tvoj glas da ga mogu slušati poslije.",
      "Nikad nisam preskočio/la izlazak s društvom samo da budem s tobom.",
      "Nikad nisam učio/la o nekoj temi samo da te impresioniram u razgovoru.",
      "Nikad nisam uzeo/la tvoj mobitel da si pošaljem poruku u tvoje ime.",
      "Nikad nisam promijenio/la planove u zadnji čas samo jer si ti to tražio/la.",
      "Nikad nisam lagao/la da mi je zima samo da bi me ti zagrlio/la.",
      "Nikad nisam namjerno ostavio/la neku svoju stvar kod tebe da imam razlog za povratak.",
      "Nikad nisam mislio/la o tebi dok sam slušao/la tužnu pjesmu.",
      "Nikad nisam guglao/la ideje za romantična iznenađenja.",
      "Nikad nisam bio/la nesiguran/na u tvoje osjećaje prema meni na početku.",
      "Nikad nisam pjevao/la pod tušem misleći na tebe.",
      "Nikad nisam pregledavao/la tvoje lajkove na Instagramu.",
      "Nikad nisam uhvatio/la tvoj pogled iz drugog kuta sobe i nasmiješio/la se.",
      "Nikad nisam pokušao/la skuhati tvoje omiljeno jelo i potpuno ga upropastio/la.",
      "Nikad nisam kupio/la nešto što si spomenuo/la u prolazu prije nekoliko mjeseci.",
      "Nikad nisam promijenio/la frizuru ili stil samo zato što si ti rekao/la da ti se to sviđa.",
      "Nikad nisam sakrio/la poklon za tebe tjednima na mjestu gdje nikad ne gledaš.",
      "Nikad nisam lagao/la o tome što radim kad si me nazvao/la, a zapravo sam pripremao/la iznenađenje.",
      "Nikad nisam maštao/la o našem prvom putovanju u dvoje.",
      "Nikad nisam ukrao/la poljubac dok si spavao/la.",
      "Nikad nisam gledao/la u tvoje usne cijelo vrijeme dok si pričao/la.",
      "Nikad nisam bio/la oduševljen/a kad si se sprijateljio/la s mojim prijateljima.",
      "Nikad nisam rekao/la 'volim te' u sebi prije nego što sam to izgovorio/la na glas.",
      "Nikad nisam branio/la tebe pred drugima kad nisi bio/la prisutan/na.",
      "Nikad nisam stavio/la našu sliku kao pozadinu na računalu ili mobitelu.",
      "Nikad nisam napisao/la tvoje ime pa ga odmah izbrisao/la.",
      "Nikad nisam nosio/la nakit koji si mi poklonio/la svaki dan.",
      "Nikad nisam pokušao/la napisati pjesmu ili priču o nama.",
      "Nikad nisam osjetio/la da si ti moja jedina srodna duša.",
      "Nikad nisam iščekivao/la tvoj poziv gledajući u ekran mobitela.",
      "Nikad nisam plakao/la od sreće zbog nečega što si napravio/la za mene.",
      "Nikad nisam osjećao/la da me ti poznaješ bolje nego što poznajem sebe.",
      "Nikad nisam lagao/la da volim tvoju obitelj iako me netko od njih živcira.",
      "Nikad nisam preskočio/la obrok da bih mogao/la jesti s tobom.",
      "Nikad nisam razmišljao/la kako bi mi život bio dosadan bez tebe.",
      "Nikad nisam napravio/la glupost samo da te nasmijem kad si bio/la tužan/na.",
      "Nikad nisam osjećao/la leptiriće kad bi me iznenada dodirnuo/la po ruci.",
      "Nikad nisam sanjao/la da smo se posvađali i probudio/la se tužan/na.",
      "Nikad nisam bio/la potpuno iskren/a s tobom o svojim najvećim strahovima.",
      "Nikad nisam zamišljao/la naš zajednički dom i kako bi bio uređen.",
      "Nikad nisam kupio/la sitnicu u dućanu samo zato što me podsjetila na tebe.",
      "Nikad nisam nosio/la tvoju jaknu jer mi je tvoj miris davao sigurnost.",
      "Nikad nisam namjerno usporio/la hod da bih duže šetao/la s tobom.",
      "Nikad nisam osjetio/la ljubomoru kad si spomenuo/la bivšu/bivšeg.",
      "Nikad nisam rekao/la svojim prijateljima da te volim prije nego tebi.",
      "Nikad nisam pročitao/la tvoju omiljenu knjigu samo da shvatim tvoj ukus.",
      "Nikad nisam pogledao/la tvoj omiljeni film iako mi je žanr užasan.",
      "Nikad nisam zahvaljivao/la sudbini što smo se sreli.",
      "Nikad nisam pokušao/la promijeniti neku svoju lošu naviku samo zbog tebe.",
      "Nikad nisam pomislio/la da bih dao/la život za tebe.",
      "Nikad nisam prepoznao/la tvoj korak prije nego što si ušao/la u sobu.",
      "Nikad nisam osjetio/la neopisiv mir čim si me zagrlio/la.",
      "Nikad nisam bio/la ponosniji/a na tvoj uspjeh nego na vlastiti."
    ],
    hot: [
      "Nikad nisam zamišljao/la kako vodiš ljubav sa mnom dok smo bili u društvu.",
      "Nikad nisam zaboravio/la donje rublje namjerno samo da te napalim.",
      "Nikad nisam masturbirao/la razmišljajući isključivo o tebi.",
      "Nikad nisam potajno snimio/la tvoju fotku dok si se presvlačio/la.",
      "Nikad nisam bio/la napaljen/a na nekom potpuno neprikladnom mjestu.",
      "Nikad nisam poslao/la prljavu poruku dok si bio/la u istoj prostoriji s drugim ljudima.",
      "Nikad nisam zamišljao/la kako te strastveno ljubim u prepunom dizalu.",
      "Nikad nisam lagao/la da nisam umoran/na samo da bismo imali seks.",
      "Nikad nisam planirao/la seksi iznenađenje u spavaćoj sobi danima unaprijed.",
      "Nikad nisam gledao/la u tvoje usne i zamišljao/la ih na svom tijelu dok si pričao/la.",
      "Nikad nisam nosio/la seksi donje rublje ispod obične odjeće na poslu/faksu.",
      "Nikad nisam zamišljao/la seks na brzaka u javnom WC-u restorana.",
      "Nikad nisam dirao/la sebe preko hlača razmišljajući o tebi.",
      "Nikad nisam slao/la eksplicitne slike iz kabine za presvlačenje u dućanu.",
      "Nikad nisam namjerno sjeo/la tako da imaš savršen pogled na moje međunožje.",
      "Nikad nisam iščekivao/la da svi odu kući kako bih te napao/la.",
      "Nikad nisam zamišljao/la tvoje ruke na mom tijelu dok me netko drugi masirao.",
      "Nikad nisam prekinuo/la svađu strastvenim poljupcem.",
      "Nikad nisam pomislio/la na tebe i osjetio/la uzbuđenje tijekom ozbiljnog sastanka.",
      "Nikad nisam sanjao/la o nama i probudio/la se mokar/mokra.",
      "Nikad nisam potajno mirisao/la tvoje rublje.",
      "Nikad nisam koristio/la voće ili hranu tijekom predigre.",
      "Nikad nisam šapnuo/la prostotu na uho u trenutku kada nisi mogao/la reagirati.",
      "Nikad nisam zaboravio/la zaključati vrata u nadi da će nas netko uloviti u strasti.",
      "Nikad nisam nosio/la tvoju majicu bez ičega ispod.",
      "Nikad nisam imao/la seks na kuhinjskom stolu.",
      "Nikad nisam predložio/la tuširanje u dvoje samo zbog seksa.",
      "Nikad nisam gledao/la kako se presvlačiš kroz odškrinuta vrata.",
      "Nikad nisam zamišljao/la kako bi zvučalo tvoje stenjanje na drugom jeziku.",
      "Nikad nisam masturbirao/la prije našeg spoja da izdržim duže.",
      "Nikad nisam namjerno prosuo/la nešto po tebi samo da te moram brisati.",
      "Nikad nisam imao/la želju poderati tvoju odjeću.",
      "Nikad nisam zamišljao/la seks na stražnjem sjedalu dok smo se vozili autocestom.",
      "Nikad nisam slao/la prljave poruke dok sam sjedio/la pokraj tvojih roditelja.",
      "Nikad nisam probao/la skinuti tvoju majicu samo jednom rukom.",
      "Nikad nisam zamišljao/la tvoj jezik na svom tijelu.",
      "Nikad nisam imao/la seksi snove o nekom tvom komadu odjeće.",
      "Nikad nisam pretraživao/la seksi donje rublje da te iznenadim.",
      "Nikad nisam ostavio/la trag (šljivu) na tebi namjerno da ga svi vide.",
      "Nikad nisam sakrio/la šljivu koju si mi ti ostavio/la.",
      "Nikad nisam masturbirao/la uz tvoju sliku na mobitelu.",
      "Nikad nisam zamišljao/la da se snimamo tijekom odnosa.",
      "Nikad nisam probao/la otkopčati tvoj grudnjak/šlic u javnosti.",
      "Nikad nisam gledao/la romantični film samo čekajući scenu seksa da te napalim.",
      "Nikad nisam osjetio/la uzbuđenje dok si vozio/la auto.",
      "Nikad nisam bio/la uhvaćen/a u flertu s tobom na poslu/faksu.",
      "Nikad nisam rekao/la prljavu šalu samo da vidim tvoju reakciju.",
      "Nikad nisam probao/la skinuti donje rublje bez skidanja hlača.",
      "Nikad nisam poželio/la seks u uredu nakon radnog vremena.",
      "Nikad nisam poslao/la glasovnu poruku u kojoj zvučim provokativno.",
      "Nikad nisam iskoristio/la kockicu leda tijekom poljupca.",
      "Nikad nisam razmišljao/la o seksu pod zvijezdama na plaži.",
      "Nikad nisam kupio/la seksi igračku, a da ti nisam rekao/la.",
      "Nikad nisam nosio/la štikle/kravatu samo i isključivo za seks.",
      "Nikad nisam zamišljao/la da igramo ulogu stranca koji zavodi u baru.",
      "Nikad nisam gledao/la tvoje tijelo dok spavaš i bio/la jako napaljen/a.",
      "Nikad nisam poljubio/la tvoj vrat tako jako da je ostao crveni trag.",
      "Nikad nisam predložio/la seks ujutro prije nego smo oprali zube.",
      "Nikad nisam razmišljao/la kako bi bilo da se seksamo pred ogledalom.",
      "Nikad nisam osjetio/la vlažnost/erekciju samo od tvog zagrljaja.",
      "Nikad nisam poslao/la poruku 'Što nosiš na sebi?' iz čiste dosade.",
      "Nikad nisam namjerno zadirkivao/la tvoje prepone ispod stola.",
      "Nikad nisam probao/la striptiz, a onda prasnuo/la u smijeh.",
      "Nikad nisam polizao/la tvoj znoj nakon treninga.",
      "Nikad nisam zamišljao/la da te vežem lisicama za krevet.",
      "Nikad nisam bio/la napaljen/a na tvoj miris parfema.",
      "Nikad nisam probao/la seks u kadi, a da nije završilo loše.",
      "Nikad nisam imao/la seks na podu iako je krevet bio blizu.",
      "Nikad nisam namjerno izazivao/la svađu da bismo imali pomirbeni seks.",
      "Nikad nisam rekao/la 'stani', a zapravo mislio/la 'nastavi jače'.",
      "Nikad nisam namjerno disao/la ti u vrat da te naježim.",
      "Nikad nisam probao/la okus tvoje kože nakon što si izašao/la iz mora.",
      "Nikad nisam zamišljao/la seks na balkonu hotelske sobe.",
      "Nikad nisam poslao/la poruku koja je trebala ići tebi nekome drugome (prljavu).",
      "Nikad nisam htio/la da me grubo primiš za kosu tijekom poljupca.",
      "Nikad nisam osjetio/la nevjerojatnu napaljenost kad si bio/la ljut/a.",
      "Nikad nisam stavio/la ruku na tvoje bedro dok si vozio/la i ostavio/la je tamo.",
      "Nikad nisam zamišljao/la seks u avionu (mile-high club).",
      "Nikad nisam čitao/la erotske priče zamišljajući nas dvoje u njima.",
      "Nikad nisam kupio/la afrodizijak ili ulje za masažu.",
      "Nikad nisam probao/la skinuti tvoje hlače samo stopalima.",
      "Nikad nisam namjerno hodao/la gol/a po kući samo da te provociram.",
      "Nikad nisam osjetio/la potrebu da vrištim tvoje ime tijekom seksa.",
      "Nikad nisam zamišljao/la kako skidaš haljinu/odijelo na našem vjenčanju.",
      "Nikad nisam probao/la oralni seks u autu dok je netko prolazio.",
      "Nikad nisam zatvorio/la oči i maštao/la o tvom jeziku na mom trbuhu.",
      "Nikad nisam poljubio/la tvoju unutarnju stranu bedra.",
      "Nikad nisam bio/la uzbuđen/a dok si rješavao/la neki kućni popravak.",
      "Nikad nisam namjerno grizao/la usnicu gledajući te.",
      "Nikad nisam osjetio/la orgazam brže nego što sam planirao/la.",
      "Nikad nisam htio/la otkazati sve planove samo da ostanemo u krevetu.",
      "Nikad nisam nosio/la odjeću koja se lako skida samo zbog spoja.",
      "Nikad nisam potajno proučavao/la tvoje tijelo na plaži.",
      "Nikad nisam rekao/la da idem spavati, a zapravo masturbirao/la misleći na tebe.",
      "Nikad nisam poželio/la seks odmah nakon buđenja.",
      "Nikad nisam osjetio/la da mi klecaju koljena nakon tvog poljupca.",
      "Nikad nisam bio/la ponosan/na na zvukove koje ispuštaš u krevetu.",
      "Nikad nisam izmišljao/la ispriku samo da ostanemo sami.",
      "Nikad nisam pomislio/la: 'Ovo je najbolji seks u mom životu.'",
      "Nikad nisam pripremio/la sobu sa svijećama i laticama za seks."
    ],
    hard: [
      "Nikad nisam probao/la vlastiti okus nakon oralnog seksa.",
      "Nikad nisam zamišljao/la igranje uloga u kojem smo potpuni stranci.",
      "Nikad nisam gledao/la pornografiju odmah nakon što si ti otišao/la iz stana.",
      "Nikad nisam imao/la divlji seks u autu na javnom parkingu usred dana.",
      "Nikad nisam potajno razmišljao/la o korištenju lisica i užeta na tebi.",
      "Nikad nisam probao/la nešto novo u krevetu što mi se nije svidjelo, ali sam šutio/la.",
      "Nikad nisam zamišljao/la da nas netko gleda kroz prozor dok se seksamo.",
      "Nikad nisam predložio/la seks samo da prekinem ozbiljnu svađu.",
      "Nikad nisam ostavio/la vrata otključana u nadi da će netko ući dok vodimo ljubav.",
      "Nikad nisam razmišljao/la o snimanju vlastitog kućnog pornića.",
      "Nikad nisam probao/la analni seks s tobom.",
      "Nikad nisam imao/la seks na radnom stolu u uredu.",
      "Nikad nisam koristio/la bič ili neku drugu BDSM spravicu na tebi.",
      "Nikad nisam bio/la grubo vezan/a za krevet na vlastiti zahtjev.",
      "Nikad nisam tražio/la da me šamaraš tijekom seksa.",
      "Nikad nisam gutao/la.",
      "Nikad nisam predložio/la seks dok je netko od rodbine spavao u susjednoj sobi.",
      "Nikad nisam koristio/la hranu u krevetu i požalio/la zbog nereda.",
      "Nikad nisam imao/la seks za jednu noć s nekim prije nego smo mi prohodali.",
      "Nikad nisam simulirao/la orgazam s tobom.",
      "Nikad nisam slao/la golišave slike licem prema kameri.",
      "Nikad nisam imao/la seks u moru ili bazenu.",
      "Nikad nisam maštao/la o tvom najboljem prijatelju / najboljoj prijateljici.",
      "Nikad nisam imao/la fantaziju o profesoru/šefu, a onda je primijenio/la na nama.",
      "Nikad nisam briznuo/la u plač tijekom ili nakon orgazma zbog intenziteta.",
      "Nikad nisam koristio/la vibrator tijekom našeg zajedničkog odnosa.",
      "Nikad nisam gurnuo/la više od dva prsta u partnera/partnericu.",
      "Nikad nisam zaspao/la usred seksa.",
      "Nikad nisam bio/la uhvaćen/a na djelu od strane roditelja ili cimera.",
      "Nikad nisam imao/la seks na javnom zahodu u noćnom klubu.",
      "Nikad nisam probao/la golden shower (uriniranje) iz znatiželje.",
      "Nikad nisam koristio/la prljave riječi na stranom jeziku jer mi zvuče bolje.",
      "Nikad nisam ostavio/la hickey (šljivu) na vidljivom mjestu iz čiste ljubomore.",
      "Nikad nisam išao/la na posao bez donjeg rublja nakon burne noći.",
      "Nikad nisam imao/la orgazam koji je trajao dulje od minute.",
      "Nikad nisam probao/la seks u troje (s drugim ljudima, u prošlosti).",
      "Nikad nisam koristio/la ogledalo da gledam sebe dok me zadovoljavaš.",
      "Nikad nisam probao/la 'pegging' (penetracija muškarca igračkom).",
      "Nikad nisam progutao/la i onda osjetio/la mučninu.",
      "Nikad nisam zamišljao/la da vodim ljubav s nekim poznatim glumcem dok smo mi to radili.",
      "Nikad nisam tražio/la da me gušiš (choking) dok svršavam.",
      "Nikad nisam razbio/la neki komad namještaja (krevet, stol) tijekom seksa.",
      "Nikad nisam bio/la s nekim istog spola.",
      "Nikad nisam gledao/la pornografiju u kojoj ljudi sliče na nas dvoje.",
      "Nikad nisam vrištao/la toliko glasno da su susjedi lupali po zidu.",
      "Nikad nisam probao/la seks za vrijeme menstruacije i uprljao/la cijeli krevet.",
      "Nikad nisam išao/la u sex shop s tobom i osjećao/la se neugodno.",
      "Nikad nisam imao/la seks na haubi automobila.",
      "Nikad nisam tražio/la da svršavaš na moje lice.",
      "Nikad nisam bio/la taj koji je inicirao analni seks.",
      "Nikad nisam kupio/la ogromnu igračku koju smo se bojali isprobati.",
      "Nikad nisam lagao/la o broju svojih bivših seksualnih partnera.",
      "Nikad nisam slao/la poruke bivšima dok smo bili u svađi.",
      "Nikad nisam probao/la snimati naš seks audio snimačem na mobitelu.",
      "Nikad nisam imao/la seks u kinu u zadnjem redu.",
      "Nikad nisam predložio/la seks na prvom spoju u životu.",
      "Nikad nisam koristio/la povez za oči i stvarno se uplašio/la.",
      "Nikad nisam tražio/la da me vrijeđaš tijekom seksa.",
      "Nikad nisam izvodio/la striptiz koji je ispao apsolutno katastrofalno.",
      "Nikad nisam masturbirao/la na poslu u WC-u misleći na tebe.",
      "Nikad nisam poželio/la seks u crkvi ili nekom svetom mjestu.",
      "Nikad nisam probao/la 'roleplay' (igranje uloga) policajca i kriminalca.",
      "Nikad nisam probao/la lizati tvoje cipele ili stopala s gađenjem, ali sam to napravio/la.",
      "Nikad nisam imao/la fetiš na stopala.",
      "Nikad nisam pio/la alkohol s tvog golog tijela.",
      "Nikad nisam imao/la 'one night stand' za koji nikome nisam rekao/la.",
      "Nikad nisam pristao/la na pozu koja mi zadaje jake bolove samo da te zadovoljim.",
      "Nikad nisam bio/la privučen/a boli (mazohizam).",
      "Nikad nisam pljunuo/la u tvoja usta.",
      "Nikad nisam bio/la vezan/a remenom za radijator.",
      "Nikad nisam išao/la na nudističku plažu.",
      "Nikad nisam probao/la seks na snijegu.",
      "Nikad nisam koristio/la lubrikant s efektom hlađenja/grijanja i požalio/la.",
      "Nikad nisam probao/la 'temperature play' (kapanje vrelog voska).",
      "Nikad nisam doživio/la višestruke orgazme zaredom.",
      "Nikad nisam imao/la seks na stepeništu zgrade.",
      "Nikad nisam nosio/la but plug u javnosti ispod odjeće.",
      "Nikad nisam tražio/la da izgovaraš ime mog/tvoje omiljene porno zvijezde.",
      "Nikad nisam imao/la seks koji je trajao dulje od dva sata bez pauze.",
      "Nikad nisam tražio/la da se obučeš u nešto specifično (uniforma).",
      "Nikad nisam prskao/la šampanjac po tvom golom tijelu.",
      "Nikad nisam doživio/la 'ruined orgasm' (prekinut orgazam tik prije vrhunca).",
      "Nikad nisam imao/la seks na perilici rublja dok je centrifugirala.",
      "Nikad nisam rekao/la 'volim te' u trenutku orgazma, a zapravo to nisam mislio/la (u prošlosti).",
      "Nikad nisam kupio/la kondome i osjećao/la se kao da me svi gledaju u trgovini.",
      "Nikad nisam bio/la privučen/a osobom puno starijom od sebe.",
      "Nikad nisam imao/la mokri san o tvom roditelju/bratu/sestri (slučajno).",
      "Nikad nisam probao/la raditi Kegelove vježbe za vrijeme seksa.",
      "Nikad nisam snimao/la seks preko Zoom/Skype poziva.",
      "Nikad nisam išao/la u bolnicu zbog seksualne nezgode.",
      "Nikad nisam posudio/la seksualnu igračku od nekog drugog (i oprao/la).",
      "Nikad nisam tražio/la dozvolu da pretražim tvoj mobitel zbog sumnje u prevaru.",
      "Nikad nisam probao/la gurnuti strani predmet (voće/povrće) u sebe.",
      "Nikad nisam predložio/la seks na kiši u blatu.",
      "Nikad nisam probao/la BDSM seansu s pravim majstorom/majstoricom.",
      "Nikad nisam bio/la toliko pijan/a da se ne sjećam jesmo li imali seks.",
      "Nikad nisam tražio/la seks nakon preživljene prometne ili neke druge nesreće od šoka.",
      "Nikad nisam osjetio/la ljubomoru gledajući te kako gledaš pornić.",
      "Nikad nisam napravio/la profil na aplikaciji za upoznavanje dok sam bio/la u vezi (makar iz šale).",
      "Nikad nisam rekao/la prljavu rečenicu koja je toliko loša da smo prasnuli u smijeh."
    ],
    extreme: [
      "Nikad nisam imao/la seks na javnom mjestu gdje smo jedva izbjegli da nas uhićenje.",
      
    ]
  },
  wyr: {
    soft: [
      { a: "Dobivati poljupce za laku noć svaki dan", b: "Dobivati doručak u krevet svako jutro" },
      { a: "Imati zajednički filmski maraton cijeli vikend", b: "Ići na romantični izlet u planine" },
      { a: "Da uvijek spavamo zagrljeni", b: "Da se držimo za ruke gdje god idemo" },
      { a: "Da te ujutro budim nježnim dodirima", b: "Da te navečer uspavljujem masiranjem" },
      { a: "Dobiti slatku poruku svako jutro", b: "Dobiti dugi zagrljaj svaki put kad se vidimo" },
      { a: "Gledati zalazak sunca na plaži", b: "Gledati zvijezde na planinskom vrhu" },
      { a: "Da ti cijeli dan pjevam omiljenu pjesmu", b: "Da ti čitam knjigu prije spavanja" },
      { a: "Nositi moju omiljenu majicu po kući", b: "Imati moj duks koji miriši na mene" },
      { a: "Da ti kuham omiljeno jelo svake nedjelje", b: "Da zajedno pečemo kolače i zaprljamo se brašnom" },
      { a: "Da te iznenadim buketom cvijeća bez povoda", b: "Da ti kupim onu sitnicu koju si dugo gledao/la" },
      { a: "Imati vikend bez ikakvih ekrana i mobitela", b: "Imati cijeli dan samo za maženje u krevetu" },
      { a: "Da te pohvalim pred svima tvojim prijateljima", b: "Da mi šapneš tajnu na uho u prepunoj prostoriji" },
      { a: "Da ti poklonim ručno pisano ljubavno pismo", b: "Da napravim album naših zajedničkih fotografija" },
      { a: "Da zaspimo uz tvoj omiljeni film", b: "Da zaspimo u tišini držeći se za ruke" },
      { a: "Da te svako jutro dočeka topla kava ili čaj", b: "Da te navečer dočeka topla kupka" },
      { a: "Da te iznenadim vikend putovanjem u prirodu", b: "Da provedemo dan u luksuznom spa centru" },
      { a: "Da te masiram nakon teškog radnog dana", b: "Da ti prepustim daljinski upravljač cijelu večer" },
      { a: "Da te vodim na romantičnu večeru uz svijeće", b: "Da naručimo pizzu i jedemo je na podu dnevne sobe" },
      { a: "Da te poljubim u čelo svaki put kad izlaziš iz kuće", b: "Da te dočekam na vratima s čvrstim zagrljajem" },
      { a: "Da te naučim svoju omiljenu vještinu", b: "Da me ti naučiš nešto što tebe jako zanima" },
      { a: "Da ti posvetim pjesmu na radiju", b: "Da ti otpjevam serenade ispod prozora" },
      { a: "Da imamo kućnog ljubimca o kojem se zajedno brinemo", b: "Da svake godine putujemo u novu državu" },
      { a: "Da ti dam svoju jaknu kad ti je hladno", b: "Da dijelimo jednu veliku dekicu dok nam je toplo" },
      { a: "Da provedemo noć pod vedrim nebom u šatoru", b: "Da odsjemo u udobnoj drvenoj kućici u šumi" },
      { a: "Da te fotografiram dok se smiješ, a da ne znaš", b: "Da snimimo smiješan video za uspomenu" },
      { a: "Da te svako veče pitam kako ti je prošao dan", b: "Da mi ti pričaš svoje snove svako jutro" },
      { a: "Da te držim u naručju dok gledamo kišu", b: "Da šećemo po laganoj ljetnoj kiši bez kišobrana" },
      { a: "Da ti donesem doručak na radno mjesto", b: "Da te iznenadim s posla i vodim na sladoled" },
      { a: "Da ti kupim parfem koji obožavaš", b: "Da mi pokloniš nešto što si sam/a izradio/la" },
      { a: "Da ti svako večer kažem tri razloga zašto te volim", b: "Da ti svako jutro poželim najljepši dan na svijetu" },
      { a: "Da dijelimo jedan sladoled s dvije žlice", b: "Da kušamo različite okuse i pogađamo sastojke" },
      { a: "Da mi pišeš poruke ohrabrenja kad imam težak dan", b: "Da me zagrliš bez riječi kad sam tužan/na" },
      { a: "Da zajedno gledamo stare albume s fotografijama", b: "Da planiramo našu zajedničku budućnost i dom" },
      { a: "Da ti složim omiljenu playlistu za vožnju", b: "Da pjevamo iz glasa u autu s otvorenim prozorima" },
      { a: "Da te masiram po stopalima svaku večer", b: "Da mi ti masiraš dlanove i prste" },
      { a: "Da provedemo dan u muzeju ili galeriji", b: "Da provedemo dan u zabavnom parku na vožnjama" },
      { a: "Da ti napravim iznenađenje za rođendan", b: "Da mi ti prirediš tulum iz snova" },
      { a: "Da ti dam zadnju kockicu čokolade", b: "Da se potučemo oko zadnjeg komada pizze" },
      { a: "Da te zovem nadimkom koji samo ti znaš", b: "Da mi govoriš najljepše riječi na svijetu" },
      { a: "Da tvoje želje uvijek stavljam ispred svojih", b: "Da sve odluke donosimo potpuno zajedno" },
      { a: "Da ti poklonim zvijezdu s neba (simbolično)", b: "Da ti poklonim staru kazetu s našim pjesmama" },
      { a: "Da te poljubim na kiši", b: "Da te poljubim pod snježnim pahuljama" },
      { a: "Da ti pripremam iznenađenja bez povoda", b: "Da slavimo svaku našu malu mjesečnicu" },
      { a: "Da ti budem oslonac u svakoj teškoj situaciji", b: "Da budem tvoj partner u svakoj ludoj avanturi" },
      { a: "Da ti posudim svoju omiljenu knjigu", b: "Da zajedno čitamo istu knjigu poglavlje po poglavlje" },
      { a: "Da te gledam dok spavaš svaku noć", b: "Da se budim prvi/a i kuham ti kavu" },
      { a: "Da te utješim kad plačeš", b: "Da se smijemo do suza na podu dnevne sobe" },
      { a: "Da ti čuvam leđa u svakom trenutku", b: "Da ti dam slobodu kad ti je potrebna samoća" },
      { a: "Da budemo najbolji prijatelji do kraja života", b: "Da budemo srodne duše vezane vječnom ljubavlju" },
      { a: "Da provedemo cijeli život zajedno u malom selu", b: "Da živimo u velikom gradu s pogledom na krovove" }
    ],
    hot: [
      { a: "Seksati se pod tušem s toplom vodom", b: "Seksati se na stražnjem sjedalu auta noću" },
      { a: "Da ti šapćem prostačke i prljave stvari u kinu", b: "Da te strastveno ljubim ispred tvojih prijatelja" },
      { a: "Dobivati provokativne poruke dok si na sastanku", b: "Dobivati ekskluzivne slike na mobitel dok radiš" },
      { a: "Biti uhvaćen/a u javnosti u strastvenom poljupcu", b: "Da nitko ne smije znati što ti radim ispod stola" },
      { a: "Imati seks na kuhinjskom pultu dok kuhamo", b: "Imati seks na debelom tepihu u dnevnoj sobi" },
      { a: "Da te zavedem preko poruka pa da te dočekam u hodniku", b: "Da me ti zaskočiš čim uđem kroz vrata" },
      { a: "Da ti grizem usne dok me ljubiš", b: "Da ti ostavljam crvene tragove po vratu" },
      { a: "Nositi čipkasto rublje ispod obične odjeće cijeli dan", b: "Biti potpuno gol/a ispod kaputa dok hodamo" },
      { a: "Da mi skidaš odjeću presporo i senzualno", b: "Da mi potrgaš majicu u naletu strasti" },
      { a: "Seksati se u sobi s upaljenim svim svjetlima", b: "Seksati se u potpunom mraku uz svijeće" },
      { a: "Da te ljubim od glave do pete pola sata", b: "Da mi pružiš brzi, strastveni i grublji quickie" },
      { a: "Da ti vežem ruke svilenom maramom", b: "Da ti sjednem na lice i ne dam ti da se makneš" },
      { a: "Da vodimo ljubav uz glasnu glazbu", b: "Da vodimo ljubav u potpunoj tišini osluškujući uzdahe" },
      { a: "Da te masiram s toplim uljem i završim seksom", b: "Da me ti iznenadiš seksi masažom kad dođem doma" },
      { a: "Da ti ljubim stopala i prste", b: "Da mi grizeš bedra do ruba bola" },
      { a: "Imati seks na plaži pod zvijezdama", b: "Imati seks na balkonu na visokom katu" },
      { a: "Da ti radim striptiz uz tvoju omiljenu pjesmu", b: "Da mi ti odradiš provokativan ples u krilu" },
      { a: "Da te ljubim dok mi sjediš u krilu u restoranu", b: "Da ti gurnem ruku u hlače dok se vozimo u taksiju" },
      { a: "Da te probudim ranim jutarnjim oralnim seksom", b: "Da te uspavam strastvenim maženjem i parenjem" },
      { a: "Da ti šapnem najprljavniju fantaziju na uho", b: "Da mi je odglumiš bez da progovoriš i riječ" },
      { a: "Da ti cijeli dan ne dozvolim da nosiš donje rublje", b: "Da ja cijeli dan nosim tvoje donje rublje" },
      { a: "Da te diram pred ogledalom dok se oblačiš", b: "Da me gledaš dok se sama/sam zadovoljavam" },
      { a: "Imati seks u tuđoj kući dok su u drugoj sobi", b: "Imati seks u hotelskoj sobi s pogledom na grad" },
      { a: "Da mi ljubiš vrat dok vozim auto", b: "Da ti stavim ruku međunožje dok ti voziš" },
      { a: "Da te mazim ledom po cijelom tijelu", b: "Da mi kaplješ topli vosak po prsima" },
      { a: "Da ti vežem oči i radim što god želim", b: "Da ti meni vežem oči i ispunjavaš moje želje" },
      { a: "Da ti grizem donju usnu do krvi", b: "Da mi grebeš leđa noktima dok svršavam" },
      { a: "Da vodimo ljubav na podu pokraj kreveta", b: "Da vodimo ljubav na perilici rublja koja radi" },
      { a: "Da ti skinem svu odjeću jednim potezom", b: "Da polako otkopčavam svaki gumb na tvojoj košulji" },
      { a: "Da te primim za kosu i povučem tijekom poljupca", b: "Da mi stisneš vrat svojom šakom dok te gledam" },
      { a: "Da te pitam za prljavu uslugu usred ručka", b: "Da mi pošalješ sliku bez gaćica ispod stola" },
      { a: "Imati brzi seks u liftu zgrade", b: "Imati seks na stepenicama u haustoru" },
      { a: "Da ti ljubim svaku oblinu na tijelu sat vremena", b: "Da odmah prijeđemo na stvar bez okolišanja" },
      { a: "Da ti kupim najskuplje i najseksi rublje", b: "Da ga strgajem s tebe u prvih 5 minuta" },
      { a: "Da te diram mokrim prstima cijelu večer", b: "Da mi ližeš uho dok ti šapćem prostote" },
      { a: "Da ti priredim seksi iznenađenje u kupaonici", b: "Da me nađeš golog/u u krevetu s ružom u ustima" },
      { a: "Da mi šapneš koliko te palim na glas", b: "Da mi svršeni osmijeh pokažeš bez riječi" },
      { a: "Da vodimo ljubav tri puta zaredom u jednoj noći", b: "Da vodimo ljubav jednom, ali da traje sat vremena" },
      { a: "Da ti ližem vrat dok kuham ručak", b: "Da me prisloniš uz štednjak dok ti sjednem u krilo" },
      { a: "Da mi kupiš bič ili lisice za rođendan", b: "Da mi kupiš seksi kostim po tvom izboru" },
      { a: "Da te ljubim dok si u kadi punoj pjene", b: "Da se kupamo zajedno i sapunamo jedno drugo" },
      { a: "Da te zavedem u mraku kafića", b: "Da te natjeram da se zacrveniš pred svima" },
      { a: "Da ti pokažem novu pozu koju sam smislio/la", b: "Da radimo našu staru provjerenu klasiku do kraja" },
      { a: "Da ti ljubim intimne dijelove na javnom mjestu", b: "Da me zadovoljavaš dok nas dijeli tanki zid" },
      { a: "Da te grizem po stražnjici dok hodamo po stanu", b: "Da mi udaraš pljeskove po guzi dok perem suđe" },
      { a: "Da ti dam potpunu kontrolu nad mojim tijelom", b: "Da ja preuzmem apsolutnu dominaciju nad tobom" },
      { a: "Da mi priznaš s kim si želio/la spavati prije mene", b: "Da mi priznaš da ti nitko nikad nije bio bolji u krevetu" },
      { a: "Da vodimo ljubav bez prekidanja cijelo popodne", b: "Da nasred dnevne sobe imamo divlji petominutni seks" },
      { a: "Da ti šapnem najprljavniju tajnu na uho", b: "Da mi ispuniš najluđu želju bez postavljanja pitanja" },
      { a: "Da te gledam u oči dok doživljavaš vrhunac", b: "Da mi zatvoriš oči i natjeraš me da svrsim na silu" }
    ],
    hard: [
      { a: "Biti čvrsto vezan/a kožnim lisicama za krevet cijelu noć", b: "Da ti mene vežeš i držiš mi oči povezane dok ti radim što želim" },
      { a: "Imati seks pred velikim ogledalom u spavaćoj sobi", b: "Snimati naš cijeli seksi odnos kamerom izbliza" },
      { a: "Igrati ulogu strogo dominantnog šefa i submisivne tajnice", b: "Igrati ulogu strogog trenera i poslušne sportašice" },
      { a: "Da ti ja diktiram što ćeš točno odjenuti sljedećih tjedan dana", b: "Da ti meni diktiraš s kimmi je zabranjeno komunicirati" },
      { a: "Da budem dominantan/na i grub/a prema tebi cijelu noć", b: "Da budem potpuno submisivan/na i da ti ispunjavam hira" },
      { a: "Imati grubi seks na podu dnevne sobe bez ikakvih pravila", b: "Imati spori, izrazito perverzni i dugi seks s potpunom kontrolom" },
      { a: "Da ti pljusnem po guzi svaki put kad prođeš pokraj mene", b: "Da mi grizeš vrat dok ne ostane velika i vidljiva šljiva" },
      { a: "Da te skinem golog/u i ostavim te u kutu sobe 10 minuta bez dodira", b: "Da me staviš u pozu u kojoj se ne mogu micati dok me gledaš" },
      { a: "Da ti čistim intimne dijelove isključivo svojim jezikom", b: "Da mi guraš prste u usta nakon što si me dirao/la" },
      { a: "Upotrijebiti vibrator na tebi dok ti sjedim na licu", b: "Dopustiti mi da te vežem u neudobnu pozu na 15 minuta" },
      { a: "Imati seks na balkonu dok nam susjedi mogu vidjeti siluete", b: "Imati seks u mračnom haustoru ispred tuđih vrata" },
      { a: "Da mi priznaš sve svoje najmračnije seksualne maštarije", b: "Da mi priznaš tko ti je bio najprivlačniji na ulici danas" },
      { a: "Da te diram samo s ledom po tvojim najosjetljivijim dijelovima", b: "Da mi kapaš vreli vosak po unutarnjoj strani bedara" },
      { a: "Da mi vežeš ruke i radiš sa mnom što god poželiš bez pitanja", b: "Da ja tebe vezanog/nu izludim do ruba suza i ne dam ti da svršiš" },
      { a: "Da vodimo ljubav u potpunoj tišini dok nam se pogledi ne odvoje", b: "Da vrištimo jedno na drugo i psujemo dok vodimo ljubav" },
      { a: "Da ti stavim povez na oči i dovedem te u nepoznatu prostoriju", b: "Da mi vežeš ruke iznad glave i preuzmeš potpunu kontrolu" },
      { a: "Da ti ljubim stopala jezikom dok klečiš preda mnom", b: "Da mi ližеш cipele dok te ja držim za kosu" },
      { a: "Da ti gurnem dva prsta duboko u usta dok te ljubim", b: "Da me držiš za vrat s dvije ruke dok vodimo ljubav" },
      { a: "Da imamo seks dok ti zvoni budilica i moraš šutjeti", b: "Da imamo seks u autu dok je vani dan i ljudi prolaze" },
      { a: "Da te prisilim da svršiš samo pomoću ruku, bez penetracije", b: "Da te primim za kosu i natjeram te na duboki oralni seks" },
      { a: "Da ti zavežem noge za tvoje rameni pojas", b: "Da mi digneš noge visoko u zrak i držiš me čvrsto" },
      { a: "Da ti stavim povez na oči i radim stvari s ledom i perjem", b: "Da me udaraš remenom po stražnjici dok ne pocrvenim" },
      { a: "Da mi priznaš je li ti ikada bilo dosadno tijekom našeg seksa", b: "Da mi priznaš s kim si iz društva htio/la završiti u krevetu" },
      { a: "Da ti vežem ruke za krevet i odem iz sobe na 5 minuta", b: "Da me ostaviš golog/u zavezanog/nu na hladnom podu" },
      { a: "Da te izludim s predigrom od sat vremena bez samog čina", b: "Da skočim na tebe i imamo divlji seks bez ikakve predigre" },
      { a: "Da ti nanosim blagu bol čupanjem i grebanjem po leđima", b: "Da mi ližeš svaku kap znoja s tijela nakon treninga" },
      { a: "Imati grubi analni seks s lubrikantom", b: "Imati dugi i strastveni oralni seks s gutanjem" },
      { a: "Da ti vežem ruke i pokrijem te dekom dok se ja zadovoljavam", b: "Da me držiš čvrsto za struk dok te ja jaham bez prestanka" },
      { a: "Da ti naredim da klečiš pokraj kreveta dok ti se obraćam s 'gospodaru/ice'", b: "Da mi skineš svu odjeću zubima i bacaš me po krevetu" },
      { a: "Da te vežem za stolicu i radim što god poželim s tvojim tijelom", b: "Da mi vežeš ruke za leđa i kontroliraš svaki moj uzdah" },
      { a: "Da ti stavim štipaljke na bradavice na 5 minuta", b: "Da mi staviš povez na oči i pogađaš čime te dodirujem" },
      { a: "Da vodimo ljubav s upaljenom kamerom koja nas snima", b: "Da imamo seks na podu dok nam netko spava u susjednoj sobi" },
      { a: "Da te primim za kosu i povučem glavu unatrag tijekom seksa", b: "Da mi pljuneš u usta dok se strastveno ljubimo" },
      { a: "Da ti vežem ruke, a ti meni povežeš oči", b: "Da zamijenimo uloge i da ti meni radiš sve što ja tebi" },
      { a: "Da ti ljubim svaku ogrebotinu i modricu koju sam ti napravio/la", b: "Da mi napraviš pet novih modrica na skrivenim mjestima" },
      { a: "Da ti stavim prsten na tvoj najosjetljiviji dio tijela", b: "Da mi vežeš noge široko raširene trakom za krevet" },
      { a: "Da ti priznam najperverzniju misao koju sam imala o tvom prijatelju/ici", b: "Da mi priznaš jesi li ikada masturbirao/la na tuđu sliku" },
      { a: "Da ti vežem ruke i diram te isključivo vibratorom", b: "Da mi držiš ruke iznad glave dok te ja pljuskam po licu" },
      { a: "Da ti zavežem oči i radim ti nepoznate stvari po tijelu", b: "Da mi narediš da skidam komad po komad odjeće na hladnom" },
      { a: "Da provedemo cijelu noć u pozama koje nas bole idući dan", b: "Da imamo seks na kiši vani ispred kuće" },
      { a: "Da ti stavim povez na oči i nahranim te voćem sa svog tijela", b: "Da mi ližeš intimne dijelove nakon žestokog sramoćenja" },
      { a: "Da ti vežem ruke i noge istovremeno u čvor", b: "Da me držiš čvrsto pritisnutog/nu uza zid dok te molim za milost" },
      { a: "Da ti nanesem par udaraca po stražnjici kožnim remenom", b: "Da mi grebeš prsa noktima dok ne potekne malo krvi" },
      { a: "Da ti naredim da šutiš i ne mičeš se dok te ja palim", b: "Da mi narediš da vrištim tvoje ime dok svršavam" },
      { a: "Da ti zavežem usta maramom da ne možeš vikati", b: "Da mi vežeš ruke i stavš mi lopticu u usta (gag)" },
      { a: "Da vodimo ljubav s povezom na očima u potpunoj tišini", b: "Da imamo seks na visokom krovu zgrade noću" },
      { a: "Da ti radim oralni seks dok ti jecaš od uzbuđenja", b: "Da mi svršavaš po licu i tijelu bez skrivanja" },
      { a: "Da ti vežem ruke i ostavim te da se mučiš željeznom voljom", b: "Da me natjeraš da pužem po podu i molim te za dodir" },
      { a: "Da ti nanosim bol iglicama ili čupanjem dlaka", b: "Da mi guraš prste u usta i uši dok vodimo ljubav" },
      { a: "Da ti vežem ruke i radim s tobom apsolutno sve što mi padne na pamet", b: "Da ja tebe zavežem i da ti ja vodim cijelu igru bez tvojih prigovora" }
    ],
    extreme: [
      { a: "Imati otvorenu vezu u kojoj možemo spavati s drugim ljudima po dogovoru", b: "Imati trojac s drugom osobom po tvom izboru" },
      { a: "Da te zavežem za krevet, stavim ti lopticu u usta i ostavim te 2 sata", b: "Da ja tebe vezanog/nu izložim potpunom ponižavanju i dominaciji" },
      { a: "Seksati se na javnom mjestu u 12 sati ujutro na prepunom trgu", b: "Seksati se u mračnom kinu dok ljudi sjede oko nas" },
      { a: "Da ti kapljem vreli vosak iz svijeće direktno po genitalijama", b: "Da ti trljam ljutu papričicu ili mentol po osjetljivim dijelovima" },
      { a: "Da ti vežem ruke i noge, a zatim pozovem stranca da te gleda", b: "Da ja tebe prodam na jedan dan kao seksualnog roba/robpukinju" },
      { a: "Analni seks bez lubrikanta s maksimalnom grubošću", b: "Korištenje najvećih mogućih igračaka do granice izdržljivosti" },
      { a: "Da ti napravim duboke modrice i posjekotine po tijelu tijekom seksa", b: "Da mi ubadneš igle u kožu na nerazumljivim mjestima" },
      { a: "Da ti vežem ruke za cijelu noć i silujem te (u dogovorenoj igri)", b: "Da ja tebi radim apsolutno sve što želim bez obzira na tvoje 'ne'" },
      { a: "Imati grupni seks s više nepoznatih ljudi u istoj prostoriji", b: "Snimiti naš domaći pornić i objaviti ga na internetu" },
      { a: "Da ti odrubim dotok zraka (gušenje) dok ne izgubiš svijest na sekundu", b: "Da mi lomiš prste ili nanosiš teške bolove tijekom vrhunca" },
      { a: "Da ti stavim ogrlicu s lancem oko vrata i vodim te na povodcu vani", b: "Da mi pljuješ u lice i gaziš me nogama dok ležim gol/a" },
      { a: "Da ti zavežem oči, vežem te za stol i radim što god želim s tobom", b: "Da ja tebe zavežem u podrumu na 24 sata bez hrane i vode" },
      { a: "Da ti gurnem cijelu šaku u tvoje intimne dijelove", b: "Da mi režeš komadić kože ili radiš tetovažu uživo" },
      { a: "Da ti nanosim opekline ili žar cigarete po leđima", b: "Da mi nanosiš elektrošokove malim uređajem dok svršavam" },
      { a: "Da te prisilim da pojedeš ili popiješ moje tjelesne izlučevine", b: "Da ja tebe natjeram da ližeš pod nakon našeg seksa" },
      { a: "Imati seks s nepoznatom osobom u mračnoj sobi bez razgovora", b: "Imati seks s partnerovim najboljim prijateljem/prijateljicom" },
      { a: "Da ti vežem ruke, stavim povez i ostavim te u šumi na 3 sata", b: "Da mi nanosiš teške fizičke ozljede šakama u trbuh" },
      { a: "Da ti napravim piercing na intimnom mjestu bez anestezije", b: "Da mi čupaš nokte s ruku kliještima tijekom igrice" },
      { a: "Da ti vežem ruke i nanesem ti bol s nožem ili oštricom", b: "Da mi vežeš udove za četiri različita automobila (simbolično/igra)" },
      { a: "Da te pretvorim u svoju kućnu životinju na tjedan dana bez prava glasa", b: "Da ti meni uništiš svu osobnu imovinu da dokažeš ljubav" },
      { a: "Imati grubi seks s vezivanjem na groblju noću", b: "Imati seks u napuštenoj psihijatrijskoj bolnici" },
      { a: "Da ti ubrizgam nešto u tijelo ili dam tablete za halucinacije prije seksa", b: "Da mi vežeš ruke i ostaviš me zavezanog/nu na kiši cijelu noć" },
      { a: "Da ti pljujem u usta i tjeram te da progutaš", b: "Da mi dereš odjeću s tijela dok te batinam remenom" },
      { a: "Da ti zavežem usta, oči i uši te te ostavim u potpunoj izolaciji", b: "Da me udaraš šakama u glavu dok ne potekne puno krvi" },
      { a: "Da te prisilim na seksualni čin koji ti se izrazito gadi", b: "Da ti napravim trajnu ožiljastu ozljedu na tijelu kao znak" },
      { a: "Imati seks na autocesti za vrijeme najveće gužve", b: "Imati seks u policijskoj stanici ili u marici" },
      { a: "Da ti vežem ruke i koristim te kao stol za jelo i piće", b: "Da mi polomiš rebro tijekom grubog i nekontroliranog seksa" },
      { a: "Da ti nanesem bol s vrućim željezom ili metalom", b: "Da mi vežeš genitalije konopcem i zatežeš ih" },
      { a: "Da te natjeram da gledaš kako spavam s nekim drugim", b: "Da me natjeraš da prodam svoje tijelo strancu za novac" },
      { a: "Imati sotonistički ili mračni ritualni seks u podrumu", b: "Imati seks s maskama monstruma u mraku" },
      { a: "Da ti vežem ruke, zatvorim u kavez i držim te kao psa", b: "Da mi staviti brnjicu na usta i vodiš me golog/u po gradu" },
      { a: "Da ti trljam sol ili ocat na otvorene rane tijekom seksa", b: "Da mi nanosiš maksimalnu bol dok ne počnem halucinirati" },
      { a: "Imati seks na oltaru u napuštenoj crkvi", b: "Imati seks u kavezu s divljim životinjama (u zoološkom)" },
      { a: "Da ti zavežem cijelo tijelo trakom da se ne možeš ni pomaknuti", b: "Da mi napraviš rezove po koži u obliku naših inicijala" },
      { a: "Da te prisilim da ližeš krv sa svojih rana", b: "Da mi vežeš ruke i nabiješ me na kolac (igra s velikom igračkom)" },
      { a: "Imati petosatni maraton bolesnog i ekstremnog BDSM-a bez milosti", b: "Prepustiti se potpunom uništenju vlastitog dostojanstva u krevetu" },
      { a: "Da ti zavežem ruke, stavim te u prtljažnik auta i vozim te u nepoznato", b: "Da mi vežeš ruke i ostaviš me na zavezanog/nu na tavanu" },
      { a: "Da ti nanesem teške opekline s kipućom vodom ili uljem", b: "Da mi polomiš prste na nogama čekićem u igri moći" },
      { a: "Imati seks na dnu hladnog bazena pod vodom", b: "Imati seks na rubu visokog nebodera bez zaštite" },
      { a: "Da ti vežem ruke i tjeram te da piješ alkohol iz moje zdjelice", b: "Da mi guraš strane predmete u tijelo bez kontrole" },
      { a: "Da te prisilim da odabereš tko će te od naših prijatelja kazniti", b: "Da mi uništiš sve moje tajne i objaviš ih javno ako odbijem seks" },
      { a: "Imati divlji seks u središtu aktivnog prosvjeda ili nereda", b: "Imati seks pred tvojom cijelom obitelji na ručku" },
      { a: "Da ti vežem ruke i ostavim te da plačeš u mraku dok ne shvatiš", b: "Da mi nanosiš bol električnom četkicom ili palicom" },
      { a: "Da ti čupam kosu s korijenom dok ne ostanu ćelave mrlje", b: "Da mi uništiš lice šminkom i ožiljcima za cijeli život" },
      { a: "Imati najgrublji mogući grupni BDSM tulum u tajnom klubu", b: "Prepustiti se partneru da s tobom radi apsolutno sve bez ikakvih zabrana" },
      { a: "Da ti zavežem udove i bacimm te u hladnu rijeku na 10 sekundi", b: "Da mi vežeš ruke i ostaviš me bez zraka do ruba opasnosti" },
      { a: "Da ti nanesem bol s vrelim žigom na koži", b: "Da mi odsječeš pramen kose i zapališ ga pred mojim očima" },
      { a: "Imati seks s nekim tko te mrzi na prljavom tavanu", b: "Imati seks u zatvorskoj ćeliji s osuđenikom" },
      { a: "Da ti vežem ruke, stavim povez i tjeram te da hodaš po staklu", b: "Da mi vežeš ruke i udaraš me šakama dok ne padnem u nesvijest" },
      { a: "Da se odreknemo slobode i potpišemo ugovor o potpunom ropstvu", b: "Da završimo ovu igru i odmah se prepustimo našoj najluđoj maštariji" }
    ]
  },
  dice: {
    soft: {
      actions: [
        "Poljubi", "Nježno masiraj", "Pomiluj", "Puhni u", "Nasloni glavu na",
        "Pomiriši", "Dodirni nosom", "Polagano gladi", "Ostavi nježan poljubac na",
        "Prisloni usne na", "Mazi prstima", "Kruži prstima po", "Toplo dahni na",
        "Snažno zagrli", "Nježno stisni", "Poljubi tri puta zaredom", "Prisloni obraz na",
        "Prelazi usnama preko", "Sklopi oči i poljubi", "Pogladi kosom"
      ],
      parts: [
        "moj vrat", "moj obraz", "moju ruku", "moju kosu", "moje rame",
        "moj dlan", "moje čelo", "moj vrh nosa", "moje zapešće", "moje prste",
        "moj lakat", "moju podlakticu", "moja leđa", "moju ključnu kost", "moj potiljak"
      ]
    },
    hot: {
      actions: [
        "Liži", "Lagano grickaj", "Strastveno poljubi", "Skini odjeću sa", "Čvrsto stisni",
        "Prelazi jezikom preko", "Ostavi mokri poljubac na", "Trljaj nos o", "Zadiraj prstima u",
        "Polako otkopčaj", "Grickaj i povlači", "Zadrži usne 10 sekundi na", "Polako ljubi",
        "Skini rukama", "Gledaj me u oči i diraj", "Šapni prostotu dok diraš", "Klizi rukama niz",
        "Zadirkuj usnama", "Prelazi noktima preko", "Snažno udahni miris na"
      ],
      parts: [
        "moje usne", "moj trbuh", "moj donji dio leđa", "moje bedro", "moja prsa",
        "moje grudi", "moj bok", "moj ušni režanj", "moju stražnjicu", "moju potkoljenicu",
        "moju kožu ispod majice", "moje golo rame", "moj donji trbuh", "moju unutarnju stranu ruke", "moj goli struk"
      ]
    },
    hard: {
      actions: [
        "Ugrizni", "Siši", "Ostavi trag (šljivu) na", "Pljesni", "Poliži usnama",
        "Čvrsto uhvati", "Zagrizi pa poliži", "Grebi noktima po", "Povuci", "Trljaj svoje tijelo o",
        "Kapni malo pića na i poliži", "Stisni s obje ruke", "Masiraj grubo", "Gurni ruku na",
        "Pritisni usne snažno na", "Ostavi crveni trag na", "Uštipni", "Udari lagano",
        "Prisloni kockicu leda na", "Trljaj kroz donje rublje"
      ],
      parts: [
        "moje unutarnje bedro", "moju stražnjicu", "moje međunožje", "moju ključnu kost", "moj vrat",
        "moju bradavicu", "moje donje rublje", "moj goli trbuh", "moj donji dio leđa", "moju gornju usnu",
        "moju kožu", "moje bokove", "moje prepone", "moju osjetljivu zonu", "moje golo bedro"
      ]
    },
    extreme: {
      actions: [
        "Pruži oralno na", "Kapaj vrući vosak na", "Zadovolji", "Stavi led na", "Trljaj ulje o",
        "Veži uže oko", "Gurni prste u", "Liži agresivno", "Udari kožnim remenom po", "Grebi do crvenila po",
        "Pljesni jako po", "Siši dok ne zaboli", "Nanesi bol na", "Prisloni igračku (vibrator) na",
        "Zadirkuj jezikom", "Tretiraj grubo", "Ugrizi do jakog traga na", "Ostavi modricu od ugriza na",
        "Polij alkoholom/pićem i poliži", "Sjedni licem na"
      ],
      parts: [
        "moju najosjetljiviju zonu", "moju stražnjicu", "moje intimne dijelove", "moje bradavice",
        "moj donji dio trbuha", "moj analni otvor", "moju g-točku / slabu točku", "moje unutarnje prepone",
        "moje vezane ruke", "moje gole grudi", "moju kožu ispod rublja", "moj vratni mišić",
        "moju donju usnu", "moje međunožje", "moj goli trbuh"
      ]
    }
  }
};

const guessWords = {
  "Filmovi i Serije": [
    "Titanic", "Harry Potter", "Gospodar prstenova", "Sam u kući", "Prijatelji", "Teorija velikog praska", "Igra prijestolja", "Breaking Bad", "Kum", "Matrix",
    "Avatar", "Deadpool", "Spiderman", "Batman", "Joker", "Forrest Gump", "Gladijator", "Zgodna žena", "Prljavi ples", "Bilježnica",
    "Sumrak", "Shrek", "Kralj lavova", "Mad Max", "Transformersi", "Brzi i žestoki", "Mamurluk", "Američka pita", "Terminator", "Rocky",
    "Rambo", "Umri muški", "Indiana Jones", "Jurski park", "Povratak u budućnost", "E.T.", "Ralje", "Isijavanje", "Psiho", "Casablanca",
    "Zameo ih vjetar", "Vrisak", "Noć vještica", "Petak 13.", "Slagalica strave", "Alien", "Predator", "Zvjezdane staze", "Zvjezdani ratovi", "Osvetnici",
    "Iron Man", "Kapetan Amerika", "Thor", "Crna udovica", "Čuvari galaksije", "Doktor Strange", "Ant-Man", "X-Men", "Wolverine", "Logan",
    "Simpsonovi", "South Park", "Family Guy", "Rick i Morty", "Futurama", "Spužva Bob", "Tom i Jerry", "Zekoslav Mrkva", "Scooby Doo", "Dexter",
    "Združena braća", "Obitelj Soprano", "Žica", "Momci s Madisona", "Peaky Blinders", "Stranger Things", "La Casa de Papel", "Squid Game", "Kruna", "Crno ogledalo",
    "Damin gambit", "Narcos", "Ozark", "Uvod u anatomiju", "Dr. House", "Hitna služba", "Puna kuća", "Princ iz Bel Aira", "Seinfeld", "U uredu",
    "Parks and Recreation", "Moderna obitelj", "Kako sam upoznao vašu majku", "Dva i pol muškarca", "Zlatne djevojke", "Seks i grad", "Tračerica", "Vampirski dnevnici", "Lovci na natprirodno", "Dosjei X"
  ],
  "Hrana i Piće": [
    "Pizza", "Ćevapi", "Burek", "Sarma", "Grah", "Gulaš", "Pršut", "Sir", "Masline", "Kruh",
    "Tjestenina", "Rižoto", "Špageti", "Njoki", "Lazanje", "Palačinke", "Sladoled", "Čokolada", "Torta", "Keksi",
    "Krafna", "Pita", "Štrudla", "Jabuka", "Banana", "Naranča", "Limun", "Jagoda", "Malina", "Borovnica",
    "Lubenica", "Dinja", "Grožđe", "Breskva", "Šljiva", "Kruška", "Ananas", "Kivi", "Mango", "Avokado",
    "Rajčica", "Krastavac", "Paprika", "Luk", "Češnjak", "Krumpir", "Mrkva", "Kupus", "Salata", "Brokula",
    "Cvjetača", "Grašak", "Kukuruz", "Gljive", "Špinat", "Blitva", "Meso", "Piletina", "Svinjetina", "Govedina",
    "Teletina", "Janjetina", "Riba", "Lignje", "Rakovi", "Školjke", "Jaja", "Mlijeko", "Jogurt", "Maslac",
    "Ulje", "Sol", "Papar", "Šećer", "Med", "Marmelada", "Kava", "Čaj", "Voda", "Sok",
    "Pivo", "Vino", "Rakija", "Liker", "Viski", "Votka", "Džin", "Rum", "Koktel", "Šampanjac",
    "Cedevita", "Coca-Cola", "Fanta", "Sprite", "Red Bull", "Sendvič", "Hamburger", "Hot dog", "Pomfrit", "Čips"
  ],
  "Životinje": [
    "Pas", "Mačka", "Miš", "Štakor", "Hrčak", "Zec", "Konj", "Krava", "Svinja", "Ovca",
    "Koza", "Kokoš", "Pijetao", "Patka", "Guska", "Purica", "Ptica", "Papiga", "Golub", "Vrabac",
    "Sova", "Orao", "Sokol", "Galeb", "Roda", "Labud", "Pingvin", "Noj", "Riba", "Morski pas",
    "Kit", "Delfin", "Hobotnica", "Meduza", "Zvijezda", "Rak", "Kornjača", "Zmija", "Gušter", "Krokodil",
    "Aligator", "Žaba", "Pauk", "Škorpion", "Mrav", "Pčela", "Osa", "Muha", "Komarac", "Leptir",
    "Skakavac", "Bubamara", "Crv", "Puž", "Lav", "Tigar", "Leopard", "Gepard", "Pantera", "Slon",
    "Nosorog", "Vodenkonj", "Žirafa", "Zebra", "Majmun", "Gorila", "Čimpanza", "Medvjed", "Vuk", "Lisica",
    "Jelen", "Srna", "Divlja svinja", "Vjeverica", "Rakun", "Tvor", "Dabar", "Krtica", "Šišmiš", "Klokan",
    "Koala", "Panda", "Ljenjivac", "Deva", "Ljama", "Alpaka", "Bizon", "Jastreb", "Pelikan", "Flamingo",
    "Tukan", "Kolibrić", "Som", "Šaran", "Pastrva", "Štuka", "Tuna", "Losos", "Bakalar", "Iguana"
  ],
  "Seksi pojmovi": [
    "Poljubac", "Usne", "Vrat", "Zagrljaj", "Strast", "Ljubav", "Seks", "Masaža", "Dodir", "Orgazam",
    "Uzbuđenje", "Želja", "Maženje", "Krevet", "Posteljina", "Jastuk", "Donje rublje", "Grudnjak", "Gaćice", "Čipka",
    "Podvezice", "Najlonke", "Štikle", "Parfem", "Svijeća", "Romantika", "Vino", "Šampanjac", "Večera", "Spoj",
    "Pogled", "Osmijeh", "Flert", "Zavođenje", "Predigra", "Penetracija", "Vrhunac", "Stenjanje", "Uzdah", "Šaputanje",
    "Ugriz", "Šljiva", "Grebanje", "Nokti", "Koža", "Znoj", "Tijelo", "Oblina", "Grudi", "Stražnjica",
    "Bedra", "Međunožje", "Jezik", "Pljuvačka", "Oralno", "Ručno", "Igračke", "Vibrator", "Bič", "Lisice",
    "Uže", "Vezivanje", "Dominacija", "Submisivnost", "Gospodar", "Robinja", "Kazna", "Nagrada", "Povez", "Led",
    "Vosak", "Ulje", "Lubrikant", "Kama Sutra", "Poza", "Doggy", "Misionarska", "Kaubojka", "Žlica", "Tuš",
    "Kada", "Ogledalo", "Kamera", "Snimka", "Slike", "Poruke", "Poziv", "Golo", "Skidanje", "Gumbi",
    "Patent", "Zatvarač", "Striptiz", "Lap dance", "Ples", "Ritam", "Bokovi", "Trbuh", "Leđa", "Kosa"
  ],
  "Poznate Osobe": [
    "Brad Pitt", "Angelina Jolie", "Leonardo DiCaprio", "Johnny Depp", "Tom Cruise", "Keanu Reeves", "Will Smith", "Denzel Washington", "Morgan Freeman", "Robert De Niro",
    "Al Pacino", "Marlon Brando", "Clint Eastwood", "Harrison Ford", "Tom Hanks", "Meryl Streep", "Julia Roberts", "Sandra Bullock", "Nicole Kidman", "Charlize Theron",
    "Scarlett Johansson", "Jennifer Lawrence", "Emma Stone", "Natalie Portman", "Anne Hathaway", "Marilyn Monroe", "Audrey Hepburn", "Elvis Presley", "Michael Jackson", "Madonna",
    "Lady Gaga", "Beyonce", "Rihanna", "Taylor Swift", "Katy Perry", "Ariana Grande", "Justin Bieber", "Ed Sheeran", "Eminem", "Snoop Dogg",
    "Tupac", "Biggie", "Jay-Z", "Kanye West", "Drake", "Cristiano Ronaldo", "Lionel Messi", "Luka Modrić", "LeBron James", "Michael Jordan",
    "Kobe Bryant", "Novak Đoković", "Roger Federer", "Rafael Nadal", "Serena Williams", "Muhammad Ali", "Mike Tyson", "Usain Bolt", "Albert Einstein", "Nikola Tesla",
    "Isaac Newton", "Galileo Galilei", "Charles Darwin", "Stephen Hawking", "Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg", "Jeff Bezos", "Barack Obama",
    "Donald Trump", "Joe Biden", "Vladimir Putin", "Winston Churchill", "Nelson Mandela", "Martin Luther King", "Mahatma Gandhi", "Majka Terezija", "Princeza Diana", "Kraljica Elizabeta",
    "Papa Franjo", "Dalai Lama", "William Shakespeare", "Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Mozart", "Beethoven", "Bach", "Severina",
    "Gibonni", "Oliver Dragojević", "Mišo Kovač", "Dino Dvornik", "Tony Cetinski", "Petar Grašo", "Danijela Martinović", "Nina Badrić", "Jelena Rozga", "Maja Šuput"
  ],
  "Sport i Hobiji": [
    "Nogomet", "Košarka", "Rukomet", "Odbojka", "Tenis", "Stolni tenis", "Badminton", "Skijanje", "Klizanje", "Hokej",
    "Vaterpolo", "Plivanje", "Ronjenje", "Veslanje", "Jedrenje", "Surfanje", "Trčanje", "Maraton", "Sprint", "Skok u dalj",
    "Skok u vis", "Bacanje kugle", "Bacanje koplja", "Gimnastika", "Ritmička gimnastika", "Aerobik", "Zumba", "Joga", "Pilates", "Fitness",
    "Bodybuilding", "Dizanje utega", "Boks", "Kickboks", "Karate", "Judo", "Taekwondo", "Hrvanje", "MMA", "Mačevanje",
    "Streljaštvo", "Luk i strijela", "Biciklizam", "Motociklizam", "Formula 1", "Reli", "Karting", "Jahanje", "Polo", "Golf",
    "Biljar", "Kuglanje", "Boćanje", "Pikado", "Šah", "Poker", "Planinarenje", "Alpinizam", "Penjanje", "Kampiranje",
    "Ribolov", "Lov", "Fotografija", "Slikanje", "Crtanje", "Kiparstvo", "Pletenje", "Šivanje", "Kuhanje", "Pečenje",
    "Vrtlarstvo", "Čitanje", "Pisanje", "Blogiranje", "Vlogging", "Gaming", "Programiranje", "Elektronika", "Robotika", "Maketarstvo",
    "Skupljanje markica", "Numizmatika", "Astronomija", "Promatranje ptica", "Gledanje filmova", "Slušanje glazbe", "Sviranje gitare", "Sviranje klavira", "Pjevanje", "Ples",
    "Balet", "Breakdance", "Hip hop", "Skupljanje antikviteta", "Zbor", "Volontiranje", "Planiranje putovanja", "Kaligrafija", "Origami", "Burza"
  ]
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
    const [selectedCats, setSelectedCats] = useState([]);
    const [activeWords, setActiveWords] = useState(null);
    const [word, setWord] = useState("");
    const [instruction, setInstruction] = useState("");

    const toggleCat = (cat) => {
      setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    };

    const startGame = () => {
      if (selectedCats.length === 0) return;
      let pool = [];
      selectedCats.forEach(cat => { pool = [...pool, ...guessWords[cat]]; });
      setActiveWords(pool);
      const { active, other } = getBothPlayers();
      setInstruction(`${active} drži mobitel, a ${other} objašnjava!`);
      setWord("Spremni? Dodirni za početak!");
    };

    const nextWord = (e) => {
      e.stopPropagation();
      if (activeWords.length === 0) {
        setWord("🔥 KRAJ! Pogođene su sve riječi! 🔥");
        return;
      }
      const index = Math.floor(Math.random() * activeWords.length);
      const picked = activeWords[index];
      const newPool = [...activeWords];
      newPool.splice(index, 1); // Briše riječ da se ne ponovi
      setActiveWords(newPool);
      setWord(picked);
    };

    if (!activeWords) {
      return (
        <div className="app-container">
          <h2 className="subtitle" style={{ color: '#10b981' }}>Pogodi Riječ</h2>
          <p style={{ color: '#9ca3af', marginBottom: '20px' }}>Odaberi jednu ili više kategorija za miješanje!</p>
          <div className="grid-menu" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {Object.keys(guessWords).map((cat) => (
              <button key={cat} onClick={() => toggleCat(cat)}
                className={`card ${selectedCats.includes(cat) ? 'neon-emerald' : ''}`}
                style={{ padding: '15px', borderColor: selectedCats.includes(cat) ? '#10b981' : 'rgba(255,255,255,0.2)', backgroundColor: selectedCats.includes(cat) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.3)' }}>
                <span className="card-title" style={{ color: selectedCats.includes(cat) ? '#10b981' : 'white', fontSize: '1rem', marginTop: 0 }}>{cat}</span>
              </button>
            ))}
          </div>
          {selectedCats.length > 0 && (
            <button onClick={startGame} className="btn-main bg-guess" style={{ marginTop: '30px' }}>ZAPOČNI IGRU</button>
          )}
          <button onClick={() => setActiveGame(null)} className="back-btn"><ArrowLeft size={20} /> Natrag</button>
        </div>
      );
    }

    return (
      <div className="word-guess-screen" onClick={nextWord}>
        <p style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '10px' }}>Preostalo riječi: {activeWords.length}</p>
        <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>{instruction}</p>
        <h1 className="word-text">{word}</h1>
        <button onClick={(e) => { e.stopPropagation(); setActiveWords(null); setSelectedCats([]); }} className="back-btn" style={{ position: 'absolute', bottom: '40px', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '30px' }}><ArrowLeft size={20}/> Promijeni kategorije</button>
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