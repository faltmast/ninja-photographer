import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, 'output', 'local');
mkdirSync(outDir, { recursive: true });

const pages = ['/', '/fieldwork', '/collabs', '/contact'];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

let errors = 0;
for (const path of pages) {
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(`PAGE ERROR: ${e.message}`));

  const resp = await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const status = resp ? resp.status() : 0;
  const name = path === '/' ? 'home' : path.slice(1);
  const shot = resolve(outDir, `${name}.png`);
  await page.screenshot({ path: shot, fullPage: true });

  console.log(`${path}: HTTP ${status}, errors: ${consoleErrors.length}`);
  if (consoleErrors.length) {
    consoleErrors.slice(0, 5).forEach((e) => console.log(`    ! ${e.slice(0, 200)}`));
    errors += consoleErrors.length;
  }
  await page.close();
}

await browser.close();
process.exit(errors > 0 ? 1 : 0);
