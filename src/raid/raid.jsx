import React from 'react';

import './raid.css';

export function Raid() {
  return (
    <main>
        <div class="raid-container">

            {/* Left Column: Active Players */}
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

            {/* Center Column: Boss & XP */}
            <section className="raid-panel raid-center" id="raid-boss">
                <h1>Public Raid</h1>
                <p id="experience">Experience: <strong>120</strong></p>

                <div className="boss-content">
                    <h2 id="enemy-name">World Boss Placeholder</h2>
                    <div id="enemy-visual">
                        <img src="placeholder-raid-boss.png" alt="Raid boss placeholder image"/>
                    </div>
                </div>

                {/* Health bar at bottom */}
                <div className="boss-health">
                    <p>Health</p>
                    <progress id="enemy-health" value="8500" max="10000"></progress>
                    <p>8,500 / 10,000</p>
                </div>
            </section>

            {/* Right Column: Rewards */}
            <section className="raid-panel raid-right" id="raid-rewards">
                <h2>Rewards</h2>
                <ul>
                    <li>Experience: 1,000</li>
                    <li>Rare Item (Placeholder)</li>
                </ul>
                <p><em>Rewards are granted when the boss is defeated.</em></p>
            </section>

        </div>
    </main>
  );
}