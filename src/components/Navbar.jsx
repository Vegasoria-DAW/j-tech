import { useEffect, useState } from 'react';
import { PiRows, PiX, PiSun, PiMoon } from 'react-icons/pi';
import { site, navLinks } from '../config/site';
import AnchorButton from './AnchorButton';
import RouteLink from './RouteLink';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrada con el mismo zoom-out del resto de la web: las píldoras
  // convergen desde los bordes al cargar. Sin transitionDelay para no
  // interferir con las transiciones de scroll (is-scrolled).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true);
      return undefined;
    }
    const timer = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const closeMenu = () => setOpen(false);
  const enteredClass = entered ? ' is-visible' : '';

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container navbar__inner">
        <RouteLink href="#inicio" className={`navbar__brand reveal reveal--left${enteredClass}`} onClick={closeMenu} aria-label={`${site.name} - Inicio`}>
          <span className="navbar__logo">
            <img src="/logo.png" alt="" aria-hidden="true" />
          </span>
          <span className="navbar__wordmark">{site.name}</span>
        </RouteLink>

        <div className={`navbar__menu reveal reveal--right${enteredClass}`}>
          <nav className="navbar__links" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <RouteLink key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </RouteLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
              title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            >
              <PiSun size={18} className="theme-icon theme-icon--sun" aria-hidden="true" />
              <PiMoon size={18} className="theme-icon theme-icon--moon" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="navbar__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <PiX size={20} /> : <PiRows size={20} />}
            </button>
            <AnchorButton
              href="#contacto"
              label="Solicitar presupuesto"
              icon="pi pi-arrow-right"
              className="navbar__cta"
            />
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__mobile${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <nav aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <RouteLink key={link.href} href={link.href} className="navbar__mobile-link" onClick={closeMenu}>
              {link.label}
            </RouteLink>
          ))}
          <AnchorButton
            href="#contacto"
            label="Solicitar presupuesto"
            icon="pi pi-arrow-right"
            className="navbar__cta-mobile"
            onClick={closeMenu}
          />
        </nav>
      </div>
    </header>
  );
}
