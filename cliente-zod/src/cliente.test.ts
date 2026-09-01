import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import { ErrorHttp, ErrorValidacion } from './ErrorHttp'
import { obtenerValidado } from './cliente'

const esquemaDePrueba = z.object({ nombre: z.string(), edad: z.number() })

function mockFetch(respuesta: { ok: boolean; status?: number; json: () => unknown }) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: respuesta.ok,
      status: respuesta.status ?? (respuesta.ok ? 200 : 500),
      json: async () => respuesta.json(),
    }),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('obtenerValidado', () => {
  it('devuelve los datos ya tipados cuando encajan con el esquema', async () => {
    mockFetch({ ok: true, json: () => ({ nombre: 'Ada', edad: 36 }) })

    const resultado = await obtenerValidado('https://ejemplo.com', esquemaDePrueba)

    expect(resultado).toEqual({ nombre: 'Ada', edad: 36 })
  })

  it('lanza ErrorHttp cuando la respuesta no es ok', async () => {
    mockFetch({ ok: false, status: 404, json: () => ({}) })

    await expect(obtenerValidado('https://ejemplo.com', esquemaDePrueba)).rejects.toBeInstanceOf(
      ErrorHttp,
    )
  })

  it('lanza ErrorValidacion cuando los datos no encajan con el esquema', async () => {
    mockFetch({ ok: true, json: () => ({ nombre: 'Ada', edad: 'treinta y seis' }) })

    await expect(obtenerValidado('https://ejemplo.com', esquemaDePrueba)).rejects.toBeInstanceOf(
      ErrorValidacion,
    )
  })
})
