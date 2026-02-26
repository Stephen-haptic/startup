import { useState, useEffect } from "react";

export function useExperience() {
  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem("idleXP");
    return saved ? Number(saved) : 0;
  });

  // Save XP
  useEffect(() => {
    localStorage.setItem("idleXP", experience);
  }, [experience]);

  function addXP(amount) {
    setExperience((xp) => xp + amount);
  }

  function subtractXP(amount) {
    setExperience((xp) => Math.max(0, xp - amount));
  }

  return { experience, addXP, subtractXP };
}