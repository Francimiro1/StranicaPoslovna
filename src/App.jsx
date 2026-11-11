import React, { useState } from 'react';
import { Heart, Flame, Zap, Skull, Dice5, MessageCircle, PlayCircle, Layers, Home, ArrowLeft, Eye } from 'lucide-react';

/* =========================================
   BAZA PODATAKA - PROCEDURALNI GENERATOR
   ========================================= */

const LEVELS = {
  soft: { id: 'soft', name: 'Soft', desc: 'Lagani izazovi, tek toliko da se zagrijemo.', color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500' },
  hot: { id: 'hot', name: 'Hot', desc: 'Stvari se zakuhavaju: hrabri izazovi i zabava bez srama.', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500' },
  hard: { id: 'hard', name: 'Hard', desc: 'Sada je napeto: tenzije, želja, intenzitet.', color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500' },
  extreme: { id: 'extreme', name: 'Extreme', desc: 'Nema više tabua: slobodno istraživanje tijela i fantazija.', color: 'text-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500' }
};

// Generiranje za parove (Istina, Izazov, Uno, NHIE, WYR)
const generators = {
  soft: {
    truthStarts: ["Koja je prva stvar koju si pomislio/la kad smo se", "Što najviše voliš kada ti", "Koji ti je najdraži zajednički", "Što te uvijek nasmije kod"],
    truthEnds: ["upoznali?", "radim u krevetu?", "izlazak?", "mene?", "dodirnem?", "šapnem na uho?"],
    dareStarts: ["Daj mi dugu masažu", "Poljubi me u", "Drži me za ruku i ispričaj mi", "Gledaj me u oči 1 minutu i reci mi"],
    dareEnds: ["vrata.", "obraz i zadrži usne 10 sekundi.", "svoju najdražu fantaziju o nama.", "što najviše voliš na mom tijelu."],
    nhie: ["Nikad nisam lagao/la da mi se sviđa nešto što si obukao/la.", "Nikad nisam potajno mirisao/la tvoju odjeću.", "Nikad nisam planirao/la romantični spoj u glavi a da ti nisam rekao/la.", "Nikad nisam bio/la ljubomoran/na na nekoga tko te gledao."],
    wyrA: ["Dobiti masažu cijelog tijela svaki dan", "Imati doručak u krevetu svaki dan", "Spavati zagrljen cijelu noć"],
    wyrB: ["Dobiti strastveni poljubac svaki put kad se vidimo", "Zajedničko tuširanje svaku večer", "Da te budim poljupcima"],
    diceActions: ["Poljubi", "Masiraj", "Pogladi", "Mazi", "Puhni u"],
    diceParts: ["Vrat", "Obraz", "Ruku", "Kosu", "Rame"]
  },
  hot: {
    truthStarts: ["Koji dio mog tijela te", "Kada si zadnji put", "Što si oduvijek htio/la", "Koji je najbezobrazniji san koji si"],
    truthEnds: ["najviše pali?", "masturbirao/la misleći na mene?", "isprobati sa mnom, a nisi rekao/la?", "imao/la o nama?"],
    dareStarts: ["Skini jedan komad", "Polako mi otkopčaj", "Liži mi", "Zaveži mi oči i"],
    dareEnds: ["moje odjeće koristeći samo zube.", "košulju/majicu dok me gledaš u oči.", "vrat sljedećih 30 sekundi.", "pogađaj gdje te ljubim."],
    nhie: ["Nikad nisam zamišljao/la nas dvoje u javnosti.", "Nikad nisam poslao/la prljavu poruku i odmah požalio/la.", "Nikad nisam zaboravio/la donje rublje namjerno.", "Nikad nisam bio/la uzbuđen/a na potpuno neprikladnom mjestu."],
    wyrA: ["Seks na stražnjem sjedalu auta", "Strastveno ljubljenje u prepunom klubu", "Da ti šapćem prljave stvari u javnosti"],
    wyrB: ["Seks u tuš kabini", "Seks na kuhinjskom stolu", "Da ti šaljem eksplicitne slike dok si na poslu"],
    diceActions: ["Liži", "Grickaj", "Skini odjeću sa", "Ljubi", "Snažno stisni"],
    diceParts: ["Usne", "Stomak", "Donji dio leđa", "Bedro", "Grudi/Prsa"]
  },
  hard: {
    truthStarts: ["Koji je tvoj najveći seksualni", "Što točno želiš da ti", "Koju pozu nikad nismo", "Da imamo 24 sata da radimo što god želimo u krevetu, što bi"],
    truthEnds: ["fetiš?", "napravim večeras?", "probali, a očajnički želiš?", "bila prva stvar koju bi mi napravio/la?"],
    dareStarts: ["Napravi mi", "Dodiruj se pred mnom", "Trljaj se o mene", "Kušaj me"],
    dareEnds: ["lap dance u trajanju od 2 minute.", "dok te ja samo gledam i ne smijem dirati.", "sljedećih 60 sekundi u donjem rublju.", "na mjestu gdje nikad nisi."],
    nhie: ["Nikad nisam snimao/la naš seks.", "Nikad nisam zamišljao/la igranje uloga (roleplay) s tobom.", "Nikad nisam koristio/la igračke dok sam bio/la sam/a misleći na tebe.", "Nikad nisam progutao/la."],
    wyrA: ["Koristiti lisice i uže večeras", "Igrati uloge gdje smo potpuni stranci u baru", "Imati seks pred velikim ogledalom"],
    wyrB: ["Biti dominantan/na cijelu noć", "Biti submisivan/na cijelu noć", "Da te snimam dok mi pružaš zadovoljstvo"],
    diceActions: ["Ugrizni", "Siši", "Poljubi i ostavi trag na", "Veži", "Pljesni po"],
    diceParts: ["Unutarnja strana bedra", "Stražnjica", "Međunožje", "Bradavice", "Vrat"]
  },
  extreme: {
    truthStarts: ["Koju moju prljavu tajnu", "S kime bi od naših poznanika", "Koju iznimno perverznu stvar", "Koliko si puta danas"],
    truthEnds: ["bi volio/la ostvariti večeras?", "htio/la imati trojac?", "želiš da ti napravim?", "razmišljao/la o mom tijelu?"],
    dareStarts: ["Oralno me zadovolji", "Skini se potpuno gol/a i", "Dopusti mi da ti", "Odaberi igračku i"],
    dareEnds: ["sljedećih 5 minuta bez prestanka.", "dopusti mi da istražim svaki centimetar tvog tijela ledom.", "stavim povez na oči do kraja igre.", "koristi je na meni kako god želiš."],
    nhie: ["Nikad nisam imao/la seks na javnom mjestu gdje su nas mogli uloviti.", "Nikad nisam imao/la analni seks.", "Nikad nisam želio/la biti vezan/a i potpuno bespomoćan/na.", "Nikad nisam imao/la trojac."],
    wyrA: ["Imati grubi seks gdje nema pravila", "Gledati mene kako se zadovoljavam dok si ti vezan/a", "Da ti netko drugi gleda dok se seksamo"],
    wyrB: ["Trojac s još jednom curom", "Trojac s još jednim dečkom", "Da provedemo cijeli vikend goli i zaključani u sobi"],
    diceActions: ["Pruži oralno na", "Kapaj vosak na", "Uđi u", "Stavi prste u", "Trljaj led o"],
    diceParts: ["G-točka / Osjetljiva zona", "Stražnjica", "Međunožje", "Bradavice", "Donji dio trbuha"]
  }
};

const guessCategories = {
  filmovi: ["Titanic", "Pedeset nijansi sive", "Gospodar prstenova", "Harry Potter", "Sam u kući", "Bilježnica", "Zgodna žena", "Američka pita", "Sumrak", "Brzi i žestoki"],
  stvari: ["Lisice", "Krevet", "Mobitel", "Kondom", "Svijeća", "Bič", "Vibrator", "Donje rublje", "Posteljina", "Jastuk"],
  radnje: ["Ljubljenje", "Vođenje ljubavi", "Tuširanje", "Kuhanje doručka", "Masaža", "Skidanje", "Spavanje", "Maženje", "Svađanje", "Plesanje"],
  dijeloviTijela: ["Vrat", "Usne", "Stražnjica", "Bedro", "Grudi", "Trbuh", "Kosa", "Leđa", "Uho", "Ruke"]
};

// Pomoćna funkcija za nasumični odabir
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* =========================================
   GLAVNA KOMPONENTA
   ========================================= */

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  // Komponenta: Izbornik Nivoa (Zajednički za sve igre)
  const LevelSelector = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4 neon-text-glow text-white">Odaberi Razinu</h2>
      {Object.values(LEVELS).map((lvl) => (
        <button
          key={lvl.id}
          onClick={() => onSelect(lvl.id)}
          className={`w-full max-w-md p-6 rounded-2xl border-2 ${lvl.border} ${lvl.bg} hover:scale-105 transition-transform flex flex-col items-center justify-center`}
        >
          <span className={`text-2xl font-bold uppercase tracking-widest ${lvl.color}`}>{lvl.name}</span>
          <span className="text-gray-300 mt-2 text-sm text-center">{lvl.desc}</span>
        </button>
      ))}
      <button onClick={() => setActiveGame(null)} className="mt-8 flex items-center text-gray-400 hover:text-white">
        <ArrowLeft className="w-5 h-5 mr-2" /> Natrag na izbornik
      </button>
    </div>
  );

  /* --- IGRA 1: Istina ili Izazov --- */
  const TodGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentText, setCurrentText] = useState("Odaberi Istinu ili Izazov!");
    
    const roll = (type) => {
      const data = generators[activeLevel];
      if (type === 'truth') setCurrentText(`${rand(data.truthStarts)} ${rand(data.truthEnds)}`);
      else setCurrentText(`${rand(data.dareStarts)} ${rand(data.dareEnds)}`);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className={`text-2xl font-bold mb-8 uppercase ${LEVELS[activeLevel].color}`}>Istina ili Izazov ({activeLevel})</h2>
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 w-full max-w-md min-h-[200px] flex items-center justify-center text-center shadow-lg mb-8">
          <p className="text-xl md:text-2xl font-medium text-white">{currentText}</p>
        </div>
        <div className="flex w-full max-w-md space-x-4">
          <button onClick={() => roll('truth')} className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">Istina</button>
          <button onClick={() => roll('dare')} className="flex-1 bg-red-600 hover:bg-red-500 py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(220,38,38,0.5)]">Izazov</button>
        </div>
        <button onClick={() => setActiveLevel(null)} className="mt-12 text-gray-400 flex items-center"><ArrowLeft className="w-5 h-5 mr-2"/> Promijeni razinu</button>
      </div>
    );
  };

  /* --- IGRA 2: Uno Izazovi --- */
  const UnoGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentDare, setCurrentDare] = useState("Tko izgubi partiju Unoa, mora odraditi izazov!");

    const generateUnoDare = () => {
      const data = generators[activeLevel];
      setCurrentDare(`Kazna za gubitnika: ${rand(data.dareStarts)} ${rand(data.dareEnds)}`);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className={`text-2xl font-bold mb-8 uppercase ${LEVELS[activeLevel].color}`}>Uno Izazovi ({activeLevel})</h2>
        <div className="bg-red-900/30 p-8 rounded-2xl border border-red-500 w-full max-w-md min-h-[200px] flex items-center justify-center text-center shadow-lg mb-8">
          <p className="text-xl md:text-2xl font-medium text-white">{currentDare}</p>
        </div>
        <button onClick={generateUnoDare} className="w-full max-w-md bg-gradient-to-r from-red-600 to-orange-500 py-4 rounded-xl font-bold text-xl shadow-[0_0_20px_rgba(220,38,38,0.6)]">
          Generiraj Kaznu
        </button>
        <button onClick={() => setActiveLevel(null)} className="mt-12 text-gray-400 flex items-center"><ArrowLeft className="w-5 h-5 mr-2"/> Promijeni razinu</button>
      </div>
    );
  };

  /* --- IGRA 3: Nikad Nisam --- */
  const NhieGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentText, setCurrentText] = useState("Pritisni gumb za prvo pitanje!");

    const generateNHIE = () => {
      setCurrentText(rand(generators[activeLevel].nhie));
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className={`text-2xl font-bold mb-8 uppercase ${LEVELS[activeLevel].color}`}>Nikad Nisam ({activeLevel})</h2>
        <div className="bg-purple-900/30 p-8 rounded-2xl border border-purple-500 w-full max-w-md min-h-[200px] flex items-center justify-center text-center shadow-lg mb-8">
          <p className="text-xl md:text-2xl font-medium text-white">{currentText}</p>
        </div>
        <button onClick={generateNHIE} className="w-full max-w-md bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-bold text-xl shadow-[0_0_20px_rgba(147,51,234,0.6)]">
          Sljedeće
        </button>
        <button onClick={() => setActiveLevel(null)} className="mt-12 text-gray-400 flex items-center"><ArrowLeft className="w-5 h-5 mr-2"/> Promijeni razinu</button>
      </div>
    );
  };

  /* --- IGRA 4: Što bi radije (WYR) --- */
  const WyrGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [opts, setOpts] = useState({ a: "Opcija A", b: "Opcija B" });

    const generateWYR = () => {
      const data = generators[activeLevel];
      setOpts({ a: rand(data.wyrA), b: rand(data.wyrB) });
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className={`text-2xl font-bold mb-8 uppercase ${LEVELS[activeLevel].color}`}>Što bi radije? ({activeLevel})</h2>
        <div className="w-full max-w-md flex flex-col space-y-4 mb-8">
          <div className="bg-blue-900/30 p-6 rounded-2xl border border-blue-500 flex items-center justify-center text-center min-h-[120px]">
            <p className="text-lg font-medium text-white">{opts.a}</p>
          </div>
          <div className="text-center font-bold text-gray-400 text-xl">ILI</div>
          <div className="bg-pink-900/30 p-6 rounded-2xl border border-pink-500 flex items-center justify-center text-center min-h-[120px]">
            <p className="text-lg font-medium text-white">{opts.b}</p>
          </div>
        </div>
        <button onClick={generateWYR} className="w-full max-w-md bg-gradient-to-r from-blue-600 to-pink-600 py-4 rounded-xl font-bold text-xl shadow-[0_0_20px_rgba(236,72,153,0.5)]">
          Nova Dilema
        </button>
        <button onClick={() => setActiveLevel(null)} className="mt-12 text-gray-400 flex items-center"><ArrowLeft className="w-5 h-5 mr-2"/> Promijeni razinu</button>
      </div>
    );
  };

  /* --- IGRA 5: Pogodi Riječ --- */
  const GuessGame = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [word, setWord] = useState("Drži mobitel na čelu!");

    if (!activeCategory) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
          <h2 className="text-3xl font-bold mb-4 neon-text-glow text-white text-center">Pogodi Riječ<br/><span className="text-sm text-gray-400 font-normal">Zalijepi mobitel na čelo, partner objašnjava!</span></h2>
          {Object.keys(guessCategories).map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setWord("Spremni? Dodirni za početak!"); }}
              className="w-full max-w-md p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-500/20 hover:scale-105 transition-transform text-2xl font-bold uppercase tracking-widest text-emerald-400">
              {cat}
            </button>
          ))}
          <button onClick={() => setActiveGame(null)} className="mt-8 flex items-center text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5 mr-2" /> Natrag na izbornik</button>
        </div>
      );
    }

    return (
      <div onClick={() => setWord(rand(guessCategories[activeCategory]))} className="flex flex-col items-center justify-center min-h-screen bg-emerald-900/40 p-4 cursor-pointer">
        <p className="text-gray-400 mb-8 uppercase tracking-widest">Kategorija: {activeCategory} (Dodirni ekran za iduću)</p>
        <h1 className="text-5xl md:text-7xl font-black text-white text-center drop-shadow-2xl">{word}</h1>
        <button onClick={(e) => { e.stopPropagation(); setActiveCategory(null); }} className="absolute bottom-10 text-gray-400 flex items-center bg-black/50 px-4 py-2 rounded-full"><ArrowLeft className="w-5 h-5 mr-2"/> Promijeni kategoriju</button>
      </div>
    );
  };

  /* --- IGRA 6: Kockice --- */
  const DiceGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [dice, setDice] = useState({ action: "Zavrti", part: "Kockice!" });

    const rollDice = () => {
      const data = generators[activeLevel];
      let rollCount = 0;
      const interval = setInterval(() => {
        setDice({ action: rand(data.diceActions), part: rand(data.diceParts) });
        rollCount++;
        if (rollCount > 10) clearInterval(interval);
      }, 50);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className={`text-2xl font-bold mb-8 uppercase ${LEVELS[activeLevel].color}`}>Kockice ({activeLevel})</h2>
        <div className="flex space-x-4 w-full max-w-md mb-8">
          <div className="flex-1 bg-gray-800 border-2 border-gray-600 rounded-2xl h-40 flex items-center justify-center p-4 text-center">
            <span className="text-2xl font-bold text-white">{dice.action}</span>
          </div>
          <div className="flex-1 bg-gray-800 border-2 border-gray-600 rounded-2xl h-40 flex items-center justify-center p-4 text-center">
            <span className="text-2xl font-bold text-white">{dice.part}</span>
          </div>
        </div>
        <button onClick={rollDice} className="w-full max-w-md bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black text-2xl shadow-[0_0_20px_rgba(234,179,8,0.6)] flex justify-center items-center">
          <Dice5 className="w-8 h-8 mr-2" /> BACI KOCKICE
        </button>
        <button onClick={() => setActiveLevel(null)} className="mt-12 text-gray-400 flex items-center"><ArrowLeft className="w-5 h-5 mr-2"/> Promijeni razinu</button>
      </div>
    );
  };

  /* --- GLAVNI IZBORNIK --- */
  if (!activeGame) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-6 neon-text-glow text-white">COUPLES PARTY</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <button onClick={() => setActiveGame('tod')} className="bg-gray-800/80 hover:bg-gray-700 border border-gray-600 p-6 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <Heart className="w-12 h-12 text-pink-500 mb-3" />
            <span className="text-xl font-bold text-white">Istina ili Izazov</span>
          </button>
          
          <button onClick={() => setActiveGame('uno')} className="bg-gray-800/80 hover:bg-gray-700 border border-gray-600 p-6 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <Layers className="w-12 h-12 text-red-500 mb-3" />
            <span className="text-xl font-bold text-white">Uno Izazovi</span>
          </button>

          <button onClick={() => setActiveGame('nhie')} className="bg-gray-800/80 hover:bg-gray-700 border border-gray-600 p-6 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <Flame className="w-12 h-12 text-orange-500 mb-3" />
            <span className="text-xl font-bold text-white">Nikad Nisam</span>
          </button>

          <button onClick={() => setActiveGame('wyr')} className="bg-gray-800/80 hover:bg-gray-700 border border-gray-600 p-6 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <Zap className="w-12 h-12 text-blue-500 mb-3" />
            <span className="text-xl font-bold text-white">Što Bi Radije?</span>
          </button>

          <button onClick={() => setActiveGame('guess')} className="bg-gray-800/80 hover:bg-gray-700 border border-gray-600 p-6 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <Eye className="w-12 h-12 text-emerald-500 mb-3" />
            <span className="text-xl font-bold text-white">Pogodi Riječ</span>
          </button>

          <button onClick={() => setActiveGame('dice')} className="bg-gray-800/80 hover:bg-gray-700 border border-gray-600 p-6 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <Dice5 className="w-12 h-12 text-yellow-500 mb-3" />
            <span className="text-xl font-bold text-white">Baci Kockice</span>
          </button>
        </div>
      </div>
    );
  }

  /* --- RENDER AKTIVNE IGRE --- */
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

  return <div className="min-h-screen w-full">{renderGame()}</div>;
}