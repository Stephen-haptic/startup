import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
        <header>
            <h1>Second Monitor RPG</h1>

            <nav>
                <ul className="nav-menu">
                    <li><a href="index.html" class = "active-link">Login</a></li>
                    <li><a href="play.html">Play</a></li>
                    <li><a href="character.html">Character Sheet</a></li>
                    <li><a href="scores.html">Leaderboard</a></li>
                    <li><a href="raid.html">Raid Boss</a></li>
                </ul>
            </nav>
        </header>

        <main>App components go here</main>

        <footer>
            <span className="text-reset">Stephen Gantt</span>
            <a href="https://github.com/Stephen-haptic/startup.git">GitHub</a>
        </footer>
    </div>
  );
}