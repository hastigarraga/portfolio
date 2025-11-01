import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve('dist', 'portfolio', 'browser');
const dataPath = path.resolve('src', 'app', 'data', 'portfolio.json');

const SITE_URL = process.env.SITE_URL || 'https://example.com';

const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const urls = [
  '/',
  '/projects',
  '/about',
  '/contact',
  ...raw.projects.map(p => `/projects/${p.slug}`)
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u}</loc>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generado en', distDir);
