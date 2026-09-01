/**
 * Versión "debounced" de fn: solo se ejecuta cuando han pasado
 * `esperaMs` sin que se la vuelva a llamar.
 *
 * El genérico `Args` conserva los tipos reales de los parámetros de fn
 * — a diferencia de escribir (...args: any[]), si fn espera un string y
 * la llamas con un número, TypeScript lo marca en el sitio donde la
 * usas, no en tiempo de ejecución.
 *
 * Corre `npm run test` mientras la implementas: utilidades.test.ts ya
 * está escrito, tu trabajo es hacer que pase.
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  esperaMs: number,
): (...args: Args) => void {
  // TODO: usa una variable de closure para el id del timeout (mira
  // ReturnType<typeof setTimeout> para tipar esa variable). Devuelve
  // una función que cancele el timeout anterior y programe uno nuevo
  // que llame a fn con los mismos argumentos que recibió.
}
