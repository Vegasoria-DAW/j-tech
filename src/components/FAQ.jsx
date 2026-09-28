import { useState } from 'react';
import { PiCaretDown } from 'react-icons/pi';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { faqs } from '../data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section faq">
      <div className="container container--medium">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas antes de empezar."
          subtitle="Si tienes otra pregunta, escríbenos y te contestamos sin compromiso."
        />
        <Reveal>
          <div className="faq__accordion">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div key={faq.question} className={`faq__item${open ? ' is-open' : ''}`}>
                  <h3 className="faq__heading">
                    <button
                      type="button"
                      id={`faq-trigger-${index}`}
                      className="faq__question"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq__chevron" aria-hidden="true">
                        <PiCaretDown size={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    className="faq__panel"
                  >
                    <div className="faq__panel-inner">
                      <p className="faq__answer">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
