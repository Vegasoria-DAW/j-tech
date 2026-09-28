import { classNames } from 'primereact/utils';
import RouteLink from './RouteLink';

/**
 * El Button de PrimeReact (v10) no soporta `as="a"`: siempre renderiza un
 * <button>. Este componente renderiza un enlace real con la misma estructura
 * y clases internas que el Button, de modo que hereda exactamente los
 * mismos estilos definidos en global.css. Los destinos con ancla interna
 * (p. ej. "#contacto") navegan con el router para que funcionen desde
 * cualquier ruta.
 */
export default function AnchorButton({
  href,
  label,
  icon,
  outlined = false,
  severity = 'primary',
  size,
  className = '',
  onClick,
  target,
  'aria-label': ariaLabel,
}) {
  const rootClass = classNames(
    'p-button',
    'p-component',
    `p-button-${severity}`,
    {
      'p-button-outlined': outlined,
      'p-button-lg': size === 'large',
      'p-button-sm': size === 'small',
    },
    className
  );

  return (
    <RouteLink
      href={href}
      className={rootClass}
      onClick={onClick}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel || label}
    >
      {icon ? (
        <span className={`p-button-icon p-button-icon-left ${icon}`} aria-hidden="true" />
      ) : null}
      {label ? <span className="p-button-label">{label}</span> : null}
    </RouteLink>
  );
}
