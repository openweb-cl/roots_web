# roots_web

Sitio web de **Roots Salinas** · Playa Las Salinas, Pullally, Papudo.
"El sabor que te atrapa".

🌐 **Sitio publicado:** https://openweb-cl.github.io/roots_web/

## Editar contenido

Casi todo se edita en un solo archivo: [`assets/js/config.js`](assets/js/config.js)

- `contacto.whatsapp` – número con código de país, solo dígitos (ej. `56912345678`).
- `horarios` – días y horas de atención.
- `mostrarPrecios` – `true` para mostrar precios en la carta.
- `mostrarValoresBase` – `true` para mostrar el valor base "desde $X" en los packs.
- `carta` – categorías y productos.
- `packs` – packs grupales (nombre, público, mínimo, qué incluye, valor base).

Textos de secciones fijas (historia, entorno) están en [`index.html`](index.html); estilos en
[`assets/css/styles.css`](assets/css/styles.css).

## Ver localmente

```bash
python3 -m http.server 8000
```

Luego abrir http://localhost:8000

## Publicación

Cada push a `main` (o a la rama de trabajo) se publica solo con GitHub Actions
(`.github/workflows/pages.yml`). Ver [PLAN.md](PLAN.md) para el plan completo y la configuración inicial.
