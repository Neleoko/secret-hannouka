import { useState } from 'react';
import NameEntry from './components/NameEntry';
import RevealFlow from './components/RevealFlow';
import { generatePairings } from './utils/pairings';
import './App.css';

function App() {
  const [phase, setPhase] = useState('SETUP'); // SETUP | REVEAL
  const [pairings, setPairings] = useState([]);

  const startSecretHanukkah = (names) => {
    const newPairings = generatePairings(names);
    // Shuffle the reveal order so people can't guess the cycle based on who goes next
    // The cycle (A->B->C) is already established in newPairings
    const shuffledRevealOrder = [...newPairings].sort(() => Math.random() - 0.5);

    setPairings(shuffledRevealOrder);
    setPhase('REVEAL');
  };

  const resetApp = () => {
    setPairings([]);
    setPhase('SETUP');
  };

  return (
    <div className="App">
      <header>
        <h1>🕎 Secret Hanukkah 🕎</h1>
        <p style={{ color: 'var(--color-hanukkah-light)' }}>L'échange de cadeaux lumineux</p>
      </header>

      <main>
        {phase === 'SETUP' && (
          <NameEntry onStart={startSecretHanukkah} />
        )}

        {phase === 'REVEAL' && (
          <RevealFlow pairings={pairings} onReset={resetApp} />
        )}
      </main>
    </div>
  );
}

export default App;
