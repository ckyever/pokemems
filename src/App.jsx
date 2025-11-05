import { useEffect, useState } from "react";

import "./App.css";
import dialogArrow from "./assets/dialog-arrow.png";
import { GENERATION } from "./constants.js";
import TallGrass from "./components/TallGrass.jsx";
import { getRandomInteger } from "./utils.js";

const SHINY_CHANCE = 0.3;

function getRandomDexNumbers(generation, numberToSpawn) {
  const dexNumbers = [];

  for (let i = 1; i <= numberToSpawn; i++) {
    const randomDexNumber = getRandomInteger(
      GENERATION[generation].firstDexNumber,
      GENERATION[generation].lastDexNumber
    );

    if (dexNumbers.includes(randomDexNumber)) {
      // Don't include repeats so try again
      i--;
    } else {
      dexNumbers.push(randomDexNumber);
    }
  }

  return dexNumbers;
}

async function getPokemon(dexNumbers) {
  const pokemonList = [];

  const responses = await Promise.all(
    dexNumbers.map((number) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    )
  );

  const pokemonData = await Promise.all(
    responses.map((response) => response.json())
  );

  // Let there be a slight chance for no more than one shiny pokemon
  const hasShiny = Math.random() < SHINY_CHANCE;
  let shinyPokemonIndex = -1;
  if (hasShiny) {
    shinyPokemonIndex = Math.floor(Math.random() * pokemonData.length);
  }

  pokemonData.forEach((pokemon, index) =>
    pokemonList.push({
      name: pokemon.species.name,
      sprite:
        index === shinyPokemonIndex
          ? pokemon.sprites.front_shiny
          : pokemon.sprites.front_default,
    })
  );

  return pokemonList;
}

async function newGame(generation, setIsWinner, setScore, setPokemonList) {
  setIsWinner(null);
  setScore(0);
  const dexNumbers = getRandomDexNumbers(generation, 9);
  const pokemonList = await getPokemon(dexNumbers);
  setPokemonList(pokemonList);
}

function App() {
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [score, setScore] = useState(0);
  const [isWinner, setIsWinner] = useState(null);

  useEffect(() => {
    newGame(selectedGeneration, setIsWinner, setScore, setPokemonList);
  }, [selectedGeneration]);

  function handleGenerationChange(event) {
    setSelectedGeneration(event.target.value);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  let gameoverDialog;
  if (isWinner != null) {
    const gameOverMessage = isWinner ? (
      "Congrats, you caught them all!"
    ) : (
      <>
        You already caught
        <br />
        that pokemon...
      </>
    );
    gameoverDialog = (
      <div className="gameover-dialog textbox">
        <p>
          {gameOverMessage}
          <img className="dialog-arrow" src={dialogArrow} alt="red arrow" />
        </p>
        <button
          onClick={() => {
            newGame(selectedGeneration, setIsWinner, setScore, setPokemonList);
          }}
        >
          <span className="option-arrow">►</span>
          New Game
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="textbox">
        <p>Catch each pokemon only once</p>
        <p className="score">Score: {score}</p>
      </header>
      <TallGrass
        pokemonList={pokemonList}
        isWinner={isWinner}
        setIsWinner={setIsWinner}
        incrementScore={incrementScore}
      />
      <footer className="textbox">
        <div className="generation-dropdown">
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
        </div>
        <p>Changing this will reset the score</p>
      </footer>
      {gameoverDialog}
    </div>
  );
}

export default App;
