> Este proyecto vive en la carpeta `bus-eventos/` de un repo con varios proyectos — clónalo entero y haz `cd bus-eventos` antes de los pasos siguientes.

# Bus de eventos tipado

**Esta es la rama `main`** — el punto de partida. `src/tipos.ts` está
completo a propósito (es el diseño del proyecto: léelo primero); el resto
de `src/` tiene `TODO` en vez de código. La rama
[`solucion`](../../tree/solucion) tiene la implementación completa.

Cuarto proyecto avanzado de [Tech Study Tracker](https://github.com/pedroleni/tech-study-tracker),
primero centrado por completo en TypeScript: un bus de eventos (patrón
publish/subscribe, el mismo que usan `EventTarget`, Node.js `EventEmitter`
o cualquier librería de UI con eventos personalizados) donde el **nombre**
del evento determina, vía tipos, la forma exacta de su payload — sin
`any`, sin casts, con autocompletado real en el editor.

## Arquitectura

```
index.html / src/style.css   — estructura y estilos, ya completos
src/
  tipos.ts                    — MapaEventos y Manejador<T>, el diseño del proyecto
  EventBus.ts                 — la clase genérica, con TODO
  EventBus.test.ts            — sus tests con Vitest
  main.ts                     — una demo real: contador + registro de eventos
```

## Qué vas a implementar

`EventBus<EventMap extends object>` con tres métodos:

- `on(evento, manejador)` — registra un manejador para ese evento concreto,
  y devuelve una función para cancelar la suscripción.
- `off(evento, manejador)` — cancela un manejador concreto.
- `emit(evento, payload)` — llama a todos los manejadores registrados para
  ese evento, con ese payload.

La pieza que hace esto interesante no es la lógica (guardar y llamar
funciones) — es que `evento` y `payload` están **enlazados por tipos**:
`on('contador:incrementado', payload => ...)` infiere automáticamente que
`payload` tiene forma `{ valor: number }`, sin que lo anotes tú, y sin
ningún cast. Si te equivocas de forma, o de nombre de evento, es un error
de compilación, no un bug que descubras en producción.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12+) — lo que
  pide Vite 8. Comprueba tu versión con `node --version`.
- npm (se instala junto con Node.js).

## Cómo ejecutarlo

```bash
git clone https://github.com/pedroleni/bus-eventos-ts.git
cd bus-eventos-ts
npm install
npm run dev
```

- `npm run dev` — servidor de desarrollo
- `npm run typecheck` — solo comprueba tipos, no genera nada (`tsc --noEmit`)
- `npm run build` — comprueba tipos Y genera el build de producción en `dist/`
- `npm run test` — corre los tests de `EventBus.ts` con Vitest

> Los tests y `main.ts` ya están completos y usan `EventBus` — van a fallar
> (o directamente no compilar) hasta que implementes los tres métodos.
> Es exactamente la señal de que vas por buen camino.

## Un gotcha real de tipos, encontrado construyendo esto

El primer intento de este proyecto restringía el genérico así:

```ts
class EventBus<EventMap extends Record<string, unknown>> { /* ... */ }
```

Con un `MapaEventos` de claves concretas y cerradas (`'contador:incrementado'`,
`'usuario:conectado'`...), esto **no compila**:

```
error TS2344: Type 'MapaEventos' does not satisfy the constraint
'Record<string, unknown>'. Index signature for type 'string' is missing
in type 'MapaEventos'.
```

`Record<string, unknown>` exige que el tipo acepte **cualquier** clave de
tipo `string` — un `interface` con un conjunto cerrado de claves literales,
sin index signature, no cumple eso, aunque intuitivamente "debería"
encajar. El fix real: restringir con `extends object` (o sin restricción
en absoluto) en vez de `Record<string, unknown>` — el mapa de eventos de
este proyecto es, a propósito, un conjunto **cerrado**, no un diccionario
abierto.

## Un bug real de la propia demo (no de los tipos)

Al construir `main.ts`, el botón "Reiniciar" ponía `valor = 0` y emitía
`contador:reiniciado` — pero ningún manejador de `contador:reiniciado`
actualizaba el número en pantalla. El sistema de tipos no puede detectar
esto: la lógica compilaba perfectamente, el bug era puramente de
comportamiento (olvidar que "reiniciar el estado" y "repintar la pantalla"
son dos pasos distintos, y el segundo también necesita su propio
manejador). Un recordatorio real de que los tipos evitan una categoría de
bugs, no todas.

## Retos para ampliarlo

1. Añade un método `once(evento, manejador)` que se autocancele después de
   la primera vez que se dispare.
2. Añade un evento nuevo a `MapaEventos` (por ejemplo,
   `'tema:cambiado': { modo: 'claro' | 'oscuro' }`) y su UI correspondiente.
3. Tipa un método `emitAsync` que espere a que todos los manejadores
   (si devuelven una `Promise`) terminen antes de resolver.
