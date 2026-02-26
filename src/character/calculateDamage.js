const WEAPONS = {
  wizardry: {
    baseDamage: 3,
    scaling: 1.2,
  },
  strength: {
    baseDamage: 8,
    scaling: 0.6,
  }
};

const ALL_TRADES_SCALING = 0.25;

export function calculatePassiveDamage(character) {
  const weapon = WEAPONS[character.weapon.type];

  const { wizardry, strength, allTrades } = character.stats;

  const mainStat =
    character.weapon.type === "wizardry"
      ? wizardry
      : strength;

  const damage =
    weapon.baseDamage +
    weapon.scaling * mainStat +
    ALL_TRADES_SCALING * allTrades;

  return Math.floor(damage);
}