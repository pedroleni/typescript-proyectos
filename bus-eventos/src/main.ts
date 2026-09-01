import './style.css'
import { busGlobal } from './EventBus'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Bus de eventos tipado</h1>
    <section class="contador">
      <p>Valor: <strong id="valor">0</strong></p>
      <button id="incrementar">+1</button>
      <button id="reiniciar">Reiniciar</button>
    </section>
    <section class="registro">
      <div class="registro-cabecera">
        <h2>Registro de eventos</h2>
        <button id="silenciar">Silenciar registro</button>
      </div>
      <ul id="lista-registro"></ul>
    </section>
  </main>
`

let valor = 0
const valorEl = document.querySelector<HTMLElement>('#valor')!
const listaEl = document.querySelector<HTMLUListElement>('#lista-registro')!
const botonSilenciar = document.querySelector<HTMLButtonElement>('#silenciar')!

function registrar(texto: string) {
  const item = document.createElement('li')
  item.textContent = texto
  listaEl.prepend(item)
}

// Los tres 'on' de abajo tienen el tipo de payload inferido automáticamente
// a partir del nombre del evento - prueba a cambiar 'valor' por otra
// propiedad dentro de cualquiera de los tres para ver el error real.
busGlobal.on('contador:incrementado', (payload) => {
  valorEl.textContent = String(payload.valor)
})

let cancelarLogIncrementos = busGlobal.on('contador:incrementado', (payload) => {
  registrar(`Incrementado a ${payload.valor}`)
})

busGlobal.on('contador:reiniciado', () => {
  valorEl.textContent = '0'
  registrar('Contador reiniciado')
})

busGlobal.on('usuario:conectado', (payload) => {
  registrar(`${payload.nombre} se conectó a las ${payload.hora.toLocaleTimeString()}`)
})

document.querySelector('#incrementar')!.addEventListener('click', () => {
  valor += 1
  busGlobal.emit('contador:incrementado', { valor })
})

document.querySelector('#reiniciar')!.addEventListener('click', () => {
  valor = 0
  busGlobal.emit('contador:reiniciado', {})
})

let silenciado = false
botonSilenciar.addEventListener('click', () => {
  silenciado = !silenciado
  if (silenciado) {
    cancelarLogIncrementos()
    botonSilenciar.textContent = 'Reactivar registro'
  } else {
    cancelarLogIncrementos = busGlobal.on('contador:incrementado', (payload) => {
      registrar(`Incrementado a ${payload.valor}`)
    })
    botonSilenciar.textContent = 'Silenciar registro'
  }
})

busGlobal.emit('usuario:conectado', { nombre: 'Ada', hora: new Date() })
