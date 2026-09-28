import SectionHeading from './SectionHeading';
import Reveal, { edgeVariant } from './Reveal';

const steps = [
  {
    number: '01',
    title: 'Hablamos',
    text: 'Conocemos tu negocio, tus objetivos y qué problemas quieres solucionar.',
  },
  {
    number: '02',
    title: 'Analizamos',
    text: 'Detectamos qué necesitas realmente y qué herramientas pueden ayudarte.',
  },
  {
    number: '03',
    title: 'Creamos',
    text: 'Diseñamos y desarrollamos la solución adaptada a tu negocio según tus indicaciones.',
  },
  {
    number: '04',
    title: 'Lanzamos y te acompañamos',
    text: 'Ponemos todo en marcha y seguimos disponibles para ayudarte.',
  },
];

export default function Process() {
  return (
    <section id="como-trabajamos" className="section process">
      <div className="container">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso claro, sin sorpresas."
          subtitle="Sabrás en todo momento en qué punto está tu proyecto y qué se está haciendo."
        />
        <ol className="process__steps">
          {steps.map((step, index) => (
            <li key={step.number} className="process__item">
              <Reveal delay={index * 100} variant={edgeVariant(index, steps.length)}>
                <div className="process__step">
                  <span className="process__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3 className="process__title">{step.title}</h3>
                  <p className="process__text">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
