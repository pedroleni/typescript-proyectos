import type { Manejador, MapaEventos } from './tipos'

// EventMap extends object (no Record<string, unknown>) - ver README, es un
// gotcha real: un mapa de eventos cerrado (con claves literales concretas,
// sin index signature) no satisface la restricción Record<string, unknown>.
export class EventBus<EventMap extends object> {
  private manejadores: { [Evento in keyof EventMap]?: Set<Manejador<EventMap[Evento]>> } = {}

  on<Evento extends keyof EventMap>(
    evento: Evento,
    manejador: Manejador<EventMap[Evento]>,
  ): () => void {
    let conjunto = this.manejadores[evento]
    if (!conjunto) {
      conjunto = new Set()
      this.manejadores[evento] = conjunto
    }
    conjunto.add(manejador)
    return () => conjunto.delete(manejador)
  }

  off<Evento extends keyof EventMap>(evento: Evento, manejador: Manejador<EventMap[Evento]>): void {
    this.manejadores[evento]?.delete(manejador)
  }

  emit<Evento extends keyof EventMap>(evento: Evento, payload: EventMap[Evento]): void {
    const conjunto = this.manejadores[evento]
    if (!conjunto) return
    for (const manejador of conjunto) {
      manejador(payload)
    }
  }
}

export const busGlobal = new EventBus<MapaEventos>()
