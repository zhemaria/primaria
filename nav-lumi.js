/* ==================================================================
   Barra de navegación de Lumi
   Se pone arriba en las páginas de inicio de cada grado y en los juegos
   sueltos: lleva a la portada de Lumi y a cualquier grado.
   Uso:  <script src="../nav-lumi.js" data-grado="1" defer></script>
         data-grado: prek, k, 1, 2… (el grado de la página; se resalta)
   El idioma sigue al de la página (atributo lang de <html>) y cambia
   solo cuando la página cambia de idioma.
   Para agregar un grado nuevo, basta con añadirlo a GRADOS.
   José M. Fernández · Licencia CC BY-NC-SA 4.0
   ================================================================== */
(function () {
  "use strict";
  var LUMI = "https://www.lumi-educa.com/";
  var GRADOS = [
    { id: "prek", ancla: "prek", es: "Prekínder", en: "Pre-K" },
    { id: "k",    ancla: "k",    es: "Kínder",    en: "K" },
    { id: "1",    ancla: "g1",   es: "1.º",       en: "1st" },
    { id: "2",    ancla: "g2",   es: "2.º",       en: "2nd" },
    { id: "3",    ancla: "g3",   es: "3.º",       en: "3rd" }
  ];
  var T = {
    es: { nav: "Navegación de Lumi", inicio: "Inicio", grados: "Grados:", grado: "Ir a ", actual: " (estás aquí)",
          pag: "index.html", pagGrados: "grados.html" },
    en: { nav: "Lumi navigation", inicio: "Home", grados: "Grades:", grado: "Go to ", actual: " (you are here)",
          pag: "index-en.html", pagGrados: "grados-en.html" }
  };
  var yo = document.currentScript;
  var miGrado = yo ? (yo.getAttribute("data-grado") || "") : "";
  var LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M24 16 C23 10 20 7 16 6 M40 16 C41 10 44 7 48 6" fill="none" stroke="#194F5A" stroke-width="3.5" stroke-linecap="round"/><circle cx="15" cy="6" r="4.5" fill="#194F5A"/><circle cx="49" cy="6" r="4.5" fill="#194F5A"/><ellipse cx="32" cy="38" rx="25" ry="23" fill="#6DCEC5" stroke="#194F5A" stroke-width="4"/><path d="M20 41 a4.5 4.5 0 0 1 9 0 M35 41 a4.5 4.5 0 0 1 9 0 M25 48 Q32 55 39 48" fill="none" stroke="#194F5A" stroke-width="3.2" stroke-linecap="round"/></svg>';

  var css = ".lumi-nav{all:initial;display:block;background:#E8F5F6;border-bottom:3px solid #6DCEC5;font-family:'Andika','Trebuchet MS',system-ui,sans-serif;color:#194F5A;line-height:1.3}" +
    ".lumi-nav *{box-sizing:border-box;font-family:inherit}" +
    ".lumi-nav .ln-in{max-width:1100px;margin:0 auto;padding:6px 12px;display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}" +
    ".lumi-nav a{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:4px 12px;border-radius:999px;color:#194F5A;text-decoration:none;font-weight:700;font-size:16px;background:#fff;border:2px solid #A9D3D6}" +
    ".lumi-nav a:hover{border-color:#194F5A}" +
    ".lumi-nav a:focus-visible{outline:3px solid #194F5A;outline-offset:2px}" +
    ".lumi-nav a[aria-current]{background:#194F5A;color:#fff;border-color:#194F5A}" +
    ".lumi-nav svg{width:26px;height:26px;flex:none}" +
    ".lumi-nav .ln-g{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0;padding:0;list-style:none}" +
    ".lumi-nav .ln-t{font-size:15px;font-weight:700;margin-left:4px}" +
    "@media print{.lumi-nav{display:none!important}}";

  function idioma() { return (document.documentElement.lang || "es").slice(0, 2) === "en" ? "en" : "es"; }

  function pintar(nav) {
    var L = idioma(), t = T[L];
    nav.setAttribute("aria-label", t.nav);
    nav.setAttribute("lang", L);
    var h = '<div class="ln-in"><a href="' + LUMI + t.pag + '">' + LOGO + "Lumi · " + t.inicio + "</a>" +
      '<span class="ln-t" aria-hidden="true">' + t.grados + '</span><ul class="ln-g">';
    GRADOS.forEach(function (g) {
      var aqui = g.id === miGrado;
      h += '<li><a href="' + LUMI + t.pagGrados + "#" + g.ancla + '"' + (aqui ? ' aria-current="page"' : "") +
           ' aria-label="' + t.grado + g[L] + (aqui ? t.actual : "") + '">' + g[L] + "</a></li>";
    });
    nav.innerHTML = h + "</ul></div>";
  }

  function iniciar() {
    if (document.querySelector(".lumi-nav")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var nav = document.createElement("nav"); nav.className = "lumi-nav";
    pintar(nav);
    // Después del enlace «saltar al contenido», si la página lo tiene
    var pri = document.body.firstElementChild;
    var salto = pri && pri.tagName === "A" && (pri.getAttribute("href") || "").charAt(0) === "#" ? pri : null;
    document.body.insertBefore(nav, salto ? salto.nextSibling : document.body.firstChild);
    // La página puede cambiar de idioma con sus botones: la barra la sigue
    var ultimo = idioma();
    new MutationObserver(function () { if (idioma() !== ultimo) { ultimo = idioma(); pintar(nav); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
