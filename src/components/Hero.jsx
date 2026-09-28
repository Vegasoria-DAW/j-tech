import { useLayoutEffect, useRef } from 'react';
import AnchorButton from './AnchorButton';
import Reveal from './Reveal';

// Webs independientes con estructuras distintas para el carrusel 3D.
const MOCKUPS = [
  { url: 'tunegocio.es', variant: 'landing' },
  { url: 'tucrm.es', variant: 'crm' },
  { url: 'tutienda.es', variant: 'tienda' },
  { url: 'tuagenda.es', variant: 'agenda' },
  { url: 'turestaurante.es', variant: 'reserva' },
];

// Velocidad: cuanto más alto, más lento (ms que tarda una vuelta completa).
const ORBIT_MS = 14000;
// Píxeles de arrastre para completar una vuelta.
const DRAG_PX = 620;

function MockupContent({ variant }) {
  if (variant === 'crm') {
    return (
      <div className="mockup__app">
        <aside className="mockup__sidebar">
          <span className="mockup__logo" />
          <span className="mockup__navitem is-active" />
          <span className="mockup__navitem" />
          <span className="mockup__navitem" />
          <span className="mockup__navitem" />
        </aside>
        <div className="mockup__main">
          <div className="mockup__topbar">
            <span className="mockup__line w-50" />
            <span className="mockup__avatar" />
          </div>
          <div className="mockup__kpis">
            {[0, 1, 2].map((kpi) => (
              <div className="mockup__kpi" key={kpi}>
                <span className="mockup__kpi-value" />
                <span className="mockup__line w-80 is-muted" />
              </div>
            ))}
          </div>
          <div className="mockup__chart">
            {[42, 70, 55, 88, 64, 96, 74].map((height, bar) => (
              <span
                className={`mockup__chartbar${bar % 3 === 1 ? ' is-muted' : ''}`}
                key={bar}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'agenda') {
    return (
      <>
        <div className="mockup__nav">
          <span className="mockup__logo" />
          <span className="mockup__navline" />
          <span className="mockup__navline is-short" />
          <span className="mockup__navline is-short" />
          <span className="mockup__cta" />
        </div>

        <div className="mockup__calendar">
          {Array.from({ length: 21 }, (_, cell) => (
            <span className={`mockup__cell${cell === 9 || cell === 16 ? ' is-active' : ''}`} key={cell} />
          ))}
        </div>
      </>
    );
  }

  if (variant === 'tienda') {
    return (
      <>
        <div className="mockup__nav">
          <span className="mockup__logo" />
          <span className="mockup__navline" />
          <span className="mockup__navline is-short" />
          <span className="mockup__navline is-short" />
          <span className="mockup__cta" />
        </div>

        <span className="mockup__line w-70" />
        <span className="mockup__line w-50 is-muted" />

        <div className="mockup__grid">
          {[0, 1, 2, 3].map((tile) => (
            <div className="mockup__tile" key={tile}>
              <span className="mockup__thumb" />
              <span className="mockup__line w-80 is-muted" />
              <span className="mockup__line w-50 is-muted" />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (variant === 'reserva') {
    return (
      <>
        <div className="mockup__nav">
          <span className="mockup__logo" />
          <span className="mockup__navline" />
          <span className="mockup__navline is-short" />
          <span className="mockup__cta" />
        </div>

        <div className="mockup__split">
          <span className="mockup__media" />
          <div className="mockup__col">
            <span className="mockup__line w-80" />
            <span className="mockup__line w-70" />
            <span className="mockup__line w-80 is-muted" />
            <span className="mockup__line w-50 is-muted" />
            <span className="mockup__btn" />
          </div>
        </div>

        <div className="mockup__chips">
          <span className="mockup__chip" />
          <span className="mockup__chip" />
          <span className="mockup__chip" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mockup__nav">
        <span className="mockup__logo" />
        <span className="mockup__navline" />
        <span className="mockup__navline is-short" />
        <span className="mockup__cta" />
      </div>

      <div className="mockup__hero">
        <span className="mockup__line w-70" />
        <span className="mockup__line w-50" />
        <span className="mockup__line w-80 is-muted" />
        <div className="mockup__buttons">
          <span className="mockup__btn" />
          <span className="mockup__btn is-ghost" />
        </div>
      </div>

      <div className="mockup__stats">
        <div className="mockup__stat">
          <span className="mockup__stat-value">+38%</span>
          <span className="mockup__stat-label">consultas</span>
        </div>
        <div className="mockup__stat">
          <span className="mockup__stat-value">4,9</span>
          <span className="mockup__stat-label">reseñas</span>
        </div>
        <div className="mockup__stat">
          <span className="mockup__stat-value">24h</span>
          <span className="mockup__stat-label">respuesta</span>
        </div>
      </div>
    </>
  );
}

function MockupWindow({ variant, url }) {
  return (
    <div className="mockup">
      <div className="mockup__bar">
        <span />
        <span />
        <span />
        <div className="mockup__url">{url}</div>
      </div>
      <div className="mockup__body">
        <div className="mockup__slide-body">
          <MockupContent variant={variant} />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const cardRefs = useRef([]);
  // Empieza con la primera web ya en la esquina frontal.
  const progressRef = useRef(1 / 3); // 0..1, posición del carrusel
  const targetRef = useRef(null); // destino cuando se hace clic en una tarjeta
  const draggingRef = useRef(false);
  const dragRef = useRef({ startX: 0, startProgress: 0, moved: false });

  useLayoutEffect(() => {
    const count = MOCKUPS.length;
    // Trayectoria en L: cada web entra por arriba, baja hasta la esquina
    // (posición frontal) y sale por la derecha. El tramo de vuelta
    // (derecha -> arriba) se hace con opacidad 0, así no se ve.
    const slots = [
      // entrada por arriba (invisible en el extremo)
      { x: -8, y: -155, z: -420, scale: 0.6, opacity: 0, rotX: 8, rotY: -8 },
      // esquina / frente
      { x: -8, y: 0, z: 150, scale: 1.08, opacity: 1, rotX: 2, rotY: -3 },
      // salida por la derecha (invisible en el extremo)
      { x: 145, y: 0, z: -280, scale: 0.82, opacity: 0, rotX: 4, rotY: -16 },
    ];

    const ease = (p) => p * p * (3 - 2 * p);
    const lerp = (a, b, t) => a + (b - a) * t;

    const place = () => {
      cardRefs.current.forEach((element, index) => {
        if (!element) return;

        const t = (((progressRef.current + index / count) % 1) + 1) % 1;
        const seg = Math.min(2, Math.floor(t * 3));
        const local = ease(t * 3 - seg);
        const from = slots[seg];
        const to = slots[(seg + 1) % 3];

        const x = lerp(from.x, to.x, local);
        const y = lerp(from.y, to.y, local);
        const z = lerp(from.z, to.z, local);
        const scale = lerp(from.scale, to.scale, local);
        const opacity = lerp(from.opacity, to.opacity, local);
        const rotX = lerp(from.rotX, to.rotX, local);
        const rotY = lerp(from.rotY, to.rotY, local);

        element.style.zIndex = String(Math.round(z) + 1000);
        element.style.opacity = opacity.toFixed(3);
        element.style.transform =
          `translate3d(calc(-50% + ${x.toFixed(2)}%), calc(-50% + ${y.toFixed(2)}%), ${z.toFixed(1)}px) ` +
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) ` +
          `rotateZ(0deg) scale(${scale.toFixed(4)})`;
      });
    };

    // Coloca las tarjetas antes del primer pintado (siempre visibles).
    place();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      const delta = now - last;
      last = now;

      if (targetRef.current !== null) {
        // Animación suave hacia la tarjeta pulsada.
        progressRef.current += (targetRef.current - progressRef.current) * 0.08;
        if (Math.abs(targetRef.current - progressRef.current) < 0.001) {
          progressRef.current = targetRef.current;
          targetRef.current = null;
        }
      } else if (!draggingRef.current) {
        // Movimiento automático continuo, en un solo sentido.
        progressRef.current = (progressRef.current + delta / ORBIT_MS) % 1;
      }

      place();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    draggingRef.current = true;
    targetRef.current = null;
    dragRef.current = {
      startX: event.clientX,
      startProgress: progressRef.current,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    const dx = event.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    progressRef.current = dragRef.current.startProgress - dx / DRAG_PX;
  };

  const handlePointerUp = (event) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    // Un clic (sin arrastrar) lleva esa web a la esquina frontal.
    if (!dragRef.current.moved && event.target.closest) {
      const card = event.target.closest('[data-index]');
      if (card) {
        const index = Number(card.getAttribute('data-index'));
        const count = MOCKUPS.length;
        // La posición frontal es t = 1/3 dentro del recorrido.
        let target = (((1 / 3 - index / count) % 1) + 1) % 1;
        while (target - progressRef.current > 0.5) target -= 1;
        while (target - progressRef.current < -0.5) target += 1;
        targetRef.current = target;
      }
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal variant="zoom">
            <span className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              Agencia digital para negocios reales
            </span>
          </Reveal>

          <Reveal variant="left" delay={80}>
            <h1 className="hero__title">
              <span className="sr-only">J-TECH: </span>
              Llevamos tu negocio <span className="text-gradient">al mundo digital</span>.
            </h1>
          </Reveal>

          <Reveal variant="left" delay={160}>
            <p className="hero__subtitle">
              Creamos soluciones digitales para que tu negocio tenga presencia online, llegue a más
              clientes y transmita una imagen profesional.
            </p>
          </Reveal>

          <Reveal variant="left" delay={240}>
            <div className="hero__actions">
              <AnchorButton
                href="#contacto"
                label="Quiero digitalizar mi negocio"
                icon="pi pi-arrow-right"
                className="hero__btn-primary"
              />
              <AnchorButton
                href="#servicios"
                label="Ver nuestros servicios"
                outlined
                className="hero__btn-secondary"
              />
            </div>
          </Reveal>

          <Reveal variant="left" delay={320}>
            <p className="hero__trust">
              Desde pequeños negocios y autónomos hasta empresas que quieren mejorar su presencia
              digital.
            </p>
          </Reveal>
        </div>

        <Reveal variant="right" delay={200} className="hero__visual-reveal">
          <div
            className="hero-carousel"
            aria-hidden="true"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="hero-carousel__stage">
              {MOCKUPS.map((mockup, index) => (
                <figure
                  className="hero-carousel__card"
                  key={mockup.url}
                  data-index={index}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                >
                  <MockupWindow variant={mockup.variant} url={mockup.url} />
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
