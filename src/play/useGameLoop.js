import { useEffect, useState } from 'react';
import { generateEnemy } from './enemyService';
import { useCharacter } from '../character/characterInfo';
import { calculatePassiveDamage } from '../character/calculateDamage';

export function useGameLoop() {
  const [enemy, setEnemy] = useState(null);
  const [enemyNumber, setEnemyNumber] = useState(1);
  const [experience, setExperience] = useState(0);
  const { character } = useCharacter();

  const clickDamage = 10;

  useEffect(() => {
    const savedGame = localStorage.getItem('idleRpgSave');

    if (savedGame) {
        const data = JSON.parse(savedGame);

        setEnemy(data.enemy);
        setEnemyNumber(data.enemyNumber);
        setExperience(data.experience);
    } else {
        spawnEnemy(1);
    }
  }, []);

  useEffect(() => {
    if (!enemy) return;

    const saveData = {
        enemy,
        enemyNumber,
        experience
    };

    localStorage.setItem('idleRpgSave', JSON.stringify(saveData));
  }, [enemy, enemyNumber, experience]);

  useEffect(() => {
    if (!enemy || !character) return;

    const loop = setInterval(() => {
      const damage = calculatePassiveDamage(character);
      damageEnemy(damage);
    }, 1000);

    return () => clearInterval(loop);
  }, [enemy, character]);

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