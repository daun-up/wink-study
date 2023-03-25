import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getPokemonList } from './api';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const pokemon = await searchPokemon(query);
    setSearchResult(pokemon);
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await getPokemonList();
      setPokemonList(response.data.results);
    };

    fetchPokemonList();
  }, []);

return (
  <div>
    <h1>Pokémon Dictionary</h1>
    <form onSubmit={handleSearch}>
      <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button type="submit">Search</button>
    </form>
    {searchResult && (
      <div>
        <h2>{searchResult.name}</h2>
        <img src={searchResult.sprites.front_default} alt={`${searchResult.name} sprite`} />
        <p>Height: {searchResult.height}</p>
        <p>Weight: {searchResult.weight}</p>
      </div>
    )}
  </div>
);
}

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const searchPokemon = async (query) => {
  const response = await axios.get(`${POKEMON_API_BASE_URL}/pokemon/${query}`);
  return response.data;
};

export default App;