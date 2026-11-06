/* ==================================================================
   Selector de idioma de Lumi (para páginas que tienen una versión
   en inglés y otra en español en archivos distintos)
   ------------------------------------------------------------------
   Pone, debajo de la barra de Lumi y alineado a la derecha, el mismo
   selector que usan los demás interactivos:  🌐 [English] [Español]
   El idioma de esta página aparece marcado; el otro es un enlace a
   la otra versión. Siempre en el mismo orden: English primero.

   Uso:
     <script src="../idioma-lumi.js"
             data-en="../2nd_grade/" data-es="../2do_grado/" defer></script>

   El idioma de la página se toma del atributo lang de <html>.
   José M. Fernández · Licencia CC BY-NC-SA 4.0
   ================================================================== */
(function () {
  "use strict";
  var yo = document.currentScript;
  if (!yo) return;
  var URL = { en: yo.getAttribute("data-en"), es: yo.getAttribute("data-es") };
  var L = (document.documentElement.lang || "en").slice(0, 2) === "es" ? "es" : "en";

  var css =
    ".lumi-idioma{all:initial;display:block;position:relative;z-index:5;font-family:'Andika','Trebuchet MS',system-ui,sans-serif;line-height:1.3}" +
    ".lumi-idioma *{box-sizing:border-box;font-family:inherit}" +
    ".lumi-idioma .li-in{max-width:1100px;margin:0 auto;padding:8px 12px 0;display:flex;justify-content:flex-end}" +
    ".lumi-idioma .li-chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:3px solid #D6D0EA;" +
      "border-radius:999px;padding:6px 12px;box-shadow:0 4px 0 rgba(30,26,58,.18);font-weight:700;font-size:16px;color:#1E1A3A}" +
    ".lumi-idioma .li-chip a,.lumi-idioma .li-chip span.li-op{display:inline-flex;align-items:center;min-height:40px;" +
      "padding:4px 12px;border-radius:999px;color:#1E1A3A;text-decoration:none;font-weight:700}" +
    ".lumi-idioma .li-chip a:hover{text-decoration:underline}" +
    ".lumi-idioma .li-chip a:focus-visible{outline:3px solid #0B62D6;outline-offset:2px}" +
    ".lumi-idioma .li-chip .li-op[aria-current]{background:#1E1A3A;color:#fff}" +
    "@media print{.lumi-idioma{display:none!important}}";

  function opcion(l, texto) {
    if (l === L) return '<span class="li-op" aria-current="true" lang="' + l + '">' + texto + "</span>";
    return '<a href="' + URL[l] + '" lang="' + l + '" hreflang="' + l + '">' + texto + "</a>";
  }

  function poner() {
    if (document.querySelector(".lumi-idioma") || !URL.en || !URL.es) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var caja = document.createElement("div");
    caja.className = "lumi-idioma";
    caja.innerHTML = '<div class="li-in"><span class="li-chip" role="group" aria-label="' +
      (L === "es" ? "Idioma" : "Language") + '"><span aria-hidden="true">🌐</span>' +
      opcion("en", "English") + opcion("es", "Español") + "</span></div>";
    var nav = document.querySelector(".lumi-nav");
    if (nav) nav.parentNode.insertBefore(caja, nav.nextSibling);
    else document.body.insertBefore(caja, document.body.firstChild);
  }
  /* Se espera a que nav-lumi.js ponga su barra para colocarse debajo */
  function iniciar() { setTimeout(poner, 0); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
