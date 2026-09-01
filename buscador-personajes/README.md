> Este proyecto vive en la carpeta `buscador-personajes/` de un repo con varios proyectos — clónalo entero y haz `cd buscador-personajes` antes de los pasos siguientes.

# Buscador de personajes — proyecto avanzado con TypeScript

**Esta es la rama `main`** — el punto de partida. `tipos.ts` está
completo a propósito (es el diseño del proyecto: léelo primero); el
resto de `src/` tiene `TODO` en vez de código. La rama
[`solucion`](../../tree/solucion) tiene la implementación completa.

Tercer proyecto avanzado de [Tech Study Tracker](https://github.com/pedroleni/tech-study-tracker),
después de [gestor-de-tareas-js](https://github.com/pedroleni/gestor-de-tareas-js)
y [explorador-personajes](https://github.com/pedroleni/explorador-personajes):
mismo patrón de estado, esta vez con **TypeScript** — tipos que hacen
imposible representar un estado inconsistente.

## Arquitectura

```
index.html / src/style.css   — estructura y estilos, ya completos
src/
  tipos.ts                    — Personaje, RespuestaBusqueda, EstadoBusqueda (unión discriminada)
  utilidades.ts                — debounce<Args> genérico
  utilidades.test.ts           — sus tests con Vitest
  api.ts                        — ErrorHttp, obtenerJSON<T> genérico, buscarPersonajes
  estado.ts                     — la única fuente de verdad, tipada con EstadoBusqueda
  vista.ts                      — switch exhaustivo sobre estado.tipo
  main.ts                       — conecta el DOM con las acciones
```

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12+) — lo que
  pide Vite 8. Comprueba tu versión con `node --version`.
- npm (se instala junto con Node.js).
- No hace falta instalar TypeScript aparte ni tenerlo en global —
  `npm install` trae la versión exacta que usa este proyecto (ver
  `package.json`). Si tienes otra versión de TypeScript instalada para
  otras cosas (incluida la v7 actual, reescrita en Go) no afecta a este
  repo: cada proyecto usa la suya vía `node_modules`.

## Cómo ejecutarlo

```bash
git clone https://github.com/pedroleni/buscador-personajes-ts.git
cd buscador-personajes-ts
npm install
npm run dev
```

- `npm run dev` — servidor de desarrollo
- `npm run typecheck` — solo comprueba tipos, no genera nada (`tsc --noEmit`)
- `npm run build` — comprueba tipos Y genera el build de producción en `dist/`
- `npm run preview` — sirve ese build para comprobarlo
- `npm run test` — corre los tests de `utilidades.ts` con Vitest

> `npm run typecheck` va a mostrar errores mientras vas dejando `TODO`
> sin implementar — es normal y esperado, no algo que hayas roto. Los
> parámetros de una función vacía cuentan como "no usados"
> (`noUnusedParameters` en `tsconfig.json`) hasta que de verdad los uses
> dentro. El objetivo es que quede en verde solo cuando termines los
> seis archivos.

## Dos cosas reales que se encontraron construyendo esto

1. **`erasableSyntaxOnly` prohíbe los parámetros de constructor.**
   `constructor(public status: number)` no compila con esta opción de
   `tsconfig.json` activada — esa sintaxis necesita que TypeScript
   GENERE código (`this.status = status`), no solo borre tipos. Con
   herramientas que solo "quitan" los tipos sin compilar de verdad
   (como el soporte nativo de TypeScript de Node.js), ese azúcar
   sintáctico no tiene sentido. `api.ts` declara y asigna la propiedad
   a mano por este motivo exacto.
2. **La comprobación de exhaustividad funciona de verdad.** Añade un
   quinto caso a `EstadoBusqueda` en `tipos.ts` sin tocar el `switch`
   de `vista.ts`, y ejecuta `npm run typecheck` — falla señalando la
   línea exacta que dejaste sin gestionar. Es la prueba real de que
   "estados imposibles, imposibles de representar" no es solo una
   frase bonita.
