import React from 'react';
import { HealthBar } from './healthbar';

export function Enemy({ enemy }) {
  return (
    <section id="enemy">

      <h2 id="enemy-name">{enemy.name}</h2>

      <div id="enemy-visual">
        <img
          src="placeholder-enemy.png"
          alt="Enemy"
        />
      </div>

      <p>Health</p>

      <HealthBar
        health={enemy.health}
        maxHealth={enemy.maxHealth}
      />

      <p>
        {Math.max(enemy.health, 0)} / {enemy.maxHealth}
      </p>

    </section>
  );
}