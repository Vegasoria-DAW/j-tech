import { PiCode, PiShare, PiMapPin, PiGear, PiLifebuoy } from 'react-icons/pi';

// Datos de los servicios. Añade, quita o reordena servicios aquí.
export const services = [
  {
    id: 'web',
    icon: PiCode,
    title: 'Diseño y desarrollo web',
    description:
      'Webs profesionales, rápidas y adaptadas a móvil para presentar tus servicios, productos y facilitar que tus clientes contacten contigo.',
    features: [
      'Diseño personalizado',
      'Responsive',
      'Optimización SEO básica',
      'Formularios de contacto',
      'Integración con herramientas externas',
    ],
    cta: 'Quiero una web',
  },
  {
    id: 'redes',
    icon: PiShare,
    title: 'Redes sociales',
    description:
      'Te ayudamos a construir una presencia profesional en redes sociales y a mostrar tu negocio de forma atractiva.',
    features: [
      'Creación/configuración de perfiles',
      'Diseño de contenido',
      'Estrategia básica',
      'Optimización de perfiles',
      'Integración con la web',
    ],
    cta: 'Mejorar mis redes',
  },
  {
    id: 'google',
    icon: PiMapPin,
    title: 'Google / Perfil de Empresa',
    description:
      'Configuramos y optimizamos tu presencia en Google para que los clientes puedan encontrarte cuando busquen tus servicios.',
    features: [
      'Configuración del Perfil de Empresa',
      'Optimización de información',
      'Fotografías y categorías',
      'Horarios y contacto',
      'Orientación para conseguir reseñas',
    ],
    cta: 'Aparecer en Google',
  },
  {
    id: 'digitalizacion',
    icon: PiGear,
    title: 'Digitalización del negocio',
    description:
      'Analizamos cómo funciona tu negocio y buscamos procesos que puedan digitalizarse o automatizarse.',
    features: [
      'Formularios digitales',
      'Automatización de tareas',
      'Herramientas online',
      'Gestión de clientes',
      'Integraciones',
    ],
    cta: 'Digitalizar mi negocio',
  },
  {
    id: 'soporte',
    icon: PiLifebuoy,
    title: 'Mantenimiento y soporte',
    description:
      'Seguimos contigo después de lanzar tu proyecto para que todo continúe funcionando correctamente.',
    features: [
      'Actualizaciones',
      'Mantenimiento',
      'Soporte técnico',
      'Cambios de contenido',
      'Mejoras continuas',
    ],
    cta: 'Necesito soporte',
  },
];

// Opciones del selector de servicio del formulario de contacto
export const serviceOptions = [
  { label: 'Página web', value: 'web' },
  { label: 'Redes sociales', value: 'redes' },
  { label: 'Google / Perfil de Empresa', value: 'google' },
  { label: 'Digitalización', value: 'digitalizacion' },
  { label: 'Automatización', value: 'automatizacion' },
  { label: 'Mantenimiento', value: 'mantenimiento' },
  { label: 'Otro', value: 'otro' },
];
