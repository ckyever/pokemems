import { useState } from "react";

import "./App.css";
import { GENERATION } from "./constants.js";
import TallGrass from "./components/TallGrass.jsx";

function App() {
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [score, setScore] = useState(0);
  const [isWinner, setIsWinner] = useState(null);

  // Create function that gets a list of n pokemon from the current generation
  // Add state for pokemonList where initial is calling above function with selectedGeneration
  // If generation is changed set the list again with new pokemon
  // Add state for clickedPokemon that tracks all the ones the user clicked on
  // Each time they click on a pokemon if it is already in clicked they lose
  // If length of pokemonList and clickedPokemon are the same they win

  function handleGenerationChange(event) {
    setSelectedGeneration(event.target.value);
    setIsWinner(null);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  function resetScore() {
    setScore(0);
  }

  let gameoverDialog;
  if (isWinner != null) {
    const gameOverMessage = isWinner
      ? "Congrats, you won!"
      : "Gameover, you lost :(";
    gameoverDialog = <div>{gameOverMessage}</div>;
  }

  return (
    <div className="app">
      <div>Score: {score}</div>
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
      <TallGrass
        generation={selectedGeneration}
        numberToSpawn={9}
        isWinner={isWinner}
        setIsWinner={setIsWinner}
        resetScore={resetScore}
        incrementScore={incrementScore}
      />
      {gameoverDialog}
    </div>
  );
}

export default App;
