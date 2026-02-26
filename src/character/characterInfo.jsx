import { useState, useEffect } from 'react';

const defaultCharacter = {
  name: "Placeholder Hero",
  class: "Adventurer",
  level: 1,

  stats: {
    wizardry: 1,
    strength: 1,
    allTrades: 1,
  },

  weapon: {
    type: "wizardry", // "wizardry" | "strength"
  }
};

export function useCharacter() {
  const [character, setCharacter] = useState(defaultCharacter);

  // Load save
  useEffect(() => {
    const save = localStorage.getItem("idleCharacter");

    if (save) {
      setCharacter(JSON.parse(save));
    }
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem(
      "idleCharacter",
      JSON.stringify(character)
    );
  }, [character]);

  function updateStat(stat) {
    setCharacter(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: prev.stats[stat] + 1
      }
    }));
  }

  function equipWeapon(type) {
    setCharacter(prev => ({
      ...prev,
      weapon: { type }
    }));
  }

  return {
    character,
    updateStat,
    equipWeapon
  };
}