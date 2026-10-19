import { lazy, Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Studio.css';
import { useReducedMotion } from '../hooks';
import homeVideo from '../assets/videos/6894023-uhd_3840_2160_25fps.mp4';
import logo from '../assets/logo/Home Connect.png';
import img1 from '../assets/images/WhatsApp Image 2024-08-31 at 21.00.24_445cb595.jpg';
import img2 from '../assets/images/WhatsApp Image 2024-08-31 at 21.11.35_90b7a00c.jpg';
import img3 from '../assets/images/WhatsApp Image 2024-08-31 at 21.11.36_cb8cda38.jpg';

gsap.registerPlugin(ScrollTrigger);
const Scene = lazy(() => import('../components/Scene'));

const CAPABILITIES = [
  { n: '01', title: 'Immersive 3D', text: 'WebGL scenes that react to scroll, pointer and device, tuned to hold 60fps.' },
  { n: '02', title: 'Product UI/UX', text: 'Research-led interfaces, design systems and accessible interaction patterns.' },
  { n: '03', title: 'Full-stack builds', text: 'React front ends on fast, secure, scalable APIs and cloud infrastructure.' },
  { n: '04', title: 'E-commerce & payments', text: 'Stores, carts and donation flows built to convert and to be trusted.' },
];

const PROCESS = ['Discover', 'Design', 'Build', 'Launch', 'Evolve'];

const WORK = [
  { img: img1, tag: 'Community', title: 'Outreach moments', text: 'Real stories at the heart of the platform.' },
  { img: img2, tag: 'Events', title: 'Neighbours showing up', text: 'Event pages and news built for sharing.' },
  { img: img3, tag: 'Impact', title: 'Giving that lands', text: 'A donation journey with zero friction.' },
];

const STACK = ['React', 'Three.js', 'GSAP', 'TypeScript', 'Node', 'WebGL', 'Figma', 'Accessibility'];

export default function Studio() {
  const root = useRef(null);
  const scroll = useRef(0);
  const stage = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-line > span', { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.12, delay: 0.2 });
        gsap.from('.hero-fade', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.8 });
        gsap.utils.toArray('.reveal').forEach((el) =>
          gsap.from(el, {
            opacity: 0, y: 48, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        );
        gsap.utils.toArray('.parallax').forEach((el) =>
          gsap.to(el, {
            yPercent: -12, ease: 'none',
            scrollTrigger: { trigger: el, scrub: true, start: 'top bottom', end: 'bottom top' },
          })
        );
        gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
      }, root);
      return () => ctx.revert();
    });
    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        scroll.current = self.progress;
        const floor = window.innerWidth < 768 ? 0.22 : 0.45;
        if (stage.current) stage.current.style.opacity = Math.max(floor, 1 - self.progress * 4);
      },
    });
    return () => { mm.revert(); progress.kill(); };
  }, []);

  const onMagnet = (e) => {
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power3.out' });
  };
  const offMagnet = (e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });

  return (
    <div ref={root} className="studio">
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <a href="#top" className="brand">Studio<span>.</span></a>
        <nav aria-label="Primary">
          <a href="#capabilities">Capabilities</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact" className="nav-cta">Start a project</a>
        </nav>
      </header>

      <div className="stage" ref={stage} aria-hidden="true">
        <Suspense fallback={null}>
          <Scene scroll={scroll} reduced={reduced} />
        </Suspense>
      </div>

      <main id="main">
        <section className="hero" id="top">
          <p className="eyebrow hero-fade">Web development studio</p>
          <h1>
            <span className="hero-line"><span>We build the web</span></span>
            <span className="hero-line"><span>people <em>remember.</em></span></span>
          </h1>
          <p className="lead hero-fade">
            A senior team crafting immersive 3D experiences and razor-sharp interfaces
            for brands that refuse to look ordinary.
          </p>
          <div className="hero-actions hero-fade">
            <a href="#work" className="btn" onPointerMove={onMagnet} onPointerLeave={offMagnet}>See our work</a>
            <a href="#contact" className="btn ghost" onPointerMove={onMagnet} onPointerLeave={offMagnet}>Talk to us</a>
          </div>
          <span className="scroll-hint hero-fade">Scroll</span>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...STACK, ...STACK, ...STACK, ...STACK].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        <section className="section" id="capabilities">
          <p className="eyebrow reveal">What we do</p>
          <h2 className="reveal">Design and engineering, <em>one team.</em></h2>
          <div className="cap-grid">
            {CAPABILITIES.map((c) => (
              <article className="cap reveal" key={c.n}>
                <span className="num">{c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="work">
          <p className="eyebrow reveal">Flagship case study</p>
          <h2 className="reveal">HomeConnect</h2>
          <div className="case reveal">
            <video className="case-video" src={homeVideo} autoPlay muted loop playsInline preload="metadata" aria-label="HomeConnect hero footage" />
            <div className="case-meta">
              <img src={logo} alt="" width="56" height="56" />
              <p>
                A community platform connecting people to news, events and ways to give,
                built to raise awareness of homelessness. We are rebuilding it end to end
                as proof of what the studio ships.
              </p>
              <ul className="tags"><li>React</li><li>3D</li><li>UX research</li><li>Donations</li></ul>
            </div>
          </div>
          <div className="work-grid">
            {WORK.map((w) => (
              <figure className="work reveal" key={w.title}>
                <div className="work-img"><img className="parallax" src={w.img} alt={w.title} loading="lazy" /></div>
                <figcaption><span>{w.tag}</span><strong>{w.title}</strong><small>{w.text}</small></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section" id="process">
          <p className="eyebrow reveal">How we work</p>
          <h2 className="reveal">From first call to <em>launch day.</em></h2>
          <ol className="steps">
            {PROCESS.map((p, i) => (
              <li className="reveal" key={p}><span>{String(i + 1).padStart(2, '0')}</span>{p}</li>
            ))}
          </ol>
        </section>

        <section className="section cta" id="contact">
          <h2 className="reveal">Have something <em>ambitious</em> in mind?</h2>
          <a className="btn big reveal" href="mailto:hello@example.com" onPointerMove={onMagnet} onPointerLeave={offMagnet}>
            hello@example.com
          </a>
        </section>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} Studio</span><span>Built with React, Three.js and GSAP</span></footer>
    </div>
  );
}
