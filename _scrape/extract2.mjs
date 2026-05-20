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
  deviceScaleFactor: 1,
});

// Track image responses at the network layer — catches everything Format loads
function setupNetworkCapture(page) {
  const seen = new Map(); // key -> url
  page.on('response', async (res) => {
    const url = res.url();
    if (!url.startsWith('https://format.creatorcdn.com/')) return;
    if (res.status() !== 200) return;
    const ct = res.headers()['content-type'] || '';
    if (!ct.startsWith('image/')) return;
    const m = url.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/g);
    const key = m ? m[m.length - 1] : url;
    if (!seen.has(key)) seen.set(key, url);
  });
  return seen;
}

const summary = {};
for (const p of pages) {
  const page = await ctx.newPage();
  console.log(`→ ${p.name}`);
  const seen = setupNetworkCapture(page);
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Exhaustive scroll — both axes, multiple passes, try keyboard arrows + page-down + wheel
  for (let pass = 0; pass < 3; pass++) {
    // Vertical
    await page.evaluate(async () => {
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
      const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 6000);
      for (let y = 0; y < max; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
    });
    await page.waitForTimeout(800);

    // Horizontal on every scrollable element
    await page.evaluate(async () => {
      const candidates = Array.from(document.querySelectorAll('*')).filter((el) => {
        const cs = getComputedStyle(el);
        return /auto|scroll/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 10;
      });
      for (const el of candidates) {
        for (let x = 0; x < el.scrollWidth; x += 400) {
          el.scrollLeft = x;
          await new Promise((r) => setTimeout(r, 80));
        }
      }
      // Also scroll window horizontally as a fallback
      const winMax = Math.max(document.documentElement.scrollWidth, 6000);
      for (let x = 0; x < winMax; x += 400) {
        window.scrollTo(x, window.scrollY);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    await page.waitForTimeout(800);

    // Try arrow keys + page down (Format may use keyboard navigation)
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(800);
  }

  // Final wait for any straggling network
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

  const images = Array.from(seen.entries()).map(([key, url]) => ({ key, url }));
  summary[p.name] = { url: p.url, count: images.length, images };
  console.log(`  ${images.length} unique images`);
  await page.close();
}

writeFileSync(resolve(outDir, 'images_full.json'), JSON.stringify(summary, null, 2));
await browser.close();
console.log('done');
