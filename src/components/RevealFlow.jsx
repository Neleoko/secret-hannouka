import React, { useState } from 'react';

export default function RevealFlow({ pairings, onReset }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [complete, setComplete] = useState(false);

    const currentPair = pairings[currentIndex];

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
            <div className="card">
                <h2>✡️ Hag Sameach ! ✡️</h2>
                <p>Le tirage est terminé. Tout le monde a reçu sa cible.</p>
                <p>Que la fête des lumières commence !</p>
                <div style={{ fontSize: '4rem', margin: '2rem' }}>🕎</div>
                <button onClick={onReset}>Recommencer</button>
            </div>
        );
    }

    return (
        <div className="card">
            <div style={{ marginBottom: '1rem', color: 'var(--color-silver)', fontSize: '0.9rem' }}>
                Tour {currentIndex + 1} / {pairings.length}
            </div>

            {!isRevealed ? (
                <div className="step-ask">
                    <h2 style={{ color: 'var(--color-gold)' }}>Appelez {currentPair.giver} !</h2>
                    <button onClick={showTarget}>C'est moi, je regarde</button>
                </div>
            ) : (
                <div className="step-reveal">
                    <h2>Bonjour {currentPair.giver} !</h2>
                    <p>Pour cette Hanoucca, tu offriras un cadeau à :</p>
                    <div style={{
                        fontSize: '2.5rem',
                        margin: '2rem 0',
                        color: 'var(--color-gold)',
                        textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
                        fontWeight: 'bold'
                    }}>
                        🎁 {currentPair.receiver} 🎁
                    </div>
                    <p style={{ fontSize: '0.9em', color: 'var(--color-silver)' }}>Gardes-le secret !</p>
                    <button onClick={nextPerson}>C'est noté, effacer l'écran</button>
                </div>
            )}
        </div>
    );
}
