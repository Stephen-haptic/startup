export async function generateEnemy(monsterNumber) {
  const name = await generateName();

  let maxHealth = 50 + monsterNumber * 20;

  // Difficulty spike every 5 enemies
  if (monsterNumber % 5 === 0) {
    maxHealth *= 2;
  }

  return {
    name,
    level: monsterNumber,
    health: maxHealth,
    maxHealth: maxHealth,
  };
}

async function generateName() {
  try {
    const res = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await res.json();
    return capitalize(data[0]);
  } catch {
    const fallback = [
      'Goblin',
      'Skeleton',
      'Orc',
      'Slime',
      'Bandit'
    ];

    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}