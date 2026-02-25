import { generateEnemy } from './enemyService';

const SAVE_KEY = 'idleRpgSave';
const MAX_OFFLINE_SECONDS = 60 * 60 * 8;

export function saveGame(enemy, enemyNumber, experience) {
  if (!enemy) return;

  const data = {
    enemy,
    enemyNumber,
    experience,
    lastUpdate: Date.now(),
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export async function loadGame(passiveDamage) {
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

    let enemy = data.enemy;
    let enemyNumber = data.enemyNumber;
    let experience = data.experience;

    const secondsAway = Math.min(
      Math.floor((Date.now() - data.lastUpdate) / 1000),
      MAX_OFFLINE_SECONDS
    );

    let damage = secondsAway * passiveDamage;

    while (enemy && damage > 0) {
      if (damage >= enemy.health) {
        damage -= enemy.health;

        const xpGain = Math.floor(enemy.maxHealth * 0.2);
        experience += xpGain;

        enemyNumber += 1;
        enemy = createOfflineEnemy(enemyNumber);
      } else {
        enemy = {
          ...enemy,
          health: enemy.health - damage,
        };

        damage = 0;
      }
    }

    return {
      enemy,
      enemyNumber,
      experience,
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

function createOfflineEnemy(level) {
  let maxHealth = 50 + level * 20;

  if (level % 5 === 0) {
    maxHealth *= 2;
  }

  return {
    name: 'Unknown Beast',
    level,
    health: maxHealth,
    maxHealth,
  };
}