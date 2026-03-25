const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { defaultCharacter } = require('./defaultCharacter.js');
const DB = require("./database.js");

const app = express();
const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const BOSS_INTERVAL_MS = 10000; //* 60 * 60 * 1000;
let raidState = {
  bossActivate: false,
  bossHealth: 10000,
  nextBossTime : Date.now() + BOSS_INTERVAL_MS,
  nextReward: "wizardry"
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// AUTHENTICATION

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const user = await createUser(req.body.email, req.body.password);

  await DB.savePlayer(user.email, {
    character: { ...defaultCharacter },
    enemy: null,
    experience: 0,
    enemyNumber: 1,
  });

  setAuthCookie(res, user.token);
  res.send({ email: user.email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    await DB.updateUser(user);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
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
  const leaderboard = Object.entries(players).map(([email, p]) => ({
    name: email,
    level: p.character?.level || 1,
    enemies: (p.enemyNumber ? p.enemyNumber - 1 : 0)
  }));

  leaderboard.sort((a, b) => b.enemies - a.enemies);

  res.send(leaderboard.slice(0, 10));
});

// RAID

// Get raid state
apiRouter.get('/raid', (_req, res) => {
  const now = Date.now();

  if (!raidState.bossActive && now >= raidState.nextBossTime) {
    raidState.bossActive = true;
    raidState.bossHealth = 10000;
  }
  res.send(raidState);
});

// Apply damage
apiRouter.post('/raid/damage', (req, res) => {
  if (!raidState.bossActive) {
    return res.send(raidState);
  }

  const damage = req.body.damage || 0;

  raidState.bossHealth = Math.max(0, raidState.bossHealth - damage);

  if (raidState.bossHealth === 0) {
    raidState.bossActive = false;

    // Only set next spawn time ONCE
    if (!raidState.nextBossTime || raidState.nextBossTime < Date.now()) {
      raidState.nextBossTime = Date.now() + BOSS_INTERVAL_MS;

      raidState.nextReward =
        raidState.nextReward === "wizardry"
          ? "strength"
          : "wizardry";
    }
  }

  res.send(raidState);
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