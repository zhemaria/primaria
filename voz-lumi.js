/* ==================================================================
   Voz de Lumi · un solo botón «Voz sí / Voz no» para todo el portal
   ------------------------------------------------------------------
   - El niño (o el maestro) apaga la voz una vez y queda apagada en
     todas las páginas de Lumi, aunque pase de un juego a otro.
   - Con la voz apagada, Lumi no lee nada por su cuenta; solo lee
     cuando se toca una bocina 🔊 (o un botón de «escuchar»).
   - La primera vez se explica con un aviso dentro de la página.
   Uso: <script src="../voz-lumi.js"></script> dentro de <head>,
        antes de los demás scripts de la página.
   Si la página ya tiene su propio botón de sonido, se le pone el
   atributo data-voz-lumi y este archivo lo maneja.
   José M. Fernández · Licencia CC BY-NC-SA 4.0
   ================================================================== */
(function () {
  "use strict";
  if (window.LumiVoz) return;
  var ss = window.speechSynthesis;
  var CLAVE = "lumi-voz", CLAVE_AVISO = "lumi-voz-aviso";

  function guardado(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
  function guardar(clave, v) { try { localStorage.setItem(clave, v); } catch (e) {} }

  var activa = guardado(CLAVE) !== "no";

  var T = {
    es: { si: "🔊 Voz: sí", no: "🔇 Voz: no",
          ayudaSi: "La voz está encendida. Toca para apagarla.",
          ayudaNo: "La voz está apagada. Toca para encenderla.",
          aviso: "Lumi lee las instrucciones en voz alta. Si prefieres silencio, toca el botón «🔊 Voz: sí». " +
                 "Con la voz apagada, Lumi solo lee cuando tocas una bocina 🔊. El botón recuerda tu elección en todas las páginas.",
          ok: "Entendido" },
    en: { si: "🔊 Voice on", no: "🔇 Voice off",
          ayudaSi: "The voice is on. Tap to turn it off.",
          ayudaNo: "The voice is off. Tap to turn it on.",
          aviso: "Lumi reads the instructions out loud. If you want quiet, tap the «🔊 Voice on» button. " +
                 "With the voice off, Lumi only reads when you tap a speaker 🔊. Your choice is kept on every page.",
          ok: "Got it" }
  };
  function idioma() { return (document.documentElement.lang || "es").slice(0, 2) === "en" ? "en" : "es"; }

  /* ---------- Filtro de la voz ---------- */
  var ultimoToque = 0, permitidoHasta = 0;
  var RE_CLASE = /bocina|oir|leer|read|speak|listen|audio|escuch/i;
  var RE_ETIQUETA = /escuch|o[íi]r|hear|listen|read (it )?aloud|read to me|leer en voz|l[ée]elo/i;

  function esBocina(el) {
    if (!el || el.hasAttribute("data-voz-lumi")) return false;
    var txt = el.textContent || "";
    if (/🔊|🔉|🔈|🗣/.test(txt)) return true;
    if (RE_CLASE.test((el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "") ||
        RE_CLASE.test(el.id || "")) return true;
    return RE_ETIQUETA.test(el.getAttribute("aria-label") || "") || RE_ETIQUETA.test(el.getAttribute("title") || "");
  }
  function anotarToque(e) {
    var el = e.target && e.target.closest ? e.target.closest("button, a, [role=button], [tabindex]") : null;
    if (esBocina(el)) ultimoToque = Date.now();
  }
  document.addEventListener("pointerdown", anotarToque, true);
  document.addEventListener("click", anotarToque, true);
  document.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") anotarToque(e); }, true);


  /* ---------- Resaltado de lo que Lumi lee (DUA) ----------
     Cuando una página lee en voz alta, se busca en pantalla el texto que
     se está diciendo y se marca con la API de resaltado de CSS (no se
     toca el HTML de la página). Mientras suena, se marca la frase; en
     prekínder, kínder, 1.º y en las páginas de letras, también la palabra.
     Si el texto dicho no está en pantalla, no se marca nada.            */
  var hayResaltado = !!(window.CSS && CSS.highlights && window.Highlight);
  var palabraPorPalabra = /\/(prekinder|kindergarten|1er_grado|1st_grade|letras|letters)\//i.test(location.pathname);
  var tocadoUltimo = null;
  document.addEventListener("pointerdown", function (e) { tocadoUltimo = e.target; }, true);
  document.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") tocadoUltimo = e.target; }, true);
  var RE_TOKEN;
  try { RE_TOKEN = new RegExp("[\\p{L}\\p{N}]+", "gu"); } catch (x) { RE_TOKEN = /[A-Za-z0-9À-ɏ]+/g; }
  function fichas(texto) {             // palabras de un texto, en minúsculas y sin tildes, con su posición
    var out = [], m; RE_TOKEN.lastIndex = 0;
    while ((m = RE_TOKEN.exec(texto))) out.push({ t: m[0].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""), i: m.index, f: m.index + m[0].length });
    return out;
  }
  function fichasDePagina() {          // palabras visibles de la página, con el nodo de texto donde están
    var out = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var el = n.parentElement;
        if (!el || !n.nodeValue.trim() || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|OPTION)$/.test(el.tagName)) return NodeFilter.FILTER_REJECT;
        if (el.closest(".lumi-voz, .lumi-voz-aviso, [hidden]") || !el.getClientRects().length) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      } }), n;
    while ((n = w.nextNode())) fichas(n.nodeValue).forEach(function (f) { f.nodo = n; out.push(f); });
    return out;
  }
  function rango(pag, a, b) {          // incluye los signos pegados (¡¿ al principio; .!?, al final)
    var r = document.createRange(), A = pag[a], B = pag[b];
    var antes = A.nodo.nodeValue.slice(0, A.i).match(/[¡¿«"“(]*$/)[0].length;
    var despues = B.nodo.nodeValue.slice(B.f).match(/^[.!?…,;:»"”')]*/)[0].length;
    r.setStart(A.nodo, A.i - antes); r.setEnd(B.nodo, B.f + despues); return r;
  }
  function buscar(pag, seq) {          // dónde aparece en pantalla una sucesión de palabras
    var hallados = [];
    for (var k = 0; k + seq.length <= pag.length; k++) {
      var j = 0; while (j < seq.length && pag[k + j].t === seq[j].t) j++;
      if (j === seq.length) hallados.push(k);
    }
    if (!hallados.length) return -1;
    if (hallados.length === 1) return hallados[0];
    if (seq.length < 2) return -1;      // una sola palabra repetida en la página: mejor no adivinar
    var zona = tocadoUltimo && tocadoUltimo.closest ? tocadoUltimo.closest("section, article, li, .card, .tarjeta, .problem, .problema, fieldset, form, main") : null;
    var alto = window.innerHeight;
    var mejor = hallados.filter(function (k) { return zona && zona.contains(pag[k].nodo); })[0];
    if (mejor === undefined) mejor = hallados.filter(function (k) {
      var c = pag[k].nodo.parentElement.getBoundingClientRect(); return c.bottom > 0 && c.top < alto; })[0];
    return mejor === undefined ? hallados[0] : mejor;
  }
  function frasesDe(texto) {           // frases del texto dicho, cada una con sus palabras
    var out = [], re = /[^.!?…]+[.!?…]*/g, m;
    while ((m = re.exec(texto))) {
      var f = fichas(m[0]).map(function (x) { return { t: x.t, i: x.i + m.index, f: x.f + m.index }; });
      if (f.length) out.push(f);
    }
    return out;
  }
  function limpiarResaltado() { if (hayResaltado) { CSS.highlights.delete("lumi-lee"); CSS.highlights.delete("lumi-palabra"); } }
  function seguirLectura(u) {
    if (!hayResaltado || !u || !u.addEventListener || u.__lumiSigue) return;
    u.__lumiSigue = true;
    var trozos = null, propia = false; // trozos: [{palabras del texto dicho, dónde están en la página}]
    u.addEventListener("start", function () {
      limpiarResaltado();
      var pag = fichasDePagina(); trozos = [];
      frasesDe(u.text || "").forEach(function (seq) {
        var k = buscar(pag, seq); if (k >= 0) trozos.push({ seq: seq, k: k, r: rango(pag, k, k + seq.length - 1), pag: pag });
      });
      if (!trozos.length) return;
      /* Si la página ya marca por su cuenta lo que lee (clase .leyendo), no se duplica la marca */
      propia = !!document.querySelector(".leyendo");
      if (propia) return;
      /* todo lo que dice este trozo; si la voz avisa por palabras, se afina a la frase */
      CSS.highlights.set("lumi-lee", new Highlight(...trozos.map(function (tz) { return tz.r; })));
      var c = trozos[0].r.getBoundingClientRect();
      if (c.height && (c.top < 0 || c.bottom > window.innerHeight)) {
        var el = trozos[0].pag[trozos[0].k].nodo.parentElement;
        el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }
    });
    u.addEventListener("boundary", function (e) {
      if (!trozos || !trozos.length || e.name === "sentence") return;
      var c = e.charIndex;
      for (var n = 0; n < trozos.length; n++) {
        var tz = trozos[n], seq = tz.seq;
        if (c < seq[0].i || c >= seq[seq.length - 1].f + 3) continue;
        if (!propia) CSS.highlights.set("lumi-lee", new Highlight(tz.r));
        if (palabraPorPalabra) {
          for (var j = seq.length - 1; j >= 0; j--) if (seq[j].i <= c) {
            CSS.highlights.set("lumi-palabra", new Highlight(rango(tz.pag, tz.k + j, tz.k + j))); break; }
        }
        return;
      }
    });
    function fin() { limpiarResaltado(); trozos = null; }
    u.addEventListener("end", fin); u.addEventListener("error", fin);
  }
  if (hayResaltado) {
    var st0 = document.createElement("style");
    st0.textContent = "::highlight(lumi-lee){background-color:#FFF1A8;color:#1F1F1F}" +
      "::highlight(lumi-palabra){background-color:#FFC94D;color:#1F1F1F;text-decoration:underline 3px #7A4A00}" +
      "@media (forced-colors: active){::highlight(lumi-lee),::highlight(lumi-palabra){background-color:Highlight;color:HighlightText}}";
    (document.head || document.documentElement).appendChild(st0);
  }

  if (ss && ss.speak) {
    var hablarDeVerdad = ss.speak.bind(ss);
    ss.speak = function (u) {
      var ahora = Date.now();
      if (activa || ahora - ultimoToque < 1500 || ahora < permitidoHasta || ss.speaking || ss.pending) {
        if (!activa && u && u.addEventListener) {
          u.addEventListener("end", function () { permitidoHasta = Date.now() + 1500; });
        }
        seguirLectura(u);
        return hablarDeVerdad(u);
      }
      /* Voz apagada: no se habla, pero se avisa «terminé» para que el juego siga */
      setTimeout(function () {
        if (!u || !u.dispatchEvent) return;
        var ev;
        try { ev = new SpeechSynthesisEvent("end", { utterance: u }); } catch (x) { ev = new Event("end"); }
        try { u.dispatchEvent(ev); } catch (x) {}
      }, 250);
    };
    var callarDeVerdad = ss.cancel.bind(ss);
    ss.cancel = function () { limpiarResaltado(); return callarDeVerdad(); };
  }

  /* ---------- Botón ---------- */
  var botones = [];
  function pintarBoton(b) {
    var t = T[idioma()];
    b.textContent = activa ? t.si : t.no;
    b.setAttribute("aria-pressed", activa ? "true" : "false");
    b.title = activa ? t.ayudaSi : t.ayudaNo;
  }
  function cambiar() {
    activa = !activa;
    guardar(CLAVE, activa ? "si" : "no");
    guardar(CLAVE_AVISO, "visto");
    if (!activa && ss) ss.cancel();
    botones.forEach(pintarBoton);
    quitarAviso();
  }
  function nuevoBoton() {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "lumi-voz";
    b.setAttribute("data-voz-lumi", "");
    b.addEventListener("click", cambiar);
    botones.push(b);
    pintarBoton(b);
    return b;
  }

  var css = ".lumi-voz{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:4px 14px;border-radius:999px;" +
    "border:2px solid #194F5A;background:#fff;color:#194F5A;font:700 16px 'Andika','Trebuchet MS',system-ui,sans-serif;cursor:pointer;white-space:nowrap}" +
    ".lumi-voz[aria-pressed=false]{background:#194F5A;color:#fff}" +
    ".lumi-voz:focus-visible{outline:3px solid #194F5A;outline-offset:2px}" +
    ".lumi-voz-fijo{position:fixed;right:12px;bottom:12px;z-index:9999;box-shadow:0 2px 8px rgba(0,0,0,.25)}" +
    ".lumi-voz-aviso{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:10000;max-width:min(560px,calc(100% - 32px));" +
    "background:#FFFBEA;color:#2B2B2B;border:3px solid #194F5A;border-radius:16px;padding:14px 16px;box-shadow:0 4px 16px rgba(0,0,0,.25);" +
    "font:17px/1.45 'Andika','Trebuchet MS',system-ui,sans-serif;display:flex;gap:12px;align-items:flex-start}" +
    ".lumi-voz-aviso p{margin:0;flex:1}" +
    ".lumi-voz-aviso button{flex:none;min-height:44px;padding:6px 16px;border-radius:12px;border:2px solid #194F5A;background:#194F5A;color:#fff;font:inherit;font-weight:700;cursor:pointer}" +
    ".lumi-voz-aviso button:focus-visible{outline:3px solid #194F5A;outline-offset:2px}" +
    "@media print{.lumi-voz,.lumi-voz-aviso{display:none!important}}";

  /* Dónde va el botón: barra de Lumi › barra del juego › cabecera › esquina */
  function colocar() {
    if (document.querySelector("[data-voz-lumi]:not(.lumi-voz)")) return;
    var hueco = document.querySelector(".lumi-nav .ln-voz");
    if (hueco) {
      botones = botones.filter(function (b) {
        if (b.classList.contains("lumi-voz") && !b.closest(".lumi-nav")) { b.remove(); return false; }
        return true;
      });
      if (!hueco.firstChild) hueco.appendChild(nuevoBoton());
      return;
    }
    if (botones.some(function (b) { return document.body.contains(b) && !b.closest(".lumi-nav"); })) return;
    var b = nuevoBoton();
    var barra = document.querySelector(".barra, .topbar .wrap, header .wrap, header");
    if (barra) {
      var chip = barra.querySelector(":scope > .chip");
      if (chip) barra.insertBefore(b, chip); else barra.appendChild(b);
    } else {
      b.classList.add("lumi-voz-fijo");
      document.body.appendChild(b);
    }
  }

  var aviso = null;
  function quitarAviso() { if (aviso) { aviso.remove(); aviso = null; } }
  function mostrarAviso() {
    if (guardado(CLAVE_AVISO) === "visto" || !ss) return;
    var t = T[idioma()];
    aviso = document.createElement("div");
    aviso.className = "lumi-voz-aviso";
    aviso.setAttribute("role", "status");
    aviso.setAttribute("lang", idioma());
    var p = document.createElement("p"); p.textContent = t.aviso;
    var ok = document.createElement("button"); ok.type = "button"; ok.textContent = t.ok;
    ok.addEventListener("click", function () { guardar(CLAVE_AVISO, "visto"); quitarAviso(); });
    aviso.appendChild(p); aviso.appendChild(ok);
    document.body.appendChild(aviso);
  }

  function iniciar() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    /* Botón propio de la página (p. ej. Grow a Sentence) */
    Array.prototype.forEach.call(document.querySelectorAll("[data-voz-lumi]"), function (b) {
      if (botones.indexOf(b) >= 0) return;
      b.addEventListener("click", cambiar); botones.push(b); pintarBoton(b);
    });
    if (!botones.length) colocar();
    mostrarAviso();
    var ultimo = idioma();
    new MutationObserver(function () {
      if (idioma() === ultimo) return;
      ultimo = idioma(); botones.forEach(pintarBoton);
      if (aviso) { quitarAviso(); mostrarAviso(); }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  window.LumiVoz = {
    activa: function () { return activa; },
    colocar: function () { if (document.body) colocar(); }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(iniciar, 0); });
  } else { setTimeout(iniciar, 0); }
})();
