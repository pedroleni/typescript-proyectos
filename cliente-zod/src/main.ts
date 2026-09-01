import './style.css'
import { buscarPokemon } from './api'
import { ErrorHttp, ErrorValidacion } from './ErrorHttp'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Cliente tipado con Zod</h1>
    <form id="formulario">
      <input id="nombre" type="text" placeholder="pikachu, charizard..." value="pikachu" />
      <button type="submit">Buscar</button>
    </form>
    <div id="resultado" aria-live="polite"></div>
  </main>
`

const formulario = document.querySelector<HTMLFormElement>('#formulario')!
const campoNombre = document.querySelector<HTMLInputElement>('#nombre')!
const resultadoEl = document.querySelector<HTMLDivElement>('#resultado')!

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  resultadoEl.innerHTML = '<p>Buscando…</p>'

  try {
    const pokemon = await buscarPokemon(campoNombre.value)
    resultadoEl.innerHTML = `
      <article class="tarjeta">
        ${pokemon.sprite ? `<img src="${pokemon.sprite}" alt="${pokemon.nombre}" width="96" height="96" />` : ''}
        <h2>${pokemon.nombre}</h2>
        <p>${pokemon.alturaMetros} m · ${pokemon.pesoKg} kg</p>
        <p><strong>Tipos:</strong> ${pokemon.tipos.join(', ')}</p>
        <p><strong>Habilidades:</strong> ${pokemon.habilidades.join(', ')}</p>
      </article>
    `
  } catch (error) {
    if (error instanceof ErrorHttp) {
      resultadoEl.innerHTML = `<p class="error">No se encontró "${campoNombre.value}" (${error.status}).</p>`
    } else if (error instanceof ErrorValidacion) {
      resultadoEl.innerHTML = `<p class="error">La API devolvió datos con una forma inesperada.</p>`
      console.error(error.message)
    } else {
      resultadoEl.innerHTML = `<p class="error">Algo falló buscando "${campoNombre.value}".</p>`
    }
  }
})

formulario.requestSubmit()
