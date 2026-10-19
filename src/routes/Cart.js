import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, formatRand } from '../data';
import { useCart } from '../CartContext';
import { Icon } from '../components/Icons';
import PageHero from '../components/PageHero';
import { ProductArt } from './Store';

export default function Cart() {
  const { items, setQty, clear } = useCart();
  const [done, setDone] = useState(false);
  const lines = PRODUCTS.filter((p) => items[p.id]).map((p) => ({ ...p, qty: items[p.id] }));
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  if (done) {
    return (
      <>
        <PageHero eyebrow="Thank you" title="Order request received" text="Online payments are not connected yet, so nothing has been charged. This is where checkout will live." />
        <section className="hc-section light"><div className="hc-wrap narrow center"><Link className="hc-btn" to="/store">Keep shopping</Link></div></section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Your cart" title={lines.length ? 'Review your order' : 'Your cart is empty'} />
      <section className="hc-section light">
        <div className="hc-wrap">
          {lines.length === 0 ? (
            <div className="center">
              <p className="hc-big">Add something from the store to get started.</p>
              <Link className="hc-btn" to="/store">Browse the store</Link>
            </div>
          ) : (
            <div className="hc-cart-grid">
              <ul className="hc-lines">
                {lines.map((l) => (
                  <li key={l.id}>
                    <div className="mini"><ProductArt p={l} /></div>
                    <div className="info">
                      <h3>{l.name}</h3>
                      <span>{formatRand(l.price)}</span>
                    </div>
                    <div className="qty" role="group" aria-label={`Quantity for ${l.name}`}>
                      <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease"><Icon name="minus" size={16} /></button>
                      <output>{l.qty}</output>
                      <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase"><Icon name="plus" size={16} /></button>
                    </div>
                    <strong>{formatRand(l.price * l.qty)}</strong>
                    <button className="rm" onClick={() => setQty(l.id, 0)} aria-label={`Remove ${l.name}`}><Icon name="trash" size={18} /></button>
                  </li>
                ))}
              </ul>
              <aside className="hc-summary">
                <h2>Summary</h2>
                <div className="hc-row between"><span>Subtotal</span><strong>{formatRand(total)}</strong></div>
                <p className="hc-note">Delivery is calculated at checkout.</p>
                <button className="hc-btn full" onClick={() => { clear(); setDone(true); }}>Place order request</button>
                <button className="hc-link" onClick={clear}>Clear cart</button>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
