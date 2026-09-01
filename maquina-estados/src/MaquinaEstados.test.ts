import { describe, expect, it } from 'vitest'

import { MaquinaEstados } from './MaquinaEstados'
import { tablaPedido } from './tipos'

describe('MaquinaEstados', () => {
  it('empieza en el estado inicial dado', () => {
    const maquina = new MaquinaEstados(tablaPedido, 'pendiente')
    expect(maquina.estado).toBe('pendiente')
  })

  it('enviar() con un evento válido cambia de estado y devuelve true', () => {
    const maquina = new MaquinaEstados(tablaPedido, 'pendiente')

    const resultado = maquina.enviar('pagar')

    expect(resultado).toBe(true)
    expect(maquina.estado).toBe('pagado')
  })

  it('enviar() con un evento inválido para el estado actual no cambia nada y devuelve false', () => {
    const maquina = new MaquinaEstados(tablaPedido, 'pendiente')

    const resultado = maquina.enviar('entregar')

    expect(resultado).toBe(false)
    expect(maquina.estado).toBe('pendiente')
  })

  it('puedeTransicionar() refleja exactamente lo que enviar() haría', () => {
    const maquina = new MaquinaEstados(tablaPedido, 'pendiente')

    expect(maquina.puedeTransicionar('pagar')).toBe(true)
    expect(maquina.puedeTransicionar('entregar')).toBe(false)
  })

  it('un pedido cancelado no acepta ningún evento más', () => {
    const maquina = new MaquinaEstados(tablaPedido, 'pendiente')
    maquina.enviar('cancelar')

    expect(maquina.eventosDisponibles()).toEqual([])
  })

  it('sigue el camino completo: pendiente -> pagado -> enviado -> entregado', () => {
    const maquina = new MaquinaEstados(tablaPedido, 'pendiente')

    maquina.enviar('pagar')
    maquina.enviar('enviar')
    maquina.enviar('entregar')

    expect(maquina.estado).toBe('entregado')
  })
})
