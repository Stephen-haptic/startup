import React from "react";
import { useRaid } from "./useRaid";
import "./raid.css";

export function Raid() {
  const {
    bossActive,
    optedIn,
    joinRaid,
    bossHealth,
    bossMaxHealth,
    countdown,
    nextReward
  } = useRaid();

  // HH:MM:SS formatter
  const formatCountdown = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const rewardLabel = 
    nextReward === "strength"
      ? "Sword Upgrade"
      : "Staff Upgrade";

  return (
    <main className="raid-main">
      <div className="raid-container">
        {/* Left: Active Players */}
        <section className="raid-panel raid-left" id="raid-players">
          <h2>Players in Raid</h2>
          <ul>
            <li>PlayerOne</li>
            <li>PlayerTwo</li>
            <li>PlayerThree</li>
            <li>You</li>
          </ul>
          <p><em>Players will join and leave dynamically.</em></p>
        </section>

        {/* Center: Boss */}
        <section className="raid-panel raid-center" id="raid-boss">
          {!bossActive && (
            <p>Next raid boss in: {formatCountdown(countdown)}</p>
          )}

          {bossActive && !optedIn && (
            <button className="btn btn-primary" onClick={joinRaid}>
              Join the Raid!
            </button>
          )}

          {bossActive && optedIn && (
            <>
              <h1>Public Raid</h1>
              <div className="boss-content">
                <h2 id="enemy-name">World Boss Placeholder</h2>
                <div id="enemy-visual">
                  <img src="placeholder-raid-boss.png" alt="Raid boss placeholder"/>
                </div>
              </div>
              <div className="boss-health">
                <p>Health</p>
                <progress
                  id="enemy-health"
                  value={bossHealth}
                  max={bossMaxHealth}
                ></progress>
                <p>{bossHealth.toLocaleString()} / {bossMaxHealth.toLocaleString()}</p>
              </div>
            </>
          )}
        </section>

        {/* Right: Rewards */}
        <section className="raid-panel raid-right" id="raid-rewards">
          <h2>Rewards</h2>
          <ul>
            <li>Experience: 1,000</li>
            <li>{rewardLabel}</li>
          </ul>
          <p><em>Rewards are granted when the boss is defeated.</em></p>
        </section>
      </div>
    </main>
  );
}