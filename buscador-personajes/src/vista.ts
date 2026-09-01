import type { EstadoBusqueda, Personaje } from './tipos.js';

const mensaje = document.getElementById('mensaje') as HTMLParagraphElement;
const rejilla = document.getElementById('rejilla') as HTMLUListElement;

/**
 * Lanza un error de TIPOS (no de ejecución) si se le pasa algo que no
 * sea `never` — es decir, si queda algún caso de EstadoBusqueda sin
 * gestionar en el switch de renderizar(). Ya está completa: no hace
 * falta tocarla, solo usarla en el `default` del switch.
 */
function casoImposible(valor: never): never {
  throw new Error(`Caso de estado no gestionado: ${JSON.stringify(valor)}`);
}

export function renderizar(estado: EstadoBusqueda): void {
  // TODO: un switch (estado.tipo) con un case por cada variante de
  // EstadoBusqueda (mira tipos.ts):
  //   - 'inicial': mensaje.textContent = algo invitando a buscar; vacía rejilla.
  //   - 'cargando': mensaje.textContent = 'Buscando…'.
  //     OJO — a propósito, NO toques `rejilla` aquí. Vaciarla y
  //     rellenarla en CADA cambio de estado —incluido "empieza a
  //     cargar"— destruye y recrea todas las <img> antes de tiempo. El
  //     proyecto anterior de esta serie (explorador-personajes) tuvo un
  //     bug real por esto: ráfagas de peticiones de imagen abandonadas
  //     que acababan saturando la conexión.
  //   - 'listo': mensaje según si estado.personajes está vacío o no, y
  //     llama a pintarRejilla(estado.personajes).
  //   - 'error': mensaje con estado.mensaje; vacía rejilla.
  //   - default: casoImposible(estado) — deja esto tal cual, es la
  //     comprobación de exhaustividad.
}

function pintarRejilla(personajes: Personaje[]): void {
  // TODO: vacía `rejilla` y añade un crearTarjeta(...) por cada personaje.
}

function crearTarjeta(personaje: Personaje): HTMLLIElement {
  // TODO: igual que en el gestor de tareas y el explorador — un <li
  // class="tarjeta"> con una <img> (src/alt/loading="lazy") y un
  // <div class="tarjeta-cuerpo"> con un <h2> (nombre) y un
  // <p class="tarjeta-estado"> con "status — species".
}
