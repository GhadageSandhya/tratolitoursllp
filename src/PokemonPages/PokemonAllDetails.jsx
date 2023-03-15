import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function PokemonAllDetails() {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation()
  const pokemonName = pathname.replace("/pokemon/", "");
  console.log(pokemonName, "name of poke")

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemonDetails(response.data);
      setIsLoading(false);
    };
    fetchPokemonDetails();
  }, [pokemonName]);

  return (
    <div>
      <h1>{pokemonName} Details</h1>
      {isLoading && <p>Loading...</p>}
      {pokemonDetails && (
        <div>
          <img src={pokemonDetails.sprites.front_default} alt={`${pokemonName} sprite`} />
          <p>Height: {pokemonDetails.height}</p>
          <p>Weight: {pokemonDetails.weight}</p>
          <h2>Abilities</h2>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export default PokemonAllDetails