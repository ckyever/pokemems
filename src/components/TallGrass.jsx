import { useState, useEffect } from "react";

import "../styles/TallGrass.css";
import tallGrassSprite from "../assets/tall-grass.png";

function createGrassWithPokemon(pokemonList, numberOfTallGrass) {
  // Create an array of undefined elements representing grass
  const grassList = Array.from({ length: numberOfTallGrass });

  // Keep track of free index to place a pokemon
  const availableIndexes = Array.from(
    { length: numberOfTallGrass },
    (_, index) => index
  );

  // Randomly place each pokemon into the grass
  pokemonList.forEach((pokemon) => {
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    const grassIndex = availableIndexes.splice(randomIndex, 1);
    grassList[grassIndex] = {
      pokemonName: pokemon.name,
      pokemonSprite: pokemon.sprite,
    };
  });

  return grassList;
}

function TallGrass({ pokemonList, isWinner, setIsWinner, incrementScore }) {
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [grassList, setGrassList] = useState([]);

  useEffect(() => {
    setClickedPokemon([]);
    setGrassList(createGrassWithPokemon(pokemonList, 25));
  }, [pokemonList]);

  function handlePokemonClick(pokemonKey) {
    if (isWinner != null) return;

    if (clickedPokemon.includes(pokemonKey)) {
      console.log("You already clicked on this one");
      setIsWinner(false);
    } else {
      setClickedPokemon([...clickedPokemon, pokemonKey]);
      incrementScore();
      if (clickedPokemon.length + 1 === pokemonList.length) {
        setIsWinner(true);
      } else {
        // Randomise pokemon positions again
        setGrassList(createGrassWithPokemon(pokemonList, 25));
      }
    }
  }

  return (
    <div className="tall-grass">
      {grassList &&
        grassList.map((grass, index) => (
          <div key={index} className="grass">
            {grass != null ? (
              <img
                className="pokemon"
                src={grass.pokemonSprite}
                alt={grass.pokemonName + " sprite"}
                onClick={() => {
                  handlePokemonClick(grass.pokemonName);
                }}
              />
            ) : undefined}
            <img
              className="tall-grass-sprite"
              src={tallGrassSprite}
              alt="tall grass"
            />
          </div>
        ))}
    </div>
  );
}

export default TallGrass;
