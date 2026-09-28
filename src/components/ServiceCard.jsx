import { PiCheck } from 'react-icons/pi';
import AnchorButton from './AnchorButton';

export default function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="service-card">
      <div className="service-card__icon" aria-hidden="true">
        <Icon size={26} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__features">
        {service.features.map((feature) => (
          <li key={feature}>
            <PiCheck size={15} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <AnchorButton
        href="#contacto"
        label={service.cta}
        icon="pi pi-arrow-right"
        outlined
        className="service-card__cta"
      />
    </article>
  );
}
