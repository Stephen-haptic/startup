import { useState, useEffect } from "react";

const BASE_STAT_COST = 100; 
const STAT_COST_INCREMENT = 50; 

const defaultCharacter = {
  name: "Placeholder Hero",
  class: "Adventurer",
  level: 0, 
  stats: {
    wizardry: 8,
    strength: 6,
    allTrades: 7,
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
    if (saved) setCharacter(JSON.parse(saved));
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

  return {
    character,
    equipWeapon,
    buyStat,
    BASE_STAT_COST,
    STAT_COST_INCREMENT
  };
}