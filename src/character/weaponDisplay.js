export const WEAPON_NAMES = {
  wizardry: [
    "Wizard Staff",
    "Apprentice Staff",
    "Lightning Staff",
    "Warlock Staff",
    "Solar Staff",
    "Wand",
    "Archmage Staff",
    "Staff of the Magi",
  ],

  strength: [
    "Sword",
    "Knight Blade",
    "Paladin Sword",
    "Claymore",
    "Holy Avenger",
    "Sun Blade",
    "Knife of the Kitchen",
    "Dragon Slayer",
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

  const maxIndex = table.length - 1;
  const index = Math.min(upgradeCount, maxIndex);

  const baseName = table[index] ?? "Unnamed Weapon";

  if (upgradeCount > maxIndex) {
    const extra = upgradeCount - maxIndex;
    return `${baseName} +${extra}`;
  }

  return baseName;
}