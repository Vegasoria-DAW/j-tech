import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import Reveal, { edgeVariant } from './Reveal';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="servicios" className="section services">
      <div className="container">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu negocio necesita para crecer online."
          subtitle="Nos encargamos de crear y mejorar tu presencia digital para que tú puedas centrarte en tu negocio."
        />
      </div>
      <div className="container services__grid">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 80} variant={edgeVariant(index, services.length)} className="services__item">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
