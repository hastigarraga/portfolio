import fs from 'node:fs';
import path from 'node:path';
const dist = 'dist/portfolio/browser';
fs.copyFileSync('src/robots.txt', path.join(dist, 'robots.txt'));
console.log('[seo] robots.txt copied');
