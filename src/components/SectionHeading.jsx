import { Tag } from 'primereact/tag';
import Reveal from './Reveal';

/**
 * Encabezado estándar de sección: etiqueta, título y subtítulo.
 */
export default function SectionHeading({ eyebrow, title, subtitle, dark = false }) {
  return (
    <Reveal className={`section-heading${dark ? ' is-dark' : ''}`}>
      {eyebrow ? <Tag value={eyebrow} className="section-eyebrow" /> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </Reveal>
  );
}
