import type { EstadoBusqueda, Personaje } from './tipos.js';

let estado: EstadoBusqueda = { tipo: 'inicial' };
const suscriptores: Array<(estado: EstadoBusqueda) => void> = [];

export function obtenerEstado(): EstadoBusqueda {
  return estado;
}

export function establecerInicial(): void {
  // TODO
}

export function establecerCargando(): void {
  // TODO
}

export function establecerResultados(personajes: Personaje[]): void {
  // TODO: fíjate en la forma exacta que pide EstadoBusqueda para el
  // caso 'listo' en tipos.ts.
}

export function establecerError(mensaje: string): void {
  // TODO
}

export function suscribir(fn: (estado: EstadoBusqueda) => void): () => void {
  // TODO: igual que en los proyectos anteriores de esta serie.
}

function notificar(): void {
  // TODO: llama a cada función guardada en `suscriptores`, pasándole el estado actual.
}
