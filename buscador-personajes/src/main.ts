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

suscribir(renderizar);
renderizar(obtenerEstado());

async function buscar(nombre: string): Promise<void> {
  if (!nombre) {
    establecerInicial();
    return;
  }

  establecerCargando();
  try {
    const personajes = await buscarPersonajes(nombre);
    establecerResultados(personajes);
  } catch (error) {
    establecerError(error instanceof Error ? error.message : 'Error desconocido');
  }
}

const buscarConDebounce = debounce(buscar, 400);

entradaBusqueda.addEventListener('input', (evento) => {
  const valor = (evento.target as HTMLInputElement).value.trim();
  buscarConDebounce(valor);
});
