import React from 'react';

import './play.css';

export function Play() {
  return (
    <main>

        <p id="experience">
            Experience: <strong>120</strong>
        </p>

        <h1 id="encounter-title">Encounter</h1>

        {/* Enemy Display */}
        <section id="enemy">

            <h2 id="enemy-name">Goblin Placeholder</h2>

            {/* Enemy visual container */}
            <div id="enemy-visual">

                <img
                    src="placeholder-enemy.png"
                    alt="Enemy placeholder image"
                />

                {/* Damage numbers will be injected here later */}
            </div>

            {/* Enemy Health */}
            <p>Health</p>
            <progress 
                id="enemy-health"
                value="75" 
                max="100">
            </progress>
            <p>75 / 100</p>

        </section>
        <div id="actions" className="d-flex gap-2 mt-3">
            <button className="btn btn-rpg">Attack</button>
            <button className="btn btn-secondary">Defend</button>
        </div>

    </main>
  );
}