import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NameEntry from './components/NameEntry';
import RevealFlow from './components/RevealFlow';
import { generatePairings } from './utils/pairings';
// Removed App.css import as styles are now in index.css

function App() {
  const [phase, setPhase] = useState('SETUP'); // SETUP | REVEAL
  const [pairings, setPairings] = useState([]);

  const startSecretHanukkah = (names) => {
    const newPairings = generatePairings(names);
    // Shuffle the reveal order so people can't guess the cycle based on who goes next
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
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>🕎 Secret Hanukkah 🕎</h1>
        <p style={{ color: 'var(--color-gold)', fontSize: '1.1rem', letterSpacing: '1px' }}>
          L'échange de cadeaux lumineux
        </p>
      </motion.header>

      <main>
        <AnimatePresence mode="wait">
          {phase === 'SETUP' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <NameEntry onStart={startSecretHanukkah} />
            </motion.div>
          )}

          {phase === 'REVEAL' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <RevealFlow pairings={pairings} onReset={resetApp} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ marginTop: '3rem', opacity: 0.5, fontSize: '0.8rem' }}>
        <p>Created with 💙 for Hanukkah</p>
      </footer>
    </div>
  );
}

export default App;
