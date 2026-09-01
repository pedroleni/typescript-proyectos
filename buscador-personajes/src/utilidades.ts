/**
 * Versión "debounced" de fn: solo se ejecuta cuando han pasado
 * `esperaMs` sin que se la vuelva a llamar.
 *
 * El genérico `Args` conserva los tipos reales de los parámetros de fn
 * — a diferencia de escribir (...args: any[]), si fn espera un string y
 * la llamas con un número, TypeScript lo marca en el sitio donde la
 * usas, no en tiempo de ejecución.
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  esperaMs: number,
): (...args: Args) => void {
  let temporizador: ReturnType<typeof setTimeout>;
  return (...argumentos: Args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => fn(...argumentos), esperaMs);
  };
}
