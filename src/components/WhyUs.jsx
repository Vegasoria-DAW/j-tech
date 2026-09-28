import { PiUser, PiPuzzlePiece, PiStack, PiTarget } from 'react-icons/pi';
import SectionHeading from './SectionHeading';
import Reveal, { edgeVariant } from './Reveal';

const advantages = [
  {
    icon: PiUser,
    title: 'Trato directo',
    text: 'Hablarás directamente con las personas que desarrollan tu proyecto.',
  },
  {
    icon: PiPuzzlePiece,
    title: 'Soluciones a medida',
    text: 'No creemos en soluciones idénticas para todos los negocios.',
  },
  {
    icon: PiStack,
    title: 'Todo en un mismo sitio',
    text: 'Web, Google, redes sociales y digitalización sin tener que coordinar diferentes proveedores.',
  },
  {
    icon: PiTarget,
    title: 'Pensado para conseguir clientes',
    text: 'No se trata solo de que tu negocio se vea bien. Queremos que tu presencia digital tenga un objetivo.',
  },
];

export default function WhyUs() {
  return (
    <section id="nosotros" className="section section--soft why-us">
      <div className="container">
        <SectionHeading
          eyebrow="Por qué nosotros"
          title="No solo hacemos webs. Entendemos tu negocio."
          subtitle="Gestionamos tu proyecto de forma muy personalizada. Eso significa trato cercano, comunicación clara y soluciones pensadas para tu negocio, no para una plantilla."
        />
        <div className="why-us__grid">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 80} variant={edgeVariant(index, advantages.length)}>
                <article className="advantage-card">
                  <div className="advantage-card__icon" aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <h3 className="advantage-card__title">{item.title}</h3>
                  <p className="advantage-card__text">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
