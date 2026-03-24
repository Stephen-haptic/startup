import { useState, useEffect } from "react";
import { usePlayer } from "../usePlayer";

const BOSS_INTERVAL_MS = 2 * 60 * 60 * 1000; // 2 hours
const BOSS_MAX_HEALTH = 10000; // placeholder
const BOSS_XP_REWARD = 1000; // placeholder

const MOCK_PLAYERS = [
  "IronKnight",
  "ShadowMage",
  "CrystalArcher",
  "StormCaller",
  "SilentBlade",
  "VoidHunter",
  "FrostWizard",
  "BloodPaladin",
  "ThunderFist",
  "MoonDancer"
];

export function useRaid() {
  const { character, applyWeaponUpgrade, addXP } = usePlayer();

  const [bossActive, setBossActive] = useState(false);
  const [optedIn, setOptedIn] = useState(false);
  const [bossHealth, setBossHealth] = useState(BOSS_MAX_HEALTH);
  const [countdown, setCountdown] = useState(0);
  const [bossName, setBossName] = useState("World Boss");
  const [players, setPlayers] = useState([]);
  const [nextReward, setNextReward] = useState("wizardry");

  useEffect(() => {
    if (!bossActive) return;

    async function fetchName() {
      try {
        const res = await fetch("/api/enemy/name");
        const data = await res.json();
        setBossName(data.name);
      } catch {
        setBossName("Ancient Titan");
      }
    }

    fetchName();
  }, [bossActive]);

  // Fake Players
  useEffect(() => {
    if (!bossActive) {
      setPlayers([]);
      return;
    }

    const interval = setInterval(() => {
      setPlayers(prev => {
        const copy = [...prev];

        const action = Math.random();

        if (action < 0.6 && copy.length < 6) {
          // player joins
          const name = MOCK_PLAYERS[Math.floor(Math.random() * MOCK_PLAYERS.length)];
          if (!copy.includes(name)) copy.push(name);
        } else if (copy.length > 0) {
          // player leaves
          copy.splice(Math.floor(Math.random() * copy.length), 1);
        }

        return copy;
      });
    }, 3000);

    return () => clearInterval(interval);

  }, [bossActive]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/raid");
        const data = await res.json();

        setBossActive(data.bossActive);
        setBossHealth(data.bossHealth);
        setNextReward(data.nextReward);

        const remaining = Math.max(0, Math.floor((data.nextBossTime - Date.now()) / 1000));
        setCountdown(remaining);
      } catch {}
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Passive damage loop
  useEffect(() => {
    if (!optedIn || !character) return;

    const interval = setInterval(async () => {
      const damage = calculatePassiveDamage(character);

      try {
        await fetch("/api/raid/damage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ damage }),
        });
      } catch {}
    }, 1000);

    return () => clearInterval(interval);
  }, [optedIn, character]);

  // Boss defeat handling
  useEffect(() => {
    if (bossHealth === 0 && optedIn) {

      const rewardType = nextReward;

      alert(
        `Boss defeated!\n` +
        `You gain ${BOSS_XP_REWARD} XP\n` +
        `Weapon Upgrade: ${rewardType.toUpperCase()}`
      );

      addXP(BOSS_XP_REWARD);
      applyWeaponUpgrade(rewardType);

      setOptedIn(false);
    }
  }, [bossHealth, optedIn, nextReward, addXP, applyWeaponUpgrade]);

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
    bossName,
    countdown,
    nextReward,
    players,
  };
}

function calculatePassiveDamage(character) {
  const base = 2;
  if (!character) return base;

  const weaponStat = character.weapon.type === "wizardry" ? character.stats.wizardry : character.stats.strength;
  const allTradesFactor = character.stats.allTrades * 0.2;

  return base + weaponStat + allTradesFactor + 1000;
}