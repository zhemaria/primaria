/* ==================================================================
   Guía de Lumi · Lumi señala los botones (para quien todavía no lee)
   ------------------------------------------------------------------
   Mientras Lumi dice para qué sirve un botón, ese botón se ilumina.
   - Portada: señala el botón para empezar.
   - Menú de juegos: dice el nombre de cada juego mientras se ilumina.
   - Juego: la primera vez, presenta la bocina y la flecha para volver;
     cuando aparece «Siguiente», lo señala.
   - Final: señala «Jugar otra vez» y «Otro juego».
   - Trazos (letras): agrega íconos a los botones de texto y los presenta.
   - Con ratón o teclado, al pasar por un botón, Lumi dice qué hace.
   Cada grupo se presenta completo las dos primeras veces; después el
   botón solo se ilumina un momento, en silencio.
   Lumi nunca habla encima de la página: espera a que la voz de la
   actividad termine, y si la actividad vuelve a hablar, se calla.
   Con la voz apagada (voz-lumi.js), los botones se iluminan igual.

   Uso: <script src="../guia-lumi.js" defer></script> (después de voz-lumi.js)
   José M. Fernández · Licencia CC BY-NC-SA 4.0
   ================================================================== */
(function () {
  "use strict";
  if (window.LumiGuia) return;
  var ss = window.speechSynthesis;
  var $ = function (id) { return document.getElementById(id); };
  function idioma() { return (document.documentElement.lang || "en").slice(0, 2) === "es" ? "es" : "en"; }
  function visible(el) { return !!(el && el.offsetParent !== null && el.getClientRects().length); }
  function sinMovimiento() { return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* ---------- Lo que dice Lumi de cada botón ---------- */
  var DICE = {
    "btn-empezar":  { es: "Toca aquí para empezar.",                 en: "Tap here to start." },
    "btn-bocina":   { es: "Toca la bocina para oír otra vez.",       en: "Tap the speaker to hear it again." },
    "btn-repetir":  { es: "Toca aquí para oír otra vez.",            en: "Tap here to hear it again." },
    "btn-volver":   { es: "Toca la flecha para volver a los juegos.", en: "Tap the arrow to go back to the games." },
    "btn-siguiente":{ es: "Toca aquí para seguir.",                  en: "Tap here to go on." },
    "btn-otra-vez": { es: "Toca aquí para jugar otra vez.",          en: "Tap here to play again." },
    "btn-al-menu":  { es: "Toca aquí para escoger otro juego.",      en: "Tap here to pick another game." },
    /* Trazos */
    "b-voz":        { es: "Toca la bocina para oír otra vez.",       en: "Tap the speaker to hear it again." },
    "b-demo":       { es: "Toca los ojitos y Lumi te enseña cómo se hace.", en: "Tap the eyes and Lumi shows you how." },
    "b-borrar":     { es: "Toca la esponja para empezar de nuevo.",  en: "Tap the sponge to start over." },
    "b-papel":      { es: "Si lo hiciste en papel, toca la hoja.",   en: "If you did it on paper, tap the page." },
    "b-siguiente":  { es: "Toca la flecha para ir al siguiente.",    en: "Tap the arrow to go to the next one." },
    "b-nombre":     { es: "Toca aquí para armar tu nombre, con ayuda de un adulto.", en: "Tap here to build your name, with a grown-up's help." },
    "b-pista":      { es: "Toca el signo de pregunta si no sabes cuál sigue.", en: "Tap the question mark if you don't know which one is next." },
    "b-otra-vez":   { es: "Toca la esponja para empezar de nuevo.",  en: "Tap the sponge to start over." },
    "b-figura":     { es: "Toca la flecha para otro dibujo.",        en: "Tap the arrow for another picture." },
    "b-escuchar":   { es: "Toca aquí para oír las palabras.",        en: "Tap here to hear the words." }
  };
  /* Íconos para los botones de los trazos, que solo tenían texto */
  var ICONOS = { "b-demo": "👀", "b-borrar": "🧽", "b-papel": "📝", "b-siguiente": "➡️", "b-nombre": "✍️",
                 "b-pista": "❓", "b-otra-vez": "🧽", "b-figura": "➡️" };
  function dice(el) {
    if (DICE[el.id]) return DICE[el.id][idioma()];
    if (el.classList.contains("ficha-juego")) {            // tarjeta del menú: su nombre
      var n = el.querySelector(".nombre"); return n ? n.textContent.trim() : "";
    }
    return "";
  }

  /* ---------- Estilo del botón señalado ---------- */
  var st = document.createElement("style");
  st.textContent =
    ".lumi-senalado{position:relative;z-index:6;outline:none;border-color:#E8A317!important;" +
      "box-shadow:0 0 0 6px #FFC94D,0 0 26px 6px rgba(255,201,77,.85)!important;animation:lumiSenal .9s ease-in-out infinite}" +
    "@keyframes lumiSenal{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}" +
    "@media (prefers-reduced-motion: reduce){.lumi-senalado{animation:none}}" +
    "@media (forced-colors: active){.lumi-senalado{outline:4px solid Highlight!important}}" +
    ".lumi-ico{margin-right:.35em}";
  document.head.appendChild(st);

  /* ---------- Voz: Lumi no habla encima de la actividad ---------- */
  var ajenas = 0;                // cuántas veces habló la actividad
  var turno = 0;                 // cada recorrido nuevo invalida el anterior
  if (ss && ss.speak) {
    var hablarAntes = ss.speak.bind(ss);
    ss.speak = function (u) { if (!(u && u.__guia)) { ajenas++; limpiar(); } return hablarAntes(u); };
  }
  function limpiar() {
    Array.prototype.forEach.call(document.querySelectorAll(".lumi-senalado"), function (x) { x.classList.remove("lumi-senalado"); });
  }
  function decir(texto, despues) {
    if (!ss || !texto || typeof SpeechSynthesisUtterance === "undefined") { setTimeout(despues, 300); return; }
    try {
      var u = new SpeechSynthesisUtterance(texto);
      u.__guia = true;
      u.lang = idioma() === "es" ? "es-US" : "en-US";
      var v = ss.getVoices().filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf(idioma()) === 0; })[0];
      if (v) u.voice = v;
      u.rate = 0.9; u.pitch = 1.1;
      var hecho = false;
      var fin = function () { if (!hecho) { hecho = true; despues(); } };
      u.onend = fin; u.onerror = fin;
      ss.speak(u);
      setTimeout(fin, 1500 + texto.length * 85);   // seguro, por si el aparato no avisa
    } catch (e) { setTimeout(despues, 300); }
  }
  /* Recorrido: [{el, texto}] — cada paso con su botón iluminado */
  /* Si el botón está fuera de la pantalla, se baja hasta él; al terminar,
     la página vuelve a donde estaba (para no perder, p. ej., el punto de inicio del trazo) */
  function mostrarEl(el) {
    var r = el.getBoundingClientRect();
    if (r.top >= 0 && r.bottom <= window.innerHeight) return false;
    el.scrollIntoView({ block: "nearest", behavior: sinMovimiento() ? "auto" : "smooth" });
    return true;
  }
  function volverA(y) {
    if (y === null || Math.abs(window.scrollY - y) < 4) return;
    window.scrollTo({ top: y, behavior: sinMovimiento() ? "auto" : "smooth" });
  }
  function guia(pasos) {
    var mio = ++turno, ajenasAlEmpezar = ajenas, i = -1, yInicial = null;
    limpiar();
    function terminar() { limpiar(); if (mio === turno) volverA(yInicial); }
    function siguiente() {
      if (mio !== turno || ajenas !== ajenasAlEmpezar) { limpiar(); return; }
      limpiar(); i++;
      if (i >= pasos.length) return terminar();
      var p = pasos[i];
      if (!visible(p.el)) return siguiente();
      var y = window.scrollY;
      if (mostrarEl(p.el) && yInicial === null) yInicial = y;
      p.el.classList.add("lumi-senalado");
      var t0 = Date.now();
      decir(p.texto, function () {
        /* cada botón queda iluminado al menos un momento, aunque la voz esté apagada */
        setTimeout(siguiente, Math.max(0, 1300 - (Date.now() - t0)) + 200);
      });
    }
    siguiente();
  }
  /* Ilumina un botón un momento, sin hablar */
  function destello(el) {
    if (!visible(el)) return;
    el.classList.add("lumi-senalado");
    setTimeout(function () { el.classList.remove("lumi-senalado"); }, 2200);
  }
  /* Espera a que la actividad termine de hablar */
  function cuandoCalle(cb) {
    var quieto = 0, t = 0;
    var reloj = setInterval(function () {
      t += 150;
      if (!ss || (!ss.speaking && !ss.pending)) quieto += 150; else quieto = 0;
      if (quieto >= 450 || t > 20000) { clearInterval(reloj); cb(); }
    }, 150);
  }
  /* Las dos primeras veces se dice todo; después, solo un destello */
  var veces = {};
  function presentar(clave, ids, conDestello) {
    veces[clave] = (veces[clave] || 0) + 1;
    var els = ids.map(function (x) { return typeof x === "string" ? $(x) : x; }).filter(visible);
    if (!els.length) return;
    if (veces[clave] > 2) { if (conDestello) els.forEach(destello); return; }
    cuandoCalle(function () {
      guia(els.map(function (el) { return { el: el, texto: dice(el) }; }).filter(function (p) { return p.texto; }));
    });
  }

  /* ---------- Con ratón o teclado: al pasar por un botón, Lumi dice qué hace ---------- */
  var relojPaso = null;
  function alPasar(el) {
    var t = dice(el); if (!t) return;
    clearTimeout(relojPaso);
    relojPaso = setTimeout(function () { guia([{ el: el, texto: t }]); }, 300);
  }
  document.addEventListener("pointerover", function (e) {
    if (e.pointerType !== "mouse") return;
    var el = e.target.closest && e.target.closest("button");
    if (el && !el.contains(e.relatedTarget)) alPasar(el);
  });
  document.addEventListener("pointerout", function (e) {
    var el = e.target.closest && e.target.closest("button");
    if (el && !el.contains(e.relatedTarget)) clearTimeout(relojPaso);
  });
  /* Si el niño toca la pantalla (p. ej. empieza a trazar), Lumi deja de presentar
     y la página se queda donde está */
  document.addEventListener("pointerdown", function () {
    clearTimeout(relojPaso);
    if (document.querySelector(".lumi-senalado")) { turno++; limpiar(); }
  }, true);
  document.addEventListener("focusin", function (e) {
    var el = e.target;
    if (el && el.matches && el.matches("button:focus-visible")) alPasar(el);
  });

  /* ---------- Plantilla de juegos: portada, menú, juego, final ---------- */
  function plantillaJuegos() {
    var vistas = { "p-portada": 0, "p-menu": 0, "p-juego": 0, "p-final": 0 };
    function alMostrar(id) {
      if (id === "p-portada") presentar("portada", ["btn-empezar"], true);
      if (id === "p-menu") {
        var fichas = Array.prototype.slice.call(document.querySelectorAll("#rejilla-juegos .ficha-juego"));
        presentar("menu", fichas, false);
      }
      if (id === "p-juego") presentar("juego", ["btn-bocina", "btn-volver"], false);
      if (id === "p-final") presentar("final", ["btn-otra-vez", "btn-al-menu"], true);
    }
    Object.keys(vistas).forEach(function (id) {
      var sec = $(id); if (!sec) return;
      var antes = !sec.classList.contains("oculto");
      new MutationObserver(function () {
        var ahora = !sec.classList.contains("oculto");
        if (ahora && !antes) alMostrar(id);
        antes = ahora;
      }).observe(sec, { attributes: true, attributeFilter: ["class"] });
      if (antes) alMostrar(id);
    });
    /* «Siguiente» aparece después de cada acierto */
    var sig = $("btn-siguiente");
    if (sig) {
      var antesSig = visible(sig);
      new MutationObserver(function () {
        var ahora = !sig.classList.contains("oculto");
        if (ahora && !antesSig) presentar("siguiente", ["btn-siguiente"], true);
        antesSig = ahora;
      }).observe(sig, { attributes: true, attributeFilter: ["class"] });
    }
  }

  /* ---------- Plantilla de trazos (letras) ---------- */
  function plantillaTrazos() {
    Object.keys(ICONOS).forEach(function (id) {
      var b = $(id);
      if (!b || b.querySelector(".lumi-ico")) return;
      var s = document.createElement("span"); s.className = "lumi-ico"; s.setAttribute("aria-hidden", "true");
      s.textContent = ICONOS[id];
      b.insertBefore(s, b.firstChild);
    });
    /* Al llegar, después de la consigna, se presentan los botones de la actividad */
    presentar("trazos", ["b-voz", "b-demo", "b-borrar", "b-papel", "b-siguiente", "b-pista", "b-otra-vez", "b-figura", "b-escuchar"], false);
  }

  function iniciar() {
    if ($("rejilla-juegos")) plantillaJuegos();
    else if ($("b-demo") || $("b-pista") || $("b-escuchar")) plantillaTrazos();
  }
  window.LumiGuia = { guia: guia, presentar: presentar };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
