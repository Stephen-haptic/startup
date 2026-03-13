export async function saveGame(playerData) {
  try {
    await fetch('/api/player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData),
    });
  } catch {
    console.warn('Failed to save game');
  }
}

// Load the full player state from backend
export async function loadGame() {
  try {
    const res = await fetch('/api/player');
    if (!res.ok) throw new Error();
    const data = await res.json();
    return {
      character: data.character ?? null,
      enemy: data.enemy ?? null,
      enemyNumber: data.enemyNumber ?? 1,
      experience: data.experience ?? 0,
      enemiesSlain: data.enemiesSlain ?? 0
    };
  } catch {
    return {
      character: null,
      enemy: null,
      enemyNumber: 1,
      experience: 0,
      enemiesSlain: 0
    };
  }
}