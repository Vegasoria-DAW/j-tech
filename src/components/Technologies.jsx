import { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { techRows } from '../data/technologies';

const CARD_SIZE = 132;
const GAP = 20;
const PITCH = CARD_SIZE + GAP;

function useRowCopies(rowLength) {
  const compute = () =>
    Math.max(1, Math.ceil((window.innerWidth + PITCH) / (rowLength * PITCH)));

  const [copies, setCopies] = useState(() =>
    typeof window === 'undefined' ? 1 : compute()
  );

  useEffect(() => {
    const onResize = () => setCopies(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [rowLength]);

  return copies;
}

function TechCard({ tech, hidden }) {
  const Icon = tech.icon;
  return (
    <div className="tech__card" aria-hidden={hidden || undefined}>
      <span className="tech__card-icon" aria-hidden="true">
        <Icon size={34} />
      </span>
      <span className="tech__card-label">{tech.name}</span>
    </div>
  );
}

function TechRow({ row, variant }) {
  const copies = useRowCopies(row.length);

  return (
    <div className={`tech__track tech__track--${variant}`}>
      {[0, 1].map((copyIndex) => (
        <div
          className="tech__copy"
          key={copyIndex}
          aria-hidden={copyIndex === 1 || undefined}
        >
          {Array.from({ length: copies }, (_, rep) =>
            row.map((tech) => (
              <TechCard
                key={`${rep}-${tech.id}`}
                tech={tech}
                hidden={copyIndex === 1 || rep > 0}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default function Technologies() {
  return (
    <section id="tecnologias" className="section technologies">
      <div className="container">
        <SectionHeading
          dark
          eyebrow="Tecnologías"
          title="Construimos con las herramientas que están marcando el futuro de la web."
          subtitle="Un stack moderno, rápido y mantenible para que tu proyecto crezca sin fricciones."
        />
      </div>

      <div className="tech__marquee">
        <div className="tech__row">
          <TechRow row={techRows[0]} variant="1" />
        </div>
        <div className="tech__row">
          <TechRow row={techRows[1]} variant="2" />
        </div>
      </div>
    </section>
  );
}
