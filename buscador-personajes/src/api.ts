import type { Personaje, RespuestaBusqueda } from './tipos.js';

const BASE_URL = 'https://rickandmortyapi.com/api';

/** Un error HTTP con el status accesible, para poder distinguir un 404 de un 500. */
export class ErrorHttp extends Error {
  // OJO: nada de "constructor(public status: number)" — ese azúcar
  // sintáctico de parámetros de constructor requiere que TypeScript
  // GENERE código, no solo borre tipos, y este proyecto tiene
  // erasableSyntaxOnly activado en tsconfig.json. Declara y asigna la
  // propiedad a mano.
  status: number;

  constructor(status: number, mensaje: string) {
    // TODO: llama a super(mensaje), pon this.name = 'ErrorHttp', y
    // guarda status en this.status.
  }
}

/**
 * Wrapper de fetch genérico: TÚ le dices qué forma esperas con `<T>`, y
 * TypeScript te da esa forma de vuelta ya tipada.
 */
async function obtenerJSON<T>(url: string): Promise<T> {
  // TODO: haz fetch(url). Si !respuesta.ok, lanza un new ErrorHttp con
  // el status y un mensaje. Si fue bien, devuelve respuesta.json() —
  // como TypeScript no sabe qué forma tiene ese JSON, necesitas hacer
  // `as Promise<T>` para decírselo (esta es la única parte de la
  // función que no comprueba nada en tiempo de ejecución: confías en
  // que el <T> que te pasen sea correcto).
}

/** @returns [] si la API no encuentra ningún personaje con ese nombre (404, no es un fallo real) */
export async function buscarPersonajes(nombre: string): Promise<Personaje[]> {
  // TODO:
  // 1. Construye la URL con new URL(`${BASE_URL}/character`) y añade
  //    el parámetro name.
  // 2. Envuelve en try/catch: pide obtenerJSON<RespuestaBusqueda>(url.toString())
  //    y devuelve datos.results.
  // 3. En el catch: si error instanceof ErrorHttp && error.status === 404,
  //    devuelve []. Si no, vuelve a lanzar el error (throw error).
}
