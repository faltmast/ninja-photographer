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
  console.log(`→ ${p.name}: ${p.url}`);
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500); // let lazy-loaded imagery settle

  // Scroll to bottom to trigger any lazy-load
  await page.evaluate(async () => {
    await new Promise((done) => {
      let y = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) { clearInterval(timer); done(); }
      }, 150);
    });
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const shot = resolve(outDir, `${p.name}.png`);
  await page.screenshot({ path: shot, fullPage: true });

  // Collect <img> srcs + any background-image urls
  const imgs = await page.evaluate(() => {
    const results = new Set();
    document.querySelectorAll('img').forEach((el) => {
      if (el.src) results.add(el.src);
      if (el.srcset) {
        el.srcset.split(',').forEach((s) => {
          const u = s.trim().split(' ')[0];
          if (u) results.add(u);
        });
      }
    });
    document.querySelectorAll('*').forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none') {
        const m = bg.match(/url\(["']?(.*?)["']?\)/);
        if (m && m[1]) results.add(m[1]);
      }
    });
    return [...results];
  });

  const title = await page.title();
  const innerText = await page.evaluate(() => document.body.innerText);

  summary[p.name] = { url: p.url, title, imageCount: imgs.length, images: imgs, text: innerText };
  writeFileSync(resolve(outDir, `${p.name}.txt`), innerText);
  console.log(`  saved screenshot + ${imgs.length} image urls`);

  await page.close();
}

writeFileSync(resolve(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
await browser.close();
console.log('done →', outDir);
