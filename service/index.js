const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// In-memory storage
let users = [];
let players = {};
let scores = [];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// AUTHENTICATION

apiRouter.post('/auth/create', async (req, res) => {
  const existing = await findUser('email', req.body.email);

  if (existing) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const user = await createUser(req.body.email, req.body.password);

  players[user.email] = {
    enemy: null,
    experience: 0,
    enemyNumber: 1
  };

  setAuthCookie(res, user.token);

  res.send({ email: user.email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();

    setAuthCookie(res, user.token);

    return res.send({ email: user.email });
  }

  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    delete user.token;
  }

  res.clearCookie(authCookieName);
  res.status(204).end();
});

// AUTHORIZATION

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// PLAYER DATA

apiRouter.get('/player', verifyAuth, (req, res) => {
  const player = players[req.user.email];
  res.send(player);
});

apiRouter.post('/player', verifyAuth, (req, res) => {
  players[req.user.email] = req.body;
  res.send(players[req.user.email]);
});

// LEADERBOARD

apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

apiRouter.post('/scores', verifyAuth, (req, res) => {
  scores.push(req.body);

  scores.sort((a, b) => b.xp - a.xp);

  scores = scores.slice(0, 10);

  res.send(scores);
});

// THIRD PARTY API (Enemy Name)

apiRouter.get('/enemy/name', async (_req, res) => {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();

    res.send({ name: capitalize(data[0]) });

  } catch {

    const fallback = ['Goblin', 'Skeleton', 'Orc', 'Slime'];

    const name = fallback[Math.floor(Math.random() * fallback.length)];

    res.send({ name });
  }
});

// HELPERS

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email,
    password: passwordHash,
    token: uuid.v4()
  };

  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});