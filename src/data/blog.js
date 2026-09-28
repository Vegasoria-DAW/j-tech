import { PiMapPin, PiCode, PiShare, PiGear, PiMagnifyingGlass, PiWrench } from 'react-icons/pi';

// Artículos del blog. Añade, quita o reordena artículos aquí.
// Cada artículo se publica en su propia ruta: /blog/{slug}
export const posts = [
  {
    slug: 'aparecer-en-google-maps-cadiz',
    icon: PiMapPin,
    tag: 'SEO local',
    title: 'Cómo hacer que tu negocio de Cádiz aparezca en Google',
    excerpt:
      'Si tu cliente busca "peluquería en Cádiz" o "taller mecánico en Villamartín" y no te encuentra, te está eligiendo a tu competencia. Esto es lo que de verdad importa.',
    dateLabel: '20 ago 2026',
    date: '2026-08-20',
    readTime: '4 min',
    content: [
      {
        type: 'lead',
        text: 'La mayoría de los negocios de Cádiz y provincia tienen un problema invisible: cuando alguien busca su servicio en Google, aparecen los de al lado. La buena noticia es que casi siempre no se debe a la suerte, sino a que faltan unos pocos detalles.',
      },
      {
        type: 'h2',
        text: 'Empieza por tu Perfil de Empresa de Google',
      },
      {
        type: 'p',
        text: 'El Perfil de Empresa (antes "Ficha de Google") es la tarjeta de tu negocio que aparece en el mapa de Google. Es gratis, y si está mal hecha o incompleta, Google no confía en ella. Revisa estos puntos:',
      },
      {
        type: 'list',
        items: [
          'Categoría principal bien elegida (la primera que leas a un cliente por teléfono).',
          'Dirección, teléfono y horario correctos y coherentes en todas tus redes.',
          'Fotografías reales del local, el producto o el servicio, no stock.',
          'Descripción con tus servicios y zona donde trabajas (Cádiz, Villamartín, Sanlúcar…).',
          'Respuestas a las preguntas de los clientes activadas.',
        ],
      },
      {
        type: 'h2',
        text: 'Las reseñas son tu mejor aliado local',
      },
      {
        type: 'p',
        text: 'En búsquedas locales, Google compara negocios por tres factores: relevancia, distancia y señales de popularidad. Las reseñas son la señal más clara de popularidad. No hace falta tener 50: diez reseñas reales y recientes te ponen por delante de muchos competidores con perfiles descuidados.',
      },
      {
        type: 'p',
        text: 'El truco no es pedir reseñas "cuando apetezca", sino pedirlas en el momento de máxima satisfacción: justo después de terminar el servicio, con un mensaje corto y un enlace directo. Y responder a todas, buenas y malas.',
      },
      {
        type: 'h2',
        text: 'Tu web también debe hablar de Cádiz',
      },
      {
        type: 'p',
        text: 'Google lee el contenido de tu web. Si nunca mencionas que trabajas en Cádiz o en tu municipio, es difícil que te asocie a esas búsquedas. Baste con que aparezcan de forma natural: "trabajamos con negocios de Cádiz y toda la provincia", "atendemos a clientes de Villamartín y alrededores". Sin forzar, sin repetir veinte veces.',
      },
      {
        type: 'h2',
        text: 'Paciencia y constancia',
      },
      {
        type: 'p',
        text: 'El SEO local no es un interruptor: se nota en semanas y se consolida en meses. Pero el esfuerzo inicial (perfil completo, reseñas, web coherente) es pequeño y lo hace cualquiera. La diferencia la marca quién se pone a hacerlo.',
      },
    ],
  },
  {
    slug: 'web-profesional-para-autonomos',
    icon: PiCode,
    tag: 'Web',
    title: 'Web profesional para autónomos: por qué sí y cómo empezar',
    excerpt:
      '¿Seguís atendiendo todo por WhatsApp e Instagram? Una web propia te da credibilidad, orden y un sitio al que mandar a cualquiera, sin depender de una red social.',
    dateLabel: '12 ago 2026',
    date: '2026-08-12',
    readTime: '3 min',
    content: [
      {
        type: 'lead',
        text: 'Pregunta rápida: si te piden tu web, ¿qué contestas? "Es que no tengo" es una respuesta que suena mucho más común de lo que parece entre autónomos y pequeños negocios de Cádiz. Y sin embargo, una web propia sigue siendo la base de la presencia digital de cualquier negocio.',
      },
      {
        type: 'h2',
        text: 'Qué gana un autónomo con una web propia',
      },
      {
        type: 'list',
        items: [
          'Credibilidad: una web cuidada vende antes que hablar diez minutos.',
          'Tiempo: responde a las preguntas repetidas (precios, horarios, zona) automáticamente.',
          'Canal estable: Instagram y Google pueden cambiar de reglas; tu web es tuya.',
          'SEO: es la única pieza donde controlas el contenido para posicionar en Google.',
          'Imagen: es lo primero que mira un cliente nuevo antes de llamarte.',
        ],
      },
      {
        type: 'h2',
        text: 'Lo mínimo que debe tener',
      },
      {
        type: 'p',
        text: 'No hace falta un portal con 30 páginas. Una web que funciona para un autónomo tiene: una página principal clara (qué haces, para quién, zona donde trabajas), un teléfono o WhatsApp muy visible, fotos reales, y una forma fácil de contactarte. Con eso ya estás por delante de la mayoría.',
      },
      {
        type: 'h2',
        text: 'Errores que vemos a menudo',
      },
      {
        type: 'list',
        items: [
          'Webs "vitrina" que no dicen por quién son (ni por quién no).',
          'Sin teléfono visible: el cliente tiene que buscarlo por toda la página.',
          'Fotos genéricas que no reflejan el trabajo real.',
          'Un dominio o un email que no coinciden con el nombre del negocio.',
        ],
      },
      {
        type: 'h2',
        text: 'Por dónde empezar esta semana',
      },
      {
        type: 'p',
        text: 'Escribe en una nota: tu nombre, qué haces, para quién lo haces, y cuál es el paso que quieres que dé el cliente tras leerte (llamar, WhatsApp, pedir presupuesto). Con esas cuatro líneas ya tienes el esqueleto de una web que vende. Después ya se pule el diseño.',
      },
    ],
  },
  {
    slug: 'redes-sociales-para-negocios-locales',
    icon: PiShare,
    tag: 'Redes sociales',
    title: 'Redes sociales para negocios locales: qué publicar y con qué frecuencia',
    excerpt:
      'No necesitas ser influencer ni publicar cada día. Para un negocio de Cádiz o de tu pueblo, tres publicaciones buenas a la semana superan a diez al azar.',
    dateLabel: '5 ago 2026',
    date: '2026-08-05',
    readTime: '3 min',
    content: [
      {
        type: 'lead',
        text: '"Publicamos cuando podemos". Es la frase más honesta (y más dañina) que escuchamos de negocios locales. No es un problema de esfuerzo, es un problema de estrategia: publicar sin criterio da menos resultados que publicar poco pero con sentido.',
      },
      {
        type: 'h2',
        text: 'Qué publica un negocio local que funciona',
      },
      {
        type: 'list',
        items: [
          'Trabajo real: el proceso, el antes y el después, el resultado.',
          'El "detrás de cámaras": equipo, local, proveedores de confianza.',
          'Clientes: testimonios, reseñas, casos (con permiso).',
          'Utilidad: un consejo corto del oficio, un error que conviene evitar.',
          'Localidad: eventos de Cádiz, de tu municipio, colaboraciones con negocios de la zona.',
        ],
      },
      {
        type: 'h2',
        text: 'Frecuencia realista',
      },
      {
        type: 'p',
        text: 'Para la mayoría de negocios pequeños, 2-3 publicaciones a la semana es el punto dulce. Mejor tres constantes que veinte seguidas y dos meses de silencio: los algoritmos premian la regularidad y los clientes recuerdan a quien ven a menudo.',
      },
      {
        type: 'h2',
        text: 'El error clásico del negocio local',
      },
      {
        type: 'p',
        text: 'Usar Instagram solo como tablero de anuncios: "hoy cerrado", "nuevo horario", "promo". Eso lo pone ya en el Perfil de Google. En redes, el contenido que conecta es el que muestra personas, proceso y contexto. La promo, de vez en cuando, funciona; la vida del negocio, siempre.',
      },
      {
        type: 'h2',
        text: 'Y la web, ¿qué tiene que ver?',
      },
      {
        type: 'p',
        text: 'Cada perfil de red social debería enlazar a tu web, no a una página muerta. Es tu embudo: te descubren en Instagram o en Google, te confían una web profesional, y te llaman. Sin ese paso intermedio, cada seguidor es una oportunidad que se pierde.',
      },
    ],
  },
  {
    slug: 'digitalizar-negocio-por-donde-empezar',
    icon: PiGear,
    tag: 'Digitalización',
    title: 'Digitalizar tu negocio: por dónde empezar si aún lo haces todo en papel',
    excerpt:
      'No hace falta cambiar el negocio entero de golpe. Empieza por el proceso que más tiempo te roba cada semana y digitaliza ese. El resto llegará.',
    dateLabel: '28 jul 2026',
    date: '2026-07-28',
    readTime: '4 min',
    content: [
      {
        type: 'lead',
        text: 'Cuando decimos "digitalizar el negocio", muchos imaginan un proyecto enorme: software nuevo, formación, un cambio radical. En la práctica, casi todos los negocios pequeños pueden dar un primer paso útil en una tarde, sin gastar mucho ni parar la actividad.',
      },
      {
        type: 'h2',
        text: 'El punto de partida: tu proceso más repetido',
      },
      {
        type: 'p',
        text: 'Piensa en lo que haces cada día que no aporta valor al cliente: apuntar pedidos en una libreta, teclear lo mismo en tres sitios, perseguir a proveedores por teléfono, recuperar facturas de una caja. Ahí es donde está el dinero perdido. Elige el más repetido y empezad por ahí.',
      },
      {
        type: 'h2',
        text: 'Casos típicos que resolvemos a menudo',
      },
      {
        type: 'list',
        items: [
          'Pedidos por WhatsApp sin orden: un formulario simple con resumen automático.',
          'Citas y recordatorios: un calendario compartido en lugar de una agenda de papel.',
          'Alta de clientes: una ficha única en vez de tres copias en tres sitios.',
          'Facturación: plantillas y recordatorios de pago en vez de perseguir.',
          'Stock básico: una hoja de control actualizada, aunque sea simple.',
        ],
      },
      {
        type: 'h2',
        text: 'Regla de oro: digitaliza primero, automatiza después',
      },
      {
        type: 'p',
        text: 'Automatizar un proceso roto solo hace que falle más rápido. Antes de meter software, pon de acuerdo a la gente en cómo debe ser el proceso. Si el proceso está claro, la herramienta se elige sola; si no, cualquier herramienta hereda el caos.',
      },
      {
        type: 'h2',
        text: 'Un primer paso realista',
      },
      {
        type: 'p',
        text: 'Esta semana: anota durante tres días cuánto tardáis en hacer vuestro proceso más repetido (un pedido, una cita, una factura). Ese número es vuestro punto de partida, y la mitad de lo que se gasta en "digitalización" suele ahorrarse con ordenar ese proceso antes de tocar ningún software.',
      },
    ],
  },
  {
    slug: 'por-que-tu-web-no-aparece-en-google',
    icon: PiMagnifyingGlass,
    tag: 'SEO',
    title: 'Por qué tu web no aparece en Google: 5 errores de SEO que casi nadie corrige',
    excerpt:
      'Tienes web, pero los clientes no llegan. Suele ser por cinco errores silenciosos: títulos vacíos, texto genérico, web lenta, cero datos locales y no medir nada. Si los corriges, se nota en semanas.',
    dateLabel: '15 jul 2026',
    date: '2026-07-15',
    readTime: '5 min',
    content: [
      {
        type: 'lead',
        text: '"He pagado una web y no me trae clientes". Es una de las frases más comunes que escuchamos de negocios de toda España. Y en casi todos los casos el problema no es la suerte ni "que Google no nos quiere", sino unos errores técnicos y de contenido que se repiten una y otra vez. Estos son los cinco que vemos más a menudo.',
      },
      {
        type: 'h2',
        text: '1. Tu web no le dice a Google qué es',
      },
      {
        type: 'p',
        text: 'Cada página tiene un "título" y una "descripción" que es lo que aparece en los resultados de búsqueda. Muchísimas webs las traen vacías o con el nombre del programa con el que se hicieron. Revisa cómo aparece tu web cuando buscas tu empresa en Google: si el titular es genérico o está duplicado en todas las páginas, estás regalando clics.',
      },
      {
        type: 'h2',
        text: '2. Texto genérico que podría ser de cualquier web',
      },
      {
        type: 'p',
        text: 'Google premia el contenido que responde a algo concreto. Frases como "soluciones de vanguardia para el sector" no le dicen nada. Funciona el texto específico: qué haces, para quién, en qué zona, con qué precios orientativos, qué te diferencia. No hace falta escribir novelas: dos o tres párrafos concretos por servicio superan a una página de relleno de mil palabras.',
      },
      {
        type: 'h2',
        text: '3. Una web lenta o rota en móvil',
      },
      {
        type: 'list',
        items: [
          'Más del 60% de las visitas a una web de negocio vienen de un móvil.',
          'Si tarda más de 3-4 segundos en cargar, la mitad de los visitantes ya se han ido.',
          'Google lo mide y lo usa como señal de calidad.',
          'Imágenes pesadas y plugins innecesarios son la causa típica.',
        ],
      },
      {
        type: 'h2',
        text: '4. No decir dónde estás ni a quién sirves',
      },
      {
        type: 'p',
        text: 'Si no mencionas tu ciudad ni tu zona de trabajo, Google no puede asociarte con búsquedas locales. Y si además tu Perfil de Empresa tiene datos distintos a los de la web (teléfono viejo, horario cambiado), Google duda de cuál es el bueno y a veces los ignora. Coherencia total: mismo nombre, mismo teléfono, mismo horario, en la web, en Google y en las redes.',
      },
      {
        type: 'h2',
        text: '5. No medir absolutamente nada',
      },
      {
        type: 'p',
        text: 'Sin Google Search Console no sabes qué busca la gente que llega, qué páginas te posicionan y dónde se te cae el tráfico. Es gratis, se configura en media hora y te dice la verdad sobre tu web cada semana. Quien no mide, no puede mejorar: se limita a adivinar.',
      },
      {
        type: 'h2',
        text: 'La parte buena',
      },
      {
        type: 'p',
        text: 'Ninguno de estos cinco errores es definitivo y todos se corrigen en días, no en meses. La diferencia entre una web que trae clientes y una que no suele estar precisamente en estos detalles "aburridos" que la mayoría de los negocios deja para después. Spoiler: después nunca llega.',
      },
    ],
  },
  {
    slug: 'mantenimiento-web-que-incluye',
    icon: PiWrench,
    tag: 'Mantenimiento',
    title: 'Mantenimiento de web: qué incluye y por qué tu web no está "terminada" al lanzarla',
    excerpt:
      'Una web sin mantenimiento es como un local sin limpiador: se nota en un mes. Formularios que dejan de funcionar, contenido desactualizado, velocidad a la baja. Esto es lo que deberías cubrir.',
    dateLabel: '8 jul 2026',
    date: '2026-07-08',
    readTime: '4 min',
    content: [
      {
        type: 'lead',
        text: 'Existe la idea de que una web es como una valla publicitaria: la instalas y ya está. No es así. Una web es un activo vivo: se desactualiza, se ralentiza y, si nadie la mira, acaba transmitiendo justo la imagen que no quieres dar de tu negocio.',
      },
      {
        type: 'h2',
        text: 'Qué pasa cuando una web se queda sin mantenimiento',
      },
      {
        type: 'list',
        items: [
          'El formulario deja de llegar emails y pierdes clientes sin enterarte.',
          'Teléfonos, horarios y precios desactualizados: el cliente llama y no le cogen.',
          'Se ralentiza mes a mes por plugins, imágenes y código que nadie revisa.',
          'Aparece contenido de 2023 cuando ya trabajas de otra forma.',
          'Si hay errores de seguridad, los detectas cuando ya hay un problema.',
        ],
      },
      {
        type: 'h2',
        text: 'Qué incluye un buen mantenimiento',
      },
      {
        type: 'list',
        items: [
          'Vigilancia del formulario y de los enlaces: que todo siga funcionando.',
          'Actualizaciones de seguridad del software que usa la web.',
          'Copias de seguridad periódicas comprobadas (no solo hechas).',
          'Cambios de contenido: textos, fotos, precios, servicios.',
          'Control de rendimiento: que siga cargando rápido.',
          'Un informe simple de visitas: qué páginas funcionan y cuáles no.',
        ],
      },
      {
        type: 'h2',
        text: '¿Cada cuánto hay que mirar la web?',
      },
      {
        type: 'p',
        text: 'Lo técnico (seguridad, copias, rendimiento) se vigila de forma continua o al menos mensual. El contenido, cuando cambia el negocio: nuevos servicios, temporada, precios. Un negocio activo no necesita cambios diarios, pero sí alguien que lo revise y lo toque cuando toca.',
      },
      {
        type: 'h2',
        text: '¿Y por qué no lo hago yo mismo?',
      },
      {
        type: 'p',
        text: 'Porque tu tiempo vale más que el mantenimiento. La hora que tardas en "ver qué le pasa a la web" es una hora que no estás atendiendo clientes. El mantenimiento es barato comparado con un día perdido o con un formulario que ha dejado de funcionar dos semanas. Es de esas inversiones pequeñas que se pagan solas la primera vez que evitan un problema.',
      },
    ],
  },
];
