import type { EstadoBusqueda, Personaje } from './tipos.js';

const mensaje = document.getElementById('mensaje') as HTMLParagraphElement;
const rejilla = document.getElementById('rejilla') as HTMLUListElement;

/**
 * Lanza un error de TIPOS (no de ejecución) si se le pasa algo que no
 * sea `never` — es decir, si queda algún caso de EstadoBusqueda sin
 * gestionar en el switch de abajo. Añade un quinto caso a EstadoBusqueda
 * en tipos.ts sin tocar este switch, y comprueba qué dice `tsc`.
 */
function casoImposible(valor: never): never {
  throw new Error(`Caso de estado no gestionado: ${JSON.stringify(valor)}`);
}

export function renderizar(estado: EstadoBusqueda): void {
  switch (estado.tipo) {
    case 'inicial':
      mensaje.textContent = 'Escribe un nombre para buscar.';
      rejilla.textContent = '';
      break;

    case 'cargando':
      // A propósito: NO tocamos `rejilla` aquí. Vaciarla y volver a
      // llenarla en cada cambio de estado —incluido "empieza a
      // cargar"— destruye y recrea todas las <img> antes de tiempo.
      // El proyecto anterior de esta serie (explorador-personajes)
      // tuvo un bug real por esto exacto: ráfagas de peticiones de
      // imagen abandonadas que acababan saturando la conexión.
      mensaje.textContent = 'Buscando…';
      break;

    case 'listo':
      mensaje.textContent =
        estado.personajes.length === 0 ? 'Sin resultados para esa búsqueda.' : '';
      pintarRejilla(estado.personajes);
      break;

    case 'error':
      mensaje.textContent = `Algo falló: ${estado.mensaje}`;
      rejilla.textContent = '';
      break;

    default:
      // Si estado.tipo tiene aquí algún valor, es que falta un `case`
      // arriba — y esta línea no compilaría.
      casoImposible(estado);
  }
}

function pintarRejilla(personajes: Personaje[]): void {
  rejilla.textContent = '';
  for (const personaje of personajes) {
    rejilla.appendChild(crearTarjeta(personaje));
  }
}

function crearTarjeta(personaje: Personaje): HTMLLIElement {
  const li = document.createElement('li');
  li.className = 'tarjeta';

  const img = document.createElement('img');
  img.src = personaje.image;
  img.alt = personaje.name;
  img.loading = 'lazy';

  const cuerpo = document.createElement('div');
  cuerpo.className = 'tarjeta-cuerpo';

  const titulo = document.createElement('h2');
  titulo.textContent = personaje.name;

  const estadoEspecie = document.createElement('p');
  estadoEspecie.className = 'tarjeta-estado';
  estadoEspecie.textContent = `${personaje.status} — ${personaje.species}`;

  cuerpo.append(titulo, estadoEspecie);
  li.append(img, cuerpo);
  return li;
}
