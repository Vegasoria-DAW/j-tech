import Reveal from './Reveal';
import AnchorButton from './AnchorButton';

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <Reveal>
          <h2 className="final-cta__title">
            Tu negocio ya funciona. Ahora hagamos que también funcione en internet.
          </h2>
          <AnchorButton
            href="#contacto"
            label="Empezar ahora"
            icon="pi pi-arrow-right"
            size="large"
            className="final-cta__btn"
          />
        </Reveal>
      </div>
    </section>
  );
}
