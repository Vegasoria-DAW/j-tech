import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PiCalendarBlank, PiClock, PiArrowLeft } from 'react-icons/pi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnchorButton from '../components/AnchorButton';
import { posts } from '../data/blog';
import { site } from '../config/site';

function Block({ block }) {
  if (block.type === 'h2') {
    return <h2 className="post__h2">{block.text}</h2>;
  }
  if (block.type === 'lead') {
    return <p className="post__lead">{block.text}</p>;
  }
  if (block.type === 'list') {
    return (
      <ul className="post__list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="post__p">{block.text}</p>;
}

const SITE_URL = 'https://ejemplo.com';

/**
 * Helpers para gestionar las etiquetas <head> de cada artículo sin depender
 * de librerías externas. Todos devuelven una función de limpieza que deja el
 * documento como estaba antes de navegar a la ruta.
 */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  let created = false;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
    created = true;
  }
  const previous = el.getAttribute('content');
  el.setAttribute('content', content);
  return () => {
    if (created) el.remove();
    else if (previous !== null) el.setAttribute('content', previous);
    else el.removeAttribute('content');
  };
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  let created = false;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
    created = true;
  }
  const previous = el.getAttribute('href');
  el.setAttribute('href', href);
  return () => {
    if (created) el.remove();
    else if (previous !== null) el.setAttribute('href', previous);
    else el.removeAttribute('href');
  };
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  let created = false;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
    created = true;
  }
  const previous = el.textContent;
  el.textContent = JSON.stringify(data);
  return () => {
    if (created) el.remove();
    else el.textContent = previous;
  };
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return undefined;
    const previousTitle = document.title;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = `${SITE_URL}/og-image.png`;
    const title = `${post.title} | J-TECH`;

    document.title = title;

    const cleanups = [
      setMeta('name', 'description', post.excerpt),
      setCanonical(url),
      setMeta('property', 'og:type', 'article'),
      setMeta('property', 'og:url', url),
      setMeta('property', 'og:title', title),
      setMeta('property', 'og:description', post.excerpt),
      setMeta('property', 'og:image', image),
      setMeta('name', 'twitter:card', 'summary_large_image'),
      setMeta('name', 'twitter:title', title),
      setMeta('name', 'twitter:description', post.excerpt),
      setMeta('name', 'twitter:image', image),
      setJsonLd('post-jsonld', {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': url,
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'es-ES',
            articleSection: post.tag,
            image: [image],
            mainEntityOfPage: url,
            author: { '@type': 'Organization', name: 'J-TECH', url: SITE_URL },
            publisher: {
              '@type': 'Organization',
              name: 'J-TECH',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/#blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
          },
        ],
      }),
    ];

    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const Icon = post.icon;

  return (
    <>
      <Navbar />
      <main className="post">
        <article className="post__article">
          <div className="post__header">
            <Link to="/" className="post__back">
              <PiArrowLeft size={16} aria-hidden="true" />
              Volver al inicio
            </Link>
            <span className="post__tag">
              <Icon size={15} aria-hidden="true" />
              {post.tag}
            </span>
            <h1 className="post__title">{post.title}</h1>
            <div className="post__meta">
              <span>
                <PiCalendarBlank size={14} aria-hidden="true" />
                {post.dateLabel}
              </span>
              <span>
                <PiClock size={14} aria-hidden="true" />
                {post.readTime} de lectura
              </span>
              <span>
                {site.name} · Cádiz
              </span>
            </div>
          </div>

          <div className="post__content">
            {post.content.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          <div className="post__cta">
            <h3>¿Quieres que te ayudemos con esto?</h3>
            <p>Cuéntanos tu caso y te proponemos un plan a medida, sin compromiso.</p>
            <AnchorButton href="#contacto" label="Solicitar presupuesto" icon="pi pi-arrow-right" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
