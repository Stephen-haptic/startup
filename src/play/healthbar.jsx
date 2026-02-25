import React from 'react';

export function HealthBar({ health, maxHealth }) {
  return (
    <progress
      id="enemy-health"
      value={health}
      max={maxHealth}
    />
  );
}