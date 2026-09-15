# Interactivos de matemáticas para primaria

Herramientas de práctica para segundo grado, gratuitas, en español y en inglés. Cada actividad se abre en el navegador, genera ejercicios nuevos cada vez y da retroalimentación inmediata. Están hechas para que un niño de siete años pueda usarlas solo, con un adulto cerca si hace falta.

**[Abrir en español](matematicas-2do-grado/index.html)** · **[Open in English](grade2-math/index.html)**

---

## Qué hay aquí

Siete conjuntos de actividades, veintidós herramientas de práctica. Cada conjunto es un archivo HTML independiente con sus módulos en pestañas.

| Conjunto | Módulos | Estándares |
|---|---|---|
| Valor posicional y operaciones | Bloques de base diez · Cálculo mental (10 y 100 más y menos) · Explica tu estrategia · Sumar varios números | 2.NBT.A.1, 2.NBT.B.5–B.9 |
| Números hasta 1000 | Comparar con `>`, `=`, `<` · Contar salteado · Nombres de números y forma desarrollada | 2.NBT.A.2–A.4 |
| Operaciones y pensamiento algebraico | Datos básicos hasta 20 · Problemas verbales · Pares e impares · Arreglos | 2.OA.A.1, 2.OA.B.2, 2.OA.C.3–C.4 |
| Medición y recta numérica | Taller de medición · Estimar y comparar · Saltos en la recta numérica | 2.MD.A.1–A.4, 2.MD.B.5–B.6 |
| Tiempo y dinero | Taller del reloj · Caja registradora | 2.MD.C.7–C.8 |
| Datos | Pictogramas y gráficas de barras · Diagrama de líneas · Marcas de conteo | 2.MD.D.9–D.10 |
| Geometría y fracciones | Explorador de figuras · Constructor de cuadrículas · Cortador de fracciones | 2.G.A.1–A.3 |

Las medidas y el dinero son los del sistema estadounidense —pulgadas, pies, yardas, centímetros, metros, dólares y centavos— porque son los que los niños encuentran en la escuela. La versión en español mantiene *quarter*, *dime*, *nickel* y *penny* con su nombre en inglés y el valor explicado al lado, por la misma razón.

## Cómo se usan

No hay nada que instalar ni con qué registrarse. Se abre el enlace y se empieza.

- Cada tarea se genera nueva, así que la misma herramienta sirve muchas veces sin repetirse.
- Nada obliga a terminar: se puede cambiar de pestaña, pedir una tarea nueva o volver a intentar cuantas veces se quiera.
- No hay cronómetros ni penalizaciones. Las rondas de diez preguntas llevan marcador y racha, pero solo para dar ritmo.
- La retroalimentación explica dónde estuvo el error en vez de soltar la respuesta, siempre que sea posible.

Para un salón, basta con dar el enlace del hub y dejar que cada niño escoja. Para trabajo dirigido, conviene dar el enlace directo del conjunto que toque ese día.

## Accesibilidad

Diseñadas siguiendo el Diseño Universal para el Aprendizaje y verificadas contra WCAG 2.1 AA.

- **Léemelo.** Cada bloque de instrucciones tiene un botón que las lee en voz alta con la voz del aparato. En el módulo de estrategias, el niño también puede oír leído lo que él mismo escribió, para revisarlo.
- **Teclado.** Todo funciona sin ratón ni pantalla táctil: pestañas con flechas, botones con Tab y Enter, y foco visible con borde grueso.
- **Lectores de pantalla.** Cada dibujo lleva su descripción, las tablas tienen `caption` y `scope`, y las respuestas aparecen en regiones que se anuncian solas.
- **Contraste.** Todas las combinaciones de color se verificaron por encima de 4.5:1; la mayoría pasa también AAA.
- **Objetivos táctiles.** Ningún botón mide menos de 44 píxeles de alto, pensando en dedos de siete años.
- **Sin distracciones.** Sin animaciones innecesarias, sin sonidos, sin publicidad.

## Privacidad

No se guarda ni se envía nada. No hay cuentas, ni cookies, ni seguimiento, ni almacenamiento en el navegador. Lo que el niño escribe vive en la pantalla y desaparece al cerrarla. Una vez abierta la página, sigue funcionando sin conexión.

## Estructura del repositorio

```
primaria/
├── README.md
├── grade2-math/                  Edición en inglés
│   ├── index.html                Hub
│   ├── place-value.html
│   ├── numbers.html
│   ├── operations.html
│   ├── measurement.html
│   ├── time-money.html
│   ├── data.html
│   └── geometry-fractions.html
└── matematicas-2do-grado/        Edición en español
    ├── index.html                Hub
    ├── valor-posicional.html
    ├── numeros.html
    ├── operaciones.html
    ├── medicion.html
    ├── tiempo-dinero.html
    ├── datos.html
    └── geometria-fracciones.html
```

Cada archivo es autónomo: lleva dentro su HTML, su CSS y su JavaScript, sin librerías externas ni dependencias. No hay proceso de compilación. Para publicarlos basta con copiar las carpetas a GitHub Pages o a cualquier servidor, o incluso abrirlos desde el disco.

## Requisitos técnicos

Cualquier navegador moderno en teléfono, tableta o computadora. La lectura en voz alta usa la síntesis de voz del sistema: está disponible en Chrome, Edge, Safari y Firefox recientes, y donde no lo esté, el botón simplemente no aparece y todo lo demás sigue funcionando.

## Adaptar y reutilizar

Se pueden copiar, modificar y repartir libremente para uso no comercial, dando crédito. Algunas adaptaciones fáciles:

- Cambiar los nombres, objetos y contextos de los problemas verbales: están en listas al principio del bloque de JavaScript de cada archivo.
- Ajustar los rangos numéricos: las llamadas a `randInt(mínimo, máximo)` marcan la dificultad de cada tipo de tarea.
- Cambiar el color de un conjunto: las variables `--domain` y `--domain-dark` del `<style>`, y la loseta correspondiente en el hub.

Si se traduce a otro idioma, hay que cambiar también el idioma de la voz y la lista de voces preferidas, en la función `chooseVoice`.

## Créditos y licencia

José M. Fernández, ABE/ASE Math Master Teacher, Harry S. Truman College — City Colleges of Chicago.

Publicado bajo [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Se puede compartir y adaptar sin fines comerciales, dando crédito y manteniendo la misma licencia.

---

# Grade 2 math interactives

Free practice tools for second grade, in Spanish and English. Each activity runs in the browser, builds a fresh problem every time, and gives immediate feedback. They are made so a seven-year-old can work independently, with an adult nearby if needed.

**[Open in English](grade2-math/index.html)** · **[Abrir en español](matematicas-2do-grado/index.html)**

## What is here

Seven activity sets, twenty-two practice tools. Each set is a self-contained HTML file with its modules in tabs.

| Set | Modules | Standards |
|---|---|---|
| Place value & operations | Base-ten blocks · Mental math (10 and 100 more and less) · Explain a strategy · Add several numbers | 2.NBT.A.1, 2.NBT.B.5–B.9 |
| Numbers to 1,000 | Compare with `>`, `=`, `<` · Skip-count · Number names and expanded form | 2.NBT.A.2–A.4 |
| Operations & algebraic thinking | Facts to 20 · Word problems · Odd and even · Arrays | 2.OA.A.1, 2.OA.B.2, 2.OA.C.3–C.4 |
| Measurement & number line | Measuring workshop · Estimate and compare · Number line jumps | 2.MD.A.1–A.4, 2.MD.B.5–B.6 |
| Time & money | Clock workshop · Cash register | 2.MD.C.7–C.8 |
| Data | Picture and bar graphs · Line plot · Tally charts | 2.MD.D.9–D.10 |
| Geometry & fractions | Shape explorer · Grid builder · Fraction cutter | 2.G.A.1–A.3 |

Word problems cover every unknown position — result, change and start unknown, take-apart, compare, and two-step — and ask the child to pick the matching equation before solving it.

## Classroom notes

Nothing to install and no sign-up. Open the link and start.

- Problems are generated fresh, so a tool can be used many times without repeating.
- No timers and no penalties. Ten-question rounds keep a score and a streak, for pacing only.
- Feedback points at the place where the thinking went wrong rather than handing over the answer.
- For a whole class, share the hub link. For guided work, link the single set you need.

## Accessibility

Built on Universal Design for Learning principles and checked against WCAG 2.1 AA: a read-aloud button on every instruction block, full keyboard operation with visible focus, described graphics, tables with `caption` and `scope`, live regions for feedback, every colour pair above 4.5:1, and touch targets no smaller than 44 pixels.

## Privacy

Nothing is stored and nothing is sent. No accounts, no cookies, no tracking, no browser storage. Whatever a child types lives on the screen and disappears when the page closes. Once open, the pages keep working offline.

## Technical notes

Every file is standalone — HTML, CSS and JavaScript inside one document, no external libraries, no build step. Copy the folders to GitHub Pages or any server, or open them straight from disk. Read-aloud uses the device's own speech synthesis; where it is unavailable the button simply does not appear and everything else still works.

## Credits and licence

José M. Fernández, ABE/ASE Math Master Teacher, Harry S. Truman College — City Colleges of Chicago.

Released under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/). Free to share and adapt for non-commercial use, with credit, under the same licence.
