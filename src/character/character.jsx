import React from 'react';

import './character.css';
import { useCharacter } from './characterInfo';

export function Character() {
    const { character, updateStat, equipWeapon } = useCharacter();
    return (
        <main className="character-main">

        <section id="character-info">
            <h2>Character Sheet</h2>
            <p>Name: <strong>{character.name}</strong></p>
            <p>Class: <strong>{character.class}</strong></p>
            <p>Level: <strong>{character.level}</strong></p>
            <p>Experience: 1754</p>

        </section>

        {/* Inventory Section */}
        <section id="inventory">
            <h2>Inventory</h2>

            <ul>
                <li>Sword</li>
                <li>Wizard Staff</li>
            </ul>
        </section>

        {/* Stats Section */}
        <section id="stats">
            <h2>Stats</h2>

            <table>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
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
            </table>
        </section>

        {/* Level Up Section */}
        <section id="level-up">
            <p>Level Cost: 754</p>

            <ul>
                <li>
                    Wizardry
                    <button onClick={() => updateStat("wizardry")}>+</button>
                </li>
                <li>
                    Strength
                    <button onClick={() => updateStat("strength")}>+</button>
                </li>
                <li>
                    All Trades
                    <button onClick={() => updateStat("allTrades")}>+</button>
                </li>
            </ul>
        </section>

    </main>
  );
}