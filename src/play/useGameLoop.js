import { useEffect, useState } from 'react';
import { generateEnemy } from './enemyService';

export function useGameLoop() {
  const [enemy, setEnemy] = useState(null);
  const [enemyNumber, setEnemyNumber] = useState(1);
  const [experience, setExperience] = useState(0);

  const passiveDamage = 2;
  const clickDamage = 10;

  useEffect(() => {
    spawnEnemy(enemyNumber);
  }, []);

  useEffect(() => {
    const loop = setInterval(() => {
      damageEnemy(passiveDamage);
    }, 1000);

    return () => clearInterval(loop);
  }, [enemy]);

  async function spawnEnemy(number) {
    const newEnemy = await generateEnemy(number);
    setEnemy(newEnemy);
  }

  function damageEnemy(amount) {
    setEnemy((prev) => {
      if (!prev) return prev;

      const newHealth = prev.health - amount;

      if (newHealth <= 0 && prev.health > 0) {
        handleEnemyDeath(prev);
        return { ...prev, health: 0 };
      }

      return { ...prev, health: newHealth };
    });
  }

  function handleEnemyDeath(enemyData) {
    const xpGain = Math.floor(enemyData.maxHealth * 0.2);

    setExperience((xp) => xp + xpGain);

    const next = enemyData.level + 1;
    setEnemyNumber(next);

    spawnEnemy(next);
  }

  function attack() {
    damageEnemy(clickDamage);
  }

  return {
    enemy,
    experience,
    attack
  };
}