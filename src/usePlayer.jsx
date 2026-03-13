import { useEffect, useState } from "react";
import { generateEnemy } from "./play/enemyService";
import { calculatePassiveDamage } from "./character/calculateDamage";
import { loadGame, saveGame } from "./play/gamePersistence";

const BASE_STAT_COST = 50;
const STAT_COST_INCREMENT = 50;

export const defaultCharacter = {
  name: "Placeholder Hero",
  class: "Adventurer",
  level: 1,
  stats: {
    wizardry: 1,
    strength: 1,
    allTrades: 1,
  },
  weapon: {
    type: "wizardry",
  },
  weaponUpgrades: {
    wizardry: { baseDamageBonus: 0, scalingBonus: 0 },
    strength: { baseDamageBonus: 0, scalingBonus: 0 },
  },
};

export function usePlayer() {
  const [character, setCharacter] = useState(defaultCharacter);
  const [experience, setExperience] = useState(0);
  const [enemy, setEnemy] = useState(null);
  const [enemyNumber, setEnemyNumber] = useState(1);
  const [enemiesSlain, setEnemiesSlain] = useState(0);

  // LOAD PLAYER
  useEffect(() => {
    async function init() {
      const data = await loadGame();

      // Ensure we always have a character object and stats
      const loadedCharacter = data.character
        ? { 
            ...defaultCharacter,
            ...data.character,
            stats: { ...defaultCharacter.stats, ...(data.character.stats ?? {}) },
            weapon: { ...defaultCharacter.weapon, ...(data.character.weapon ?? {}) },
            weaponUpgrades: { ...defaultCharacter.weaponUpgrades, ...(data.character.weaponUpgrades ?? {}) }
          }
        : { ...defaultCharacter };

      setCharacter(loadedCharacter);
      setExperience(data.experience ?? 0);

      if (data.enemy) {
        setEnemy(data.enemy);
        setEnemyNumber(data.enemyNumber ?? 1);
      } else {
        const firstEnemy = await generateEnemy(1);
        setEnemy(firstEnemy);
        setEnemyNumber(1);
      }
    }

    init();
  }, []);

  // SAVE PLAYER
  useEffect(() => {
    if (!enemy) return;

    saveGame({
      character,
      experience,
      enemy,
      enemyNumber,
      enemiesSlain,
    });
  }, [character, experience, enemy, enemyNumber, enemiesSlain]);

  // PASSIVE DAMAGE LOOP
  useEffect(() => {
    const loop = setInterval(() => {
      if (!enemy) return;

      const damage = calculatePassiveDamage(character);
      damageEnemy(damage);
    }, 1000);

    return () => clearInterval(loop);
  }, [enemy, character]);

  // DAMAGE ENEMY
  function damageEnemy(amount) {
    setEnemy(prev => {
      if (!prev) return prev;

      const newHealth = prev.health - amount;

      if (newHealth <= 0 && prev.health > 0) {
        handleEnemyDeath(prev);
        return { ...prev, health: 0 };
      }

      return { ...prev, health: newHealth };
    });
  }

  // ENEMY DEATH
  async function handleEnemyDeath(enemyData) {
    const xpGain = Math.floor(enemyData.maxHealth * 0.2);

    setEnemiesSlain(prev => prev + 1);

    setExperience(xp => xp + xpGain);

    const next = enemyNumber + 1;
    setEnemyNumber(next);

    const newEnemy = await generateEnemy(next);
    setEnemy(newEnemy);
  }

  function addXP(amount) {
    setExperience(xp => xp + amount);
  }

  // MANUAL ATTACK
  function attack() {
    if (!enemy) return;

    const damage = calculatePassiveDamage(character);
    damageEnemy(damage);
  }

  // EQUIP WEAPON
  function equipWeapon(type) {
    setCharacter(prev => ({
      ...prev,
      weapon: { type },
    }));
  }

  // BUY STAT
  function buyStat(stat) {
    const cost = BASE_STAT_COST + STAT_COST_INCREMENT * character.level;

    if (experience < cost) return false;

    setExperience(xp => xp - cost);

    setCharacter(prev => ({
      ...prev,
      level: prev.level + 1,
      stats: {
        ...prev.stats,
        [stat]: (prev.stats[stat] ?? 1) + 1,
      },
    }));

    return true;
  }

  // WEAPON UPGRADE
  function applyWeaponUpgrade(type) {
    setCharacter(prev => {
      const upgrade = prev.weaponUpgrades[type];

      const baseIncrease = type === "wizardry" ? 1 : 8;
      const scalingIncrease = type === "wizardry" ? 0.5 : 0.1;

      return {
        ...prev,
        weaponUpgrades: {
          ...prev.weaponUpgrades,
          [type]: {
            baseDamageBonus: upgrade.baseDamageBonus + baseIncrease,
            scalingBonus: upgrade.scalingBonus + scalingIncrease,
          },
        },
      };
    });
  }

  return {
    character,
    experience,
    enemy,
    enemyNumber,
    attack,
    buyStat,
    equipWeapon,
    applyWeaponUpgrade,
    addXP,
    BASE_STAT_COST,
    STAT_COST_INCREMENT,
  };
}