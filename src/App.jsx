import React, { useState } from 'react';
import { Heart, Flame, Zap, Eye, Dice5, Layers, ArrowLeft } from 'lucide-react';

const LEVELS = {
  soft: { id: 'soft', name: 'Soft', desc: 'Lagani izazovi za zagrijavanje.', style: 'neon-pink' },
  hot: { id: 'hot', name: 'Hot', desc: 'Stvari se zakuhavaju: zabava bez srama.', style: 'neon-orange' },
  hard: { id: 'hard', name: 'Hard', desc: 'Tenzija, želja i intenzitet.', style: 'neon-red' },
  extreme: { id: 'extreme', name: 'Extreme', desc: 'Nema tabua: čisto istraživanje.', style: 'neon-purple' }
};

const generators = {
  soft: {
    truthStarts: ["Koja je prva stvar koju si pomislio/la kad smo se", "Što najviše voliš kada ti", "Koji ti je najdraži zajednički", "Što te uvijek nasmije kod"],
    truthEnds: ["upoznali?", "radim u krevetu?", "izlazak?", "mene?", "dodirnem?", "šapnem na uho?"],
    dareStarts: ["Daj mi dugu masažu", "Poljubi me u", "Drži me za ruku i ispričaj mi", "Gledaj me u oči 1 minutu i reci mi"],
    dareEnds: ["vrata.", "obraz i zadrži usne 10 sekundi.", "svoju najdražu fantaziju o nama.", "što najviše voliš na mom tijelu."],
    nhie: ["Nikad nisam lagao/la da mi se sviđa nešto što si obukao/la.", "Nikad nisam potajno mirisao/la tvoju odjeću.", "Nikad nisam planirao/la romantični spoj u glavi a da ti nisam rekao/la."],
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
    nhie: ["Nikad nisam zamišljao/la nas dvoje u javnosti.", "Nikad nisam poslao/la prljavu poruku i odmah požalio/la.", "Nikad nisam bio/la uzbuđen/a na potpuno neprikladnom mjestu."],
    wyrA: ["Seks na stražnjem sjedalu auta", "Strastveno ljubljenje u prepunom klubu", "Da ti šapćem prljave stvari u javnosti"],
    wyrB: ["Seks u tuš kabini", "Seks na kuhinjskom stolu", "Da ti šaljem eksplicitne slike dok si na poslu"],
    diceActions: ["Liži", "Grickaj", "Skini odjeću sa", "Ljubi", "Snažno stisni"],
    diceParts: ["Usne", "Stomak", "Donji dio leđa", "Bedro", "Grudi"]
  },
  hard: {
    truthStarts: ["Koji je tvoj najveći seksualni", "Što točno želiš da ti", "Koju pozu nikad nismo", "Da imamo 24 sata u krevetu, što bi"],
    truthEnds: ["fetiš?", "napravim večeras?", "probali, a očajnički želiš?", "bila prva stvar koju bi mi napravio/la?"],
    dareStarts: ["Napravi mi", "Dodiruj se pred mnom", "Trljaj se o mene", "Kušaj me"],
    dareEnds: ["lap dance u trajanju od 2 minute.", "dok te ja samo gledam i ne smijem dirati.", "sljedećih 60 sekundi u donjem rublju.", "na mjestu gdje nikad nisi."],
    nhie: ["Nikad nisam snimao/la naš seks.", "Nikad nisam zamišljao/la igranje uloga (roleplay) s tobom.", "Nikad nisam koristio/la igračke dok sam bio/la sam/a misleći na tebe."],
    wyrA: ["Koristiti lisice i uže večeras", "Igrati uloge gdje smo potpuni stranci u baru"],
    wyrB: ["Biti dominantan/na cijelu noć", "Biti submisivan/na cijelu noć"],
    diceActions: ["Ugrizni", "Siši", "Poljubi i ostavi trag na", "Veži", "Pljesni po"],
    diceParts: ["Unutarnja strana bedra", "Stražnjica", "Međunožje", "Bradavice", "Vrat"]
  },
  extreme: {
    truthStarts: ["Koju moju prljavu tajnu", "S kime bi od naših poznanika", "Koju iznimno perverznu stvar", "Koliko si puta danas"],
    truthEnds: ["bi volio/la ostvariti večeras?", "htio/la imati trojac?", "želiš da ti napravim?", "razmišljao/la o mom tijelu?"],
    dareStarts: ["Oralno me zadovolji", "Skini se potpuno gol/a i", "Dopusti mi da ti", "Odaberi igračku i"],
    dareEnds: ["sljedećih 5 minuta bez prestanka.", "dopusti mi da istražim svaki centimetar tvog tijela ledom.", "stavim povez na oči do kraja igre.", "koristi je na meni kako god želiš."],
    nhie: ["Nikad nisam imao/la seks na javnom mjestu gdje su nas mogli uloviti.", "Nikad nisam želio/la biti vezan/a i potpuno bespomoćan/na.", "Nikad nisam imao/la trojac."],
    wyrA: ["Imati grubi seks gdje nema pravila", "Gledati mene kako se zadovoljavam dok si ti vezan/a"],
    wyrB: ["Trojac s još jednom curom", "Da provedemo cijeli vikend goli i zaključani u sobi"],
    diceActions: ["Pruži oralno na", "Kapaj vosak na", "Uđi u", "Stavi prste u", "Trljaj led o"],
    diceParts: ["Osjetljiva zona", "Stražnjica", "Međunožje", "Bradavice", "Donji dio trbuha"]
  }
};

const guessCategories = {
  filmovi: ["Titanic", "Pedeset nijansi sive", "Gospodar prstenova", "Harry Potter", "Sam u kući", "Zgodna žena", "Američka pita", "Sumrak"],
  stvari: ["Lisice", "Krevet", "Mobitel", "Kondom", "Svijeća", "Bič", "Vibrator", "Donje rublje", "Posteljina", "Jastuk"],
  radnje: ["Ljubljenje", "Vođenje ljubavi", "Tuširanje", "Kuhanje doručka", "Masaža", "Skidanje", "Spavanje", "Maženje", "Svađanje", "Plesanje"],
  dijeloviTijela: ["Vrat", "Usne", "Stražnjica", "Bedro", "Grudi", "Trbuh", "Kosa", "Leđa", "Uho", "Ruke"]
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function App() {
  const [players, setPlayers] = useState({ p1: "", p2: "" });
  const [isSetup, setIsSetup] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  // Funkcije za izvlačenje igrača
  const getRandomPlayer = () => Math.random() > 0.5 ? players.p1 : players.p2;
  const getBothPlayers = () => {
    const active = getRandomPlayer();
    const other = active === players.p1 ? players.p2 : players.p1;
    return { active, other };
  };

  // EKRAN: UNOS IMENA
  if (!isSetup) {
    return (
      <div className="app-container">
        <h1 className="title" style={{ fontSize: '2.5rem' }}>Tko večeras igra?</h1>
        <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Unesite svoja imena za osobnije iskustvo!</p>
        <input 
          className="input-field" 
          placeholder="Ime prvog igrača..." 
          value={players.p1} 
          onChange={(e) => setPlayers({...players, p1: e.target.value})} 
        />
        <input 
          className="input-field" 
          placeholder="Ime drugog igrača..." 
          value={players.p2} 
          onChange={(e) => setPlayers({...players, p2: e.target.value})} 
        />
        <button 
          className="btn-main bg-truth" 
          style={{ marginTop: '20px' }}
          onClick={() => { if(players.p1.trim() && players.p2.trim()) setIsSetup(true); }}
        >
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
      <button onClick={() => setActiveGame(null)} className="back-btn">
        <ArrowLeft size={20} /> Natrag na izbornik
      </button>
    </div>
  );

  const TodGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [currentText, setCurrentText] = useState("Odaberi Istinu ili Izazov!");
    const roll = (type) => {
      const data = generators[activeLevel];
      const player = getRandomPlayer();
      if (type === 'truth') setCurrentText(`${player}, odgovori:\n\n${rand(data.truthStarts)} ${rand(data.truthEnds)}`);
      else setCurrentText(`${player}, tvoj izazov:\n\n${rand(data.dareStarts)} ${rand(data.dareEnds)}`);
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
    const generateUnoDare = () => {
      const data = generators[activeLevel];
      setCurrentDare(`Kazna za gubitnika:\n\n${rand(data.dareStarts)} ${rand(data.dareEnds)}`);
    };
    return (
      <div className="app-container">
        <h2 className="subtitle" style={{ color: '#ea580c' }}>Uno Izazovi</h2>
        <div className="game-box" style={{ borderColor: '#ea580c' }}><p style={{ whiteSpace: 'pre-line' }}>{currentDare}</p></div>
        <button onClick={generateUnoDare} className="btn-main bg-uno">GENERIRAJ KAZNU</button>
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
        <button onClick={() => setCurrentText(rand(generators[activeLevel].nhie))} className="btn-main bg-nhie">SLJEDEĆE</button>
        <button onClick={() => setActiveLevel(null)} className="back-btn"><ArrowLeft size={20}/> Promijeni razinu</button>
      </div>
    );
  };

  const WyrGame = () => {
    if (!activeLevel) return <LevelSelector onSelect={setActiveLevel} />;
    const [header, setHeader] = useState("");
    const [opts, setOpts] = useState({ a: "Opcija A", b: "Opcija B" });
    
    const generateWYR = () => {
      const data = generators[activeLevel];
      setHeader(`${getRandomPlayer()} bira:`);
      setOpts({ a: rand(data.wyrA), b: rand(data.wyrB) });
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
            {Object.keys(guessCategories).map((cat) => (
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
      <div className="word-guess-screen" onClick={() => setWord(rand(guessCategories[activeCategory]))}>
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
      const data = generators[activeLevel];
      let rollCount = 0;
      const interval = setInterval(() => {
        setDice({ action: rand(data.diceActions), part: rand(data.diceParts) });
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

  // EKRAN: GLAVNI IZBORNIK NAKON UNOSA IMENA
  if (!activeGame) {
    return (
      <div className="app-container">
        <h1 className="title">Couples Party</h1>
        <div className="grid-menu">
          <button onClick={() => setActiveGame('tod')} className="card neon-pink">
            <Heart size={40} color="#ec4899" />
            <span className="card-title">Istina ili Izazov</span>
          </button>
          <button onClick={() => setActiveGame('uno')} className="card neon-orange">
            <Layers size={40} color="#f97316" />
            <span className="card-title">Uno Izazovi</span>
          </button>
          <button onClick={() => setActiveGame('nhie')} className="card neon-purple">
            <Flame size={40} color="#a855f7" />
            <span className="card-title">Nikad Nisam</span>
          </button>
          <button onClick={() => setActiveGame('wyr')} className="card neon-blue">
            <Zap size={40} color="#3b82f6" />
            <span className="card-title">Što Bi Radije?</span>
          </button>
          <button onClick={() => setActiveGame('guess')} className="card neon-emerald">
            <Eye size={40} color="#10b981" />
            <span className="card-title">Pogodi Riječ</span>
          </button>
          <button onClick={() => setActiveGame('dice')} className="card neon-yellow">
            <Dice5 size={40} color="#eab308" />
            <span className="card-title">Baci Kockice</span>
          </button>
        </div>
        <button onClick={() => setIsSetup(false)} className="back-btn" style={{ marginTop: '30px' }}>
          Promijeni igrače
        </button>
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