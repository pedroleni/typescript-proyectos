import './style.css'
import { MaquinaEstados } from './MaquinaEstados'
import { ETIQUETAS_ESTADO, ETIQUETAS_EVENTO, tablaPedido } from './tipos'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Seguimiento de un pedido</h1>
    <p class="estado-actual">Estado: <strong id="estado"></strong></p>
    <div id="acciones" class="acciones"></div>
    <button id="reiniciar" class="reiniciar">Reiniciar pedido</button>
  </main>
`

const maquina = new MaquinaEstados(tablaPedido, 'pendiente')

const estadoEl = document.querySelector<HTMLElement>('#estado')!
const accionesEl = document.querySelector<HTMLDivElement>('#acciones')!

function repintar() {
  estadoEl.textContent = ETIQUETAS_ESTADO[maquina.estado]
  accionesEl.innerHTML = ''

  const eventos = maquina.eventosDisponibles()
  if (eventos.length === 0) {
    accionesEl.innerHTML = '<p class="sin-acciones">No quedan acciones posibles desde aquí.</p>'
    return
  }

  for (const evento of eventos) {
    const boton = document.createElement('button')
    boton.textContent = ETIQUETAS_EVENTO[evento]
    boton.addEventListener('click', () => {
      maquina.enviar(evento)
      repintar()
    })
    accionesEl.append(boton)
  }
}

document.querySelector('#reiniciar')!.addEventListener('click', () => {
  // No hay un método para "resetear" la máquina - por diseño, una vez
  // creada solo avanza por transiciones válidas. Para reiniciar la demo,
  // se crea una nueva instancia. Ver el Reto 1 más abajo del README.
  location.reload()
})

repintar()
