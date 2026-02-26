import { useState, useEffect } from "react";
import { useExperience } from "../useExperience";
import { useCharacter } from "../character/useCharacter";

const BOSS_INTERVAL_MS = 2 * 60 * 60 * 1000; // 2 hours
const BOSS_MAX_HEALTH = 10000; // placeholder
const BOSS_XP_REWARD = 1000; // placeholder

export function useRaid() {
  const { addXP } = useExperience();
  const { character } = useCharacter();

  const [bossActive, setBossActive] = useState(false);
  const [optedIn, setOptedIn] = useState(false);
  const [bossHealth, setBossHealth] = useState(BOSS_MAX_HEALTH);
  const [countdown, setCountdown] = useState(0);

  // Load next boss time from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nextBossTime");
    const nextBossTime = saved ? Number(saved) : Date.now() + BOSS_INTERVAL_MS;

    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= nextBossTime) {
        setBossActive(true);
        setCountdown(0);
      } else {
        setCountdown(Math.floor((nextBossTime - now) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Passive damage loop
  useEffect(() => {
    if (!optedIn || !character) return;

    const interval = setInterval(() => {
      const damage = calculatePassiveDamage(character);
      setBossHealth(prev => Math.max(0, prev - damage));
    }, 1000);

    return () => clearInterval(interval);
  }, [optedIn, character]);

  // Boss defeat handling
  useEffect(() => {
    if (bossHealth === 0 && optedIn) {
      alert(`Boss defeated! You gain ${BOSS_XP_REWARD} XP!`);

      addXP(BOSS_XP_REWARD);

      setBossActive(false);
      setOptedIn(false);
      setBossHealth(BOSS_MAX_HEALTH);

      localStorage.setItem("nextBossTime", Date.now() + BOSS_INTERVAL_MS);
    }
  }, [bossHealth, optedIn]);

  function joinRaid() {
    if (!bossActive) return;
    setOptedIn(true);
  }

  return {
    bossActive,
    optedIn,
    joinRaid,
    bossHealth,
    bossMaxHealth: BOSS_MAX_HEALTH,
    countdown,
  };
}

// Placeholder damage calculation using character stats
function calculatePassiveDamage(character) {
  const base = 2;
  if (!character) return base;

  const weaponStat = character.weapon.type === "wizardry" ? character.stats.wizardry : character.stats.strength;
  const allTradesFactor = character.stats.allTrades * 0.2;

  return base + weaponStat + allTradesFactor;
}