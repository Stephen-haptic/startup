import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { Raid } from './raid/raid';
import { Character } from './character/character';


export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
            <header>
                <h1>Second Monitor RPG</h1>

                <nav>
                    <ul className="nav-menu">
                        <li><NavLink className='nav-link' to=''>Login</NavLink></li>
                        <li><NavLink className='nav-link' to='play'>Play</NavLink></li>
                        <li><NavLink className='nav-link' to='character'>Character Sheet</NavLink></li>
                        <li><NavLink className='nav-link' to='scores'>Leaderboard</NavLink></li>
                        <li><NavLink className='nav-link' to='raid'>Raid Boss</NavLink></li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/scores' element={<Scores />} />
                <Route path='/raid' element={<Raid />} />
                <Route path='/character' element={<Character />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <span className="text-reset">Stephen Gantt</span>
                <a href="https://github.com/Stephen-haptic/startup.git">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}