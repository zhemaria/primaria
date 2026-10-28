/* ==================================================================
   Barra de navegación de Lumi
   Se pone arriba en las páginas de inicio de cada grado y en los juegos:
   - Fila 1: portada de Lumi, todos los grados y el botón de voz.
   - Fila 2: las materias del grado (Math, Reading, Lectura, Science,
     Social studies) y, en las páginas de inicio, «◀ Grado N» para
     regresar a la página del grado en Lumi.
   Uso:  <script src="../nav-lumi.js" data-grado="1" defer></script>
         data-grado: prek, k, 1, 2… (el grado de la página; se resalta)
   El idioma sigue al de la página (atributo lang de <html>) y cambia
   solo cuando la página cambia de idioma.
   Para agregar un grado nuevo, basta con añadirlo a GRADOS y a MATERIAS.
   José M. Fernández · Licencia CC BY-NC-SA 4.0
   ================================================================== */
(function () {
  "use strict";
  var LUMI = "https://www.lumi-educa.com/";
  var P = "https://zhemaria.github.io/primaria/";
  var C = "https://zhemaria.github.io/cuentos-educativos/";

  var GRADOS = [
    { id: "prek", ancla: "prek", es: "Prekínder", en: "Pre-K", es2: "Prekínder", en2: "Pre-K" },
    { id: "k",    ancla: "k",    es: "Kínder",    en: "K",     es2: "Kínder",    en2: "Kindergarten" },
    { id: "1",    ancla: "g1",   es: "1.º",       en: "1st",   es2: "1.er grado", en2: "Grade 1" },
    { id: "2",    ancla: "g2",   es: "2.º",       en: "2nd",   es2: "2.º grado",  en2: "Grade 2" },
    { id: "3",    ancla: "g3",   es: "3.º",       en: "3rd",   es2: "3.er grado", en2: "Grade 3" },
    { id: "4",    ancla: "g4",   es: "4.º",       en: "4th",   es2: "4.º grado",  en2: "Grade 4" },
    { id: "5",    ancla: "g5",   es: "5.º",       en: "5th",   es2: "5.º grado",  en2: "Grade 5" },
    /* en preparación: solo se ve en las páginas de sexto hasta que entre en el catálogo de Lumi */
    { id: "6",    ancla: "g6",   es: "6.º",       en: "6th",   es2: "6.º grado",  en2: "Grade 6" }
  ];

  /* Materias de cada grado: dirección en inglés y en español
     (si falta una materia en un grado, simplemente no se pone) */
  var MATERIAS = {
    prek: { mate:  { en: P + "prekinder/?lang=en", es: P + "prekinder/?lang=es" },
            read:  { en: P + "letters/",            es: P + "letters/" },
            lect:  { en: P + "letras/",             es: P + "letras/" } },
    k:    { mate:  { en: P + "kindergarten/",              es: P + "kindergarten/?lang=es" },
            read:  { en: P + "kindergarten/reading.html",  es: P + "kindergarten/reading.html" },
            lect:  { en: P + "kindergarten/lectura.html",  es: P + "kindergarten/lectura.html" },
            cien:  { en: C + "book-kindergarten-science.html",        es: C + "libro-kinder-ciencias.html" },
            soci:  { en: C + "book-kindergarten-social-studies.html", es: C + "libro-kinder-sociales.html" } },
    "1":  { mate:  { en: P + "1er_grado/",             es: P + "1er_grado/?lang=es" },
            read:  { en: P + "1er_grado/reading.html", es: P + "1er_grado/reading.html?lang=es" },
            lect:  { en: P + "1er_grado/lectura.html", es: P + "1er_grado/lectura.html" },
            cien:  { en: C + "book-grade1-science.html",        es: C + "libro-1ro-ciencias.html" },
            soci:  { en: C + "book-grade1-social-studies.html", es: C + "libro-1ro-sociales.html" } },
    "2":  { mate:  { en: P + "2nd_grade/",        es: P + "2do_grado/" },
            read:  { en: P + "grow-a-sentence/",  es: P + "grow-a-sentence/" },
            cien:  { en: C + "book-grade2-science.html",        es: C + "libro-2do-ciencias.html" },
            soci:  { en: C + "book-grade2-social-studies.html", es: C + "libro-2do-sociales.html" } },
    "3":  { mate:  { en: P + "3er_grado/",             es: P + "3er_grado/?lang=es" },
            read:  { en: P + "3er_grado/reading.html", es: P + "3er_grado/reading.html?lang=es" },
            lect:  { en: P + "3er_grado/lectura.html", es: P + "3er_grado/lectura.html" },
            cien:  { en: C + "book-grade3-science.html",        es: C + "libro-3ro-ciencias.html" },
            soci:  { en: C + "book-grade3-social-studies.html", es: C + "libro-3ro-sociales.html" } },
    "4":  { mate:  { en: P + "4to_grado/",             es: P + "4to_grado/?lang=es" },
            read:  { en: P + "4to_grado/reading.html", es: P + "4to_grado/reading.html?lang=es" },
            lect:  { en: P + "4to_grado/lectura.html", es: P + "4to_grado/lectura.html" },
            cien:  { en: C + "book-grade4-science.html",        es: C + "libro-4to-ciencias.html" },
            soci:  { en: C + "book-grade4-social-studies.html", es: C + "libro-4to-sociales.html" } },
    "5":  { mate:  { en: P + "5to_grado/",             es: P + "5to_grado/?ayuda=es" },
            read:  { en: P + "5to_grado/reading.html", es: P + "5to_grado/reading.html?ayuda=es" },
            cien:  { en: C + "book-grade5-science.html",        es: C + "book-grade5-science.html" },
            soci:  { en: C + "book-grade5-social-studies.html", es: C + "book-grade5-social-studies.html" } },
    "6":  { mate:  { en: P + "6to_grado/",             es: P + "6to_grado/?ayuda=es" },
            read:  { en: P + "6to_grado/reading.html", es: P + "6to_grado/reading.html?ayuda=es" },
            cien:  { en: C + "book-grade6-science.html",        es: C + "book-grade6-science.html" },
            soci:  { en: C + "book-grade6-social-studies.html", es: C + "book-grade6-social-studies.html" } }
  };
  var ORDEN = ["mate", "read", "lect", "cien", "soci"];
  var NOMBRES = {
    en: { mate: "🔢 Math", read: "📖 Reading", lect: "📚 Lectura (español)", cien: "🔬 Science", soci: "🌎 Social studies" },
    es: { mate: "🔢 Matemáticas", read: "📖 Reading (inglés)", lect: "📚 Lectura", cien: "🔬 Ciencias", soci: "🌎 Estudios sociales" }
  };
  var ESP = { lect: true };  /* lectura en español: siempre se marca con lang="es" */

  var T = {
    es: { nav: "Navegación de Lumi", inicio: "Inicio", grados: "Grados:", grado: "Ir a ", actual: " (estás aquí)",
          materias: "Materias de este grado", volver: "Volver a la página de ",
          pag: "index-es.html", pagGrados: "grados-es.html" },
    en: { nav: "Lumi navigation", inicio: "Home", grados: "Grades:", grado: "Go to ", actual: " (you are here)",
          materias: "Subjects in this grade", volver: "Back to the page for ",
          pag: "index.html", pagGrados: "grados.html" }
  };
  var yo = document.currentScript;
  var miGrado = yo ? (yo.getAttribute("data-grado") || "") : "";
  var LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M24 16 C23 10 20 7 16 6 M40 16 C41 10 44 7 48 6" fill="none" stroke="#194F5A" stroke-width="3.5" stroke-linecap="round"/><circle cx="15" cy="6" r="4.5" fill="#194F5A"/><circle cx="49" cy="6" r="4.5" fill="#194F5A"/><ellipse cx="32" cy="38" rx="25" ry="23" fill="#6DCEC5" stroke="#194F5A" stroke-width="4"/><path d="M20 41 a4.5 4.5 0 0 1 9 0 M35 41 a4.5 4.5 0 0 1 9 0 M25 48 Q32 55 39 48" fill="none" stroke="#194F5A" stroke-width="3.2" stroke-linecap="round"/></svg>';

  var css = ".lumi-nav{all:initial;display:block;background:#E8F5F6;border-bottom:3px solid #6DCEC5;font-family:'Andika','Trebuchet MS',system-ui,sans-serif;color:#194F5A;line-height:1.3}" +
    ".lumi-nav *{box-sizing:border-box;font-family:inherit}" +
    ".lumi-nav .ln-in{max-width:1100px;margin:0 auto;padding:6px 12px;display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}" +
    ".lumi-nav .ln-in + .ln-in{border-top:1px solid #A9D3D6;padding-top:6px}" +
    ".lumi-nav a{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:4px 12px;border-radius:999px;color:#194F5A;text-decoration:none;font-weight:700;font-size:16px;background:#fff;border:2px solid #A9D3D6}" +
    ".lumi-nav a:hover{border-color:#194F5A}" +
    ".lumi-nav a:focus-visible{outline:3px solid #194F5A;outline-offset:2px}" +
    ".lumi-nav a[aria-current]{background:#194F5A;color:#fff;border-color:#194F5A}" +
    ".lumi-nav a.ln-atras{border-color:#194F5A}" +
    ".lumi-nav svg{width:26px;height:26px;flex:none}" +
    ".lumi-nav .ln-g{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0;padding:0;list-style:none}" +
    ".lumi-nav .ln-t{font-size:15px;font-weight:700;margin-left:4px}" +
    ".lumi-nav .ln-voz{margin-left:auto;display:inline-flex}" +
    ".lumi-nav .ln-voz:empty{display:none}" +
    "@media print{.lumi-nav{display:none!important}}";

  function idioma() { return (document.documentElement.lang || "es").slice(0, 2) === "en" ? "en" : "es"; }

  /* Qué materia es esta página (para resaltarla) */
  function miMateria() {
    var r = location.pathname.toLowerCase();
    if (/science|ciencias|ecosystem/.test(r)) return "cien";
    if (/social|sociales/.test(r)) return "soci";
    if (/lectura|letras/.test(r)) return "lect";
    if (/reading|letters|grow-a-sentence/.test(r)) return "read";
    return "mate";
  }
  /* Página de inicio o juego suelto (sin botón propio para volver) */
  function esInicio() { return !document.querySelector(".casa, #enlace-casa, .home-link"); }

  function pintar(nav) {
    var L = idioma(), t = T[L];
    nav.setAttribute("aria-label", t.nav);
    nav.setAttribute("lang", L);
    var h = '<div class="ln-in"><a href="' + LUMI + t.pag + '">' + LOGO + "Lumi · " + t.inicio + "</a>" +
      '<span class="ln-t" aria-hidden="true">' + t.grados + '</span><ul class="ln-g">';
    var g0 = null;
    GRADOS.forEach(function (g) {
      var aqui = g.id === miGrado;
      if (g.pronto && !aqui) return;
      if (aqui) g0 = g;
      h += '<li><a href="' + LUMI + t.pagGrados + "#" + g.ancla + '"' + (aqui ? ' aria-current="page"' : "") +
           ' aria-label="' + t.grado + g[L + "2"] + (aqui ? t.actual : "") + '">' + g[L] + "</a></li>";
    });
    h += '</ul><span class="ln-voz"></span></div>';

    var M = MATERIAS[miGrado];
    if (M) {
      var esta = miMateria();
      h += '<div class="ln-in" role="group" aria-label="' + t.materias + '">';
      if (esInicio() && g0) {
        h += '<a class="ln-atras" href="' + LUMI + t.pagGrados + "#" + g0.ancla + '" aria-label="' + t.volver + g0[L + "2"] + '">' +
             '<span aria-hidden="true">◀</span> ' + g0[L + "2"] + "</a>";
      }
      h += '<ul class="ln-g">';
      ORDEN.forEach(function (m) {
        if (!M[m]) return;
        var aqui = m === esta;
        h += '<li><a href="' + M[m][L] + '"' + (ESP[m] ? ' lang="es"' : "") + (aqui ? ' aria-current="page"' : "") + ">" +
             NOMBRES[L][m] + "</a></li>";
      });
      h += "</ul></div>";
    }
    nav.innerHTML = h;
    if (window.LumiVoz) window.LumiVoz.colocar();
  }

  function iniciar() {
    if (document.querySelector(".lumi-nav")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var nav = document.createElement("nav"); nav.className = "lumi-nav";
    // Después del enlace «saltar al contenido», si la página lo tiene
    var pri = document.body.firstElementChild;
    var salto = pri && pri.tagName === "A" && (pri.getAttribute("href") || "").charAt(0) === "#" ? pri : null;
    document.body.insertBefore(nav, salto ? salto.nextSibling : document.body.firstChild);
    pintar(nav);
    // La página puede cambiar de idioma con sus botones: la barra la sigue
    var ultimo = idioma();
    new MutationObserver(function () { if (idioma() !== ultimo) { ultimo = idioma(); pintar(nav); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
