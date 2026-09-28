import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './lib/toast';
import { navLinks } from './config/site';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

/**
 * Gestiona el scroll al cambiar de ruta:
 * - Con ancla (/#contacto): desplaza suavemente hasta la sección.
 * - Sin ancla: vuelve arriba del todo al instante (sin animación, para no
 *   ver cómo "sube toda la página" al entrar en un artículo).
 * Se incluye `key` en las dependencias para que volver a pulsar el mismo
 * enlace (misma ancla) vuelva a desplazarse.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }

    // Subir al inicio sin scroll suave: se anula temporalmente el
    // scroll-behavior del CSS para que el salto sea inmediato.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname, hash, key]);

  return null;
}

/**
 * Scroll spy: a medida que se baja por la home, actualiza el hash de la
 * URL con la sección visible. Usa replaceState para no ensuciar el
 * historial ni provocar desplazamientos.
 */
function ScrollSpy() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') return undefined;

    const ids = navLinks.map((link) => link.href.slice(1));
    let timer = 0;

    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let active = null;
      let best = -Infinity;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= line && element.offsetTop >= best) {
          best = element.offsetTop;
          active = id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) active = ids[ids.length - 1];

      if (active && window.location.hash.slice(1) !== active) {
        window.history.replaceState(null, '', `#${active}`);
      }
    };

    // Espera a que el scroll se detenga para no cambiar el hash a secciones
    // intermedias mientras se hace un desplazamiento suave.
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, 140);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollManager />
        <ScrollSpy />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
