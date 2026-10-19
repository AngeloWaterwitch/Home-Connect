import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, formatRand } from '../data';
import { useCart } from '../CartContext';
import { useReveal } from '../hooks';
import { Icon } from '../components/Icons';
import PageHero from '../components/PageHero';

export function ProductArt({ p }) {
  return (
    <div className="hc-art" style={{ '--h': p.hue }} aria-hidden="true">
      <Icon name={p.icon} size={72} />
    </div>
  );
}

export default function Store() {
  const root = useRef(null);
  const { add, items } = useCart();
  const [flash, setFlash] = useState('');
  useReveal(root);

  const onAdd = (p) => {
    add(p.id);
    setFlash(`${p.name} added to cart`);
    window.clearTimeout(onAdd.t);
    onAdd.t = window.setTimeout(() => setFlash(''), 2200);
  };

  return (
    <div ref={root}>
      <PageHero eyebrow="Shop for good" title="Everyday things, real impact" text="Proceeds from the store go back to local causes." />
      <section className="hc-section light">
        <div className="hc-wrap">
          <div className="hc-products reveal-group">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="hc-product">
                <div className="art-wrap">
                  <ProductArt p={p} />
                  {p.tag && <span className="hc-pill float">{p.tag}</span>}
                </div>
                <h3>{p.name}</h3>
                <div className="hc-row between">
                  <strong>{formatRand(p.price)}</strong>
                  <button className="hc-btn small" onClick={() => onAdd(p)}>
                    <Icon name="plus" size={16} /> Add{items[p.id] ? ` (${items[p.id]})` : ''}
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="hc-note reveal">Sample catalogue. Products, prices and photography are placeholders until stock is confirmed.</p>
        </div>
      </section>
      <div className="hc-toast" role="status" aria-live="polite">
        {flash && (
          <span>
            <Icon name="check" size={18} /> {flash} <Link to="/cart">View cart</Link>
          </span>
        )}
      </div>
    </div>
  );
}
