import { generateEnemy } from './enemyService';

const SAVE_KEY = 'idleRpgSave';

export function saveGame(enemy, enemyNumber, experience) {
  if (!enemy) return;

  const data = {
    enemy,
    enemyNumber,
    experience,
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export async function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);

  if (!saved) {
    const enemy = await generateEnemy(1);
    return {
      enemy,
      enemyNumber: 1,
      experience: 0,
    };
  }

  try {
    const data = JSON.parse(saved);

    return {
      enemy: data.enemy,
      enemyNumber: data.enemyNumber,
      experience: data.experience,
    };
  } catch {
    const enemy = await generateEnemy(1);
    return {
      enemy,
      enemyNumber: 1,
      experience: 0,
    };
  }
}