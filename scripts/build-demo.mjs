// Monta a página de demonstração: injeta a URL do app, a URL do dashboard e um
// QR code (data-URI) no template demo/index.html, gerando demo-dist/index.html.
// Uso: node scripts/build-demo.mjs <APP_URL> [DASHBOARD_URL]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import QRCode from 'qrcode';

const APP_URL = process.argv[2] ?? process.env.APP_URL;
const DASHBOARD_URL = process.argv[3] ?? 'https://gilbertomojunior.github.io/UniDriveWeb/';

if (!APP_URL) {
  console.error('Faltou a APP_URL. Uso: node scripts/build-demo.mjs <APP_URL> [DASHBOARD_URL]');
  process.exit(1);
}

const qr = await QRCode.toDataURL(APP_URL, {
  width: 320,
  margin: 1,
  color: { dark: '#185FA5', light: '#FFFFFF' },
});

let html = await readFile(new URL('../demo/index.html', import.meta.url), 'utf8');
html = html
  .replaceAll('{{APP_URL}}', APP_URL)
  .replaceAll('{{DASHBOARD_URL}}', DASHBOARD_URL)
  .replace('{{QR}}', qr);

await mkdir(new URL('../demo-dist/', import.meta.url), { recursive: true });
await writeFile(new URL('../demo-dist/index.html', import.meta.url), html);
console.log(`demo-dist/index.html gerado (app: ${APP_URL})`);
