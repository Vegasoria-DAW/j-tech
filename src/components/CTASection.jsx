import Reveal from './Reveal';
import AnchorButton from './AnchorButton';
import { site, whatsappLink } from '../config/site';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-section__card">
          <h2 className="cta-section__title">¿Tu negocio necesita dar el siguiente paso?</h2>
          <p className="cta-section__text">
            Cuéntanos qué haces y qué necesitas. Te diremos qué podemos mejorar y qué solución
            tendría más sentido para tu negocio.
          </p>
          <div className="cta-section__actions">
            <AnchorButton
              href={whatsappLink(site.phone)}
              label="Hablar con nosotros"
              icon="pi pi-whatsapp"
              className="cta-section__btn-primary"
              target="_blank"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
