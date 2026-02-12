import React from 'react';

import './character.css';

export function Character() {
  return (
        <main>

        <section id="character-info">
            <h2>Character Sheet</h2>
            <p>Name: <strong>Placeholder Hero</strong></p>
            <p>Class: <strong>Warrior</strong></p>
            <p>Level: <strong>1</strong></p>
            <p>Experience: 1754</p>

        </section>

        {/* Inventory Section */}
        <section id="inventory">
            <h2>Inventory</h2>

            <ul>
                <li>Sword</li>
                <li>Shield</li>
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
                    <td>Vitality</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Wizardry</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>Strength</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>All Trades</td>
                    <td>7</td>
                </tr>
            </table>
        </section>

        {/* Level Up Section */}
        <section id="level-up">
            <p>Level Cost: 754</p>

            <ul>
                <li>
                    Vitality
                    <button type="button">+</button>
                </li>
                <li>
                    Wizardry
                    <button type="button">+</button>
                </li>
                <li>
                    Strength
                    <button type="button">+</button>
                </li>
                <li>
                    All Trades
                    <button type="button">+</button>
                </li>
            </ul>
        </section>

    </main>
  );
}