const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db('game');

const userCollection = db.collection('user');
const playerCollection = db.collection('player');
const raidCollection = db.collection('raid');

// Test connection
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to database');
  } catch (ex) {
    console.log(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();

// ================= USER =================

function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne(
    { email: user.email },
    { $set: user }
  );
}

async function removeUserToken(user) {
  await userCollection.updateOne(
    { email: user.email },
    { $unset: { token: 1 } }
  );
}

// ================= PLAYER =================

function getPlayer(email) {
  return playerCollection.findOne({ email });
}

async function savePlayer(email, player) {
  await playerCollection.updateOne(
    { email },
    { $set: { email, ...player } },
    { upsert: true }
  );
}

// Leaderboard (top 10)
function getLeaderboard() {
  return playerCollection
    .find({})
    .sort({ enemyNumber: -1 })
    .limit(10)
    .toArray();
}

// ================= RAID =================

async function getRaid() {
  return raidCollection.findOne({ name: 'global' });
}

async function saveRaid(raidState) {
  await raidCollection.updateOne(
    { name: 'global' },
    { $set: { ...raidState, name: 'global' } },
    { upsert: true }
  );
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  removeUserToken,
  getPlayer,
  savePlayer,
  getLeaderboard,
  getRaid,
  saveRaid,
};