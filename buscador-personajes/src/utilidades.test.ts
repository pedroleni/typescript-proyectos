import { describe, expect, it, vi } from 'vitest';
import { debounce } from './utilidades.js';

describe('debounce', () => {
  it('solo llama a fn una vez tras varias llamadas seguidas', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const conDebounce = debounce(fn, 300);

    conDebounce();
    conDebounce();
    conDebounce();

    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('conserva los tipos de los argumentos de fn', () => {
    vi.useFakeTimers();
    const fn = vi.fn((texto: string, veces: number) => `${texto}-${veces}`);
    const conDebounce = debounce(fn, 100);

    // Si descomentas la siguiente línea, TypeScript debería marcar un
    // error de tipos en tiempo de compilación, no al ejecutar el test:
    // conDebounce(42, 'no es así');

    conDebounce('rick', 1);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('rick', 1);
    vi.useRealTimers();
  });
});
