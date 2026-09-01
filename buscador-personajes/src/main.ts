import './style.css';
import { buscarPersonajes } from './api.js';
import {
  establecerCargando,
  establecerError,
  establecerInicial,
  establecerResultados,
  obtenerEstado,
  suscribir,
} from './estado.js';
import { renderizar } from './vista.js';
import { debounce } from './utilidades.js';

const entradaBusqueda = document.getElementById('busqueda') as HTMLInputElement;

// TODO 1: suscríbete a los cambios de estado con `renderizar`, y llama
// a renderizar(obtenerEstado()) una vez para el render inicial.

async function buscar(nombre: string): Promise<void> {
  // TODO:
  // 1. Si nombre está vacío, establecerInicial() y return.
  // 2. establecerCargando().
  // 3. En un try/catch: pide buscarPersonajes(nombre) y llama a
  //    establecerResultados(...). En el catch, llama a establecerError
  //    con error.message (comprueba antes que error instanceof Error).
}

// TODO 2: crea una versión debounced (400ms) de buscar, y escucha el
// evento 'input' de entradaBusqueda para llamarla con el valor
// recortado (trim) del input.
