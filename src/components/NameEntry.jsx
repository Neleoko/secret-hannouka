import React, { useState } from 'react';

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
        <div className="card">
            <h2>Ajoutez les participants</h2>
            <p>Entrez les noms de ceux qui participeront à l'échange de cadeaux.</p>

            <form onSubmit={addName} style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    placeholder="Prénom"
                    autoFocus
                />
                <button type="submit" disabled={!currentName.trim()}>
                    Ajouter
                </button>
            </form>

            {names.length > 0 && (
                <ul style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    {names.map((name, index) => (
                        <li key={name} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid var(--color-hanukkah-blue)'
                        }}>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>#{index + 1}</span>
                            <span>{name}</span>
                            <button
                                onClick={() => removeName(name)}
                                style={{ padding: '0.2em 0.5em', fontSize: '0.8em', background: 'transparent', border: '1px solid var(--color-silver)', color: 'var(--color-silver)' }}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ borderTop: '1px solid var(--color-hanukkah-blue)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--color-silver)' }}>
                    Total : {names.length} participants
                </p>
                <button
                    onClick={() => onStart(names)}
                    disabled={names.length < 2}
                    style={{ fontSize: '1.2em', padding: '0.8em 2em' }}
                >
                    Commencer le tirage 🎉
                </button>
            </div>
        </div>
    );
}
