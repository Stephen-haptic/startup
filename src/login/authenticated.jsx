import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div className="logged-in">
      <h3>Welcome back, {props.userName}</h3>

      <div className="form-buttons">
        <button
          className="btn btn-rpg"
          onClick={() => navigate('/play')}
        >
          Enter Game
        </button>

        <button
          className="btn btn-secondary"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}