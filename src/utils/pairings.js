/**
 * Generates pairings for Secret Hanukkah.
 * Ensures no one is assigned to themselves.
 * Strategy: Shuffle the array, then assign index i to index (i+1)%length.
 * This guarantees a single cycle where everyone gives and receives one gift.
 * 
 * @param {string[]} names - List of participant names
 * @returns {Array<{giver: string, receiver: string}>} - List of pairings
 */
export function generatePairings(names) {
  if (!names || names.length < 2) {
    return [];
  }

  // Create a copy and shuffle it
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  
  const pairings = shuffled.map((giver, index) => {
    const receiverIndex = (index + 1) % shuffled.length;
    return {
      giver: giver,
      receiver: shuffled[receiverIndex]
    };
  });

  return pairings;
}
