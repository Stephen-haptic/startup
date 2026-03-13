import React from 'react';
import './scores.css';
import { LeaderboardTable } from './leaderboard';

export function Scores({ userName }) {

  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch('/api/scores');
      const data = await res.json();
      setScores(data);
    }
    fetchLeaderboard();
  }, []);

  // Sort leaderboard
  const sorted = [...scores].sort((a, b) => (b.enemies ?? 0) - (a.enemies ?? 0));

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
        <td>{player.level ?? 1}</td>
        <td>{player.enemies ?? 0}</td>
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
        <td>{playerEntry.level ?? 1}</td>
        <td>{playerEntry.enemies ?? 0}</td>
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