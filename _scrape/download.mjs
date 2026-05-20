import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const manifest = JSON.parse(readFileSync(resolve(here, 'output', 'downloads.json'), 'utf8'));

console.log(`downloading ${manifest.length} files...`);

let done = 0, skipped = 0, failed = 0;
const failures = [];

await Promise.all(manifest.map(async ({ url, path }) => {
  const outPath = resolve(projectRoot, path);
  if (existsSync(outPath)) {
    skipped++;
    return;
  }
  mkdirSync(dirname(outPath), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buf);
    done++;
    console.log(`  ✓ ${path} (${(buf.length/1024).toFixed(0)}kb)`);
  } catch (e) {
    failed++;
    failures.push({ path, error: e.message });
    console.log(`  ✗ ${path}: ${e.message}`);
  }
}));

console.log(`\ndone: ${done} downloaded, ${skipped} skipped, ${failed} failed`);
if (failed) {
  writeFileSync(resolve(here, 'output', 'download_failures.json'), JSON.stringify(failures, null, 2));
  process.exit(1);
}
