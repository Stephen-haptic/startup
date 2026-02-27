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

function getWeaponStats(character) {
  const type = character.weapon.type;

  const base = WEAPONS[type];

  // Fallback if upgrades don't exist yet
  const upgrades =
    character.weaponUpgrades?.[type] ?? {
      baseDamageBonus: 0,
      scalingBonus: 0,
    };

  return {
    baseDamage: base.baseDamage + upgrades.baseDamageBonus,
    scaling: base.scaling + upgrades.scalingBonus,
  };
}

export function calculatePassiveDamage(character) {
  const weapon = getWeaponStats(character);

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