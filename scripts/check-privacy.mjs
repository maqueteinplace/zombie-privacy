import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const directory = path.dirname(fileURLToPath(import.meta.url));
const html = readFileSync(path.join(directory, '..', 'index.html'), 'utf8');
const workflow = readFileSync(path.join(directory, '..', '.github', 'workflows', 'pages.yml'), 'utf8');

for (const language of ['pt-BR', 'en']) {
  assert.match(html, new RegExp(`<section lang="${language}" data-policy="${language}"`));
  assert.match(html, new RegExp(`data-language="${language}"`));
}

for (const required of [
  'Capacitor Preferences',
  'SharedPreferences',
  'localStorage',
  'Android backup',
  'edicoes433@gmail.com',
  'github-general-privacy-statement',
]) {
  assert.ok(html.includes(required), `Política sem a informação obrigatória: ${required}`);
}

assert.doesNotMatch(html, /<script\b[^>]*\bsrc\s*=/i, 'A página não deve carregar scripts externos.');
assert.doesNotMatch(html, /<iframe\b/i, 'A página não deve incorporar conteúdo de terceiros.');
assert.doesNotMatch(html, /googletagmanager|google-analytics|hotjar|facebook pixel/i);
assert.match(workflow, /push:\s*\n\s*branches:\s*\n\s*- main\b/);
assert.doesNotMatch(workflow, /branches:\s*\n(?:\s*- (?!main\b)[\w/-]+\s*\n?)+/);
assert.match(workflow, /pages:\s*write/);
assert.match(workflow, /id-token:\s*write/);
assert.match(workflow, /actions\/deploy-pages@v4/);

process.stdout.write('Política bilíngue, declarações factuais e publicação Pages validadas.\n');
