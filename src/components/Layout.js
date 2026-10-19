import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { NAV } from '../data';
import { useCart } from '../CartContext';
import { useReducedMotion } from '../hooks';
import logo from '../assets/logo/Home Connect.png';
import './hc.css';

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

export default function Layout() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const main = useRef(null);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    if (!reduced && main.current) {
      gsap.fromTo(main.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' });
    }
  }, [pathname, reduced]);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="hc">
      <a className="hc-skip" href="#main">Skip to content</a>
      <header className={`hc-nav ${solid || open ? 'is-solid' : ''}`}>
        <Link to="/" className="hc-brand" aria-label="HomeConnect home">
          <img src={logo} alt="" width="36" height="36" />
          <span>HomeConnect</span>
        </Link>
        <nav id="hc-menu" className={`hc-links ${open ? 'open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="hc-actions">
          <Link to="/cart" className="hc-cart" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <CartIcon />
            {count > 0 && <b>{count}</b>}
          </Link>
          <button className="hc-burger" aria-expanded={open} aria-controls="hc-menu" onClick={() => setOpen((o) => !o)}>
            <span className="sr">{open ? 'Close menu' : 'Open menu'}</span>
            <i />
            <i />
          </button>
        </div>
      </header>

      <div id="main" ref={main} tabIndex={-1}>
        <Outlet />
      </div>

      <footer className="hc-footer">
        <div className="hc-footer-grid">
          <div>
            <Link to="/" className="hc-brand">
              <img src={logo} alt="" width="36" height="36" />
              <span>HomeConnect</span>
            </Link>
            <p>Connecting communities, sharing news and getting people involved across Cape Town.</p>
          </div>
          <nav aria-label="Footer">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}>{n.label}</Link>
            ))}
            <Link to="/cart">Cart</Link>
          </nav>
          <div>
            <p className="hc-footer-cta">Want to help?</p>
            <Link className="hc-btn" to="/donate">Donate</Link>
          </div>
        </div>
        <div className="hc-footer-base">
          <span>© {new Date().getFullYear()} HomeConnect. All rights reserved.</span>
          <Link to="/studio">Site by Studio</Link>
        </div>
      </footer>
    </div>
  );
}
