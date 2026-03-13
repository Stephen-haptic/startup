import React from "react";
import { usePlayer } from "../usePlayer";
import { Enemy } from "./enemy";

import "./play.css";

export function Play() {
  const { enemy, attack, experience } = usePlayer();

  return (
    <main className="play-main">
      <p id="experience">
        Experience: <strong>{experience}</strong>
      </p>

      <h1 id="encounter-title">Encounter</h1>

      {enemy && <Enemy enemy={enemy} />}

      <div id="actions" className="d-flex gap-2 mt-3">
        <button className="btn btn-rpg" onClick={attack}>
          Attack
        </button>
      </div>
    </main>
  );
}