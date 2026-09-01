import type { TablaTransiciones } from './tipos'

export class MaquinaEstados<Estado extends string, Evento extends string> {
  private readonly tabla: TablaTransiciones<Estado, Evento>
  private estadoActual: Estado

  constructor(tabla: TablaTransiciones<Estado, Evento>, estadoInicial: Estado) {
    this.tabla = tabla
    this.estadoActual = estadoInicial
  }

  get estado(): Estado {
    return this.estadoActual
  }

  puedeTransicionar(evento: Evento): boolean {
    return this.tabla[this.estadoActual][evento] !== undefined
  }

  eventosDisponibles(): Evento[] {
    const transicionesDelEstado = this.tabla[this.estadoActual]
    return Object.keys(transicionesDelEstado) as Evento[]
  }

  enviar(evento: Evento): boolean {
    const siguiente = this.tabla[this.estadoActual][evento]
    if (siguiente === undefined) return false
    this.estadoActual = siguiente
    return true
  }
}
