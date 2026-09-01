> Este proyecto vive en la carpeta `maquina-estados/` de un repo con varios proyectos — clónalo entero y haz `cd maquina-estados` antes de los pasos siguientes.

# Máquina de estados tipada

**Esta es la rama `main`** — el punto de partida. `src/tipos.ts` está
completo a propósito (es el diseño del proyecto: léelo primero); `src/MaquinaEstados.ts`
tiene `TODO`. La rama [`solucion`](../../tree/solucion) tiene la
implementación completa.

Sexto proyecto avanzado de [Tech Study Tracker](https://github.com/pedroleni/tech-study-tracker):
una máquina de estados finita genérica y reutilizable — el mismo patrón
que usan librerías como XState, un router, o cualquier flujo con pasos
bien definidos (un pedido, una descarga, un formulario multi-paso). Aquí
las transiciones inválidas no son un `if` que alguien puede olvidar
comprobar — son, directamente, imposibles de expresar en el tipo.

## Arquitectura

```
index.html / src/style.css   — estructura y estilos, ya completos
src/
  tipos.ts                    — TablaTransiciones<Estado, Evento> + la tabla de un pedido, completo
  MaquinaEstados.ts            — la clase genérica, con TODO
  MaquinaEstados.test.ts       — sus tests con Vitest
  main.ts                       — demo: seguimiento visual de un pedido
```

## Qué vas a implementar

`MaquinaEstados<Estado extends string, Evento extends string>` con:

- `estado` (getter) — el estado actual.
- `puedeTransicionar(evento)` — ¿existe una transición para este evento
  desde el estado actual?
- `eventosDisponibles()` — todos los eventos válidos desde el estado actual.
- `enviar(evento)` — si la transición existe, cambia de estado y devuelve
  `true`; si no, no hace nada y devuelve `false`.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12+) — lo que
  pide Vite 8. Comprueba tu versión con `node --version`.
- npm (se instala junto con Node.js).

## Cómo ejecutarlo

```bash
git clone https://github.com/pedroleni/maquina-estados-ts.git
cd maquina-estados-ts
npm install
npm run dev
```

- `npm run dev` — servidor de desarrollo
- `npm run typecheck` — solo comprueba tipos (`tsc --noEmit`)
- `npm run build` — comprueba tipos Y genera el build de producción en `dist/`
- `npm run test` — corre los tests con Vitest

## Por qué Record y no Partial<Record> en el nivel exterior

```ts
export type TablaTransiciones<Estado extends string, Evento extends string> = Record<
  Estado,
  Partial<Record<Evento, Estado>>
>
```

Record (no `Partial<Record<...>>`) en el nivel EXTERIOR obliga a que la
tabla tenga una entrada para **todos** los estados posibles — pruébalo tú:
quita la entrada de `'cancelado'` de `tablaPedido` en `tipos.ts` y ejecuta
`npm run typecheck`. Vas a ver un error real señalando exactamente qué
estado falta. El nivel INTERIOR sí es `Partial<Record<...>>`, porque cada
estado concreto solo acepta *algunos* eventos, no todos — la asimetría es
intencionada, no un descuido.

## Un gotcha real, encontrado sin buscarlo

El primer intento de `MaquinaEstados` usaba el atajo de parámetro de
constructor:

```ts
constructor(private readonly tabla: TablaTransiciones<Estado, Evento>, estadoInicial: Estado) {
  this.estadoActual = estadoInicial
}
```

No compiló: `erasableSyntaxOnly` (activado por defecto en la plantilla de
Vite que usa este proyecto) rechaza esa sintaxis por el mismo motivo que
ya se documentó en el
[proyecto del buscador con TypeScript](https://github.com/pedroleni/buscador-personajes-ts) —
genera código real (`this.tabla = tabla`), no solo borra tipos. El fix es
el mismo: declarar el campo aparte y asignarlo a mano en el cuerpo del
constructor. Dos proyectos independientes de este curso han tropezado con
esto de forma completamente natural, sin que nadie lo forzara — es una
señal real de lo fácil que es escribir por costumbre un atajo que en
ciertos entornos no es solo estilo, es un error de compilación.

## Retos para ampliarlo

1. Añade un método `reiniciar(estadoInicial: Estado)` a `MaquinaEstados`
   (ahora mismo la única forma de "reiniciar" la demo es recargar la página).
2. Añade una tabla de transiciones para un semáforo (`rojo | amarillo | verde`)
   y una demo aparte que la use.
3. Añade un callback opcional `alEntrar` al constructor, que se ejecute
   cada vez que la máquina entra en un estado nuevo — tipado para que
   reciba el `Estado` concreto al que se acaba de entrar.
