# Plan de implementación · Sitio web Roots Salinas

Landing page de una sola página para promocionar Roots Salinas (Playa Las Salinas, Pullally, Papudo)
y captar **grupos** mediante packs: colegios, clubes de adulto mayor, centros de madres, juntas de
vecinos, clubes deportivos y familias.

## Decisiones clave

| Tema | Decisión | Por qué |
|---|---|---|
| Tecnología | HTML + CSS + JS puro, sin framework ni build | Carga muy rápida en celular con señal de playa, cero mantenimiento, cualquier persona puede editarlo. |
| Hosting | GitHub Pages (gratis, HTTPS, CDN) | 200 visitas/semana es ~0,1% de su capacidad. Sin costos de servidor. |
| Reservas | Formulario que arma el mensaje y lo abre en **WhatsApp** (o Instagram si aún no hay número) | Sin backend ni base de datos; el pedido llega directo al celular del negocio. |
| Contenido editable | Todo en `assets/js/config.js` | Carta, packs, horarios y contacto se cambian sin tocar el diseño. |
| Precios | **Ocultos por ahora.** Carta sin precios, packs "Precio a consultar" | Interruptores `mostrarPrecios` y `mostrarValoresBase` en `config.js` para activarlos cuando se decida. |
| Estilo | **Kiosko de playa pintado a mano** con negro + amarillo oro de la marca | Para no parecer "otra página de restaurante": toldo a rayas, letreros de cartón a plumón, postal, polaroids, carta igual a la impresa, packs como tickets y formulario como comanda. |

**Tipografías:** Bowlby One (letrero pintado a mano), Permanent Marker (cartones escritos a plumón)
y Poppins (texto, igual a "SALINAS" del logo).

## Estructura del sitio

1. **Header fijo**: logo, menú y botón "Cotizar un grupo".
2. **Hero**: toldo a rayas, logo, "Entre dunas, río y mar", letreros de cartón y franja de playa ilustrada.
3. **Nuestras raíces**: una postal "Saludos desde Las Salinas" con historia y 3 valores.
4. **El lugar**: Santuario de la Naturaleza Humedal Salinas de Pullally y Dunas de Longotoma (677 ha,
   desembocadura de los ríos Petorca y La Ligua), cifras clave, 4 polaroids y "Cuidemos el santuario".
5. **Carta**: todas las categorías a la vista, con el estilo de la carta impresa (sin precios por ahora).
6. **Packs para grupos**: 5 tickets con "Precio a consultar" y botón "Cotizar este pack".
7. **Cotiza tu visita**: comanda (formulario) → WhatsApp/Instagram, 3 pasos y botón para compartir la página con el grupo.
8. **Cómo llegar**: rutas desde Santiago, Papudo y en bus; mapa; Google Maps y Waze; horarios; preguntas frecuentes.
9. **Instagram**: tarjeta para seguir @roots.salinas.
10. **Footer** con toldo y botón flotante "Escríbenos".

## Propuesta de packs (valores base guardados, no visibles)

Los valores base proponen ~10% bajo el precio de carta, como incentivo para grupos. Se activan con
`mostrarValoresBase: true`.

| Pack | Público | Mínimo | Incluye (por persona) | Valor carta aprox. | Valor base propuesto |
|---|---|---|---|---|---|
| Curso Playero | Colegios, cursos, giras | 15 | Completo XL + bebida, helado simple | $7.000 | $6.300 |
| Once Frente al Mar | Adulto mayor | 10 | Empanada, té o café, churros para compartir | $6.200 | $5.500 |
| Comunidad | Centros de madres, juntas de vecinos | 12 | Churrasco/hamburguesa + bebida, churro relleno, chorrillana al centro | $12.300 | $10.900 |
| Tercer Tiempo | Clubes deportivos | 10 | Churrasco Salinero + bebida, papas chicas, isotónica | $15.300 | $13.700 |
| Celebración | Cumpleaños, familias | 8 | Pizza familiar, bebida 2 L y churros docena (cada 4 pers.) | $4.900 | $4.500 |

## Fases

### Fase 1 · MVP publicado (✅ esta entrega)
- [x] v1 descartada por verse "típica"; v2 con concepto kiosko de playa
- [x] Rama de trabajo `claude/vibrant-goldberg-dozfks`
- [x] Sitio completo, responsive (celular primero), accesible y con animaciones suaves
- [x] Carta real cargada, packs, formulario a WhatsApp/Instagram, mapa
- [x] SEO básico: título, descripción, Open Graph (vista previa al compartir por WhatsApp), datos estructurados `Restaurant`
- [x] Despliegue automático a GitHub Pages en cada push

### Fase 2 · Datos reales (necesito tu info)
- [ ] Número de WhatsApp del negocio → `contacto.whatsapp`
- [ ] Horarios reales → `horarios`
- [ ] **Fotos reales**: local, platos, playa, dunas, río, grupos (reemplazan las ilustraciones de "El lugar")
- [ ] Confirmar contenido de cada pack y mínimos de personas
- [ ] Decidir si se publican valores base de packs y/o precios de carta
- [ ] Revisar textos de "Nuestras raíces"
- [ ] Confirmar respuestas de **preguntas frecuentes** (`faq` en `config.js`): anticipación, atención fuera de temporada, medios de pago
- [ ] Confirmar que se puede llegar en bus de grupo y dónde estacionar

### Fase 3 · Lanzamiento y venta
- [ ] Dominio propio (ej. `rootssalinas.cl`, ~$10.000 CLP/año en NIC Chile) apuntando a GitHub Pages
- [ ] Ficha de **Google Business Profile** enlazando al sitio (la mayor fuente de visitas para un local de playa)
- [ ] Link del sitio en la bio de Instagram
- [ ] Medición de visitas sin cookies (GoatCounter o Plausible) para saber cuántas personas llegan y cuántas cotizan
- [ ] QR en la carta impresa y en el local apuntando a la sección de packs

### Fase 4 · Mejoras opcionales
- [ ] Galería de fotos de grupos que ya vinieron (prueba social)
- [ ] Testimonios de clubes/colegios
- [ ] PDF descargable "Packs para grupos" para enviar a colegios e instituciones
- [ ] Versión en inglés para turistas

## Cómo ver los avances

Cada push a la rama de trabajo o a `main` publica el sitio automáticamente (GitHub Actions →
"Publicar en GitHub Pages"). URL: **https://cristobalrocosaavedra.github.io/roots_web/**

**Configuración única en GitHub** (la hace el dueño del repo):
1. *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.
2. *Settings → Environments → github-pages → Deployment branches:* agregar `claude/vibrant-goldberg-dozfks`
   (por defecto solo se permite `main`). Alternativa: hacer merge del PR a `main`.
3. Volver a ejecutar el workflow desde la pestaña *Actions* (o hacer cualquier push).

## Capacidad

GitHub Pages permite ~100 GB de transferencia al mes. El sitio pesa ~350 KB (sin fotos), es decir,
200 visitas/semana ≈ 0,3 GB/mes. Al agregar fotos, optimizarlas a ≤200 KB cada una (formato WebP o JPG).
