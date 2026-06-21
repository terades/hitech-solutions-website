# HI Tech Solutions Website

Statische Landingpage f&uuml;r sichere Auslieferung auf GitHub Pages, Netlify, Cloudflare Pages oder Vercel.

## Projektstruktur

- `index.html`
- `css/style.css`
- `js/app.js`
- `assets/logo-hi-tech-solutions.jpeg`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `_headers`
- `vercel.json`

## Sicherheits- und Hosting-Optimierungen

- Restriktive Content Security Policy direkt im HTML f&uuml;r Hosts ohne konfigurierbare Header.
- Zus&auml;tzliche Security-Header und Cache-Regeln in `_headers` f&uuml;r Netlify und Cloudflare Pages.
- Zus&auml;tzliche Security-Header und Cache-Regeln in `vercel.json` f&uuml;r Vercel.
- `robots.txt`, `sitemap.xml` und Canonical-URL f&uuml;r SEO und saubere Indexierung.
- `site.webmanifest` f&uuml;r bessere Installierbarkeit und Brand-Konsistenz.
- `defer`, Bildma&szlig;e und Reduced-Motion-Fallbacks f&uuml;r stabilere Auslieferung.

## Deployment

### GitHub Pages

1. Repository &ouml;ffnen.
2. `Settings` &rarr; `Pages`.
3. `Deploy from branch` ausw&auml;hlen.
4. Branch `main` und Ordner `/root` ausw&auml;hlen.

Hinweis: GitHub Pages setzt keine eigenen Security-Header aus `_headers` oder `vercel.json`. Daf&uuml;r greift die Meta-CSP in `index.html`. F&uuml;r volle Header-Kontrolle ist Netlify, Cloudflare Pages oder Vercel die bessere Wahl.

### Custom Domain

Geplante Domain:

- `hitech-solutions.eu`

### IONOS DNS f&uuml;r GitHub Pages

A-Records f&uuml;r Root-Domain:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

CNAME:

- Host: `www`
- Ziel: `terades.github.io`
