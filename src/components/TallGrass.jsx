import { useState, useEffect } from "react";

import "../styles/TallGrass.css";

function TallGrass({ pokemonList, isWinner, setIsWinner, incrementScore }) {
  const [clickedPokemon, setClickedPokemon] = useState([]);

  useEffect(() => {
    setClickedPokemon([]);
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
