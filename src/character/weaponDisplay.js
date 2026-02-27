export const WEAPON_NAMES = {
  wizardry: [
    "Wizard Staff",
    // "Apprentice Staff",
    // "Archmage Staff",
  ],

  strength: [
    "Sword",
    "Knight Blade",
    // "Dragon Slayer",
  ],
};

const UPGRADE_STEP = {
  wizardry: 1,
  strength: 8,
};

function getUpgradeCount(character, type) {
  const upgrades = character.weaponUpgrades?.[type];

  if (!upgrades) return 0;

  const bonus = upgrades.baseDamageBonus ?? 0;
  const step = UPGRADE_STEP[type];

  return Math.floor(bonus / step);
}

export function getWeaponDisplayName(character, type) {
  const table = WEAPON_NAMES[type] ?? [];

  const upgradeCount = getUpgradeCount(character, type);

  const index = Math.min(
    upgradeCount,
    table.length - 1
  );

  return table[index] ?? "Unnamed Weapon";
}