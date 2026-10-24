# Primaria · Interactivos y juegos

Actividades interactivas gratuitas para prekínder, kindergarten, primero y segundo grado, en español y en inglés. Forman parte del portal **[Lumi](https://zhemaria.github.io/lumi/)**, donde están ordenadas por grado y por materia. Los cuentos ilustrados están en el repositorio [cuentos-educativos](https://github.com/zhemaria/cuentos-educativos).

Cada actividad se abre en el navegador, sin instalar nada ni registrarse.

---

## Qué hay aquí

| Grado | Serie | Español | English |
|---|---|---|---|
| Prekínder | Matemáticas (6 juegos) | [prekinder/?lang=es](prekinder/index.html?lang=es) | [prekinder/](prekinder/index.html) |
| Prekínder | Letras: trazos y caminos (3) | [letras/](letras/index.html) | [letters/](letters/index.html) |
| Kindergarten | Matemáticas (7 juegos) | [kindergarten/?lang=es](kindergarten/index.html?lang=es) | [kindergarten/](kindergarten/index.html) |
| Kindergarten | Lectura en español (6) | [kindergarten/lectura.html](kindergarten/lectura.html) | — |
| Kindergarten | Lectura en inglés (6) | — | [kindergarten/reading.html](kindergarten/reading.html) |
| 1.er grado | Matemáticas (9 juegos) | [1er_grado/?lang=es](1er_grado/index.html?lang=es) | [1er_grado/](1er_grado/index.html) |
| 2.º grado | Matemáticas interactivas (7 conjuntos) | [2do_grado/](2do_grado/index.html) | [2nd_grade/](2nd_grade/index.html) |
| 2.º grado | Detective de operaciones | [mate_detective/](mate_detective/index.html) | [math_word_detective/](math_word_detective/index.html) |
| 2.º grado | Tablas galácticas | [galactica_tablas/](galactica_tablas/index.html) | [galactic_tables/](galactic_tables/index.html) |
| 2.º grado | Sudoku para niños | [sudoku-segundo-grado.html](sudoku-segundo-grado.html) | [sudoku-for-kids.html](sudoku-for-kids.html) |
| 2.º grado | Grow a Sentence | — | [grow-a-sentence/](grow-a-sentence/index.html) |
| 2.º grado | Ecosystem Adventure | — | [ecosystem-adventure/](ecosystem-adventure/index.html) |

`hub-tablet/` es un tablero de uso familiar y no forma parte del portal.

### El idioma en las series de prekínder, kindergarten y primer grado

Las páginas de prekínder y de matemáticas de kindergarten y de primer grado tienen los dos idiomas en un mismo archivo, con botones **Español | English**. Abren en inglés; para abrirlas en español se añade `?lang=es` a la dirección (por ejemplo, `prekinder/prek-01-numeros-conteo.html?lang=es`). Las páginas de inicio de cada serie pasan el idioma elegido a sus lecciones.

## Estructura del repositorio

```
primaria/
├── README.md
├── prekinder/            Matemáticas de prekínder (es/en en el mismo archivo)
├── letras/  letters/     Trazos y letras de prekínder (español / inglés)
├── kindergarten/         Matemáticas (es/en), lectura en español (k-lectura-*)
│                         y lectura en inglés (k-reading-*)
├── 1er_grado/            Matemáticas de 1.er grado (es/en en el mismo archivo)
├── 2do_grado/  2nd_grade/            Matemáticas de 2.º grado (español / inglés)
├── mate_detective/  math_word_detective/
├── galactica_tablas/  galactic_tables/
├── sudoku-segundo-grado.html  sudoku-for-kids.html
├── grow-a-sentence/      (solo inglés)
├── ecosystem-adventure/  (solo inglés)
└── hub-tablet/           (uso familiar)
```

Cada archivo es autónomo: lleva dentro su HTML, su CSS y su JavaScript, sin librerías externas. No hay proceso de compilación; basta con copiar las carpetas a GitHub Pages o abrirlas desde el disco.

---

## Matemáticas interactivas de 2.º grado

**[Abrir en español](2do_grado/index.html)** · **[Open in English](2nd_grade/index.html)**

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

### Cómo se usan

No hay nada que instalar ni con qué registrarse. Se abre el enlace y se empieza.

- Cada tarea se genera nueva, así que la misma herramienta sirve muchas veces sin repetirse.
- Nada obliga a terminar: se puede cambiar de pestaña, pedir una tarea nueva o volver a intentar cuantas veces se quiera.
- No hay cronómetros ni penalizaciones. Las rondas de diez preguntas llevan marcador y racha, pero solo para dar ritmo.
- La retroalimentación explica dónde estuvo el error en vez de soltar la respuesta, siempre que sea posible.

Para un salón, basta con dar el enlace del hub y dejar que cada niño escoja. Para trabajo dirigido, conviene dar el enlace directo del conjunto que toque ese día.

### Accesibilidad

Diseñadas siguiendo el Diseño Universal para el Aprendizaje y verificadas contra WCAG 2.1 AA.

- **Léemelo.** Cada bloque de instrucciones tiene un botón que las lee en voz alta con la voz del aparato. En el módulo de estrategias, el niño también puede oír leído lo que él mismo escribió, para revisarlo.
- **Teclado.** Todo funciona sin ratón ni pantalla táctil: pestañas con flechas, botones con Tab y Enter, y foco visible con borde grueso.
- **Lectores de pantalla.** Cada dibujo lleva su descripción, las tablas tienen `caption` y `scope`, y las respuestas aparecen en regiones que se anuncian solas.
- **Contraste.** Todas las combinaciones de color se verificaron por encima de 4.5:1; la mayoría pasa también AAA.
- **Objetivos táctiles.** Ningún botón mide menos de 44 píxeles de alto, pensando en dedos de siete años.
- **Sin distracciones.** Sin animaciones innecesarias, sin sonidos, sin publicidad.

### Privacidad

No se guarda ni se envía nada. No hay cuentas, ni cookies, ni seguimiento, ni almacenamiento en el navegador. Lo que el niño escribe vive en la pantalla y desaparece al cerrarla. Una vez abierta la página, sigue funcionando sin conexión.

### Requisitos técnicos

Cualquier navegador moderno en teléfono, tableta o computadora. La lectura en voz alta usa la síntesis de voz del sistema: está disponible en Chrome, Edge, Safari y Firefox recientes, y donde no lo esté, el botón simplemente no aparece y todo lo demás sigue funcionando.

### Adaptar y reutilizar

Se pueden copiar, modificar y repartir libremente para uso no comercial, dando crédito. Algunas adaptaciones fáciles:

- Cambiar los nombres, objetos y contextos de los problemas verbales: están en listas al principio del bloque de JavaScript de cada archivo.
- Ajustar los rangos numéricos: las llamadas a `randInt(mínimo, máximo)` marcan la dificultad de cada tipo de tarea.
- Cambiar el color de un conjunto: las variables `--domain` y `--domain-dark` del `<style>`, y la loseta correspondiente en el hub.

Si se traduce a otro idioma, hay que cambiar también el idioma de la voz y la lista de voces preferidas, en la función `chooseVoice`.

## Créditos y licencia

José M. Fernández, ABE/ASE Math Master Teacher, Harry S. Truman College — City Colleges of Chicago.

Publicado bajo [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Se puede compartir y adaptar sin fines comerciales, dando crédito y manteniendo la misma licencia.

---

# English summary

Free interactive activities and games for Pre-K, Kindergarten, Grade 1 and Grade 2, in Spanish and English. All of them are listed, by grade and by subject, on the **[Lumi portal](https://zhemaria.github.io/lumi/index-en.html)**. Pages that have both languages in one file open in English by default; add `?lang=es` to the address to open them in Spanish.

## Grade 2 math interactives

Free practice tools for second grade, in Spanish and English. Each activity runs in the browser, builds a fresh problem every time, and gives immediate feedback. They are made so a seven-year-old can work independently, with an adult nearby if needed.

**[Open in English](2nd_grade/index.html)** · **[Abrir en español](2do_grado/index.html)**

### What is here

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

### Classroom notes

Nothing to install and no sign-up. Open the link and start.

- Problems are generated fresh, so a tool can be used many times without repeating.
- No timers and no penalties. Ten-question rounds keep a score and a streak, for pacing only.
- Feedback points at the place where the thinking went wrong rather than handing over the answer.
- For a whole class, share the hub link. For guided work, link the single set you need.

### Accessibility

Built on Universal Design for Learning principles and checked against WCAG 2.1 AA: a read-aloud button on every instruction block, full keyboard operation with visible focus, described graphics, tables with `caption` and `scope`, live regions for feedback, every colour pair above 4.5:1, and touch targets no smaller than 44 pixels.

### Privacy

Nothing is stored and nothing is sent. No accounts, no cookies, no tracking, no browser storage. Whatever a child types lives on the screen and disappears when the page closes. Once open, the pages keep working offline.

### Technical notes

Every file is standalone — HTML, CSS and JavaScript inside one document, no external libraries, no build step. Copy the folders to GitHub Pages or any server, or open them straight from disk. Read-aloud uses the device's own speech synthesis; where it is unavailable the button simply does not appear and everything else still works.

### Credits and licence

José M. Fernández, ABE/ASE Math Master Teacher, Harry S. Truman College — City Colleges of Chicago.

Released under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/). Free to share and adapt for non-commercial use, with credit, under the same licence.
