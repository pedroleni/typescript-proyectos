import { z, type ZodType } from 'zod'

import { ErrorHttp, ErrorValidacion } from './ErrorHttp'

// La única función que sabe hacer fetch en todo el proyecto. El genérico T
// se decide por completo a partir de qué esquema le pases - no hay ningún
// "as T" en ningún sitio: lo que devuelve YA fue comprobado dato a dato.
export async function obtenerValidado<T>(url: string, esquema: ZodType<T>): Promise<T> {
  const respuesta = await fetch(url)
  if (!respuesta.ok) {
    throw new ErrorHttp(respuesta.status, `La API respondió con un error (${respuesta.status}) en ${url}`)
  }

  const datos: unknown = await respuesta.json()
  const resultado = esquema.safeParse(datos)
  if (!resultado.success) {
    throw new ErrorValidacion(
      `Los datos de ${url} no tienen la forma esperada:\n${z.prettifyError(resultado.error)}`,
    )
  }

  return resultado.data
}
