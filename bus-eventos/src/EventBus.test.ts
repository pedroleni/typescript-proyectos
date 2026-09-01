import { describe, expect, it, vi } from 'vitest'

import { EventBus } from './EventBus'

interface MapaDePrueba {
  saludo: { texto: string }
  vacio: Record<string, never>
}

describe('EventBus', () => {
  it('llama al manejador registrado con el payload correcto', () => {
    const bus = new EventBus<MapaDePrueba>()
    const manejador = vi.fn()

    bus.on('saludo', manejador)
    bus.emit('saludo', { texto: 'hola' })

    expect(manejador).toHaveBeenCalledTimes(1)
    expect(manejador).toHaveBeenCalledWith({ texto: 'hola' })
  })

  it('permite varios manejadores para el mismo evento', () => {
    const bus = new EventBus<MapaDePrueba>()
    const primero = vi.fn()
    const segundo = vi.fn()

    bus.on('saludo', primero)
    bus.on('saludo', segundo)
    bus.emit('saludo', { texto: 'hola' })

    expect(primero).toHaveBeenCalledTimes(1)
    expect(segundo).toHaveBeenCalledTimes(1)
  })

  it('on() devuelve una función que cancela la suscripción', () => {
    const bus = new EventBus<MapaDePrueba>()
    const manejador = vi.fn()

    const cancelar = bus.on('saludo', manejador)
    cancelar()
    bus.emit('saludo', { texto: 'hola' })

    expect(manejador).not.toHaveBeenCalled()
  })

  it('off() cancela un manejador concreto sin afectar a los demás', () => {
    const bus = new EventBus<MapaDePrueba>()
    const primero = vi.fn()
    const segundo = vi.fn()

    bus.on('saludo', primero)
    bus.on('saludo', segundo)
    bus.off('saludo', primero)
    bus.emit('saludo', { texto: 'hola' })

    expect(primero).not.toHaveBeenCalled()
    expect(segundo).toHaveBeenCalledTimes(1)
  })

  it('emitir un evento sin manejadores registrados no lanza ningún error', () => {
    const bus = new EventBus<MapaDePrueba>()

    expect(() => bus.emit('vacio', {})).not.toThrow()
  })
})
