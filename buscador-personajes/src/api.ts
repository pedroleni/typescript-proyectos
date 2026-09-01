import type { Personaje, RespuestaBusqueda } from './tipos.js';

const BASE_URL = 'https://rickandmortyapi.com/api';

/** Un error HTTP con el status accesible, para poder distinguir un 404 de un 500. */
export class ErrorHttp extends Error {
  // OJO: nada de "constructor(public status: number)" — ese azúcar
  // sintáctico de parámetros de constructor requiere que TypeScript
  // GENERE código (this.status = status), no solo borre tipos, y este
  // proyecto tiene erasableSyntaxOnly activado en tsconfig.json (la
  // misma restricción del soporte nativo de TypeScript de Node.js).
  // Con esa opción, cada propiedad se declara y asigna a mano.
  status: number;

  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.name = 'ErrorHttp';
    this.status = status;
  }
}

/**
 * Wrapper de fetch genérico: TÚ le dices qué forma esperas con `<T>`, y
 * TypeScript te da esa forma de vuelta ya tipada — sin tener que hacer
 * un `as RespuestaBusqueda` a mano después de cada llamada.
 *
 * OJO — límite real de este patrón: TypeScript confía en que el `<T>`
 * que le pasas es correcto, pero no lo comprueba contra la respuesta
 * real en tiempo de ejecución. Si la API cambia de forma sin avisar,
 * esto no lo detecta — para eso haría falta una librería de validación
 * en runtime (Zod, la misma que ya usa tech-study-tracker).
 */
async function obtenerJSON<T>(url: string): Promise<T> {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new ErrorHttp(respuesta.status, `La API respondió con un error (${respuesta.status})`);
  }
  return respuesta.json() as Promise<T>;
}

/** @returns [] si la API no encuentra ningún personaje con ese nombre (404, no es un fallo real) */
export async function buscarPersonajes(nombre: string): Promise<Personaje[]> {
  const url = new URL(`${BASE_URL}/character`);
  url.searchParams.set('name', nombre);

  try {
    const datos = await obtenerJSON<RespuestaBusqueda>(url.toString());
    return datos.results;
  } catch (error) {
    if (error instanceof ErrorHttp && error.status === 404) return [];
    throw error;
  }
}
