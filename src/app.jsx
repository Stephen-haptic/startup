import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { Raid } from './raid/raid';
import { Character } from './character/character';
import { AuthState } from './login/authState';

export default function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="body bg-dark">

        <header>
          <h1>Second Monitor RPG</h1>

          <nav>
            <ul className="nav-menu">

              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                  Login
                </NavLink>
              </li>

              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink to="play" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                    Play
                  </NavLink>
                </li>
              )}

              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink to="character" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                    Character Sheet
                  </NavLink>
                </li>
              )}

              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink to="raid" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                    Raid Boss
                  </NavLink>
                </li>
              )}

              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink to="scores" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                    Leaderboard
                  </NavLink>
                </li>
              )}

            </ul>
          </nav>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
          />

          <Route path='/play' element={<Play userName={userName} />} />
          <Route path='/scores' element={<Scores userName={userName} />} />
          <Route path='/raid' element={<Raid userName={userName} />} />
          <Route path='/character' element={<Character userName={userName} />} />
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