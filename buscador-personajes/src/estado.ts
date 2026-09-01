import type { EstadoBusqueda, Personaje } from './tipos.js';

let estado: EstadoBusqueda = { tipo: 'inicial' };
const suscriptores: Array<(estado: EstadoBusqueda) => void> = [];

export function obtenerEstado(): EstadoBusqueda {
  return estado;
}

export function establecerInicial(): void {
  estado = { tipo: 'inicial' };
  notificar();
}

export function establecerCargando(): void {
  estado = { tipo: 'cargando' };
  notificar();
}

export function establecerResultados(personajes: Personaje[]): void {
  estado = { tipo: 'listo', personajes };
  notificar();
}

export function establecerError(mensaje: string): void {
  estado = { tipo: 'error', mensaje };
  notificar();
}

export function suscribir(fn: (estado: EstadoBusqueda) => void): () => void {
  suscriptores.push(fn);
  return () => {
    const indice = suscriptores.indexOf(fn);
    if (indice !== -1) suscriptores.splice(indice, 1);
  };
}

function notificar(): void {
  for (const fn of suscriptores) fn(estado);
}
