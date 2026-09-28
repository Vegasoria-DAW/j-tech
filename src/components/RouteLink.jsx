import { Link } from 'react-router-dom';

/**
 * Enlace interno de la web. Si el destino es un ancla de la portada
 * (p. ej. "#contacto"), navega a "/" dejando la ancla en la URL para que
 * el ScrollManager haga el desplazamiento. El resto de enlaces (externos
 * o absolutos) se renderiza como <a> normal.
 */
export default function RouteLink({ href, children, ...rest }) {
  if (href && href.startsWith('#')) {
    return (
      <Link to={`/${href}`} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
