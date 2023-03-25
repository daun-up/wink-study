import axios from 'axios';

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = () => {
  return axios.get(`${POKEMON_API_BASE_URL}/pokemon/?offset=0&limit=1000`);
};



