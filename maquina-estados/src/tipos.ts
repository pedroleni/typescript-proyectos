// El diseño del proyecto: fichero completo a propósito, léelo primero.
//
// TablaTransiciones<Estado, Evento> usa Record (no Partial<Record>) en el
// nivel EXTERIOR a propósito: obliga a que la tabla tenga una entrada para
// TODOS los estados posibles - olvidar uno es un error de compilación, no
// un estado que silenciosamente nunca gestionas. El nivel INTERIOR sí es
// Partial<Record<...>>, porque cada estado solo acepta ALGUNOS eventos,
// no todos.
export type TablaTransiciones<Estado extends string, Evento extends string> = Record<
  Estado,
  Partial<Record<Evento, Estado>>
>

export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado'
export type EventoPedido = 'pagar' | 'enviar' | 'entregar' | 'cancelar'

export const tablaPedido: TablaTransiciones<EstadoPedido, EventoPedido> = {
  pendiente: { pagar: 'pagado', cancelar: 'cancelado' },
  pagado: { enviar: 'enviado', cancelar: 'cancelado' },
  enviado: { entregar: 'entregado' },
  entregado: {},
  cancelado: {},
}

export const ETIQUETAS_ESTADO: Record<EstadoPedido, string> = {
  pendiente: 'Pendiente de pago',
  pagado: 'Pagado',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

export const ETIQUETAS_EVENTO: Record<EventoPedido, string> = {
  pagar: 'Pagar',
  enviar: 'Marcar como enviado',
  entregar: 'Marcar como entregado',
  cancelar: 'Cancelar pedido',
}
