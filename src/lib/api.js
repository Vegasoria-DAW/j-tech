/**
 * Punto único de integración para el envío del formulario de contacto.
 *
 * Envía el payload al backend PHP propio (/api/contact.php), que valida,
 * aplica antispam y entrega el correo por SMTP.
 * El componente ContactForm ya gestiona loading, éxito y error, así que
 * solo necesita que esta función resuelva o lance un error.
 *
 * VITE_API_URL permite apuntar a otro dominio; si está vacío se usa el
 * mismo origen (en desarrollo Vite lo redirige al PHP local vía proxy).
 */
const API_URL = import.meta.env.VITE_API_URL || '';

// Mensajes de reserva por si el servidor no devuelve un mensaje legible.
const STATUS_MESSAGES = {
  400: 'La solicitud no es válida. Recarga la página e inténtalo de nuevo.',
  403: 'No hemos podido verificar el origen de la solicitud.',
  405: 'No se pudo procesar la solicitud.',
  413: 'El contenido enviado es demasiado grande. Acorta el mensaje e inténtalo de nuevo.',
  422: 'Revisa los campos marcados del formulario.',
  429: 'Has enviado demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.',
  500: 'No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.',
};

/**
 * Error enriquecido con el estado HTTP y los campos inválidos que devuelve
 * el backend, para que el formulario pueda señalarlos en línea.
 */
export class ContactFormError extends Error {
  constructor(message, { status = 0, fields = [], offline = false } = {}) {
    super(message);
    this.name = 'ContactFormError';
    this.status = status;
    this.fields = Array.isArray(fields) ? fields : [];
    this.offline = offline;
  }
}

export async function submitContactForm(payload) {
  // El campo "service" llega como objeto {label, value}; lo aplanamos
  // a su etiqueta para que el correo se lea bien.
  const data = {
    ...payload,
    service:
      payload.service && typeof payload.service === 'object'
        ? payload.service.label || payload.service.value
        : payload.service,
  };

  let res;
  try {
    res = await fetch(`${API_URL}/api/contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch {
    // Falla de red: no hay conexión o el servidor no responde.
    throw new ContactFormError(
      'No hemos podido conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.',
      { offline: true }
    );
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    // Respuesta sin cuerpo JSON (p. ej. error de PHP); se usa el mensaje por defecto.
  }

  if (!res.ok || !body || body.ok !== true) {
    const serverMessage =
      body && typeof body.message === 'string' && body.message.trim() !== ''
        ? body.message
        : null;

    throw new ContactFormError(
      serverMessage || STATUS_MESSAGES[res.status] || 'No se pudo enviar el formulario. Inténtalo de nuevo en unos minutos.',
      {
        status: res.status,
        fields: body && body.fields,
      }
    );
  }

  return body;
}
