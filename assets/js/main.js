(function () {
  "use strict";
  const R = window.ROOTS;
  const $ = (s, el = document) => el.querySelector(s);
  const clp = (n) => "$" + n.toLocaleString("es-CL");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Contacto ---------- */
  const igUrl = `https://www.instagram.com/${R.contacto.instagram}/`;
  const hasWa = /^\d{8,15}$/.test(R.contacto.whatsapp || "");
  const waUrl = (text) => `https://wa.me/${R.contacto.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  const chatUrl = hasWa ? waUrl("¡Hola Roots Salinas! Quiero hacer una consulta 🙂") : `https://ig.me/m/${R.contacto.instagram}`;

  $("#footer-ig").href = igUrl;
  if (hasWa) $("#footer-wa").href = waUrl();
  else $("#footer-wa-li").remove();
  $("#fab").href = chatUrl;
  $("#year").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = R.contacto[el.dataset.bind] || ""));
  const q = encodeURIComponent(R.contacto.mapaQuery);
  $("#mapa").src = `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
  $("#link-mapa").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  $("#horarios").innerHTML = R.horarios.map((h) => `<div><dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd></div>`).join("");

  /* ---------- Carta con pestañas ---------- */
  const tabs = $("#carta-tabs");
  const panel = $("#carta-panel");
  function renderCategoria(cat) {
    panel.innerHTML = `<ul class="menu-list">${cat.items
      .map(
        (it) => `<li class="menu-item${it.destacado ? " menu-item--hot" : ""}">
          <div class="menu-item__info">
            <h3>${esc(it.nombre)}${it.destacado ? ' <span class="tag">Favorito</span>' : ""}</h3>
            ${it.detalle ? `<p>${esc(it.detalle)}</p>` : ""}
          </div>
          ${R.mostrarPrecios && it.precio ? `<span class="price">${clp(it.precio)}</span>` : ""}
        </li>`
      )
      .join("")}</ul>`;
    panel.setAttribute("aria-labelledby", "tab-" + cat.id);
  }
  tabs.innerHTML = R.carta
    .map((c, i) => `<button role="tab" id="tab-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-id="${c.id}"><span aria-hidden="true">${c.emoji}</span> ${esc(c.titulo)}</button>`)
    .join("");
  function select(btn) {
    tabs.querySelectorAll("[role=tab]").forEach((b) => {
      const on = b === btn;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
    });
    renderCategoria(R.carta.find((c) => c.id === btn.dataset.id));
  }
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("[role=tab]");
    if (b) select(b);
  });
  tabs.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const all = [...tabs.querySelectorAll("[role=tab]")];
    const i = all.indexOf(document.activeElement);
    const next = all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length];
    next.focus();
    select(next);
  });
  renderCategoria(R.carta[0]);
  if (!R.mostrarPrecios) $(".menu-download").remove();

  /* ---------- Packs ---------- */
  $("#packs-grid").innerHTML = R.packs
    .map(
      (p) => `<article class="pack pack--${p.color} reveal">
        <div class="pack__top"><span class="pack__icon" aria-hidden="true">${p.icono}</span><span class="pack__min">Desde ${p.minimo} personas</span></div>
        <h3>${esc(p.nombre)}</h3>
        <p class="pack__for">${esc(p.para)}</p>
        <ul>${p.incluye.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
        <div class="pack__price">${
          R.mostrarValoresBase && p.valorBase
            ? `<small>Valor base desde</small><strong>${clp(p.valorBase)}</strong> por persona`
            : `<strong>Precio a consultar</strong><small>Te enviamos una propuesta según tu grupo</small>`
        }</div>
        <a href="#reservar" class="btn btn--dark btn--block" data-pack="${p.id}">Cotizar este pack</a>
      </article>`
    )
    .join("");
  const selPack = $("#select-pack");
  R.packs.forEach((p) => selPack.insertAdjacentHTML("beforeend", `<option value="${p.id}">${esc(p.nombre)}</option>`));
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-pack]");
    if (a) selPack.value = a.dataset.pack;
  });

  /* ---------- Formulario de reserva ---------- */
  const form = $("#form-reserva");
  const msg = $("#form-msg");
  form.fecha.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("form--touched");
      msg.textContent = "Revisa los campos marcados con *.";
      form.querySelector(":invalid").focus();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const pack = R.packs.find((p) => p.id === d.pack);
    const fecha = new Date(d.fecha + "T12:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const texto = [
      "¡Hola Roots Salinas! 🌊 Quiero cotizar una visita grupal:",
      `• Organizador: ${d.organizador}`,
      `• Tipo de grupo: ${d.tipo}`,
      `• Pack: ${pack ? pack.nombre : "A medida / por definir"}`,
      `• Personas: ${d.personas}`,
      `• Fecha: ${fecha}${d.hora ? " a las " + d.hora : ""}`,
      d.comentarios ? `• Comentarios: ${d.comentarios}` : "",
    ].filter(Boolean).join("\n");

    if (hasWa) {
      window.open(waUrl(texto), "_blank", "noopener");
      msg.textContent = "¡Listo! Se abrió WhatsApp con tu solicitud. Solo presiona enviar.";
    } else {
      try { await navigator.clipboard.writeText(texto); } catch (_) {}
      window.open(`https://ig.me/m/${R.contacto.instagram}`, "_blank", "noopener");
      msg.textContent = "¡Listo! Copiamos tu solicitud: pégala en el chat de Instagram que se abrió y envíala.";
    }
  });

  /* ---------- Navegación móvil ---------- */
  const toggle = $(".nav__toggle");
  const menu = $("#menu-principal");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open);
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    }
  });
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("nav--solid", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Animaciones al hacer scroll ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
