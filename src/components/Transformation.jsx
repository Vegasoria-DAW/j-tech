import { PiX, PiCheck, PiArrowRight } from 'react-icons/pi';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const before = [
  'Sin web',
  'Difícil de encontrar en Google',
  'Redes sociales desactualizadas',
  'Procesos manuales',
  'Pocas formas de contacto',
];

const after = [
  'Web profesional',
  'Presencia optimizada en Google',
  'Redes sociales profesionales',
  'Procesos digitalizados',
  'Más canales para captar clientes',
];

export default function Transformation() {
  return (
    <section id="transformacion" className="section section--soft transformation">
      <div className="container">
        <SectionHeading
          eyebrow="La transformación"
          title="De no tener presencia digital a tenerlo todo conectado."
          subtitle="Así cambia un negocio cuando su presencia online empieza a trabajar para él."
        />
        <div className="transformation__grid">
          <Reveal variant="left" className="transformation__card">
            <article className="compare-card compare-card--before">
              <header className="compare-card__header">
                <span className="compare-card__tag compare-card__tag--muted">Antes</span>
              </header>
              <ul className="compare-card__list">
                {before.map((item) => (
                  <li key={item}>
                    <span className="compare-card__icon compare-card__icon--x" aria-hidden="true">
                      <PiX size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div className="transformation__arrow" aria-hidden="true">
            <span className="transformation__arrow-icon">
              <PiArrowRight size={22} />
            </span>
          </div>

          <Reveal delay={120} variant="right" className="transformation__card">
            <article className="compare-card compare-card--after">
              <header className="compare-card__header">
                <span className="compare-card__tag compare-card__tag--primary">Después</span>
              </header>
              <ul className="compare-card__list">
                {after.map((item) => (
                  <li key={item}>
                    <span className="compare-card__icon compare-card__icon--check" aria-hidden="true">
                      <PiCheck size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
