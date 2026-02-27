import { useState, useEffect } from "react";

const BASE_STAT_COST = 100; 
const STAT_COST_INCREMENT = 50; 

const defaultCharacter = {
  name: "Placeholder Hero",
  class: "Adventurer",
  level: 0, 
  stats: {
    wizardry: 1,
    strength: 1,
    allTrades: 1,
  },
  weaponUpgrades: {
    wizardry: {
      baseDamageBonus: 0,
      scalingBonus: 0,
    },
    strength: {
      baseDamageBonus: 0,
      scalingBonus: 0,
    }
  },
  weapon: {
    type: "wizardry", // "wizardry" | "strength"
  }
};

export function useCharacter() {
  const [character, setCharacter] = useState(defaultCharacter);

  // Load save
  useEffect(() => {
    const saved = localStorage.getItem("idleCharacter");

    if (!saved) return;

    const parsed = JSON.parse(saved);

    // Merge saves with defaults
    setCharacter({
      ...defaultCharacter,
      ...parsed,
      stats: {
        ...defaultCharacter.stats,
        ...parsed.stats,
      },
      weaponUpgrades: {
        wizardry: {
          ...defaultCharacter.weaponUpgrades.wizardry,
          ...parsed.weaponUpgrades?.wizardry,
        },
        strength: {
          ...defaultCharacter.weaponUpgrades.strength,
          ...parsed.weaponUpgrades?.strength,
        },
      },
    });
  }, []);

  // Save character
  useEffect(() => {
    localStorage.setItem("idleCharacter", JSON.stringify(character));
  }, [character]);

  function equipWeapon(type) {
    setCharacter((prev) => ({
      ...prev,
      weapon: { type }
    }));
  }

  function buyStat(stat, currentXP, subtractXPFunc) {
    const cost = BASE_STAT_COST + STAT_COST_INCREMENT * character.level;

    if (currentXP < cost) return false;

    subtractXPFunc(cost);

    setCharacter((prev) => ({
      ...prev,
      level: prev.level + 1,
      stats: {
        ...prev.stats,
        [stat]: prev.stats[stat] + 1
      }
    }));

    return true;
  }

  function applyWeaponUpgrade(type) {
    setCharacter((prev) => {
      const upgrade = prev.weaponUpgrades[type];

      if (!upgrade) return prev;

      const baseIncrease =
        type === "wizardry" ? 1 : 8;

      const scalingIncrease =
        type === "wizardry" ? 0.5 : 0.1;

      return {
        ...prev,
        weaponUpgrades: {
          ...prev.weaponUpgrades,
          [type]: {
            baseDamageBonus:
              upgrade.baseDamageBonus + baseIncrease,
            scalingBonus:
              upgrade.scalingBonus + scalingIncrease,
          },
        },
      };
    });
  }

  return {
    character,
    equipWeapon,
    buyStat,
    applyWeaponUpgrade,
    BASE_STAT_COST,
    STAT_COST_INCREMENT
  };
}