import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function RevealFlow({ pairings, onReset }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [complete, setComplete] = useState(false);

    const currentPair = pairings[currentIndex];

    useEffect(() => {
        if (complete) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }, [complete]);

    const showTarget = () => {
        setIsRevealed(true);
    };

    const nextPerson = () => {
        setIsRevealed(false);
        if (currentIndex < pairings.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setComplete(true);
        }
    };

    if (complete) {
        return (
            <motion.div
                className="glass-panel"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
            >
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem', textShadow: '0 0 20px var(--color-gold)' }}>✡️ Hag Sameach ! ✡️</h2>
                <p>Le tirage est terminé. Tout le monde a reçu sa cible.</p>
                <p>Que la fête des lumières commence !</p>
                <motion.div
                    style={{ fontSize: '5rem', margin: '2rem' }}
                    animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1, 1.1, 1],
                        filter: ["drop-shadow(0 0 10px gold)", "drop-shadow(0 0 50px gold)", "drop-shadow(0 0 10px gold)"]
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    🕎
                </motion.div>
                <motion.button
                    onClick={onReset}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ marginTop: '1rem' }}
                >
                    Recommencer
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div className="glass-panel" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '1rem', color: 'var(--color-electric-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 0 5px var(--color-electric-blue)' }}>
                Tour {currentIndex + 1} / {pairings.length}
            </div>

            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="ask"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="step-ask"
                    >
                        <h2 style={{ color: 'var(--color-gold)', fontSize: '2rem', textShadow: '0 0 15px var(--color-gold)' }}>Appelez {currentPair.giver} !</h2>
                        <motion.button
                            onClick={showTarget}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--color-electric-blue)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            C'est moi, je regarde
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="step-reveal"
                    >
                        <h2 style={{ fontSize: '1.5rem' }}>Bonjour {currentPair.giver} !</h2>
                        <p>Pour cette Hanoucca, tu offriras un cadeau à :</p>
                        <motion.div
                            style={{
                                fontSize: '2.5rem',
                                margin: '2rem 0',
                                color: 'var(--color-electric-blue)',
                                textShadow: '0 0 25px var(--color-electric-blue)',
                                fontWeight: 'bold',
                                background: 'rgba(0,0,0,0.3)',
                                padding: '1rem',
                                borderRadius: '15px',
                                border: '1px solid var(--color-gold)'
                            }}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <span style={{ marginRight: '10px' }}>🎁</span>
                            {currentPair.receiver}
                            <span style={{ marginLeft: '10px' }}>🎁</span>
                        </motion.div>
                        <div style={{marginBottom: '10rem' }}/>
                        <motion.button
                            onClick={nextPerson}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ borderColor: 'var(--color-electric-blue)', color: 'var(--color-white)', background: 'transparent', border: '1px solid var(--color-electric-blue)' }}
                        >
                            C'est noté, effacer l'écran
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
