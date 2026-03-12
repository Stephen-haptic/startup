import { useState, useEffect } from "react";

const BASE_STAT_COST = 100; 
const STAT_COST_INCREMENT = 50; 

export const defaultCharacter = {
  name: "Placeholder Hero",
  class: "Adventurer",
  level: 1, 
  stats: { wizardry: 1, strength: 1, allTrades: 1 },
  weapon: { type: "wizardry" },
  weaponUpgrades: {
    wizardry: { baseDamageBonus: 0, scalingBonus: 0 },
    strength: { baseDamageBonus: 0, scalingBonus: 0 },
  },
};

export function useCharacter(initialCharacter = defaultCharacter) {
  const [character, setCharacter] = useState(initialCharacter);

  // Update a stat
  function updateStat(stat) {
    setCharacter(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: prev.stats[stat] + 1 },
    }));
  }

  // Equip weapon
  function equipWeapon(type) {
    setCharacter(prev => ({ ...prev, weapon: { type } }));
  }

  // Buy a stat using XP
  function buyStat(stat, currentXP, subtractXPFunc) {
    const cost = BASE_STAT_COST + STAT_COST_INCREMENT * character.level;
    if (currentXP < cost) return false;
    subtractXPFunc(cost);

    setCharacter(prev => ({
      ...prev,
      level: prev.level + 1,
      stats: { ...prev.stats, [stat]: prev.stats[stat] + 1 },
    }));
    return true;
  }

  // Upgrade weapon
  function applyWeaponUpgrade(type) {
    setCharacter(prev => {
      const upgrade = prev.weaponUpgrades[type];
      if (!upgrade) return prev;

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

  return { character, setCharacter, updateStat, equipWeapon, buyStat, applyWeaponUpgrade, BASE_STAT_COST, STAT_COST_INCREMENT };
}