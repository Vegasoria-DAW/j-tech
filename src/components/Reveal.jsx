import { useEffect, useRef, useState } from 'react';

/**
 * Envuelve contenido y lo anima al entrar en el viewport con efecto
 * "zoom-out": entra ligeramente ampliado (o desde los bordes) y se
 * asienta a su tamaño natural. Respeta prefers-reduced-motion.
 *
 * Variantes:
 * - "zoom" (defecto): escala 1.15 -> 1, centrado.
 * - "left": entra desde el borde izquierdo hacia dentro.
 * - "right": entra desde el borde derecho hacia dentro.
 * - "up": entra desde abajo con ligero zoom.
 */
export function edgeVariant(index, total) {
  if (total % 2 === 1 && index === Math.floor(total / 2)) return 'zoom';
  return index < total / 2 ? 'left' : 'right';
}

/**
 * Pausa base antes de arrancar la entrada: da margen para que el ojo
 * la perciba mientras se hace scroll, sin contar los delays escalonados.
 */
const ENTER_BASE_DELAY = 120;

export default function Reveal({ children, delay = 0, className = '', variant = 'zoom' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Dispara un poco antes de entrar en pantalla para que la
      // animación (ahora más lenta) se aprecie a mitad de recorrido.
      { threshold: 0.1, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${ENTER_BASE_DELAY + delay}ms` }}
    >
      {children}
    </div>
  );
}
