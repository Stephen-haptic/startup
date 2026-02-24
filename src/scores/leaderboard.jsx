import React from 'react';

export function LeaderboardTable({ rows }) {
  return (
    <div className="leaderboard-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Total Experience</th>
            <th>Enemies Slain</th>
            <th>Bosses Slain</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}