> Este proyecto vive en la carpeta `buscador-personajes/` de un repo con varios proyectos — clónalo entero y haz `cd buscador-personajes` antes de los pasos siguientes.

# Buscador de personajes — proyecto avanzado con TypeScript

**Esta es la rama `solucion`** — la implementación completa. Si vienes
a hacer el proyecto tú mismo, empieza por la rama
[`main`](../../tree/main), que tiene el mismo `index.html`/`styles.css`
pero los archivos de `src/` con `TODO` en vez de código.

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
