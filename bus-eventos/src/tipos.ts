// El mapa de eventos: cada clave es el NOMBRE del evento, y su valor es la
// forma exacta del payload que ese evento concreto lleva. Este fichero está
// completo a propósito — es el diseño del proyecto, léelo primero.
export interface MapaEventos {
  'contador:incrementado': { valor: number }
  'contador:reiniciado': Record<string, never>
  'usuario:conectado': { nombre: string; hora: Date }
}

export type Manejador<Payload> = (payload: Payload) => void
