import React from "react";
import { useCharacter } from "./useCharacter";
import { useExperience } from "../useExperience";
import "./character.css";

export function Character() {
  const { character, equipWeapon, buyStat, BASE_STAT_COST, STAT_COST_INCREMENT } = useCharacter();
  const { experience, subtractXP } = useExperience();

  // Handles buying a stat increase
  function handleStatIncrease(stat) {
    buyStat(stat, experience, subtractXP);
  }

  // Calculates the XP cost for the next stat increase
  function getStatCost() {
    return BASE_STAT_COST + STAT_COST_INCREMENT * character.level;
  }

  return (
    <main className="character-main">
      {/* Character Info */}
      <section id="character-info">
        <h2>Character Sheet</h2>
        <p>Name: <strong>{character.name}</strong></p>
        <p>Class: <strong>{character.class}</strong></p>
        <p>Level: <strong>{character.level}</strong></p>
        <p>Experience: <strong>{experience}</strong></p>
      </section>

      {/* Inventory / Weapon Selection */}
      <section id="inventory">
        <h2>Inventory</h2>
        <ul>
          <li>
            <button onClick={() => equipWeapon("wizardry")}>Wizard Staff</button>
            {character.weapon.type === "wizardry" && " (Equipped)"}
          </li>
          <li>
            <button onClick={() => equipWeapon("strength")}>Sword</button>
            {character.weapon.type === "strength" && " (Equipped)"}
          </li>
        </ul>
      </section>

      {/* Stats Table */}
      <section id="stats">
        <h2>Stats</h2>
        <table>
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wizardry</td>
              <td>{character.stats.wizardry}</td>
            </tr>
            <tr>
              <td>Strength</td>
              <td>{character.stats.strength}</td>
            </tr>
            <tr>
              <td>All Trades</td>
              <td>{character.stats.allTrades}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Level Up / Buy Stat Increases */}
      <section id="level-up">
        <p>Next Stat Increase Cost: {getStatCost()} XP</p>

        <ul>
          <li>
            Wizardry <button onClick={() => handleStatIncrease("wizardry")}>+</button>
          </li>
          <li>
            Strength <button onClick={() => handleStatIncrease("strength")}>+</button>
          </li>
          <li>
            All Trades <button onClick={() => handleStatIncrease("allTrades")}>+</button>
          </li>
        </ul>
      </section>
    </main>
  );
}