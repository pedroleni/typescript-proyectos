> Este proyecto vive en la carpeta `cliente-zod/` de un repo con varios proyectos — clónalo entero y haz `cd cliente-zod` antes de los pasos siguientes.

# Cliente tipado con Zod

**Esta es la rama `main`** — el punto de partida. `src/esquemas.ts` está
completo a propósito (es el diseño del proyecto: léelo primero); `src/cliente.ts`
tiene `TODO`. La rama [`solucion`](../../tree/solucion) tiene la
implementación completa.

Quinto proyecto avanzado de [Tech Study Tracker](https://github.com/pedroleni/tech-study-tracker):
cierra el reto que dejaba abierto la lección
["Proyecto: validar datos de una API con Zod"](https://github.com/pedroleni/tech-study-tracker/blob/main/contenido/typescript/54-proyecto-validar-con-zod.md) —
un cliente HTTP donde el tipo de lo que llega **nunca** es una promesa sin
comprobar (`as T`), siempre es el resultado real de una validación en
tiempo de ejecución contra la [PokeAPI](https://pokeapi.co/).

## Arquitectura

```
index.html / src/style.css   — estructura y estilos, ya completos
src/
  esquemas.ts                 — esquema Zod + tipo derivado (z.infer), completo
  ErrorHttp.ts                 — ErrorHttp y ErrorValidacion, completo
  cliente.ts                   — obtenerValidado<T>(), con TODO
  cliente.test.ts              — sus tests con Vitest (fetch mockeado)
  api.ts                        — buscarPokemon(), usa cliente.ts + esquemas.ts
  main.ts                       — demo: buscador de Pokémon real
```

## Qué vas a implementar

`obtenerValidado<T>(url: string, esquema: ZodType<T>): Promise<T>` — la
única función de todo el proyecto que sabe hacer `fetch`:

1. Pide `url`. Si la respuesta no es `ok`, lanza `ErrorHttp` con el status.
2. Convierte el cuerpo a JSON (tipado como `unknown` — no se puede confiar
   en la forma todavía).
3. Valida ese `unknown` contra `esquema` con `.safeParse()`. Si falla,
   lanza `ErrorValidacion` con un mensaje legible (`z.prettifyError`).
4. Si todo encaja, devuelve los datos — ya tipados como `T`, sin ningún
   `as` de por medio, porque de verdad se comprobaron dato a dato.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12+) — lo que
  pide Vite 8. Comprueba tu versión con `node --version`.
- npm (se instala junto con Node.js).

## Cómo ejecutarlo

```bash
git clone --branch solucion https://github.com/pedroleni/typescript-proyectos.git
cd typescript-proyectos/cliente-zod
npm install
npm run dev
```

- `npm run dev` — servidor de desarrollo (busca Pokémon de verdad contra la PokeAPI)
- `npm run typecheck` — solo comprueba tipos (`tsc --noEmit`)
- `npm run build` — comprueba tipos Y genera el build de producción en `dist/`
- `npm run test` — corre los tests de `cliente.ts` con Vitest (con `fetch` mockeado, sin red)

## Por qué z.infer y no una interface aparte

```ts
export const esquemaPokemon = z.object({ /* ... */ })
export type Pokemon = z.infer<typeof esquemaPokemon>
```

El tipo se **deriva** del esquema, nunca al revés. Si mañana la PokeAPI
añade un campo, o cambia la forma de uno existente, solo hay un sitio que
tocar — el propio esquema — y el tipo se actualiza solo. Escribir
`interface Pokemon { ... }` a mano, por separado del esquema de
validación, es exactamente el tipo de duplicación que este patrón evita.

## Retos para ampliarlo

1. Añade una función `buscarEspecie(nombre: string)` contra el endpoint
   `/pokemon-species/{nombre}` de la PokeAPI, con su propio esquema.
2. Añade caché en memoria a `obtenerValidado` — si ya se pidió esa URL,
   no vuelvas a hacer `fetch`.
3. Tipa una versión de `obtenerValidado` que acepte un `AbortSignal` para
   poder cancelar la petición.
