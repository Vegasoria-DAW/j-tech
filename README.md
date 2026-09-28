# J-TECH — Versión Portfolio

Landing + blog de una agencia digital ficticia (versión sanitizada para portfolio).
Demo en producción: **https://j-tech.site** · Código original privado, esta copia elimina emails, teléfonos y credenciales reales.

Stack: **React 18 + Vite 5 + React Router + PrimeReact + PHP 8 (formulario) + CSS moderno**.

## Qué demuestra (para recruiters)

- SPA con rutas `/` y `/blog/:slug`, 404 real en slugs inexistentes
- Formulario con backend propio: validación, honeypot + trampa de tiempo + rate-limit por IP, envío SMTP con PHPMailer
- SEO: canonical, Open Graph, JSON-LD `ProfessionalService` + `BlogPosting`, sitemap + robots
- Tema claro/oscuro, accesibilidad y responsive
- Despliegue real en Apache (IONOS) + Vercel

## Ejecutar en local

```bash
npm install
cp .env.sample .env
npm run dev        # http://localhost:5173
```

Con formulario funcional:

```bash
cp public/api/config.sample.php public/api/config.php
# rellena smtp_user / smtp_pass / to / from en config.php (no se sube a git)
php -S localhost:8000 -t public
npm run dev
```

## Build

```bash
npm run build
npm run preview   # dist/ listo para Apache o Vercel
```

## Estructura

```
src/
├── components/   # Navbar, Hero, Services, Blog, FAQ, ContactForm...
├── config/site.js# único punto de contacto/redes (datos de ejemplo)
├── data/         # services, faq, blog, technologies
├── lib/api.js    # cliente del formulario
├── pages/        # Home, BlogPost
└── styles/
public/
├── api/          # contact.php + config.sample.php (plantilla, sin secretos)
├── .htaccess     # SPA + whitelist de slugs de blog
└── sitemap.xml / robots.txt (dominio de ejemplo)
```

## Qué se sanitizó respecto al original

- `src/config/site.js`: email/teléfonos/WhatsApp/Instagram → placeholders
- `index.html`: email/teléfono del JSON-LD → placeholders
- `public/api/config.sample.php`: usuarios y dominios → `ejemplo.com`
- `public/sitemap.xml`, `robots.txt`, `BlogPost.jsx`: dominio → `ejemplo.com`
- Excluido del portfolio: `videos/`, historial `.git`, `node_modules/`, `dist/`, `config.php` y `.env` reales (nunca existieron en git)

Autor: José Antonio Vega Soria — Sevilla · Remoto · English B2
LinkedIn: https://www.linkedin.com/in/josé-antonio-vega-soria-281736248/
