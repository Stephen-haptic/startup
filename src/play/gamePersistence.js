export async function saveGame(enemy, enemyNumber, experience) {
  if (!enemy) return;

  const data = {
    enemy,
    enemyNumber,
    experience,
  };

  try {
    await fetch('/api/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch {
    console.warn('Failed to save game');
  }
}

export async function loadGame() {
  try {
    const res = await fetch('/api/player');

    if (!res.ok) throw new Error();

    const data = await res.json();

    return {
      enemy: data.enemy,
      enemyNumber: data.enemyNumber,
      experience: data.experience,
    };

  } catch {

    return {
      enemy: null,
      enemyNumber: 1,
      experience: 0,
    };
  }
}