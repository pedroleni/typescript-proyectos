import { aPokemonResumen, esquemaPokemon, type PokemonResumen } from './esquemas'
import { obtenerValidado } from './cliente'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function buscarPokemon(nombre: string): Promise<PokemonResumen> {
  const nombreNormalizado = nombre.trim().toLowerCase()
  const pokemon = await obtenerValidado(`${BASE_URL}/pokemon/${nombreNormalizado}`, esquemaPokemon)
  return aPokemonResumen(pokemon)
}
