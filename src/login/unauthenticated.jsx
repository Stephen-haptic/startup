import React from 'react';

import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {

  const [userName, setUserName] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <div className="mb-3">
        <label className="form-label">Character Name</label>
        <input
          type="text"
          className="form-control"
          value={userName}
          placeholder="Scrungly the Bold"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-buttons">
        <button
          className="btn btn-rpg"
          onClick={loginUser}
          disabled={!userName || !password}
        >
          Login
        </button>

        <button
          className="btn btn-secondary"
          onClick={createUser}
          disabled={!userName || !password}
        >
          Create
        </button>
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </form>
  );
}