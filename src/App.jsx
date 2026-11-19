import React, { useState } from 'react';
import { Heart, Flame, Zap, Eye, Dice5, Layers, ArrowLeft, Timer, Users, Ticket, HelpCircle } from 'lucide-react';

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
        "Koja je najljepša uspomena koju imaš s naših putovanja ili izleta?",
        "Što si prvo pomislio/la kada si upoznao/la moje roditelje ili obitelj?",
        "Koji moj talent ili vještinu najviše cijeniš?",
        "Da moraš odabrati jednu našu zajedničku pjesmu, koja bi to bila?",
        "Koja sitnica koju svakodnevno radim ti uvijek popravi loš dan?",
        "Što misliš da je naša najveća snaga kao para?",
        "Kada si zadnji put bio/la istinski ponosan/na na mene?",
        "Koji ti je moj najdraži izraz lica kada sam sretan/na?",
        "Da možemo sutra usvojiti bilo kojeg kućnog ljubimca, kojeg bi odabrao/la?",
        "Što najviše voliš kod načina na koji komuniciramo?",
        "Koji je najromantičniji film koji bi volio/la da pogledamo zajedno?",
        "Što si naučio/la o sebi otkako smo zajedno?",
        "Koja ti je moja najdraža uspomena iz djetinjstva koju sam ti ispričao/la?",
        "Koji je tvoj omiljeni dio dana kada smo zajedno?",
        "Da imamo neograničen budžet za jedan vikend, kako bismo ga proveli?",
        "Što misliš da nas dvoje čini drugačijima od drugih parova?",
        "Koji ti je moj najdraži komad nakita ili modni dodatak koji nosim?",
        "Kada si se zadnji put nasmijao/la do suza zbog mene?",
        "Što najviše voliš raditi nedjeljom ujutro sa mnom?",
        "Koju moju osobinu bi volio/la da i ti posjeduješ?",
        "Koji je najbolji savjet koji sam ti ikada dao/la?",
        "Što misliš da će biti naš najveći zajednički uspjeh u budućnosti?",
        "Koji ti je moj najdraži obrok koji ti pripremam?",
        "Kada si prvi put osjetio/la da mi možeš u potpunosti vjerovati?",
        "Koja je najluđa avantura na koju bi volio/la da odemo zajedno?",
        "Što te najviše opušta kada si u mom zagrljaju?",
        "Koji je tvoj najdraži poklon koji si mi ikada kupio/la ili napravio/la?",
        "Što misliš, tko je od nas dvoje romantičniji?",
        "Koja je tvoja omiljena naša zajednička fotografija i zašto?",
        "Što najviše voliš kod mog glasa?",
        "Da moraš opisati naš prvi poljubac u tri riječi, koje bi to bile?",
        "Koji ti je moj najdraži hobi ili interes?",
        "Što misliš da je najvažnije za dugu i sretnu vezu?",
        "Kada si zadnji put osjetio/la leptiriće u trbuhu zbog mene?",
        "Koja je tvoja omiljena šala ili interna fora koju samo nas dvoje razumijemo?",
        "Što bi volio/la da češće radimo zajedno tijekom tjedna?",
        "Koji je najljepši kompliment koji si čuo/la o nama od drugih ljudi?",
        "Što te kod mene najviše inspirira da budeš bolja osoba?",
        "Koji ti je naš najdraži zajednički blagdan ili proslava?",
        "Da možeš ponovno proživjeti jedan naš zajednički dan, koji bi to bio?",
        "Što najviše voliš kada se držimo za ruke?",
        "Koji je tvoj omiljeni miris koji povezuješ sa mnom?",
        "Što misliš da je najslađe kod načina na koji se budim?",
        "Koju bi novu vještinu volio/la da naučimo zajedno?",
        "Koji ti je moj najdraži osmijeh?",
        "Što najviše cijeniš kod moje podrške kada ti je teško?",
        "Da imamo svoj kafić ili restoran, kako bi se zvao?",
        "Koja je tvoja omiljena uspomena s našeg prvog zajedničkog ljetovanja ili zimovanja?",
        "Što te najviše veseli u vezi naše zajedničke budućnosti?",
        "Koji je najljepši san koji si ikada sanjao/la o nama?"
      ],
      dares: [
        "Poljubi me u oba obraza, čelo i vrh nosa ovim redoslijedom.",
        "Masiraj mi dlanove i svaki prst pojedinačno jednu minutu.",
        "Isplaniraj naš sljedeći spoj u tri rečenice i reci mi kada idemo.",
        "Gledaj me u oči i reci mi pet stvari koje najviše voliš na meni.",
        "Zagrli me s leđa i ljuljaj nas lagano u ritmu zamišljene glazbe 30 sekundi.",
        "Nacrtaj naš zajednički portret na papiru u manje od 60 sekundi.",
        "Šapni mi na uho jednu tajnu želju vezanu za naše sljedeće putovanje.",
        "Drži moje lice u svojim rukama i gledaj me s osmijehom 30 sekundi.",
        "Otpjevaj refren svoje omiljene ljubavne pjesme gledajući me ravno u oči.",
        "Poljubi me u unutarnju stranu zgloba na obje ruke.",
        "Složi kratku pjesmicu od četiri stiha o našoj ljubavi.",
        "Lezi pored mene i isprepleti svoje prste s mojima na dvije minute.",
        "Oponašaj moj izraz lica kada sam jako sretan/na ili uzbuđen/na.",
        "Daj mi deset brzih, nježnih poljubaca po licu.",
        "Masiraj mi vrat i ramena koristeći samo palčeve jednu minutu.",
        "Reci mi jednu stvar koju jedva čekaš raditi sa mnom ovog mjeseca.",
        "Nasloni svoje čelo na moje i diši polako sa mnom 30 sekundi.",
        "Pohvali moj stil odijevanja danas kao da si modni kritičar.",
        "Poljubi me u rame i zadrži usne tamo pet sekundi.",
        "Pokušaj me nasmijati pričajući neki glupi vic bez smijanja.",
        "Nježno mi prolazi prstima kroz kosu i masiraj mi tjeme dvije minute.",
        "Stavi svoju ruku na moj obraz i reci mi zašto si sretan/na sa mnom.",
        "Zapleši sa mnom valcer ili spori ples nasred sobe jednu minutu.",
        "Poljubi mi svaki prst na lijevoj ruci i reci po jednu lijepu riječ.",
        "Zagrli me toliko čvrsto da osjetim otkucaje tvog srca.",
        "Napiši mi kratku poruku na mobitel koju ću pročitati sutra ujutro.",
        "Prisloni svoj obraz uz moj i ostani tako 20 sekundi.",
        "Reci mi koja ti je moja najdraža osobina koju sam pokazao/la ovaj tjedan.",
        "Poljubi me u kut usana jako polako i nježno.",
        "Masiraj mi listove i stopala dvije minute dok se ja opuštam.",
        "Opiši našu vezu kao da najavljuješ romantični film u kinu.",
        "Daj mi poljubac u vrat odmah ispod uha.",
        "Drži me za obje ruke i reci mi što ti najviše znači kod nas.",
        "Napravi mi omiljeni topli ili hladni napitak i posluži ga s osmijehom.",
        "Poljubi me u bradu i nasmiješi se.",
        "Zatvori oči i pogodi koji dio mog lica dodiruješ svojim prstima.",
        "Zagrli me tako da mi glava počiva na tvojim prsima jednu minutu.",
        "Reci mi tri razloga zašto misliš da smo savršen par.",
        "Nježno mi gladi podlakticu i nadlanicu zatvorenih očiju.",
        "Poljubi me u kapke dok su mi oči zatvorene.",
        "Isplaniraj savršenu filmsku večer za nas dvoje (film, grickalice, atmosfera).",
        "Stavi moju ruku na svoje srce i reci mi nešto lijepo.",
        "Daj mi najduži zagrljaj koji traje barem 45 sekundi.",
        "Poljubi mi dlan i zatvori moje prste preko tog poljupca.",
        "Reci mi jednu stvar koju bi volio/la da zajedno postignemo ove godine.",
        "Nježno mi uštipni obraz i reci mi da sam sladak/slatka.",
        "Lezi mi u krilo i dopusti mi da ti mazim lice jednu minutu.",
        "Poljubi me u čelo i reci mi da sam tvoja sigurna luka.",
        "Napravi smiješnu grimasu i drži je dok se ne nasmijem.",
        "Završi ovu rundu jednim dugim, toplim i iskrenim poljupcem u usne."
      ]
    },
    hot: {
      truths: [
        "Koja je najseksi poruka koju si ikada dobio/la od mene?",
        "Koji dio mog tijela najviše voliš ljubiti tijekom predigre?",
        "Jesi li ikada maštao/la o tome da vodimo ljubav na nekom javnom mjestu i kojem?",
        "Što te najviše napaljuje kod načina na koji te gledam?",
        "Koji je tvoj najdraži zvuk koji ispuštam tijekom intimnih trenutaka?",
        "Kada si zadnji put bio/la toliko napaljen/a da jedva čekaš da ostanemo sami?",
        "Koju pozu bi volio/la da isprobamo večeras čim završimo igru?",
        "Što najviše voliš da nosim na sebi prije nego što me skineš?",
        "Postoji li neka erogena zona na tvom tijelu koju još nisam dovoljno istražio/la?",
        "Koji ti je naš najuzbudljiviji i najstrastveniji seks do sada?",
        "Jesi li ikada razmišljao/la o nama dok si se tuširao/la danas?",
        "Što najviše voliš kada ti radim rukama?",
        "Koji je tvoj omiljeni trenutak tijekom našeg vođenja ljubavi?",
        "Jesi li ikada potajno želio/la da te zgrabim i poljubim pred drugima?",
        "Koja te moja gesta ili pokret odmah baci u seksi raspoloženje?",
        "Što bi volio/la da ti šapnem na uho dok smo u prepunom restoranu?",
        "Koji dio predigre ti je apsolutno najdraži i ne možeš bez njega?",
        "Jesi li ikada masturbirao/la zamišljajući naš sljedeći susret?",
        "Koja je najluđa ideja za seks koju si ikada imao/la, a nisi mi rekao/la?",
        "Što najviše voliš kod okusa mojih usana i kože?",
        "Kada ti je bilo najteže suzdržati se da me ne dodirneš u javnosti?",
        "Koji moj odjevni predmet ti izgleda najprovokativnije?",
        "Voliš li više kada smo u krevetu nježni i spori ili strastveni i brzi?",
        "Što misliš da je moja najseksi osobina?",
        "Jesi li ikada sanjao/la erotski san u kojem smo glavne uloge nas dvoje?",
        "Koji je tvoj najdraži način na koji te budim ujutro?",
        "Što najviše voliš kada te ljubim po vratu i ramenima?",
        "Postoji li neko mjesto u stanu gdje još nismo vodili ljubav, a želio/la bi?",
        "Koji je najuzbudljiviji kompliment koji sam ti dao/la o tvom tijelu?",
        "Što te najviše izluđuje kada te zadirkujem prije seksa?",
        "Jesi li ikada namjerno obukao/la nešto seksi samo da vidiš moju reakciju?",
        "Koja je tvoja omiljena uspomena na naš seks izvan spavaće sobe?",
        "Što najviše voliš raditi meni tijekom predigre?",
        "Kada si zadnji put pomislio/la na seks sa mnom usred radnog dana?",
        "Koji dio mog tijela najviše voliš dodirivati dok se ljubimo?",
        "Voliš li kada imamo kontakt očima tijekom cijelog odnosa?",
        "Što bi najviše volio/la da ti napravim u idućih deset minuta?",
        "Koji je tvoj najdraži miris na mom tijelu kada smo blizu?",
        "Jesi li ikada poželio/la da ostanemo goli u krevetu cijeli vikend?",
        "Što te kod mene najviše seksualno privlači od prvog dana?",
        "Koji je najprovokativniji ples ili pokret koji bi volio/la vidjeti od mene?",
        "Što najviše voliš kada ti prolazim prstima po leđima?",
        "Jesi li ikada razmišljao/la o tome kako bismo se zabavili u hotelskoj sobi?",
        "Koja je najseksi stvar koju sam napravio/la a da nisam ni bio/la svjestan/na?",
        "Što najviše voliš kada ti grickam usne ili uho?",
        "Postoji li neka pjesma koja te odmah asocira na strast i nas dvoje?",
        "Koji je tvoj omiljeni trenutak odmah nakon što vodimo ljubav?",
        "Što bi volio/la da češće iniciram u spavaćoj sobi?",
        "Kada si zadnji put osjetio/la jake trnce od mog dodira?",
        "Koju bi ocjenu dao/la našoj kemiji u krevetu i zašto?"
      ],
      dares: [
        "Poljubi me strastveno u vrat i polako se spuštaj prema ključnoj kosti 30 sekundi.",
        "Skini jedan svoj komad odjeće jako polako dok me gledaš ravno u oči.",
        "Stavi svoju ruku na moje unutarnje bedro i lagano ga masiraj jednu minutu.",
        "Šapni mi na uho najprljaviju stvar koju želiš da radimo večeras.",
        "Poljubi me s jezikom punih 45 sekundi bez prekidanja.",
        "Otkopčaj mi majicu ili košulju koristeći samo jednu ruku.",
        "Sjedni mi u krilo licem prema meni i ljubi me dok mi ruke lutaju po tvojim leđima.",
        "Lagano mi grickaj donju usnu tijekom poljupca, a zatim je poliži.",
        "Zatvori oči i dopusti mi da te ljubim po tijelu gdje god poželim jednu minutu.",
        "Povuci me za bokove čvrsto k sebi i prisloni svoje tijelo uz moje 30 sekundi.",
        "Prelazi vrhovima prstiju po mom trbuhu ispod majice jednu minutu.",
        "Poljubi me u uho, lagano povuci resicu zubima i toplo dahni.",
        "Skini mi jedan komad odjeće (majicu, remen ili čarape) bez upotrebe ruku.",
        "Masiraj mi stražnjicu čvrstim, ali senzualnim pokretima 45 sekundi.",
        "Zadirkuj moje usne svojima na milimetar udaljenosti bez dodira 30 sekundi.",
        "Napiši mi na mobitel jednu vruću poruku kao da nismo u istoj sobi.",
        "Poljubi me po trbuhu od pupka prema rubu hlača, ali stani na samom rubu.",
        "Uhvati me nježno, ali čvrsto za kosu na potiljku i privuci u dubok poljubac.",
        "Ostani bez majice (ili u grudnjaku/potkošulji) iduće tri runde.",
        "Stavi moju ruku na svoje grudi/prsa i pritisni je dok me ljubiš.",
        "Pleši zavodljivo ispred mene 30 sekundi uz zamišljeni ili pravi ritam.",
        "Liži mi vrat od ramena prema uhu jako polako.",
        "Zaveži mi oči maramom ili majicom i poljubi me na tri neočekivana mjesta.",
        "Prisloni me uza zid i ljubi me strastveno kao u filmskoj sceni.",
        "Prelazi noktima lagano niz moja leđa od vrata do struka.",
        "Skini moje čarape i izmasiraj mi stopala i gležnjeve senzualno.",
        "Stavi moju ruku na svoje bedro i vodi je sve više prema gore.",
        "Poljubi svaki centimetar moje ključne kosti s jedne strane na drugu.",
        "Gledaj me u oči dok polako ližeš svoje usne i reci mi što želiš.",
        "Zajaši me preko odjeće i napravi nekoliko sporih pokreta bokovima.",
        "Otkopčaj mi hlače (ili otkopčaj remen) i ostavi ih tako iduću rundu.",
        "Poljubi me u unutarnju stranu bedra iznad koljena.",
        "Diši mi duboko u vrat dok me čvrsto grliš s leđa jednu minutu.",
        "Stavi moj prst u svoja usta i polako ga poliži gledajući me u oči.",
        "Masiraj mi ramena i prsa koristeći toplo ulje ili kremu.",
        "Reci mi tri prljave riječi koje najviše voliš čuti u krevetu.",
        "Poljubi me u trbuh, zatim u prsa, pa ravno u usne.",
        "Skini svoj donji dio odjeće i ostani samo u majici i donjem rublju.",
        "Trljaj svoj nos i usne o moj vrat dok mi šapćeš što te pali.",
        "Drži moje ruke iznad moje glave jednom rukom dok me drugom maziš.",
        "Poljubi me toliko strastveno da oboje ostanemo bez daha.",
        "Prelazi kockicom leda preko mojih usana i vrata.",
        "Sjedni pored mene i stavi moju ruku ispod svog donjeg rublja na 15 sekundi.",
        "Ugrizni me lagano za rame i odmah poljubi to mjesto.",
        "Skini mi majicu preko glave i poljubi me po cijelim prsima.",
        "Neka tvoje ruke istražuju moje tijelo ispod odjeće jednu minutu.",
        "Poljubi me u kut usana i polako klizi prema obrazu i uhu.",
        "Zagrli me s leđa, zavuci ruke pod moju majicu i mazi mi trbuh i prsa.",
        "Pokaži mi svojim rukama točno kakav dodir najviše voliš.",
        "Završi rundu najvrućim poljupcem večeri koji traje barem jednu minutu."
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
      { a: "Da ti skinem majicu polako zubima", b: "Da ti otkopčam hlače jednom rukom dok te gledam u oči" },
      { a: "Seksati se na kuhinjskom stolu dok se hladi večera", b: "Seksati se u hodniku čim zatvorimo ulazna vrata" },
      { a: "Da ti ostavim tragove noktiju po cijelim leđima", b: "Da ti ostavim crveni trag ugriza na ramenu" },
      { a: "Nositi seksi donje rublje cijeli dan ispod poslovne odjeće", b: "Ići na večeru bez donjeg rublja ispod hlača ili haljine" },
      { a: "Da ti šapćem prljave stvari dok smo u prepunom kafiću", b: "Da ti šaljem eksplicitne slike dok sjediš na obiteljskom ručku" },
      { a: "Imati spori, senzualni seks uz svijeće koji traje sat vremena", b: "Imati divlji, brzi seks na brzaka u autu" },
      { a: "Da te izmasiram toplim uljem od glave do pete", b: "Da te izludim kockicom leda po najosjetljivijim točkama" },
      { a: "Da te probudim ranim jutarnjim poljupcima po cijelom tijelu", b: "Da te zaskočim pod tušem prije posla" },
      { a: "Da mi plešeš u krilu uz svoju omiljenu pjesmu", b: "Da mi izvedeš spori striptiz dok sjedim na rubu kreveta" },
      { a: "Da ti zavežem ruke svilenom kravatom", b: "Da ti stavim povez na oči i iznenadim te dodirima" },
      { a: "Voditi ljubav pred velikim ogledalom", b: "Voditi ljubav na balkonu pod okriljem noći" },
      { a: "Da ti ljubim unutarnju stranu bedra do ruba izdržljivosti", b: "Da ti grickam ušnu resicu dok ti teško dišem u vrat" },
      { a: "Da cijelu večer ne smiješ dodirnuti mene, samo ja tebe", b: "Da cijelu večer ja moram slušati svaku tvoju naredbu" },
      { a: "Imati seks na perilici rublja dok radi centrifuga", b: "Imati seks na mekanom tepihu ispred upaljenog kamina ili TV-a" },
      { a: "Da ti pošaljem glasovnu poruku svojih uzdaha", b: "Da te nazovem i šapćem ti što ću ti raditi kad dođeš doma" },
      { a: "Da mi ljubiš vrat dok vozim po otvorenoj cesti", b: "Da ti stavim ruku na međunožje dok čekamo na semaforu" },
      { a: "Da ti skinem čarape i ljubim ti stopala", b: "Da ti masiram stražnjicu s uljem deset minuta" },
      { a: "Da vodimo ljubav uz glasnu rock ili pop glazbu", b: "Da vodimo ljubav u apsolutnoj tišini gdje se čuje svaki dodir" },
      { a: "Da ti kupim seksi kostim po svom izboru", b: "Da zajedno odemo u sex shop i izaberemo novu igračku" },
      { a: "Da te zadirkujem usnama bez poljupca punih pet minuta", b: "Da te strastveno ljubim dok oboje ne ostanemo bez daha" },
      { a: "Imati brzi seks u garderobi dok kupujemo odjeću", b: "Imati seks u praznom kinu u zadnjem redu" },
      { a: "Da te držim za kosu dok se strastveno ljubimo", b: "Da ti pritisnem ruke iznad glave uz madrac" },
      { a: "Da jedeš šlag ili čokoladu s mog golog tijela", b: "Da piješ vino ili šampanjac iz mog pupka" },
      { a: "Da ti cijeli dan šaljem izazove koje moraš odraditi na poslu", b: "Da te navečer dočekam u sobi spremnoj za igru" },
      { a: "Da te diram ispod stola na večeri s prijateljima", b: "Da pobjegnemo s tuluma na 15 minuta u zaključani WC" },
      { a: "Da ti skinem svaki komad odjeće izrazito sporo", b: "Da u naletu strasti rastrgam majicu s tebe" },
      { a: "Da te ljubim po trbuhu sve niže i niže pa naglo stanem", b: "Da ti pružim oralno zadovoljstvo bez ikakvog uvoda" },
      { a: "Da provedemo cijelu nedjelju goli u krevetu", b: "Da odemo na vikend u wellness hotel i ne izađemo iz sobe" },
      { a: "Da mi šapneš svoju najdražu pozu na uho", b: "Da me bez riječi postaviš u pozu koju najviše želiš" },
      { a: "Da ti grizem donju usnu tijekom poljupca", b: "Da ti prelazim jezikom po ključnoj kosti" },
      { a: "Imati seks na plaži dok šume valovi", b: "Imati seks u šumi daleko od svih pogleda" },
      { a: "Da ti stavim ruku pod majicu dok gledamo film", b: "Da mi sjedneš u krilo okrenut/a prema meni dok pričamo" },
      { a: "Da te fotografiram u seksi pozi samo za moju galeriju", b: "Da snimimo kratki video našeg strastvenog ljubljenja" },
      { a: "Da ti vežem oči i hranim te jagodama", b: "Da ti vežem ruke i ljubim te gdje god poželim" },
      { a: "Da te iznenadim novim donjim rubljem kad otvoriš vrata", b: "Da te dočekam potpuno gol/a ispod balonera" },
      { a: "Da te masiram po leđima i polako spuštam ruke niže", b: "Da me zagrliš s leđa i prisloniš se uz mene dok kuham" },
      { a: "Da igramo poker na skidanje", b: "Da igramo bocu istine u dvoje s prljavim zadacima" },
      { a: "Da ti šapćem prljave riječi na stranom jeziku", b: "Da ti izgovaram tvoje ime na glas dok svršavam" },
      { a: "Da vodimo ljubav ujutro čim otvorimo oči", b: "Da vodimo ljubav kasno u noć kad smo već iscrpljeni" },
      { a: "Da ti ljubim zapešća i unutarnju stranu ruku", b: "Da ti ljubim donji dio leđa iznad stražnjice" },
      { a: "Da ti dozvolim da biraš svaku našu aktivnost večeras", b: "Da ja preuzmem potpunu kontrolu nad tobom iduća dva sata" },
      { a: "Da se tuširamo zajedno i sapunamo jedno drugo", b: "Da se kupamo u kadi punoj pjene uz čašu vina" },
      { a: "Da ti lagano pljusnem stražnjicu dok prolaziš pokraj mene", b: "Da te snažno privučem za bokove k sebi" },
      { a: "Da ti stavim kockicu leda u usta tijekom poljupca", b: "Da popijem gutljaj toplog čaja i poljubim te" },
      { a: "Da ti priznam o čemu sam maštao/la danas na poslu", b: "Da mi opišeš svoj najuzbudljiviji san o nama" },
      { a: "Da vodimo ljubav na visokom katu uz otvorene zavjese", b: "Da vodimo ljubav u autu dok vani pada jaka kiša" },
      { a: "Da te diram preko odjeće dok ne poludiš od želje", b: "Da odmah strgnemo odjeću i bacimo se na krevet" },
      { a: "Da ti ljubim vrat dok ti pokušavaš ostati ozbiljan/na na telefon", b: "Da ti šaljem seksi poruke dok si na dosadnom predavanju ili sastanku" },
      { a: "Da te izludim laganim grebanjem po tjemenu i vratu", b: "Da te stisnem uza zid u hodniku i strastveno poljubim" },
      { a: "Da ti priredim romantičnu večeru koja završava na stolu", b: "Da preskočimo večeru i odmah odemo u spavaću sobu" },
      { a: "Da nosiš moju košulju zakopčanu samo na jedan gumb", b: "Da budeš samo u boksericama ili gaćicama cijelo popodne" },
      { a: "Da ti ljubim prste na rukama jedan po jedan", b: "Da mi staviš svoje prste u usta dok me gledaš" },
      { a: "Da vodimo ljubav u hotelskoj sobi na putovanju", b: "Da vodimo ljubav u šatoru usred prirode" },
      { a: "Da te zadirkujem perom po cijelom tijelu", b: "Da te mazim svilenom maramom dok su ti oči zatvorene" },
      { a: "Da ti šapnem koliko te želim pred drugima", b: "Da ti to pokažem čvrstim stiskom ruke ispod stola" },
      { a: "Da vodimo ljubav bez upotrebe ruku (samo usne i tijelo)", b: "Da se zadovoljavamo isključivo rukama gledajući se u oči" },
      { a: "Da ti ljubim svaku točku na licu osim usana", b: "Da ti odmah dam najdublji francuski poljubac" },
      { a: "Da te iznenadim masažom stopala nakon dugog dana", b: "Da te iznenadim oralnim seksom čim uđeš u sobu" },
      { a: "Da ti otkopčam grudnjak ili remen bez gledanja", b: "Da mi polako skidaš komad po komad odjeće uz glazbu" },
      { a: "Da se ljubimo na kiši kao u filmu", b: "Da se ljubimo u mraku kinodvorane" },
      { a: "Da ti stavim ruku na srce dok ubrzano dišeš", b: "Da osjetiš moje ubrzano bilo na mom vratu" },
      { a: "Da ti priznam koja me tvoja poza najviše uzbuđuje", b: "Da isprobamo potpuno novu pozu iz Kama Sutre" },
      { a: "Da te budim poljupcima po leđima", b: "Da te uspavljujem nježnim dodirima po bedrima" },
      { a: "Da te držim za ruke iznad glave dok te ljubim", b: "Da mi obaviješ noge oko struka dok stojimo" },
      { a: "Da ti dam potpunu slobodu da me diraš gdje god želiš", b: "Da ti ja pokažem točno gdje i kako želim da me diraš" },
      { a: "Da se igramo doktora i pacijenta", b: "Da se igramo stranaca koji su se tek upoznali u baru" },
      { a: "Da ti šapćem prostote na uho dok plešemo", b: "Da te strastveno poljubim usred plesnog podija" },
      { a: "Da ti kupim mirisno ulje za erotsku masažu", b: "Da kupimo jestivu boju za tijelo" },
      { a: "Da te gledam dok se oblačiš za izlazak", b: "Da ti pomognem skinuti sve kad se vratimo kući" },
      { a: "Da vodimo ljubav dva puta zaredom bez pauze", b: "Da vodimo ljubav jednom, ali da traje cijelu vječnost" },
      { a: "Da ti ljubim rame dok me grliš s leđa", b: "Da te privučem za vrat i poljubim u čelo pa u usne" },
      { a: "Da te iznenadim doručkom u krevetu (gol/a)", b: "Da ti donesem kavu u krevet i ostanem ispod pokrivača" },
      { a: "Da ti pošaljem sliku u ogledalu prije tuširanja", b: "Da me nazoveš na video poziv dok sam u kadi" },
      { a: "Da ti masiram vrat dok radiš za računalom", b: "Da ti sjednem u krilo dok pokušavaš nešto pročitati" },
      { a: "Da ti šapnem tajnu koju nikome nisam rekao/la", b: "Da večeras ostvarimo našu zajedničku tajnu želju" }
    ],
    hard: [
      { a: "Biti vezan/a kožnim lisicama za uzglavlje kreveta", b: "Da ti mene zavežeš i držiš mi povez preko očiju" },
      { a: "Imati grubi seks uza zid u hodniku", b: "Imati dugi, iscrpljujući seks na podu dnevne sobe" },
      { a: "Da ti diktiram točno kada smiješ doživjeti orgazam", b: "Da te dovedem do samog ruba tri puta i svaki put stanem" },
      { a: "Upotrijebiti vibrator na tebi dok ti sjedim na licu", b: "Da se ti zadovoljavaš preda mnom dok te ja samo gledam i naređujem" },
      { a: "Da te pljusnem po stražnjici svaki put kad napraviš pogrešku", b: "Da mi ostaviš vidljive tragove ugriza po vratu i ramenima" },
      { a: "Igrati ulogu strogog profesora i neposlušne studentice", b: "Igrati ulogu dominantnog šefa i pokorne tajnice" },
      { a: "Snimati naš najstrastveniji odnos mobitelom izbliza", b: "Gledati se u velikom ogledalu dok vodimo ljubav u doggy pozi" },
      { a: "Da te skinem do gola i ostavim te klečati 5 minuta bez dodira", b: "Da te stavim u pozu u kojoj se ne možeš pomaknuti dok te zadirkujem" },
      { a: "Kapati topli vosak svijeće po tvojim prsima i trbuhu", b: "Trljati kockicu leda po tvojim genitalijama dok ne počneš drhtati" },
      { a: "Da te čvrsto držim za vrat jednom rukom tijekom odnosa", b: "Da te vučem za kosu unatrag dok te uzimam s leđa" },
      { a: "Imati seks na balkonu gdje nas susjedi lako mogu čuti", b: "Imati seks u autu na parkiralištu dok ljudi prolaze pokraj nas" },
      { a: "Da ti vežem ruke na leđa kravatom i radim što god poželim", b: "Da preuzmeš potpunu dominaciju i narediš mi svaku pozu" },
      { a: "Pružiti mi dugi oralni seks dok klečiš na podu", b: "Da ti sjednem na lice i ne pustim te dok ne ostanem bez daha" },
      { a: "Da te udaram po stražnjici kožnim remenom (umjereno)", b: "Da mi grebeš leđa i prsa noktima dok ne ostanu crvene crte" },
      { a: "Nositi daljinski upravljani vibrator u restoranu dok ja držim upravljač", b: "Ići na piće bez donjeg rublja i dopustiti mi da te diram ispod stola" },
      { a: "Da ti zavežem usta svilenom maramom da prigušim uzdahe", b: "Da te natjeram da vrištiš moje ime na sav glas" },
      { a: "Imati seks u sobi dok netko spava u susjednoj prostoriji", b: "Imati brzi seks u javnom WC-u noćnog kluba" },
      { a: "Da ti ližem stopala i prste dok me gledaš u oči", b: "Da ti gurnem dva prsta duboko u usta dok te ljubim" },
      { a: "Da provedemo cijelu noć bez spavanja isprobavajući sve poze", b: "Da imamo tri runde grubog seksa zaredom bez minute odmora" },
      { a: "Da ti skinem donje rublje zubima bez korištenja ruku", b: "Da rastrgam tvoje donje rublje u naletu sirove strasti" },
      { a: "Da ti naredim da mi se obraćaš s 'Gospodaru/Gospodarice' cijelu večer", b: "Da ti budem potpuno pokoran/na i ispunjavam svaki tvoj hir" },
      { a: "Da te izludim perjem i ledom dok si vezan/a za stolicu", b: "Da te ostavim golog/u i vezanog/u na krevetu i izađem iz sobe na 10 minuta" },
      { a: "Imati grubi seks bez ikakve predigre", b: "Imati predigru od sat vremena u kojoj ti ne dam da me penetriraš" },
      { a: "Da te držim za ruke iznad glave i ne dam ti da me dodirneš", b: "Da ti zavežem noge široko raširene za rubove kreveta" },
      { a: "Da ti priznam svoju najmračniju seksualnu fantaziju", b: "Da večeras odmah odglumimo tvoju najprljaviju maštariju" },
      { a: "Da ti stavim štipaljke na bradavice na nekoliko minuta", b: "Da ti čvrsto stišćem i grickam bradavice tijekom odnosa" },
      { a: "Da te zadovoljim oralno do samog kraja bez prestanka", b: "Da me zadovoljiš rukama dok te gledam ravno u oči" },
      { a: "Imati seks pod hladnim tušem", b: "Imati seks na podu kupaonice dok curi vruća voda" },
      { a: "Da te prisilim da svršiš dok ti držim ruku preko usta", b: "Da te kaznim blagim udarcem svaki put kad ispustiš zvuk" },
      { a: "Da te jašem okrenut/a leđima dok me udaraš po stražnjici", b: "Da me držiš u zraku pritisnutog/u uza zid dok vodimo ljubav" },
      { a: "Da ti ližem unutarnju stranu bedara pola sata", b: "Da mi guraš prste u usta nakon što si me dirao/la dolje" },
      { a: "Da te vežem u neudobnu pozu i zadirkujem te igračkom", b: "Da ti stavim povez na oči i pogađaš čime te dodirujem po tijelu" },
      { a: "Imati seks dok nam zvoni mobitel i moraš se javiti i pričati normalno", b: "Imati seks na balkonu dok pada kiša" },
      { a: "Da te ostavim na rubu orgazma i odem pod tuš", b: "Da te natjeram da svršiš dva puta u deset minuta" },
      { a: "Da ti pišem prljave riječi flomasterom po golom tijelu", b: "Da poližem šlag i čokoladu s tvojih najintimnijih dijelova" },
      { a: "Da me probudiš usred noći grubim seksom", b: "Da me zaskočiš čim uđem u stan s posla i baciš me na pod" },
      { a: "Da ti vežem ruke ispred tijela i vodim te po stanu na povodcu", b: "Da klečiš pokraj mog stolca dok ja gledam TV i mazim te po glavi" },
      { a: "Da isprobamo analnu igračku tijekom predigre", b: "Da isprobamo dvostruku stimulaciju vibratorom" },
      { a: "Da te držim za bokove i nabijam najjačim mogućim tempom", b: "Da vodimo ljubav izuzetno sporo i duboko do potpunog iscrpljenja" },
      { a: "Da mi pljuneš u usta tijekom strastvenog poljupca", b: "Da mi poližeš znoj s vrata i prsa" },
      { a: "Da te kaznim s deset jakih udaraca dlanom po guzi", b: "Da te zavežem za stolicu i plešem ti u krilu bez dodira" },
      { a: "Imati seks u tuđem krevetu dok smo u gostima", b: "Imati seks na stražnjem sjedalu auta na osamljenom vidikovcu" },
      { a: "Da ti stavim povez na oči i pustim te da me tražiš po sobi", b: "Da ti zavežem ruke i noge u obliku zvijezde na krevetu" },
      { a: "Da te zadovoljavam dok si na telefonu s prijateljem/prijateljicom", b: "Da mi šalješ slike svog međunožja dok si u javnom prijevozu" },
      { a: "Da te grizem po unutarnjoj strani bedara dok ne ostavim tragove", b: "Da ti sisam vrat dok ne ostane velika ljubičasta šljiva" },
      { a: "Da se obučem u kožu i lateks i preuzmem komandu", b: "Da te skinem do gola i natjeram te da me služiš cijelu večer" },
      { a: "Da ti gurnem prste duboko u sebe dok te gledam u oči", b: "Da me zadovoljavaš jezikom dok te čvrsto držim za kosu" },
      { a: "Da te vežem remenom za krevet", b: "Da ti stavim lisice na ruke i noge" },
      { a: "Imati seks na kuhinjskom pultu uz upaljeno svjetlo", b: "Imati seks na stepenicama u zgradi kasno noću" },
      { a: "Da ti kažem najprljaviju stvar koju sam ikad pomislio/la o tebi", b: "Da te pitam da mi opišeš svoj najluđi seksualni san u detalje" },
      { a: "Da te izludim kružnim pokretima jezika po najosjetljivijoj točki", b: "Da te pritisnem o madrac svom svojom težinom dok vodimo ljubav" },
      { a: "Da ti stavim lopticu u usta (gag) na pet minuta", b: "Da ti vežem ruke iza leđa i stavim povez na oči" },
      { a: "Da te natjeram da moliš za dopuštenje prije nego što svršiš", b: "Da ti zabranim da me dodiruješ rukama cijelu noć" },
      { a: "Imati seks u prirodi skriveni iza drveća", b: "Imati seks u praznom vagonu noćnog vlaka" },
      { a: "Da te masiram po stražnjici i unutarnjim bedrima s puno ulja", b: "Da ti trljam prepone kockicom leda dok si vezan/a" },
      { a: "Da te podignem u zrak i prislonim uza zid tijekom odnosa", b: "Da te savijem preko ruba stola i uzmem s leđa" },
      { a: "Da ti ostavim tragove zuba na stražnjici", b: "Da te povučem za kosu i prisilim na duboki poljubac" },
      { a: "Da gledamo pornić zajedno i oponašamo sve što rade", b: "Da snimimo vlastiti video za osobnu arhivu" },
      { a: "Da ti zavežem ruke i koristim vibrator na najjačoj brzini", b: "Da te zadovoljavam isključivo prstima dok ne izgubiš snagu" },
      { a: "Da te skinem na silu (u igri) i bacim na krevet", b: "Da ti naredim da se skidaš jako sporo dok te ocjenjujem" },
      { a: "Da ti ližem trbuh i prepone dok ležiš svezan/a", b: "Da ti sjednem na prsa i natjeram te da me gledaš" },
      { a: "Imati grubi seks koji traje više od sat vremena", b: "Imati tri brza i žestoka seksa u različitim prostorijama stana" },
      { a: "Da ti stavim povez na oči i iznenadim te oralnim seksom", b: "Da te probudim iz sna rukom u tvom donjem rublju" },
      { a: "Da ti naredim da klečiš ispred mene dok sjedim na rubu kreveta", b: "Da ležiš na trbuhu svezanih ruku dok te ja mazim bičem" },
      { a: "Da ti šapćem najprostije riječi ravno u uho", b: "Da ti stavim ruku na usta dok stenješ" },
      { a: "Da ti otkopčam hlače i zadovoljim te u autu na parkingu", b: "Da se iskrademo s obiteljskog okupljanja na brzi seks u kupaonici" },
      { a: "Da ti grizem ključnu kost i ramena tijekom vrhunca", b: "Da ti zabijem nokte u leđa kad doživim orgazam" },
      { a: "Da te zavežem u pozu u kojoj si potpuno izložen/a", b: "Da ti stavim povez na oči i slušalice s glasnom glazbom na uši" },
      { a: "Da ti priznam s kim sam te zamislio/la u trojcu", b: "Da odigramo fantaziju u kojoj sam ja potpuni stranac" },
      { a: "Da te mučim poljupcima po cijelom tijelu izbjegavajući genitalije", b: "Da odmah prijeđemo na najgrublji mogući seks" },
      { a: "Da ti vežem ruke iznad glave i koristim pero i led", b: "Da te pljuskam po stražnjici dok ne pocrveni" },
      { a: "Da te natjeram da puziš po krevetu do mene", b: "Da te zgrabim za gležnjeve i povučem k sebi na rub kreveta" },
      { a: "Da ti pružim oralni seks dok stojiš uza zid", b: "Da me držiš za glavu dok te zadovoljavam usnama" },
      { a: "Da provedemo cijelu večer igrajući se dominacije i pokornosti", b: "Da večeras zamijenimo uloge i ti budeš glavni/a u krevetu" },
      { a: "Da te ostavim vezanog/u na krevetu i zadirkujem te iz daljine", b: "Da te odmah zajašim i ne pustim dok oboje ne svršimo" }
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
  },
  mostLikely: {
    soft: [
      "Tko će prije zaspati usred filma koji je sam/a odabrao/la?",
      "Tko će prije potrošiti cijelu plaću na potpune gluposti?",
      "Tko će prije zaplakati na tužnu reklamu ili crtić?",
      "Tko će prije zaboraviti gdje je parkirao/la auto?",
      "Tko će prije kasniti na vlastito vjenčanje?",
      "Tko će prije pojesti tuđi dio deserta iz hladnjaka?",
      "Tko će prije preživjeti zombi apokalipsu?",
      "Tko će prije slučajno poslati poruku krivoj osobi?",
      "Tko će prije udomiti pet pasa s ulice?",
      "Tko će prije provesti tri sata birajući što gledati na Netflixu?",
      "Tko će prije se izgubiti u vlastitom gradu bez navigacije?",
      "Tko će prije naručiti dostavu jer mu/joj se ne da kuhati?",
      "Tko će prije se rasplakati od smijeha u potpuno ozbiljnoj situaciji?",
      "Tko će prije provjeravati jesu li vrata zaključana pet puta zaredom?",
      "Tko će prije pokvariti iznenađenje jer ne zna čuvati tajnu?",
      "Tko će prije stati nasred ulice da pomazi nepoznatu mačku?",
      "Tko će prije pasti na najgluplju internetsku prevaru?",
      "Tko će prije početi pjevati pod tušem iz sveg glasa?",
      "Tko će prije ostaviti prljavo suđe 'da se namače' tri dana?",
      "Tko će prije se posvađati s navigacijom u autu?",
      "Tko će prije zaspati u javnom prijevozu i promašiti stanicu?",
      "Tko će prije kupiti nešto samo zato što je na sniženju?",
      "Tko će prije zaboraviti nečiji rođendan unatoč podsjetniku?",
      "Tko će prije prepričavati isti vic deset puta zaredom?",
      "Tko će prije zapaliti kuhinju pokušavajući skuhati jaje?"
    ],
    hot: [
      "Tko će prije završiti u zatvoru zbog neke glupe oklade?",
      "Tko će prije se osramotiti pred simpatijom ili poznatom osobom?",
      "Tko će prije se napiti od samo dva pića na tulumu?",
      "Tko će prije ući u raspravu s konobarom ili taksistom?",
      "Tko će prije ispričati sramotnu tajnu iz djetinjstva kad popije?",
      "Tko će prije slomiti mobitel u prvih tjedan dana od kupnje?",
      "Tko će prije se poskliznuti i pasti pred punim kafićem?",
      "Tko će prije odustati od dijete već prvog dana navečer?",
      "Tko će prije napraviti impulzivnu tetovažu na putovanju?",
      "Tko će prije se zaplakati dok gleda reality show?",
      "Tko će prije probati najljuću papričicu na svijetu iz čistog inata?",
      "Tko će prije se posvađati oko pravila društvene igre?",
      "Tko će prije izgubiti novčanik ili ključeve na izlasku?",
      "Tko će prije zaplesati na stolu kad krene omiljena pjesma?",
      "Tko će prije se javiti na nepoznati broj i pričati 20 minuta?",
      "Tko će prije potrošiti sat vremena spremajući se za odlazak u dućan?",
      "Tko će prije zaspati na tulumu u kutu kauča?",
      "Tko će prije prekršiti obećanje da 'večeras idemo rano spavati'?",
      "Tko će prije se izvući iz kazne za brzu vožnju na šarm?",
      "Tko će prije pojesti cijelu pizzu sam/a u tri ujutro?",
      "Tko će prije se uvrijediti na potpuno bezazlenu šalu?",
      "Tko će prije potrošiti zadnje novce na putovanje u zadnji čas?",
      "Tko će prije se izgubiti u IKEA-i i tražiti izlaz sat vremena?",
      "Tko će prije početi plakati od sreće kad vidi dobru hranu?",
      "Tko će prije preživjeti na pustom otoku samo uz pomoć sarkazma?"
    ],
    hard: [
      "Tko će prije inicirati seks na potpuno neprikladnom mjestu?",
      "Tko će prije poslati eksplicitnu sliku u krivi chat?",
      "Tko će prije predložiti korištenje lisica ili poveza u krevetu?",
      "Tko će prije izgubiti kontrolu i rastrgati odjeću s partnera?",
      "Tko će prije predložiti snimanje kućnog videa?",
      "Tko će prije doživjeti orgazam u manje od dvije minute?",
      "Tko će prije predložiti igranje uloga (roleplay) večeras?",
      "Tko će prije ostaviti vidljivu šljivu na vratu iz čiste strasti?",
      "Tko će prije otići na spoj bez donjeg rublja ispod odjeće?",
      "Tko će prije probuditi partnera oralnim seksom usred noći?",
      "Tko će prije vrištati toliko glasno da susjedi čuju?",
      "Tko će prije kupiti najskuplju igračku u sex shopu?",
      "Tko će prije predložiti seks pod tušem iako je kabina premala?",
      "Tko će prije preuzeti potpunu dominaciju u spavaćoj sobi?",
      "Tko će prije slomiti krevet tijekom divljeg odnosa?",
      "Tko će prije priznati svoju najmračniju seksualnu fantaziju?",
      "Tko će prije tražiti još jednu rundu odmah nakon vrhunca?",
      "Tko će prije se napaliti samo od jednog pogleda preko stola?",
      "Tko će prije predložiti seks na stražnjem sjedalu auta?",
      "Tko će prije isprobati novu pozu iz Kama Sutre bez zagrijavanja?"
    ],
    extreme: [
      "Tko će prije predložiti trojac bez imalo oklijevanja?",
      "Tko će prije pristati na seks na javnom mjestu usred bijela dana?",
      "Tko će prije poželjeti biti vezan/a i potpuno bespomoćan/na sat vremena?",
      "Tko će prije posjetiti podzemni BDSM ili svingerski klub?",
      "Tko će prije uživati u boli i udarcima remenom tijekom seksa?",
      "Tko će prije pristati na potpunu seksualnu pokornost cijeli vikend?",
      "Tko će prije isprobati igru s vrućim voskom i ledom na genitalijama?",
      "Tko će prije nositi daljinski upravljani vibrator na obiteljskom ručku?",
      "Tko će prije predložiti snimanje i gledanje vlastitog pornića?",
      "Tko će prije isprobati ekstremni analni seks bez dugog nagovaranja?",
      "Tko će prije pristati na ulogu seksualnog roba na 24 sata?",
      "Tko će prije inicirati seks u moru ili bazenu pred drugima?",
      "Tko će prije tražiti gušenje (choking) tijekom vrhunca?",
      "Tko će prije se napaliti na ideju da ih netko promatra kroz prozor?",
      "Tko će prije prekršiti sve tabue u krevetu u jednoj noći?"
    ]
  },
  fiveSeconds: {
    soft: [
      "Nabroji 3 stvari koje najviše voliš kod mene!",
      "Nabroji 3 mjesta kamo želiš da otputujemo zajedno!",
      "Nabroji 3 jela koja najbolje pripremam!",
      "Nabroji 3 nadimka kojima me zoveš ili bi me zvao/la!",
      "Nabroji 3 filma koja moramo pogledati zajedno!",
      "Nabroji 3 moje navike koje su ti preslatke!",
      "Nabroji 3 stvari koje te uvijek nasmiju kod mene!",
      "Nabroji 3 poklona koja bi me oduševila!",
      "Nabroji 3 pjesme koje te podsjećaju na nas!",
      "Nabroji 3 stvari koje bismo radili da dobijemo na lotu!",
      "Nabroji 3 razloga zašto smo savršen par!",
      "Nabroji 3 stvari bez kojih ne možeš zamisliti jutro!",
      "Nabroji 3 životinje koje bi udomio/la da imamo veliku kuću!",
      "Nabroji 3 spoja na koja me želiš odvesti!",
      "Nabroji 3 stvari koje voliš raditi nedjeljom sa mnom!"
    ],
    hot: [
      "Nabroji 3 dijela mog tijela koji te najviše pale!",
      "Nabroji 3 mjesta u kući gdje želiš da vodimo ljubav!",
      "Nabroji 3 komada odjeće u kojima izgledam najseksi!",
      "Nabroji 3 stvari koje voliš tijekom predigre!",
      "Nabroji 3 prljave riječi koje voliš čuti u krevetu!",
      "Nabroji 3 javna mjesta gdje bi me volio/la strastveno poljubiti!",
      "Nabroji 3 stvari koje želiš da ti napravim večeras!",
      "Nabroji 3 poze u kojima najviše uživaš!",
      "Nabroji 3 načina kako te najbrže mogu uzbuditi!",
      "Nabroji 3 erogene zone na svom tijelu!",
      "Nabroji 3 stvari koje voliš kada ti radim usnama!",
      "Nabroji 3 situacije kad si bio/la nenormalno napaljen/a na mene!",
      "Nabroji 3 seksi igračke ili rekvizita koje bi isprobao/la!",
      "Nabroji 3 stvari koje te odmah ohlade u krevetu!",
      "Nabroji 3 fantazije koje imaš o meni!"
    ],
    hard: [
      "Nabroji 3 fetiša koja bi volio/la isprobati sa mnom!",
      "Nabroji 3 stvari koje želiš da ti radim dok si vezan/a!",
      "Nabroji 3 uloge (roleplay) koje bi volio/la da odigramo!",
      "Nabroji 3 mjesta izvan kuće gdje želiš divlji seks!",
      "Nabroji 3 načina kako želiš da dominiram nad tobom!",
      "Nabroji 3 stvari koje želiš da ti šapćem dok svršavaš!",
      "Nabroji 3 predmeta iz ove sobe koje možemo iskoristiti u seksu!",
      "Nabroji 3 najluđe poze koje želiš isprobati!",
      "Nabroji 3 stvari koje ti nitko prije mene nije radio u krevetu!",
      "Nabroji 3 razloga zašto obožavaš grubi seks!",
      "Nabroji 3 mjesta na mom tijelu gdje želiš ostaviti trag!",
      "Nabroji 3 stvari koje bi napravio/la da sam potpuno bespomoćan/na!"
    ],
    extreme: [
      "Nabroji 3 najperverznije fantazije koje skrivaš u glavi!",
      "Nabroji 3 javna mjesta gdje bismo riskirali uhićenje zbog seksa!",
      "Nabroji 3 BDSM radnje koje odmah želiš isprobati!",
      "Nabroji 3 osobe s kojima bi zamislio/la trojac!",
      "Nabroji 3 ekstremne kazne za onoga tko izgubi večeras!",
      "Nabroji 3 tabua u seksu koja želiš srušiti sa mnom!",
      "Nabroji 3 stvari koje bi mi radio/la da nema apsolutno nikakvih pravila!",
      "Nabroji 3 mjesta na tijelu gdje želiš osjetiti bol i užitak istovremeno!",
      "Nabroji 3 načina kako bi me potpuno podredio/la sebi!",
      "Nabroji 3 najprljavije naredbe koje mi možeš dati odmah sada!"
    ]
  },
  twister: {
    soft: [
      "Lijeva ruka na partnerovo desno rame.",
      "Desna ruka na partnerov lijevi obraz.",
      "Nasloni čelo na partnerovo čelo.",
      "Desno koljeno prisloni uz partnerovo lijevo koljeno.",
      "Lijeva ruka isprepletena s partnerovom desnom rukom.",
      "Brada naslonjena na partnerovo lijevo rame.",
      "Desno stopalo preko partnerovog lijevog stopala.",
      "Lijeva ruka na partnerov trbuh.",
      "Desni lakat naslonjen na partnerovo bedro.",
      "Poljubi partnera u nos i zadrži položaj.",
      "Lijeva ruka iza partnerovog vrata.",
      "Desna ruka na partnerovom srcu."
    ],
    hot: [
      "Desna ruka na partnerovu stražnjicu.",
      "Lijeva ruka na partnerovo unutarnje bedro.",
      "Usne prislonjene na partnerov vrat.",
      "Desno koljeno gurnuto između partnerovih nogu.",
      "Lijeva ruka zavučena ispod partnerove majice na leđa.",
      "Bokovi čvrsto prislonjeni uz partnerove bokove.",
      "Desna ruka drži partnera za kosu na potiljku.",
      "Lijevo stopalo masira partnerov list.",
      "Prsa čvrsto pritisnuta uz partnerova prsa.",
      "Desna ruka na partnerovom trbuhu ispod odjeće.",
      "Nos i usne u partnerovom uhu.",
      "Lijeva ruka čvrsto drži partnerov struk."
    ],
    hard: [
      "Desna ruka na partnerovom međunožju (preko ili ispod rublja).",
      "Jezik prislonjen na partnerovu ključnu kost.",
      "Lijeva ruka drži obje partnerove ruke iza njegovih/njezinih leđa.",
      "Zajaši partnerovo bedro i zadrži pritisak.",
      "Desna ruka ispod partnerovog donjeg rublja na stražnjici.",
      "Usne na partnerovom unutarnjem bedru.",
      "Lijeva ruka čvrsto drži partnerov vrat (lagani pritisak).",
      "Prepone čvrsto prislonjene uz partnerove prepone.",
      "Desna ruka na partnerovim golim grudima/prsima.",
      "Zubi lagano drže partnerovu donju usnu."
    ],
    extreme: [
      "Usta direktno na partnerovim intimnim dijelovima.",
      "Prsti desne ruke duboko u partnerovom donjem rublju.",
      "Lijeva noga prebačena preko partnerovog ramena.",
      "Partnerova glava pritisnuta uz tvoje međunožje.",
      "Obje ruke vežu partnerove ruke iznad glave uz pod/krevet.",
      "Gola koža trbuha i prepona potpuno slijepljena uz partnera.",
      "Desna ruka na partnerovom analnom području / stražnjici.",
      "Jezik na partnerovoj najosjetljivijoj točki."
    ]
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

const scratchCards = {  
  scratchCards: [
    "Kupon za 15 minuta opuštajuće masaže cijelih leđa bez ikakvog prigovora.",
    "Kupon za doručak u krevet po tvom izboru sutra ujutro.",
    "Kupon za odabir filma ili serije večeras bez prava na veto.",
    "Kupon za oslobađanje od jednog kućanskog posla po tvom izboru.",
    "Kupon za večeru u restoranu ili narudžbu hrane koju ti odabereš.",
    "Kupon za 10 minuta nježnog maženja po kosi i glavi.",
    "Kupon za jednu želju u krevetu koju partner mora odmah ispuniti.",
    "Kupon za kontrolu nad glazbom u autu na cijelom sljedećem putovanju.",
    "Kupon za 20 minuta masaže stopala nakon napornog dana.",
    "Kupon za jedan strastveni poljubac u trajanju od pune dvije minute.",
    "Kupon za spavanje duže ujutro dok partner preuzima sve jutarnje obaveze.",
    "Kupon za besplatno pranje i sušenje suđa večeras.",
    "Kupon za jednu erotsku masažu toplim uljem večeras.",
    "Kupon za odabir poze večeras bez ikakve rasprave.",
    "Kupon za slatko iznenađenje ili omiljeni desert dostavljen ravno u ruke.",
    "Kupon za pravo na jedan 'Joker preskok' bilo kojeg zadatka u igrama večeras.",
    "Kupon za zajedničku toplu kupku ili tuširanje uz pranje leđa.",
    "Kupon za 30 minuta apsolutne tišine i mira kada god to zatražiš.",
    "Kupon za jedan striptiz ili zavodljivi ples u krilu po tvojoj želji.",
    "Kupon za kavu ili čaj poslužen u krevet čim otvoriš oči.",
    "Kupon za biranje aktivnosti za naš sljedeći zajednički vikend.",
    "Kupon za pet minuta intenzivnog ljubljenja po vratu i ključnoj kosti.",
    "Kupon za sladoled ili omiljenu grickalicu u bilo koje doba dana ili noći.",
    "Kupon za jednu partiju društvene igre po tvom izboru.",
    "Kupon za potpuno prepuštanje kontrole partneru na pola sata.",
    "Kupon za nošenje partnerove omiljene majice ili hudice cijeli vikend.",
    "Kupon za jednu rundu oralnog zadovoljstva bez ikakvih uvjeta.",
    "Kupon za zajedničku šetnju na mjesto koje ti odabereš.",
    "Kupon za odgodu jedne obaveze koju ti se danas nikako ne da raditi.",
    "Kupon za deset strastvenih poljubaca po tijelu na mjesta po tvom izboru.",
    "Kupon za večernju rutinu bez mobitela – samo nas dvoje i razgovor.",
    "Kupon za jednu tajnu fantaziju koju ćemo ostvariti ovaj tjedan.",
    "Kupon za besplatno točenje goriva ili vožnju kamo god želiš.",
    "Kupon za 15 minuta češkanja po leđima prije spavanja.",
    "Kupon za odabir odjeće koju će partner nositi na našem sljedećem spoju.",
    "Kupon za jednu kaznu po tvom izboru koju partner mora odraditi odmah.",
    "Kupon za čašu omiljenog pića posluženu s ledom i osmijehom.",
    "Kupon za jutarnje buđenje poljupcima umjesto budilice.",
    "Kupon za jedan cijeli dan u kojem partner govori isključivo 'Da, ljubavi'.",
    "Kupon za fotografiranje zajedničkog selfieja bez prigovora.",
    "Kupon za 10 minuta igranja s vezanim očima i iznenađenjima.",
    "Kupon za biranje glazbene playliste za večerašnju atmosferu.",
    "Kupon za jedno oslobađanje od kuhanja ručka ili večere.",
    "Kupon za duboki, čvrsti zagrljaj koji traje najmanje dvije minute.",
    "Kupon za jednu provokativnu sliku poslanu na mobitel tijekom dana.",
    "Kupon za zajedničko gledanje zalaska sunca s omiljenim pićem.",
    "Kupon za 20 minuta maženja u krevetu prije ustajanja.",
    "Kupon za pravo da preusmjeriš bilo koji izazov iz igre na partnera.",
    "Kupon za jednu novu pozu iz Kama Sutre koju ćemo isprobati večeras.",
    "Kupon za masažu ruku, dlanova i ramena u trajanju od 10 minuta.",
    "Kupon za naručivanje pizze ili burgera kasno navečer.",
    "Kupon za jedan strastveni 'quickie' na mjestu po tvom izboru.",
    "Kupon za pospremanje sobe ili kreveta umjesto tebe.",
    "Kupon za jednu večer posvećenu isključivo tvom užitku u krevetu.",
    "Kupon za poljubac na kiši ili pod zvijezdama.",
    "Kupon za odabir deserta koji će partner morati ispeći ili kupiti.",
    "Kupon za 15 minuta igranja s kockicama leda po cijelom tijelu.",
    "Kupon za pravo da odabereš donje rublje koje će partner obući večeras.",
    "Kupon za jedno iskreno priznanje ili odgovor na bilo koje pitanje.",
    "Kupon za zajednički odlazak u kino na film po tvom izboru.",
    "Kupon za masažu vrata dok radiš ili gledaš televiziju.",
    "Kupon za jednu rundu dominacije u kojoj ti postavljaš sva pravila.",
    "Kupon za topli obrok koji te čeka čim dođeš kući s posla ili faksa.",
    "Kupon za pet minuta šaptanja najljepših komplimenata na uho.",
    "Kupon za jedan piknik u prirodi ili na podu dnevne sobe.",
    "Kupon za oslobađanje od ustajanja iz kreveta po čašu vode.",
    "Kupon za jednu senzualnu igru s povezom na očima.",
    "Kupon za biranje kafića ili bara za naš sljedeći izlazak.",
    "Kupon za deset minuta ljubljenja bez upotrebe ruku.",
    "Kupon za jednu uslugu po tvom izboru koju ne smijem odbiti.",
    "Kupon za zajedničko pečenje palačinki u kasne noćne sate.",
    "Kupon za 15 minuta masaže lica i tjemena.",
    "Kupon za jednu noć u kojoj ti određuješ tempo i trajanje svega.",
    "Kupon za kupovinu jedne sitnice koja ti se već dugo sviđa.",
    "Kupon za pravo na pobjedu u sljedećoj partiji bilo koje igre.",
    "Kupon za jedan spori, romantični ples u dnevnoj sobi.",
    "Kupon za buđenje uz oralni seks ili strastveno maženje.",
    "Kupon za biranje društva ili aktivnosti za petak navečer.",
    "Kupon za 10 minuta zadirkivanja poljupcima po cijelom trbuhu.",
    "Kupon za jedno ručno pisano ljubavno pismo ili poruku.",
    "Kupon za oslobađanje od iznošenja smeća sljedećih tjedan dana.",
    "Kupon za jednu partiju pokera ili karata na skidanje.",
    "Kupon za topli zagrljaj s leđa dok kuhaš ili nešto radiš.",
    "Kupon za odabir teme razgovora bez prekidanja i gledanja u mobitel.",
    "Kupon za 20 minuta potpunog opuštanja dok partner sve obavlja.",
    "Kupon za jednu perverznu poruku tijekom radnog vremena.",
    "Kupon za zajedničko gledanje starih slika i prisjećanje uspomena.",
    "Kupon za jedan poljubac u svaki dio lica prije spavanja.",
    "Kupon za pravo da zatražiš 'još jednu rundu' kada god poželiš.",
    "Kupon za pripremu tople kupke sa svijećama i glazbom.",
    "Kupon za oslobađanje od jednog odlaska u trgovinu.",
    "Kupon za jednu igru uloga (roleplay) po tvom scenariju.",
    "Kupon za 10 minuta igranja s kosom i nježnih dodira po licu.",
    "Kupon za odabir mjesta za naš sljedeći jednodnevni izlet.",
    "Kupon za jednu tajnu želju koju moraš samo šapnuti i bit će ispunjena.",
    "Kupon za doručak, ručak ili večeru posluženu s maksimalnom pažnjom.",
    "Kupon za jedan strastveni zagrljaj koji briše sav stres dana.",
    "Kupon za pravo da večeras ti budeš 'šef/ica' u spavaćoj sobi.",
    "Kupon za zajedničko promatranje zvijezda pod toplom dekom.",
    "Kupon za jednu neograničenu želju po tvom izboru – vrijedi odmah!"
  ],
  knowMe: {
    lagana: [
      "Koja je moja apsolutno najdraža hrana?",
      "Koje je moje omiljeno piće kada izađemo van?",
      "Koja je moja najdraža boja?",
      "Koje godišnje doba najviše volim?",
      "Jesam li više jutarnji tip ili noćna ptica?",
      "Koji je moj najdraži film ili serija svih vremena?",
      "Što najradije naručujem kada jedemo brzu hranu?",
      "Koja mi je najdraža slastica ili čokolada?",
      "Volim li više more i plažu ili planine i prirodu?",
      "Koji je moj omiljeni hobi ili aktivnost u slobodno vrijeme?",
      "Koju vrstu glazbe najčešće slušam?",
      "Koji je moj broj cipela?",
      "Koja je moja omiljena životinja?",
      "Pijem li kavu ili čaj, i kako ga točno pripremam?",
      "Što me najbrže može nasmijati kada sam loše volje?",
      "Koje jelo nikako ne volim i izbjegavam u širokom luku?",
      "Koji je moj horoskopski znak?",
      "Volim li više slatko ili slano?",
      "Koji mi je najdraži dan u tjednu i zašto?",
      "Što uvijek nosim sa sobom u torbi ili džepovima kad izlazim?"
    ],
    teza: [
      "Koji je bio moj najdraži crtić ili igračka u djetinjstvu?",
      "Čega se najviše bojim (moja najveća fobija)?",
      "Koji je moj najveći skriveni talent za koji malo ljudi zna?",
      "Koja mi je bila najdraža destinacija na kojoj sam ikada bio/la?",
      "Što me kod drugih ljudi najbrže može izbaciti iz takta?",
      "Koji mi je bio najdraži predmet u školi, a koji sam najviše mrzio/la?",
      "Da mogu večerati s bilo kojom slavnom osobom, koga bih odabrao/la?",
      "Koji je moj najveći ponos ili postignuće u životu do sada?",
      "Što sam kao dijete želio/la postati kad odrastem?",
      "Koja je moja najgora navika koje sam svjestan/na?",
      "Koji je moj idealan način za rješavanje stresa nakon teškog dana?",
      "Koju bih državu ili grad volio/la posjetiti prije kraja života?",
      "Koji mi je bio prvi kućni ljubimac i kako se zvao?",
      "Što najviše cijenim kod pravih prijatelja?",
      "Koji je moj najdraži miris (osim parfema)?",
      "Koja je najluđa ili najspontanija stvar koju sam ikada napravio/la?",
      "Što radim kada mislim da me apsolutno nitko ne gleda?",
      "Koja me pjesma uvijek pogodi u emocije?",
      "Da dobijem na lotu, što bih prvo kupio/la sebi?",
      "Koji mi je bio najneugodniji trenutak u životu kojeg se sjećam?"
    ],
    teska: [
      "Koji je moj najveći neostvareni san ili životni cilj?",
      "Što sam prvo točno pomislio/la o tebi kada smo se tek upoznali?",
      "Koja je moja najveća nesigurnost o kojoj rijetko pričam?",
      "Koji trenutak u životu me najviše promijenio kao osobu?",
      "Što smatram svojom najvećom manom u karakteru?",
      "Koji je bio točan trenutak kada sam shvatio/la da sam zaljubljen/a u tebe?",
      "Čega se najviše bojim kada razmišljam o budućnosti?",
      "Koji savjet bih dao/la mlađoj verziji sebe prije 10 godina?",
      "Što mi je u životu važnije: apsolutna sigurnost ili potpuna sloboda?",
      "Koja je najteža odluka koju sam ikada morao/la donijeti?",
      "Što kod tebe najviše cijenim, a rijetko ti to kažem na glas?",
      "Koji je moj najveći žal ili stvar koju bih volio/la da sam napravio/la drugačije?",
      "Kako izgleda moj savršeni život za točno 10 godina?",
      "Što mi je potrebno od tebe kada sam tužan/na ili pod velikim pritiskom?",
      "Koji je moj glavni 'jezik ljubavi' (riječi, dodir, vrijeme, pokloni ili djela)?",
      "Koju uspomenu iz našeg zajedničkog vremena čuvam kao najdražu?",
      "Što me u vezi s tobom najviše iznenadilo nakon što smo prohodali?",
      "Koja je jedina stvar koju nikada ne bih mogao/la oprostiti u vezi?",
      "Što me čini istinski sretnim/om i ispunjenim/om u životu?",
      "Da možeš promijeniti jednu stvar u mom životu da mi olakšaš, što misliš da bih odabrao/la?"
    ],
    ljubav: [
      "Koji dio mog tijela najviše voliš dodirivati tijekom maženja?",
      "Koja je moja najosjetljivija erogena zona na tijelu?",
      "Koja je moja apsolutno najdraža poza u krevetu?",
      "Što me najbrže i najsigurnije uzbudi tijekom predigre?",
      "Koji je moj najveći 'turn-off' (ono što me odmah ohladi) u spavaćoj sobi?",
      "Gdje izvan spavaće sobe najviše volim voditi ljubav s tobom?",
      "Voliš li više kada sam u krevetu dominantan/na ili kada prepustim kontrolu tebi?",
      "Koji komad donjeg rublja ili odjeće na meni smatraš najseksi?",
      "Koliko mi je važna predigra i što mi u njoj najviše odgovara?",
      "Koja je moja tajna seksualna fantazija o kojoj smo već pričali ili koju naslućuješ?",
      "Što najviše volim kada mi šapneš na uho tijekom intimnih trenutaka?",
      "Koji je bio naš najstrastveniji i najnezaboravniji intimni trenutak do sada?",
      "Voliš li više jutarnji seks čim se probudimo ili kasni noćni?",
      "Koji tvoj dodir ili poljubac na meni uvijek izazove trnce?",
      "Što najviše volim da radimo odmah nakon što vodimo ljubav?",
      "Postoji li neka igračka ili rekvizit koji znaš da bih volio/la isprobati?",
      "Koji moj pogled ili izraz lica ti odmah daje do znanja da te želim?",
      "Koje javno mjesto bi mi bilo najuzbudljivije za brzi, tajni poljubac ili dodir?",
      "Što misliš da je moja najveća vrlina u krevetu?",
      "Koji je moj idealan scenarij za savršenu romantičnu i strastvenu večer u dvoje?"
    ]
  }
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
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [currentText, setCurrentText] = useState(null);

    const spinWheel = () => {
      if (isSpinning) return;
      setIsSpinning(true);
      setCurrentText(null);
      setSelectedPlayer(null);

      // Izvlači igrača (0 = igrač 1, 1 = igrač 2)
      const winnerIdx = Math.random() > 0.5 ? 0 : 1;
      const winnerName = winnerIdx === 0 ? players.p1 : players.p2;

      // Kvadranti: p1 je na 0-90° i 180-270°, p2 na 90-180° i 270-360°
      // Kazaljka je na vrhu (0°), pa ciljamo sredinu odgovarajućeg kvadranta (45° ili 135°)
      const targetAngle = winnerIdx === 0 ? 315 : 225;
      const extraSpins = (5 + Math.floor(Math.random() * 4)) * 360;
      const currentMod = rotation % 360;
      const finalRotation = rotation + extraSpins + ((targetAngle - currentMod + 360) % 360);

      setRotation(finalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        setSelectedPlayer(winnerName);
      }, 2550);
    };

    const rollChoice = (type) => {
      if (type === 'truth') {
        const text = popRand(db.tod[activeLevel].truths);
        setCurrentText(text.includes("KRAJ!") ? text : `${selectedPlayer}, reci istinu:\n\n${text}`);
      } else {
        const text = popRand(db.tod[activeLevel].dares);
        setCurrentText(text.includes("KRAJ!") ? text : `${selectedPlayer}, tvoj izazov:\n\n${text}`);
      }
    };

    const nextTurn = () => {
      setSelectedPlayer(null);
      setCurrentText(null);
    };

    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#ec4899' }}>Istina ili Izazov</h2>

        {/* FAZA 1: Vrtnja kola */}
        {!selectedPlayer && (
          <>
            <div className="wheel-wrapper">
              <div className="wheel-pointer" />
              <div className="wheel-circle" style={{ transform: `rotate(${rotation}deg)` }}>
                <span className="wheel-label w-q1">{players.p1}</span>
                <span className="wheel-label w-q2">{players.p2}</span>
                <span className="wheel-label w-q3">{players.p1}</span>
                <span className="wheel-label w-q4">{players.p2}</span>
                <div className="wheel-center">
                  <Heart size={22} color="#ec4899" fill="#ec4899" />
                </div>
              </div>
            </div>
            <button onClick={spinWheel} disabled={isSpinning} className="btn-main bg-wyr">
              {isSpinning ? "VRTI SE..." : "ZAVRTI KOLO"}
            </button>
          </>
        )}

        {/* FAZA 2: Odabrani igrač bira Istinu ili Izazov */}
        {selectedPlayer && !currentText && (
          <>
            <div className="game-box" style={{ flexDirection: 'column', gap: '15px', borderColor: '#ec4899' }}>
              <span style={{ fontSize: '1.1rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Na potezu je:</span>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ec4899' }}>{selectedPlayer}</span>
              <span style={{ fontSize: '1.1rem', color: 'white' }}>Što biraš?</span>
            </div>
            <div className="btn-row">
              <button onClick={() => rollChoice('truth')} className="btn-half bg-truth">ISTINA</button>
              <button onClick={() => rollChoice('dare')} className="btn-half bg-dare">IZAZOV</button>
            </div>
          </>
        )}

        {/* FAZA 3: Prikaz zadatka i prelazak na sljedećeg */}
        {selectedPlayer && currentText && (
          <>
            <div className="game-box"><p style={{ whiteSpace: 'pre-line' }}>{currentText}</p></div>
            <button onClick={nextTurn} className="btn-main bg-wyr">SLJEDEĆI IGRAČ</button>
          </>
        )}

        <button onClick={() => { setActiveLevel(null); nextTurn(); }} className="back-btn">
          <ArrowLeft size={20} /> Promijeni razinu
        </button>
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
    const [activeDicePlayer, setActiveDicePlayer] = useState("");
    const [dice, setDice] = useState({ action: "Zavrti", part: "Kockice!" });

    const rollDice = () => {
      let rollCount = 0;
      const chosenPlayer = getRandomPlayer();
      setActiveDicePlayer("Bira se igrač...");

      const interval = setInterval(() => {
        setDice({ 
          action: keepRand(db.dice[activeLevel].actions), 
          part: keepRand(db.dice[activeLevel].parts) 
        });
        rollCount++;
        if (rollCount > 10) {
          clearInterval(interval);
          setActiveDicePlayer(chosenPlayer);
        }
      }, 50);
    };

    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#eab308' }}>Kockice</h2>
        {activeDicePlayer && (
          <p style={{ color: '#eab308', fontWeight: '800', fontSize: '1.4rem', marginBottom: '20px', textTransform: 'uppercase' }}>
            {activeDicePlayer === "Bira se igrač..." ? activeDicePlayer : `Izvršava: ${activeDicePlayer}`}
          </p>
        )}
        <div className="btn-row" style={{ marginBottom: '30px' }}>
          <div className="game-box" style={{ flex: 1, minHeight: '150px', marginBottom: 0, padding: '10px', borderColor: '#eab308' }}><p>{dice.action}</p></div>
          <div className="game-box" style={{ flex: 1, minHeight: '150px', marginBottom: 0, padding: '10px', borderColor: '#eab308' }}><p>{dice.part}</p></div>
        </div>
        <button onClick={rollDice} className="btn-main bg-dice" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Dice5 size={28} /> BACI KOCKICE
        </button>
        <button onClick={() => { setActiveLevel(null); setActiveDicePlayer(""); }} className="back-btn">
          <ArrowLeft size={20}/> Promijeni razinu
        </button>
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
          <button onClick={() => setActiveGame('mostLikely')} className="card neon-cyan"><Users size={40} color="#06b6d4" /><span className="card-title">Tko će prije?</span></button>
          <button onClick={() => setActiveGame('fiveSeconds')} className="card neon-rose"><Timer size={40} color="#f43f5e" /><span className="card-title">5 Sekundi</span></button>
          <button onClick={() => setActiveGame('twister')} className="card neon-indigo"><Zap size={40} color="#6366f1" /><span className="card-title">Twister za dvoje</span></button>
          <button onClick={() => setActiveGame('scratch')} className="card neon-amber"><Ticket size={40} color="#f59e0b" /><span className="card-title">Kuponi za Užitak</span></button>
          <button onClick={() => setActiveGame('knowMe')} className="card neon-teal"><HelpCircle size={40} color="#14b8a6" /><span className="card-title">Koliko me poznaješ?</span></button>        
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
      case 'mostLikely': return <MostLikelyGame />;
      case 'fiveSeconds': return <FiveSecondsGame />;
      case 'twister': return <TwisterGame />;
      case 'scratch': return <ScratchGame />;
      case 'knowMe': return <KnowMeGame />;
      default: return null;
    }
  };
  const MostLikelyGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentText, setCurrentText] = useState("Na 3, 2, 1 oboje pokažite prstom na osobu!");
    const nextQuestion = () => {
      setCurrentText(popRand(db.mostLikely[activeLevel]));
    };
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#06b6d4' }}>Tko će prije?</h2>
        <div className="game-box" style={{ borderColor: '#06b6d4' }}><p>{currentText}</p></div>
        <button onClick={nextQuestion} className="btn-main bg-cyan">SLJEDEĆE PITANJE</button>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  const FiveSecondsGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [customSeconds, setCustomSeconds] = useState(5);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [activePlayer, setActivePlayer] = useState("");
    const [prompt, setPrompt] = useState("Izvuci zadatak, unesi vrijeme i pokreni sat!");

    React.useEffect(() => {
      if (!isRunning || timeLeft === null) return;
      if (timeLeft <= 0) {
        setIsRunning(false);
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft((prev) => +(prev - 0.1).toFixed(1));
      }, 100);
      return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const generateTask = () => {
      setIsRunning(false);
      setTimeLeft(null);
      setActivePlayer(getRandomPlayer());
      setPrompt(popRand(db.fiveSeconds[activeLevel]));
    };

    const startTimer = () => {
      const sec = Number(customSeconds) > 0 ? Number(customSeconds) : 5;
      setTimeLeft(sec);
      setIsRunning(true);
    };

    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#f43f5e' }}>Utrka s vremenom</h2>
        
        {activePlayer && (
          <p style={{ color: '#f43f5e', fontWeight: '800', fontSize: '1.4rem', marginBottom: '15px', textTransform: 'uppercase' }}>
            Na redu je: {activePlayer}
          </p>
        )}

        <div className="game-box" style={{ borderColor: '#f43f5e', flexDirection: 'column', gap: '15px' }}>
          <p>{prompt}</p>
          {timeLeft !== null && (
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              color: timeLeft <= 0 ? '#ef4444' : '#facc15',
              marginTop: '10px'
            }}>
              {timeLeft <= 0 ? "VRIJEME ISTEKLO!" : `${timeLeft}s`}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
          <label style={{ color: '#9ca3af', fontWeight: '600', whiteSpace: 'nowrap' }}>Vrijeme (sek):</label>
          <input 
            type="number" 
            min="1" 
            max="60" 
            value={customSeconds} 
            onChange={(e) => setCustomSeconds(e.target.value)}
            className="input-field"
            style={{ marginBottom: 0, padding: '12px', fontSize: '1.1rem' }}
          />
        </div>

        <div className="btn-row">
          <button onClick={generateTask} className="btn-half bg-wyr">NOVI ZADATAK</button>
          <button onClick={startTimer} disabled={isRunning} className="btn-half bg-rose">
            {isRunning ? "TEČE..." : "POKRENI SAT"}
          </button>
        </div>

        <button onClick={() => { setActiveLevel(null); setIsRunning(false); setTimeLeft(null); setActivePlayer(""); }} className="back-btn">
          <ArrowLeft size={20}/> Promijeni razinu
        </button>
      </div>
    );
  };

  const TwisterGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [moves, setMoves] = useState([]);
    const [turnIndex, setTurnIndex] = useState(0);

    const addMove = () => {
      const currentPlayer = turnIndex % 2 === 0 ? players.p1 : players.p2;
      const task = popRand(db.twister[activeLevel]);
      if (task.includes("KRAJ!")) {
        setMoves([{ player: "KRAJ", text: task }]);
        return;
      }
      setMoves(prev => [{ player: currentPlayer, text: task }, ...prev]);
      setTurnIndex(prev => prev + 1);
    };

    const resetTwister = () => {
      setMoves([]);
      setTurnIndex(0);
    };

    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#6366f1' }}>Twister za dvoje</h2>
        <p style={{ color: '#9ca3af', marginBottom: '20px' }}>Zadržite sve prethodne poze dok dodajete nove! Tko prvi padne ili popusti, gubi.</p>

        <div className="game-box" style={{ borderColor: '#6366f1', flexDirection: 'column', gap: '12px', alignItems: 'stretch', textAlign: 'left', maxHeight: '320px', overflowY: 'auto' }}>
          {moves.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>Pritisni gumb za prvi potez!</p>
          ) : (
            moves.map((m, idx) => (
              <div key={idx} style={{ 
                padding: '12px 15px', 
                borderRadius: '12px', 
                background: idx === 0 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: idx === 0 ? '1px solid #6366f1' : '1px solid transparent',
                opacity: idx === 0 ? 1 : 0.65,
                fontSize: idx === 0 ? '1.25rem' : '1rem'
              }}>
                <span style={{ color: '#818cf8', fontWeight: '800' }}>{m.player}: </span>
                <span>{m.text}</span>
              </div>
            ))
          )}
        </div>

        <div className="btn-row">
          <button onClick={addMove} className="btn-half bg-indigo">SLJEDEĆI POTEZ</button>
          <button onClick={resetTwister} className="btn-half" style={{ background: 'rgba(255,255,255,0.1)' }}>ISPRAZNITI</button>
        </div>

        <button onClick={() => { setActiveLevel(null); resetTwister(); }} className="back-btn">
          <ArrowLeft size={20}/> Promijeni razinu
        </button>
      </div>
    );
  };

  const ScratchGame = () => {
    const [winner, setWinner] = useState("");
    const [prize, setPrize] = useState("");
    const [isRevealed, setIsRevealed] = useState(false);
    const canvasRef = React.useRef(null);
    const isDrawing = React.useRef(false);

    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Srebrno-zlatni sloj za grebanje
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#475569');
      grad.addColorStop(0.5, '#94a3b8');
      grad.addColorStop(1, '#334155');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('OSTRUGAJ PRSTOM ZA NAGRADU', canvas.width / 2, canvas.height / 2);
    };

    const newCard = () => {
      setIsRevealed(false);
      setWinner(getRandomPlayer());
      setPrize(popRand(db.scratchCards));
      setTimeout(initCanvas, 50);
    };

    React.useEffect(() => {
      newCard();
    }, []);

    const scratch = (e) => {
      if (!isDrawing.current || isRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();

      // Provjera koliko je ostrugano
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;
      for (let i = 3; i < imgData.data.length; i += 32) {
        if (imgData.data[i] === 0) cleared++;
      }
      if (cleared / (imgData.data.length / 32) > 0.45) {
        setIsRevealed(true);
      }
    };

    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#f59e0b' }}>Kuponi za Užitak</h2>
        {winner && (
          <p style={{ color: '#f59e0b', fontWeight: '800', fontSize: '1.3rem', marginBottom: '20px', textTransform: 'uppercase' }}>
            Kupon osvaja: {winner}
          </p>
        )}

        <div className="scratch-container">
          <p style={{ fontSize: '1.35rem', fontWeight: '700', color: '#fef3c7', lineHeight: '1.4', zIndex: 1 }}>
            {prize}
          </p>
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            style={{ opacity: isRevealed ? 0 : 1, pointerEvents: isRevealed ? 'none' : 'auto' }}
            onMouseDown={() => { isDrawing.current = true; }}
            onMouseUp={() => { isDrawing.current = false; }}
            onMouseLeave={() => { isDrawing.current = false; }}
            onMouseMove={scratch}
            onTouchStart={() => { isDrawing.current = true; }}
            onTouchEnd={() => { isDrawing.current = false; }}
            onTouchMove={scratch}
          />
        </div>

        <button onClick={newCard} className="btn-main bg-amber">NOVI KUPON</button>
        <button onClick={() => setActiveGame(null)} className="back-btn">
          <ArrowLeft size={20} /> Natrag na izbornik
        </button>
      </div>
    );
  };

  const KnowMeGame = () => {
    const [kmLevel, setKmLevel] = useState(null);
    const [question, setQuestion] = useState("Pritisni gumb za prvo pitanje!");
    const [pair, setPair] = useState(null);

    const KM_LEVELS = [
      { id: 'lagana', name: 'Lagana pitanja', desc: 'Osnovne stvari koje bi svatko trebao znati.', style: 'neon-emerald' },
      { id: 'teza', name: 'Teža pitanja', desc: 'Nešto o čemu moraš malo razmisliti.', style: 'neon-blue' },
      { id: 'teska', name: 'Teška pitanja', desc: 'Dublje stvari koje znaju samo oni koji stvarno slušaju.', style: 'neon-orange' },
      { id: 'ljubav', name: 'Ljubav', desc: 'Intimnija pitanja o strasti, dodirima i željama.', style: 'neon-pink' }
    ];

    if (!kmLevel) {
      return (
        <div className="app-container">
          <h2 className="subtitle" style={{ color: '#14b8a6' }}>Koliko me dobro poznaješ?</h2>
          <div className="grid-menu">
            {KM_LEVELS.map((lvl) => (
              <button key={lvl.id} onClick={() => setKmLevel(lvl.id)} className={`card ${lvl.style}`}>
                <span className="card-title">{lvl.name}</span>
                <span className="card-desc">{lvl.desc}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setActiveGame(null)} className="back-btn">
            <ArrowLeft size={20} /> Natrag na izbornik
          </button>
        </div>
      );
    }

    const nextQuestion = () => {
      const { active, other } = getBothPlayers();
      setPair({ guesser: active, subject: other });
      setQuestion(popRand(db.knowMe[kmLevel]));
    };

    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#14b8a6' }}>Koliko me poznaješ?</h2>
        {pair && (
          <p style={{ color: '#5eead4', fontWeight: '700', fontSize: '1.15rem', marginBottom: '20px' }}>
            {pair.guesser} pogađa što bi {pair.subject} odgovorio/la:
          </p>
        )}
        <div className="game-box" style={{ borderColor: '#14b8a6' }}>
          <p>{question}</p>
        </div>
        <button onClick={nextQuestion} className="btn-main bg-teal">SLJEDEĆE PITANJE</button>
        <button onClick={() => { setKmLevel(null); setPair(null); setQuestion("Pritisni gumb za prvo pitanje!"); }} className="back-btn">
          <ArrowLeft size={20} /> Promijeni kategoriju
        </button>
      </div>
    );
  };

  return <div style={{ width: '100%' }}>{renderGame()}</div>;
  
}