import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BROCHURES } from '../data';
import { useReveal } from '../hooks';
import { Icon } from '../components/Icons';
import PageHero from '../components/PageHero';

export default function Brochures() {
  const root = useRef(null);
  useReveal(root);
  const featured = BROCHURES.find((b) => b.featured);
  const others = BROCHURES.filter((b) => !b.featured);

  return (
    <div ref={root}>
      <PageHero
        eyebrow="Resources"
        title="Educational brochures on homelessness"
        text="Free resources to raise awareness and point people to support in Cape Town."
      />

      <section className="hc-section light">
        <div className="hc-wrap">
          <div className="hc-wrap narrow">
            <p className="hc-big reveal">
              Our brochures are designed to educate and inform about the many sides of homelessness in Cape Town, with practical information for people who need help and for those who want to support them.
            </p>
          </div>

          {featured && (
            <article className="hc-feature reveal">
              <img src={featured.img} alt="" />
              <div>
                <span className="hc-pill">Featured this month</span>
                <h2>{featured.title}</h2>
                <p>{featured.text}</p>
                <button className="hc-btn" disabled title="PDF coming soon"><Icon name="download" /> PDF coming soon</button>
              </div>
            </article>
          )}

          <div className="hc-cards reveal-group">
            {others.map((b) => (
              <article key={b.id} className="hc-card brochure">
                <img src={b.img} alt="" loading="lazy" />
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                  <button className="hc-btn small ghost-dark" disabled title="PDF coming soon"><Icon name="download" size={16} /> PDF coming soon</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-cta" aria-labelledby="gi-h">
        <div className="hc-wrap narrow center">
          <h2 id="gi-h" className="reveal">Get involved</h2>
          <p className="hc-lead reveal">Donate, volunteer or spread the word. Every bit of connection helps.</p>
          <Link className="hc-btn big reveal" to="/contact">Learn more</Link>
        </div>
      </section>
    </div>
  );
}
