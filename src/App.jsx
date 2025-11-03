import { useState } from "react";

import "./App.css";
import { getRandomInteger } from "./utils.js";

const GENERATION = {
  0: { id: "Any", firstDexNumber: 1, lastDexNumber: 1025 },
  1: { id: "I", firstDexNumber: 1, lastDexNumber: 151 },
  2: { id: "II", firstDexNumber: 152, lastDexNumber: 251 },
  3: { id: "III", firstDexNumber: 252, lastDexNumber: 386 },
  4: { id: "IV", firstDexNumber: 387, lastDexNumber: 493 },
  5: { id: "V", firstDexNumber: 494, lastDexNumber: 649 },
  6: { id: "VI", firstDexNumber: 650, lastDexNumber: 721 },
  7: { id: "VII", firstDexNumber: 722, lastDexNumber: 809 },
  8: { id: "VIII", firstDexNumber: 810, lastDexNumber: 905 },
  9: { id: "IX", firstDexNumber: 906, lastDexNumber: 1025 },
};

async function getPokemon(dexNumber) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${dexNumber}`
  );
  const pokemonData = await response.json();
  console.log(pokemonData.species.name);
}

function App() {
  const [selectedGeneration, setSelectedGeneration] = useState(1);

  function handleGenerationChange(event) {
    setSelectedGeneration(event.target.value);
  }

  const randomDexNumber = getRandomInteger(
    GENERATION[selectedGeneration].firstDexNumber,
    GENERATION[selectedGeneration].lastDexNumber
  );

  getPokemon(randomDexNumber);

  return (
    <>
      <label htmlFor="generation">Generation</label>
      <select
        id="generation"
        value={selectedGeneration}
        onChange={handleGenerationChange}
      >
        {Object.keys(GENERATION).map((key) => {
          return (
            <option key={key} value={key}>
              {GENERATION[key].id}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default App;
