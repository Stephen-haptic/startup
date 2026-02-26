import { useEffect, useState } from "react";
import { generateEnemy } from "./enemyService";
import { useExperience } from "../useExperience";
import { useCharacter } from "../character/useCharacter";
import { calculatePassiveDamage } from "../character/calculateDamage";
import { loadGame, saveGame } from "./gamePersistence";

export function useGameLoop() {
  const [enemy, setEnemy] = useState(null);
  const [enemyNumber, setEnemyNumber] = useState(1);

  const { character } = useCharacter();
  const { addXP, experience } = useExperience();

  useEffect(() => {
    async function init() {
      const passive = character ? calculatePassiveDamage(character) : 2;
      const data = await loadGame(passive);
      setEnemy(data.enemy);
      setEnemyNumber(data.enemyNumber);
    }

    init();
  }, [character]);

  useEffect(() => {
    if (!enemy) return;
    saveGame(enemy, enemyNumber, experience);
  }, [enemy, enemyNumber, experience]);

  useEffect(() => {
    const loop = setInterval(() => {
      if (!enemy || !character) return;
      const damage = calculatePassiveDamage(character);
      damageEnemy(damage);
    }, 1000);

    return () => clearInterval(loop);
  }, [enemy, character]);

  async function spawnEnemy(number) {
    const { generateEnemy } = await import("./enemyService");
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
    addXP(xpGain);

    const next = enemyData.level + 1;
    setEnemyNumber(next);
    spawnEnemy(next);
  }

  function attack() {
    if (!character) return;
    const damage = calculatePassiveDamage(character);
    damageEnemy(damage);
  }

  return { enemy, attack };
}