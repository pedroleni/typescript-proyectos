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
    // TODO: si no existe un Set para este evento en this.manejadores,
    // créalo. Añade el manejador al Set. Devuelve una función que, al
    // llamarla, quite ese manejador del Set (cancela la suscripción).
    throw new Error('on() sin implementar')
  }

  off<Evento extends keyof EventMap>(evento: Evento, manejador: Manejador<EventMap[Evento]>): void {
    // TODO: si existe un Set para este evento, quita el manejador de él.
    throw new Error('off() sin implementar')
  }

  emit<Evento extends keyof EventMap>(evento: Evento, payload: EventMap[Evento]): void {
    // TODO: si existe un Set para este evento, llama a cada manejador
    // registrado en él, pasándole payload.
    throw new Error('emit() sin implementar')
  }
}

export const busGlobal = new EventBus<MapaEventos>()
