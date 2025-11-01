# Portfolio Angular 17 + Tailwind + Sass

## Requisitos
- Node 20.x (`.nvmrc` incluido)
- PNPM o NPM

## Instalación
```bash
nvm use
npm i
npm run start
```

## Build
```bash
npm run build
```

## SEO
- Metatags OG/Twitter dinámicos por ruta en `SeoService`.
- `robots.txt` y `sitemap.xml` en `src/`. Tras build, ejecutar:
  ```bash
  SITE_URL="https://tu-dominio" npm run generate:sitemap
  ```

## Agregar un proyecto en 5 pasos
1. Editá `src/app/data/portfolio.json` y agregá un objeto dentro de `projects`.
2. Debe tener `title`, `slug`, `summary`, `description[]`, `tech[]`.
3. Guardá. No toques rutas ni componentes.
4. Abrí `/projects` para verlo en la grilla.
5. Navegá a `/project/:slug` para el detalle.

## Deploy
### Vercel
- Conectá el repo y seleccioná framework *Other*.
- Comando build: `npm run build`.
- Output: `dist/portfolio/browser`.
- Variable opcional: `SITE_URL` para sitemap post-build.

### GitHub Pages
- Hacé build local y subí el contenido de `dist/portfolio/browser` a la rama `gh-pages`.
- Activá Pages desde la configuración, apuntando a `gh-pages`.

## Editar datos rápidos
- Perfil, skills, contacto: `src/app/data/portfolio.json`.
- Colores: `tailwind.config.js` y `src/styles.scss`.
- Avatar: componente `ui-avatar-uploader` guarda imagen en LocalStorage.
