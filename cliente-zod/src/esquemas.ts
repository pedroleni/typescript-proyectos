// El diseño del proyecto: fichero completo a propósito, léelo primero.
// Los esquemas Zod son la ÚNICA fuente de verdad sobre la forma de los
// datos - el tipo de TypeScript se DERIVA del esquema (z.infer), nunca al
// revés. Si la API cambia de forma, cambia el esquema, y el tipo se
// actualiza solo.
import { z } from 'zod'

export const esquemaPokemon = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string().nullable(),
  }),
  types: z.array(
    z.object({
      type: z.object({ name: z.string() }),
    }),
  ),
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string() }),
    }),
  ),
})

export type Pokemon = z.infer<typeof esquemaPokemon>

// Una forma "de presentación", más simple que la respuesta cruda de la API
// - transformada a partir de Pokemon, no otro esquema aparte que mantener
// sincronizado a mano.
export interface PokemonResumen {
  id: number
  nombre: string
  alturaMetros: number
  pesoKg: number
  sprite: string | null
  tipos: string[]
  habilidades: string[]
}

export function aPokemonResumen(pokemon: Pokemon): PokemonResumen {
  return {
    id: pokemon.id,
    nombre: pokemon.name,
    alturaMetros: pokemon.height / 10,
    pesoKg: pokemon.weight / 10,
    sprite: pokemon.sprites.front_default,
    tipos: pokemon.types.map((t) => t.type.name),
    habilidades: pokemon.abilities.map((a) => a.ability.name),
  }
}
