import React from 'react';

import './login.css';

export function Login() {
  return (
      <main className="login-main">
        <div className="index-container">
            <h1>Enter the Second Monitor!</h1>
            <form method="get" action="play.html">
                <div className="mb-3">
                    <label className="form-label">Character Name</label>
                    <input type="text" className="form-control" placeholder="Scrungly the Bold" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="password" />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-rpg">Login</button>
                    <button type="submit" className="btn btn-secondary">Create</button>
                </div>
            </form>
        </div>
    </main>
  );
}