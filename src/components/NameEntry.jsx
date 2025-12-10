import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NameEntry({ onStart }) {
    const [names, setNames] = useState([]);
    const [currentName, setCurrentName] = useState('');

    const addName = (e) => {
        e.preventDefault();
        if (currentName.trim() && !names.includes(currentName.trim())) {
            setNames([...names, currentName.trim()]);
            setCurrentName('');
        }
    };

    const removeName = (nameToRemove) => {
        setNames(names.filter(name => name !== nameToRemove));
    };

    return (
        <div className="glass-panel">
            <h2 style={{ marginTop: 0 }}>Ajoutez les participants</h2>
            <p style={{ color: 'var(--color-silver)', marginBottom: '2rem', textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
                Entrez les noms de ceux qui participeront à l'échange de cadeaux.
            </p>

            <form onSubmit={addName} style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <input
                    type="text"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    placeholder="Prénom..."
                    autoFocus
                    style={{ minWidth: '200px' }}
                />
                <motion.button
                    type="submit"
                    disabled={!currentName.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Ajouter
                </motion.button>
            </form>

            <ul style={{
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                minHeight: '50px' // Avoid jumping when empty
            }}>
                <AnimatePresence>
                    {names.map((name, index) => (
                        <motion.li
                            key={name}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            layout
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'rgba(0, 31, 63, 0.4)',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                border: '1px solid var(--color-electric-blue)',
                                boxShadow: '0 0 10px rgba(0, 247, 255, 0.2)'
                            }}
                        >
                            <span style={{ color: 'var(--color-electric-blue)', fontWeight: 'bold' }}>#{index + 1}</span>
                            <span>{name}</span>
                            <button
                                onClick={() => removeName(name)}
                                style={{
                                    padding: '0.2rem',
                                    fontSize: '0.8rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    color: 'var(--color-silver)',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '0.5rem'
                                }}
                            >
                                ✕
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>

            {names.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}
                >
                    <p style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--color-silver)', marginTop: 0 }}>
                        Total : {names.length} participants
                    </p>
                    <motion.button
                        onClick={() => onStart(names)}
                        disabled={names.length < 2}
                        style={{ fontSize: '1.2em', padding: '0.8em 2.5em', marginTop: '1rem' }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 25px var(--color-neon-purple)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Commencer le tirage 🎉
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
