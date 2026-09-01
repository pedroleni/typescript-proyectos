// Los tipos son el diseño del proyecto, no un añadido — se leen antes
// que ningún otro archivo para entender qué datos existen y qué formas
// puede tomar el estado.

/** Un personaje tal como lo devuelve la API — solo los campos que usamos. */
export interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

/** La forma de la respuesta de /character?name=... */
export interface RespuestaBusqueda {
  results: Personaje[];
}

/**
 * El estado de la búsqueda, como una unión discriminada: en cualquier
 * momento el estado es EXACTAMENTE UNO de estos cuatro casos, nunca una
 * mezcla. No existe "cargando: true" Y "error: '...'" a la vez, porque
 * ese estado ni siquiera se puede construir — el propio compilador lo
 * impide.
 */
export type EstadoBusqueda =
  | { tipo: 'inicial' }
  | { tipo: 'cargando' }
  | { tipo: 'listo'; personajes: Personaje[] }
  | { tipo: 'error'; mensaje: string };
