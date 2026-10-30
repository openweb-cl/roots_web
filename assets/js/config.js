/* =========================================================================
   ROOTS SALINAS · DATOS EDITABLES DEL SITIO
   -------------------------------------------------------------------------
   Todo lo que cambia seguido (contacto, horarios, carta, packs) vive aquí.
   Edita este archivo, haz commit y el sitio se actualiza solo.
   ========================================================================= */

window.ROOTS = {
  contacto: {
    // Número de WhatsApp con código de país, solo dígitos. Ej: "56912345678".
    // Si queda vacío, las solicitudes se envían por mensaje directo de Instagram.
    whatsapp: "",
    instagram: "roots.salinas",
    direccion: "Playa Las Salinas, Pullally",
    comuna: "Comuna de Papudo, Región de Valparaíso",
    mapaQuery: "Playa Las Salinas, Pullally, Papudo, Chile",
  },

  // Horarios (texto libre). ⚠ CONFIRMAR antes de publicar.
  horarios: [
    { dias: "Temporada de verano", horas: "Todos los días, de 12:00 a 20:00" },
    { dias: "Resto del año", horas: "Fines de semana y festivos" },
    { dias: "Grupos", horas: "Atención con reserva previa, todo el año" },
  ],

  // Preguntas frecuentes. ⚠ CONFIRMAR las respuestas antes del lanzamiento.
  faq: [
    { p: "¿Necesito reservar?", r: "Para grupos sí: así tenemos el espacio y la comida lista cuando lleguen. Si vienes con tu familia o amigos, no hace falta." },
    { p: "¿Con cuánta anticipación cotizo un pack?", r: "Idealmente con una semana. Para grupos de más de 40 personas, con dos semanas." },
    { p: "¿Atienden fuera de temporada?", r: "Sí, los grupos con reserva se atienden todo el año. Escríbenos y coordinamos." },
    { p: "¿Pueden adaptar el menú?", r: "Sí. Cuéntanos en la comanda si hay personas vegetarianas, celíacas o con alguna alergia." },
    { p: "¿Cómo pago?", r: "Te contamos los medios de pago al confirmar la reserva." },
  ],

  // true = la carta muestra precios. false = solo nombres y descripciones
  // (también oculta el enlace a la imagen de la carta impresa, que tiene precios).
  mostrarPrecios: false,

  // true = cada pack muestra "Valor base desde $X por persona".
  // false = cada pack muestra "Precio a consultar".
  mostrarValoresBase: false,

  // Carta real (fuente: carta impresa Roots Salinas).
  carta: [
    {
      id: "churrascos",
      titulo: "Churrascos y Hamburguesas",
      emoji: "🥪",
      items: [
        { nombre: "Churrasco", detalle: "Italiano, luco, chacarero o brasileño + bebida", precio: 7800 },
        { nombre: "Hamburguesa", detalle: "Italiana, luco, chacarero o brasileña + bebida", precio: 7800 },
        { nombre: "Churrasco Salinero", detalle: "Merluza o reineta + bebida. ¡El de la casa!", precio: 8800, destacado: true },
      ],
    },
    {
      id: "completos",
      titulo: "Completos y As",
      emoji: "🌭",
      items: [
        { nombre: "Completo XL", detalle: "Italiano, completo o brasileño + bebida", precio: 4500 },
        { nombre: "As XL", detalle: "Italiano, completo o brasileño + bebida", precio: 5500 },
      ],
    },
    {
      id: "pizzas",
      titulo: "Pizzas y Fajitas",
      emoji: "🍕",
      items: [
        { nombre: "Fajita XL", detalle: "Carne o atún", precio: 6500 },
        { nombre: "Pizza individual", detalle: "", precio: 5000 },
        { nombre: "Pizza familiar", detalle: "Para compartir en la arena", precio: 9000 },
      ],
    },
    {
      id: "choclo",
      titulo: "Choclo y Empanadas",
      emoji: "🌽",
      items: [
        { nombre: "Choclo en vaso", detalle: "+ churrasco o mantequilla", precio: 4500 },
        { nombre: "Empanada", detalle: "Queso, camarón queso, atún o marisco", precio: 3500 },
      ],
    },
    {
      id: "papas",
      titulo: "Chorrillanas y Papas",
      emoji: "🍟",
      items: [
        { nombre: "Chorrillana familiar", detalle: "Para el grupo completo", precio: 14900, destacado: true },
        { nombre: "Papas grandes", detalle: "", precio: 7000 },
        { nombre: "Papas chicas", detalle: "", precio: 4000 },
        { nombre: "Salchipapa grande", detalle: "", precio: 8000 },
        { nombre: "Salchipapa chica", detalle: "", precio: 4500 },
        { nombre: "Cono de papas", detalle: "+ mechada o pollo", precio: 5000 },
        { nombre: "Buckets de pollo", detalle: "¡Próximamente!", precio: null },
      ],
    },
    {
      id: "dulces",
      titulo: "Helados y Churros",
      emoji: "🍦",
      items: [
        { nombre: "Helado simple", detalle: "", precio: 2500 },
        { nombre: "Helado doble", detalle: "", precio: 3500 },
        { nombre: "Helado triple", detalle: "", precio: 4500 },
        { nombre: "Churros docena", detalle: "12 unidades", precio: 7000, destacado: true },
        { nombre: "Churros media docena", detalle: "6 unidades", precio: 3500 },
        { nombre: "Churro relleno", detalle: "1 unidad", precio: 2000 },
        { nombre: "Sopaipillas", detalle: "Precio por unidad", precio: 500 },
      ],
    },
    {
      id: "bebestibles",
      titulo: "Bebestibles",
      emoji: "🥤",
      items: [
        { nombre: "Granizado", detalle: "", precio: 2500 },
        { nombre: "Jugo natural", detalle: "", precio: 2500 },
        { nombre: "Latas", detalle: "", precio: 2000 },
        { nombre: "Bebida 1,2 L", detalle: "", precio: 2500 },
        { nombre: "Bebida 2 L", detalle: "", precio: 3500 },
        { nombre: "Agua individual", detalle: "", precio: 1200 },
        { nombre: "Té", detalle: "", precio: 1000 },
        { nombre: "Café tradicional", detalle: "", precio: 1500 },
        { nombre: "Café de máquina", detalle: "", precio: 2000 },
        { nombre: "Red Bull", detalle: "", precio: 2500 },
        { nombre: "Score", detalle: "", precio: 2000 },
        { nombre: "Powerade o Gatorade", detalle: "", precio: 2500 },
      ],
    },
  ],

  /* Packs grupales.
     - "incluye": lo que recibe cada persona.
     - "precioCarta": valor aprox. por persona sumando la carta (referencia interna).
     - "valorBase": precio base por persona del pack. Solo se muestra si
       mostrarValoresBase = true. ⚠ Valores PROPUESTOS (~10% bajo carta): confirmar. */
  packs: [
    {
      id: "curso",
      nombre: "Pack Curso Playero",
      para: "Colegios, cursos y giras de estudio",
      icono: "mochila",
      minimo: 15,
      incluye: ["Completo XL italiano + bebida", "Helado simple", "Espacio reservado para el grupo"],
      precioCarta: 7000,
      valorBase: 6300,
    },
    {
      id: "mayor",
      nombre: "Pack Once Frente al Mar",
      para: "Clubes de adulto mayor",
      icono: "taza",
      minimo: 10,
      incluye: ["Empanada a elección", "Té o café tradicional", "Media docena de churros para compartir (cada 3 pers.)", "Mesas con sombra y acceso cómodo"],
      precioCarta: 6200,
      valorBase: 5500,
    },
    {
      id: "madres",
      nombre: "Pack Comunidad",
      para: "Centros de madres y juntas de vecinos",
      icono: "corazon",
      minimo: 12,
      incluye: ["Churrasco o hamburguesa + bebida", "Churro relleno", "Chorrillana familiar al centro (cada 6 pers.)"],
      precioCarta: 12300,
      valorBase: 10900,
    },
    {
      id: "deporte",
      nombre: "Pack Tercer Tiempo",
      para: "Clubes deportivos y equipos",
      icono: "pelota",
      minimo: 10,
      incluye: ["Churrasco Salinero + bebida", "Papas chicas", "Powerade o Gatorade"],
      precioCarta: 15300,
      valorBase: 13700,
    },
    {
      id: "familia",
      nombre: "Pack Celebración",
      para: "Cumpleaños, familias y amigos",
      icono: "torta",
      minimo: 8,
      incluye: ["Pizza familiar (cada 4 pers.)", "Bebida 2 L (cada 4 pers.)", "Churros docena (cada 4 pers.)"],
      precioCarta: 4900,
      valorBase: 4500,
    },
  ],
};
