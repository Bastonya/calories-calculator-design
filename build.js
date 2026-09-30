#!/usr/bin/env node
/**
 * Builds the self-contained HTML deliverables from their templates.
 * Every "/* @inline <file> *\/" placeholder is replaced with the verbatim
 * contents of that file from 02-design-system/, so the published pages need
 * no local script or stylesheet requests. Run: node build.js
 */
const fs = require('fs'), path = require('path');
const DS = path.join(__dirname, '02-design-system');
const pages = [
  ['02-design-system/src/gallery.template.html', '02-design-system/gallery.html'],
  ['03-screens/src/screens.template.html', '03-screens/screens.html'],
];
for (const [src, out] of pages) {
  if (!fs.existsSync(src)) continue;
  let html = fs.readFileSync(src, 'utf8');
  html = html.replace(/[ \t]*\/\* @inline ([\w.-]+) \*\/\n?/g, (m, file) => fs.readFileSync(path.join(DS, file), 'utf8').trimEnd() + '\n');
  fs.writeFileSync(out, html);
  console.log('built', out, fs.statSync(out).size, 'bytes');
}
