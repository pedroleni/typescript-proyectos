import type { TablaTransiciones } from './tipos'

export class MaquinaEstados<Estado extends string, Evento extends string> {
  private readonly tabla: TablaTransiciones<Estado, Evento>
  private estadoActual: Estado

  constructor(tabla: TablaTransiciones<Estado, Evento>, estadoInicial: Estado) {
    // TODO: guarda tabla y estadoInicial en los campos de la clase.
    throw new Error('constructor sin implementar')
  }

  get estado(): Estado {
    // TODO: devuelve el estado actual.
    throw new Error('estado sin implementar')
  }

  puedeTransicionar(evento: Evento): boolean {
    // TODO: ¿existe una transición para `evento` desde el estado actual?
    // Pista: this.tabla[this.estadoActual][evento].
    throw new Error('puedeTransicionar() sin implementar')
  }

  eventosDisponibles(): Evento[] {
    // TODO: devuelve las claves (Object.keys) de las transiciones del
    // estado actual, como Evento[].
    throw new Error('eventosDisponibles() sin implementar')
  }

  enviar(evento: Evento): boolean {
    // TODO: si existe una transición para `evento` desde el estado
    // actual, cambia this.estadoActual a ese siguiente estado y
    // devuelve true. Si no existe, no cambies nada y devuelve false.
    throw new Error('enviar() sin implementar')
  }
}
