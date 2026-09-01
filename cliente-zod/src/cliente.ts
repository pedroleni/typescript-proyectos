import type { ZodType } from 'zod'

import { ErrorHttp, ErrorValidacion } from './ErrorHttp'

// La única función que sabe hacer fetch en todo el proyecto. El genérico T
// se decide por completo a partir de qué esquema le pases - no debe haber
// ningún "as T" en ningún sitio: lo que devuelva tiene que haberse
// comprobado dato a dato antes.
export async function obtenerValidado<T>(url: string, esquema: ZodType<T>): Promise<T> {
  // TODO 1: haz fetch(url). Si la respuesta no es "ok", lanza un
  // ErrorHttp con su status y un mensaje que incluya la url.

  // TODO 2: convierte el cuerpo a JSON (tipa el resultado como
  // `unknown` explícitamente - no se puede confiar en su forma todavía).

  // TODO 3: valida ese unknown contra `esquema` con `.safeParse()`. Si
  // falla, lanza un ErrorValidacion con un mensaje legible - mira
  // `z.prettifyError` en la documentación de Zod.

  // TODO 4: si la validación tuvo éxito, devuelve los datos ya
  // validados (y por tanto ya tipados como T, sin ningún "as").

  throw new Error('obtenerValidado() sin implementar')
}
