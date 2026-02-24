import React from 'react';
import './scores.css';

import { LeaderboardTable } from './leaderboard';

export function Scores({ userName }) {

  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {

    // Placeholder data
    const data = [
      { name: 'PlayerOne', xp: 125000, enemies: 4230, bosses: 18 },
      { name: 'PlayerTwo', xp: 98400, enemies: 3110, bosses: 12 },
      { name: 'PlayerThree', xp: 76950, enemies: 2870, bosses: 9 },
      { name: 'KnightGuy', xp: 70200, enemies: 2500, bosses: 7 },
      { name: 'MageLady', xp: 65500, enemies: 2100, bosses: 6 },
      { name: 'GoblinSlayer', xp: 61200, enemies: 1990, bosses: 6 },
      { name: 'TankMain', xp: 58800, enemies: 1700, bosses: 5 },
      { name: 'ArrowRain', xp: 56000, enemies: 1680, bosses: 5 },
      { name: 'CritMaster', xp: 53000, enemies: 1500, bosses: 4 },
      { name: 'DungeonDiver', xp: 51000, enemies: 1420, bosses: 4 },

      { name: userName || 'You', xp: 12340, enemies: 410, bosses: 1 }
    ];

    setScores(data);

  }, [userName]);

  // Sort leaderboard
  const sorted = [...scores].sort((a, b) => b.xp - a.xp);

  const topTen = sorted.slice(0, 10);

  const playerEntry = sorted.find(p => p.name === userName);

  const playerInTopTen = topTen.some(p => p.name === userName);

  const rows = [];

  topTen.forEach((player, index) => {

    const isPlayer = player.name === userName;

    rows.push(
      <tr key={player.name} className={isPlayer ? "player-row" : ""}>
        <td>{index + 1}</td>
        <td>{player.name}</td>
        <td>{player.xp.toLocaleString()}</td>
        <td>{player.enemies.toLocaleString()}</td>
        <td>{player.bosses}</td>
      </tr>
    );
  });

  // Add player row if outside top 10
  if (playerEntry && !playerInTopTen) {

    const playerRank = sorted.findIndex(p => p.name === userName) + 1;

    rows.push(
      <tr key="divider">
        <td colSpan="5" style={{ textAlign: "center", opacity: 0.5 }}>
          ...
        </td>
      </tr>
    );

    rows.push(
      <tr key="player" className="player-row">
        <td>{playerRank}</td>
        <td>{playerEntry.name}</td>
        <td>{playerEntry.xp.toLocaleString()}</td>
        <td>{playerEntry.enemies.toLocaleString()}</td>
        <td>{playerEntry.bosses}</td>
      </tr>
    );
  }

  return (
    <main className="scores-main">

      <div className="leaderboard-panel">
        <h1>Leaderboard</h1>
        <p>Top players by total experience gained</p>

        <LeaderboardTable rows={rows} />

      </div>

    </main>
  );
}