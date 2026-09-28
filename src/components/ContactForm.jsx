import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useToast } from '../lib/toast';
import { PiCheckCircle } from 'react-icons/pi';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { submitContactForm, ContactFormError } from '../lib/api';
import { serviceOptions } from '../data/services';
import { site } from '../config/site';

const initialForm = {
  name: '',
  business: '',
  email: '',
  phone: '',
  service: null,
  message: '',
  website: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mensajes en línea para los campos que el backend marca como inválidos.
const SERVER_FIELD_MESSAGES = {
  name: 'Revisa el nombre.',
  business: 'El nombre de la empresa es demasiado largo.',
  email: 'Introduce un email válido.',
  phone: 'El teléfono no es válido o es demasiado largo.',
  service: 'Selecciona el servicio que te interesa.',
  message: 'Cuéntanos un poco más: entre 10 y 5000 caracteres.',
};

function serverFieldsToErrors(fields) {
  if (!Array.isArray(fields)) return {};
  return fields.reduce((acc, field) => {
    acc[field] = SERVER_FIELD_MESSAGES[field] || 'Revisa este campo.';
    return acc;
  }, {});
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  // Marca de tiempo para la trampa antispam del backend.
  const startedAtRef = useRef(Date.now());
  // Referencias a los campos para poder enfocar el primero con error.
  const fieldRefs = useRef({});

  const focusFirstError = (fields) => {
    const first = Array.isArray(fields) ? fields.find((field) => fieldRefs.current[field]) : null;
    if (!first) return;
    const target = fieldRefs.current[first];
    if (typeof target.focus === 'function') {
      target.focus();
    } else if (typeof target.getElement === 'function') {
      target.getElement()?.focus?.();
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Indícanos tu nombre.';
    if (!form.email.trim()) {
      next.email = 'Necesitamos un email para responderte.';
    } else if (!EMAIL_REGEX.test(form.email)) {
      next.email = 'Introduce un email válido.';
    }
    if (!form.service) next.service = 'Selecciona el servicio que te interesa.';
    const message = form.message.trim();
    if (!message) {
      next.message = 'Cuéntanos brevemente qué necesitas.';
    } else if (message.length < 10) {
      next.message = 'Escribe al menos 10 caracteres para poder ayudarte.';
    } else if (message.length > 5000) {
      next.message = 'El mensaje es demasiado largo (máximo 5000 caracteres).';
    }
    setErrors(next);
    const invalidFields = Object.keys(next);
    if (invalidFields.length > 0) {
      focusFirstError(invalidFields);
    }
    return invalidFields.length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (!validate()) {
      toast.show({
        severity: 'error',
        summary: 'Revisa el formulario',
        detail: 'Hay campos que faltan por completar o no son válidos.',
        life: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      await submitContactForm({ ...form, startedAt: startedAtRef.current });
      setSuccess(true);
      setForm(initialForm);
      setErrors({});
      startedAtRef.current = Date.now();
      toast.show({
        severity: 'success',
        summary: 'Solicitud enviada',
        detail: 'Gracias por escribirnos. Te responderemos muy pronto.',
        life: 6000,
      });
    } catch (error) {
      const isFormError = error instanceof ContactFormError;
      const serverFields = isFormError ? error.fields : [];
      const fieldErrors = serverFieldsToErrors(serverFields);
      const hasFieldErrors = Object.keys(fieldErrors).length > 0;

      if (hasFieldErrors) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        focusFirstError(serverFields);
      }

      let summary = 'No se pudo enviar';
      let detail = `Inténtalo de nuevo en unos minutos o escríbenos a ${site.email}.`;

      if (isFormError) {
        detail = error.message;
        if (error.offline) {
          summary = 'Sin conexión';
        } else if (error.status === 429) {
          summary = 'Demasiadas solicitudes';
        } else if (hasFieldErrors) {
          summary = 'Revisa el formulario';
        }
      }

      toast.show({ severity: 'error', summary, detail, life: 7000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="section section--soft contact">
      <div className="container container--narrow">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu negocio."
          subtitle="Cuéntanos qué necesitas y te diremos cómo podemos ayudarte. Sin compromiso."
        />

        <Reveal>
          {success ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">
                <PiCheckCircle size={40} />
              </span>
              <h3 className="contact__success-title">¡Solicitud enviada!</h3>
              <p className="contact__success-text">
                Gracias por escribirnos. Te responderemos para conocer tu proyecto y valorar
                contigo la mejor opción.
              </p>
              <Button
                label="Enviar otra solicitud"
                severity="secondary"
                outlined
                onClick={() => setSuccess(false)}
              />
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              {/* Trampa antispam: invisible para personas, rellenada por bots. */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website">No rellenar este campo</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange('website')}
                />
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-name">
                    Nombre *
                  </label>
                  <InputText
                    id="contact-name"
                    name="name"
                    ref={(el) => (fieldRefs.current.name = el)}
                    type="text"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange('name')}
                    invalid={Boolean(errors.name)}
                    aria-invalid={Boolean(errors.name)}
                    required
                  />
                  {errors.name ? <span className="contact__error">{errors.name}</span> : null}
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-business">
                    Empresa / negocio
                  </label>
                  <InputText
                    id="contact-business"
                    name="business"
                    ref={(el) => (fieldRefs.current.business = el)}
                    type="text"
                    placeholder="Nombre de tu negocio"
                    value={form.business}
                    onChange={handleChange('business')}
                  />
                </div>
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-email">
                    Email *
                  </label>
                  <InputText
                    id="contact-email"
                    name="email"
                    ref={(el) => (fieldRefs.current.email = el)}
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    invalid={Boolean(errors.email)}
                    aria-invalid={Boolean(errors.email)}
                    required
                  />
                  {errors.email ? <span className="contact__error">{errors.email}</span> : null}
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-phone">
                    Teléfono
                  </label>
                  <InputText
                    id="contact-phone"
                    name="phone"
                    ref={(el) => (fieldRefs.current.phone = el)}
                    type="tel"
                    placeholder="Tu teléfono"
                    value={form.phone}
                    onChange={handleChange('phone')}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-service">
                  Servicio que te interesa *
                </label>
                <Dropdown
                  inputId="contact-service"
                  name="service"
                  ref={(el) => (fieldRefs.current.service = el)}
                  options={serviceOptions}
                  optionLabel="label"
                  placeholder="Selecciona un servicio"
                  value={form.service}
                  onChange={handleChange('service')}
                  invalid={Boolean(errors.service)}
                  aria-invalid={Boolean(errors.service)}
                  required
                />
                {errors.service ? (
                  <span className="contact__error">{errors.service}</span>
                ) : null}
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-message">
                  Cuéntanos qué necesitas *
                </label>
                <InputTextarea
                  id="contact-message"
                  name="message"
                  ref={(el) => (fieldRefs.current.message = el)}
                  rows={5}
                  placeholder="Ej.: tengo una panadería y quiero una web para que la gente pueda ver el catálogo y pedirme información."
                  value={form.message}
                  onChange={handleChange('message')}
                  invalid={Boolean(errors.message)}
                  aria-invalid={Boolean(errors.message)}
                  required
                />
                {errors.message ? (
                  <span className="contact__error">{errors.message}</span>
                ) : null}
              </div>

              <div className="contact__footer">
                <Button
                  type="submit"
                  label="Enviar solicitud"
                  icon="pi pi-send"
                  loading={loading}
                  className="contact__submit"
                />
                <p className="contact__note">
                  Te responderemos para conocer tu proyecto y valorar contigo la mejor opción.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
