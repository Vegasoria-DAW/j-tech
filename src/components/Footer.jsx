import { useEffect, useState } from 'react';
import { PiLinkedinLogo, PiInstagramLogo, PiWhatsappLogo, PiEnvelope, PiMapPin, PiX } from 'react-icons/pi';
import { site, navLinks, whatsappLink } from '../config/site';
import { services } from '../data/services';
import RouteLink from './RouteLink';

const legalDocs = {
  privacy: {
    title: 'Política de privacidad',
    paragraphs: [
      `En ${site.name} nos tomamos en serio la protección de tu privacidad. Esta política describe qué datos recopilamos cuando visitas nuestra web o nos contactas, y con qué finalidad los utilizamos.`,
      'Cuando rellenas el formulario de contacto o nos escribes por email o WhatsApp, tratamos tus datos (nombre, email y teléfono) únicamente para responder a tu consulta y, si lo autorizas, para enviarte información sobre nuestros servicios.',
      `No cedemos tus datos a terceros ni los utilizamos con fines publicitarios sin tu consentimiento. Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiéndonos a ${site.email}.`,
      'Esta política puede actualizarse periódicamente. Te recomendamos revisarla de forma habitual para estar al día de cualquier cambio.',
    ],
  },
  legal: {
    title: 'Aviso legal',
    paragraphs: [
      `El presente sitio web es titularidad de ${site.name}, empresa dedicada a los servicios de marketing digital. El acceso y uso de esta web te atribuye la condición de usuario e implica la aceptación de las presentes condiciones de uso.`,
      'Todos los contenidos de esta web (textos, imágenes, logotipos, marcas y código) están protegidos por la propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa de su titular.',
      `${site.name} se reserva el derecho a modificar los servicios, precios y condiciones de esta web en cualquier momento. La información mostrada tiene carácter orientativo y no constituye una oferta contractual vinculante.`,
      `Para cualquier duda o reclamación relacionada con el uso de esta web, puedes ponerte en contacto con nosotros en ${site.email}.`,
    ],
  },
};

const socials = [
  // { label: 'LinkedIn', href: site.social.linkedin, icon: PiLinkedinLogo },
  { label: 'Instagram', href: site.social.instagram, icon: PiInstagramLogo },
  { label: 'WhatsApp', href: site.social.whatsapp, icon: PiWhatsappLogo },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [activeDoc, setActiveDoc] = useState(null);

  useEffect(() => {
    if (!activeDoc) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveDoc(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeDoc]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <RouteLink href="#inicio" className="footer__logo">
              <span className="footer__logo-mark" aria-hidden="true">
                <img src="/logo.png" alt="" />
              </span>
              {site.name}
            </RouteLink>
            <p className="footer__description">{site.shortDescription}</p>
            <div className="footer__social">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__col" aria-label="Enlaces del pie de página">
            <h3 className="footer__title">Navegación</h3>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <RouteLink href={link.href} className="footer__link">
                    {link.label}
                  </RouteLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__title">Servicios</h3>
            <ul className="footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <RouteLink href="#servicios" className="footer__link">
                    {service.title}
                  </RouteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Contacto</h3>
            <ul className="footer__list">
              <li>
                <a href={`mailto:${site.email}`} className="footer__link footer__link--inline">
                  <PiEnvelope size={16} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(site.phone)}
                  className="footer__link footer__link--inline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiWhatsappLogo size={16} aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(site.phone2)}
                  className="footer__link footer__link--inline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiWhatsappLogo size={16} aria-hidden="true" />
                  {site.phone2}
                </a>
              </li>
              <li className="footer__link footer__link--inline footer__link--static">
                <PiMapPin size={16} aria-hidden="true" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="footer__legal">
            <button type="button" className="footer__link" onClick={() => setActiveDoc(legalDocs.privacy)}>
              Política de privacidad
            </button>
            <button type="button" className="footer__link" onClick={() => setActiveDoc(legalDocs.legal)}>
              Aviso legal
            </button>
          </div>
        </div>
      </div>

      {activeDoc && (
        <div
          className="legal-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveDoc(null);
          }}
        >
          <div className="legal-modal__box">
            <div className="legal-modal__header">
              <h3 id="legal-modal-title">{activeDoc.title}</h3>
              <button type="button" className="legal-modal__close" aria-label="Cerrar" onClick={() => setActiveDoc(null)}>
                <PiX size={18} />
              </button>
            </div>
            <div className="legal-modal__body">
              {activeDoc.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
