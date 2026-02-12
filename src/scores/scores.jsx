import React from 'react';

import './scores.css';

export function Scores() {
  return (
    <main className="scores-main">

        <div className="leaderboard-panel">
            <h1>Leaderboard</h1>
            <p>Top players by total experience gained</p>

            {/* Scrollable container */}
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
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>PlayerOne</td>
                            <td>125,000</td>
                            <td>4,230</td>
                            <td>18</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>PlayerTwo</td>
                            <td>98,400</td>
                            <td>3,110</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>PlayerThree</td>
                            <td>76,950</td>
                            <td>2,870</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>—</td>
                            <td>You</td>
                            <td>12,340</td>
                            <td>410</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </main>
  );
}