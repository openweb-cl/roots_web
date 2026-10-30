(function () {
  "use strict";
  const R = window.ROOTS;
  const $ = (s, el = document) => el.querySelector(s);
  const clp = (n) => "$" + n.toLocaleString("es-CL");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Contacto y redes ---------- */
  const igUrl = `https://www.instagram.com/${R.contacto.instagram}/`;
  const hasWa = /^\d{8,15}$/.test(R.contacto.whatsapp || "");
  const waUrl = (text) => `https://wa.me/${R.contacto.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  const chatUrl = hasWa ? waUrl("¡Hola Roots Salinas! Quiero hacer una consulta") : `https://ig.me/m/${R.contacto.instagram}`;

  $("#footer-ig").href = igUrl;
  $("#ig-card").href = igUrl;
  if (hasWa) $("#footer-wa").href = waUrl();
  else $("#footer-wa-li").remove();
  $("#fab").href = chatUrl;
  $("#year").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = R.contacto[el.dataset.bind] || ""));

  /* ---------- Mapa ---------- */
  const q = encodeURIComponent(R.contacto.mapaQuery);
  $("#mapa").src = `https://maps.google.com/maps?q=${q}&z=13&output=embed`;
  $("#link-mapa").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  $("#link-waze").href = `https://waze.com/ul?q=${q}&navigate=yes`;

  /* ---------- Horarios y preguntas frecuentes ---------- */
  $("#horarios").innerHTML = R.horarios.map((h) => `<div><dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd></div>`).join("");
  $("#faq-list").innerHTML = R.faq.map((f) => `<details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join("");

  /* ---------- Carta (todas las categorías a la vista, como la impresa) ---------- */
  $("#carta-grid").innerHTML = R.carta
    .map(
      (cat) => `<section class="carta__panel">
        <h3><span class="carta__icon" aria-hidden="true">${cat.emoji}</span>${esc(cat.titulo)}</h3>
        <ul>${cat.items
          .map(
            (it) => `<li${it.destacado ? ' class="is-fav"' : ""}>
              <span class="carta__name">${esc(it.nombre)}${it.destacado ? ' <em class="carta__fav">¡favorito!</em>' : ""}</span>
              ${R.mostrarPrecios && it.precio ? `<span class="carta__price">${clp(it.precio)}</span>` : ""}
              ${it.detalle ? `<small>${esc(it.detalle)}</small>` : ""}
            </li>`
          )
          .join("")}</ul>
      </section>`
    )
    .join("");
  if (!R.mostrarPrecios) $(".carta__download").remove();

  /* ---------- Packs como tickets ---------- */
  $("#packs-grid").innerHTML = R.packs
    .map(
      (p) => `<article class="ticket">
        <div class="ticket__stub">
          <span class="ticket__icon" aria-hidden="true">${p.icono}</span>
          <span class="ticket__min">Desde<strong>${p.minimo}</strong>personas</span>
        </div>
        <div class="ticket__body">
          <h3>${esc(p.nombre)}</h3>
          <p class="ticket__for">${esc(p.para)}</p>
          <ul>${p.incluye.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
          <div class="ticket__foot">
            <p class="ticket__price">${
              R.mostrarValoresBase && p.valorBase
                ? `Desde <strong>${clp(p.valorBase)}</strong> por persona`
                : `<strong>Precio a consultar</strong>`
            }</p>
            <a href="#reservar" class="btn btn--dark btn--sm" data-pack="${p.id}">Cotizar este pack</a>
          </div>
        </div>
      </article>`
    )
    .join("");
  const selPack = $("#select-pack");
  R.packs.forEach((p) => selPack.insertAdjacentHTML("beforeend", `<option value="${p.id}">${esc(p.nombre)}</option>`));
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-pack]");
    if (a) selPack.value = a.dataset.pack;
  });

  /* ---------- Comanda (formulario de reserva) ---------- */
  const form = $("#form-reserva");
  const msg = $("#form-msg");
  form.fecha.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("is-touched");
      msg.textContent = "Faltan datos: completa organizador, tipo de grupo, personas y fecha.";
      form.querySelector(":invalid").focus();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const pack = R.packs.find((p) => p.id === d.pack);
    const fecha = new Date(d.fecha + "T12:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const texto = [
      "¡Hola Roots Salinas! Quiero cotizar una visita grupal:",
      `• Organizador: ${d.organizador}`,
      `• Tipo de grupo: ${d.tipo}`,
      `• Pack: ${pack ? pack.nombre : "Todavía no sé"}`,
      `• Personas: ${d.personas}`,
      `• Fecha: ${fecha}${d.hora ? " a las " + d.hora : ""}`,
      d.comentarios ? `• Comentarios: ${d.comentarios}` : "",
    ].filter(Boolean).join("\n");

    if (hasWa) {
      window.open(waUrl(texto), "_blank", "noopener");
      msg.textContent = "Se abrió WhatsApp con tu solicitud. Solo falta presionar enviar.";
    } else {
      try { await navigator.clipboard.writeText(texto); } catch (_) {}
      window.open(`https://ig.me/m/${R.contacto.instagram}`, "_blank", "noopener");
      msg.textContent = "Copiamos tu solicitud. Pégala en el chat de Instagram que se abrió y envíala.";
    }
  });

  /* ---------- Compartir con el grupo ---------- */
  $("#compartir").addEventListener("click", async () => {
    const data = { title: "Roots Salinas", text: "Mira este lugar para nuestra salida de grupo en Playa Las Salinas:", url: location.href.split("#")[0] };
    if (navigator.share) {
      try { await navigator.share(data); } catch (_) {}
    } else {
      window.open("https://wa.me/?text=" + encodeURIComponent(`${data.text} ${data.url}`), "_blank", "noopener");
    }
  });

  /* ---------- Navegación móvil ---------- */
  const toggle = $(".nav__toggle");
  const menu = $("#menu-principal");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
})();
