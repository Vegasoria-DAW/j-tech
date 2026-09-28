// ============================================================
// Configuración central del sitio.
// Cambia aquí el nombre, textos, contacto y redes sociales
// sin tocar los componentes.
// ============================================================

export const site = {
  name: 'J-TECH (Portfolio)',
  shortDescription:
    'Ayudamos a negocios y autónomos a mejorar su presencia digital y conseguir más clientes.',
  email: 'hola@ejemplo.com',
  phone: '+34 600 000 000',
  phone2: '',
  location:
    'Base en Sevilla, España. Trabajo en remoto con clientes de todo el mundo.',
  social: {
    instagram: 'https://www.instagram.com/',
    whatsapp: 'https://wa.me/34600000000',
  },
};

export const whatsappLink = (phone) => `https://wa.me/${phone.replace(/\D/g, '')}`;

// Enlaces de navegación (en el mismo orden que aparecen las secciones)
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Cómo trabajamos', href: '#como-trabajamos' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Blog', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
];
