import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, 'output');
mkdirSync(outDir, { recursive: true });

const pages = [
  { name: 'home',      url: 'https://www.ninja-photographer.com/' },
  { name: 'fieldwork', url: 'https://www.ninja-photographer.com/fieldwork' },
  { name: 'collabs',   url: 'https://www.ninja-photographer.com/collabs' },
  { name: 'contact',   url: 'https://www.ninja-photographer.com/contact' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

const summary = {};
for (const p of pages) {
  const page = await ctx.newPage();
  console.log(`→ ${p.name}`);
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);

  // Scroll both axes to trigger lazy load
  await page.evaluate(async () => {
    await new Promise((done) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 800);
        document.scrollingElement.scrollLeft += 800;
        y += 800;
        if (y > 12000) { clearInterval(t); done(); }
      }, 200);
    });
  });
  await page.waitForTimeout(2000);

  // Pick the largest URL per image element
  const items = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map((el) => ({
      src: el.currentSrc || el.src,
      alt: el.alt || '',
      width: el.naturalWidth,
      height: el.naturalHeight,
      rectW: Math.round(el.getBoundingClientRect().width),
      rectH: Math.round(el.getBoundingClientRect().height),
    })).filter((x) => x.src && x.src.startsWith('http'));
  });

  const seen = new Set();
  const unique = [];
  for (const i of items) {
    // Format CDN URLs have a "uuid" near the end — dedupe by that.
    const m = i.src.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/g);
    const key = m ? m[m.length - 1] : i.src;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({ key, ...i });
  }

  summary[p.name] = { url: p.url, count: unique.length, images: unique };
  console.log(`  ${unique.length} unique images`);
  await page.close();
}

writeFileSync(resolve(outDir, 'images.json'), JSON.stringify(summary, null, 2));
await browser.close();
console.log('done');
