import { useState, useEffect } from "react";

import "../styles/TallGrass.css";
import { GENERATION } from "../constants.js";
import { getRandomInteger } from "../utils.js";

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

function TallGrass({ generation, numberToSpawn = 9, isWinner, setIsWinner }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);

  useEffect(() => {
    (async () => {
      setClickedPokemon([]);
      const dexNumbers = getRandomDexNumbers(generation, numberToSpawn);
      const pokemonList = await getPokemon(dexNumbers);
      setPokemonList(pokemonList);
    })();
  }, [generation, numberToSpawn]);

  function handlePokemonClick(pokemonKey) {
    if (isWinner != null) return;

    if (clickedPokemon.includes(pokemonKey)) {
      console.log("You already clicked on this one");
      setIsWinner(false);
    } else {
      setClickedPokemon([...clickedPokemon, pokemonKey]);
      if (clickedPokemon.length + 1 === pokemonList.length) {
        setIsWinner(true);
      }
    }
  }

  return (
    <div className="tall-grass">
      {pokemonList.map((pokemon) => (
        <img
          key={pokemon.name}
          src={pokemon.sprite}
          onClick={() => {
            handlePokemonClick(pokemon.name);
          }}
        />
      ))}
    </div>
  );
}

export default TallGrass;
