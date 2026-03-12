import React from 'react';

import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {

  const [userName, setUserName] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    loginOrCreate('/api/auth/create');
  }

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: userName, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await response.json();
        setDisplayError(`Error: ${body.msg}`);
      }
    } catch (err) {
      setDisplayError('Network error. Try again.');
    }
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