import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { WAYS, NEWS, BROCHURES, formatDate } from '../data';
import { useReducedMotion, useReveal } from '../hooks';
import { Icon } from '../components/Icons';
import united from '../assets/logo/united.png';
import love from '../assets/logo/love.png';
import store from '../assets/logo/store.png';
import homeVideo from '../assets/videos/6894023-uhd_3840_2160_25fps.mp4';

const NetworkScene = lazy(() => import('../components/NetworkScene'));
const WAY_IMG = { events: united, volunteer: love, shop: store };

export default function Home() {
  const root = useRef(null);
  const scroll = useRef(0);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useReveal(root);

  useEffect(() => {
    const onScroll = () => {
      const h = document.querySelector('.hc-hero')?.offsetHeight || 700;
      scroll.current = Math.min(1, window.scrollY / h);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.hc-hero h1 .line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.15 });
      gsap.from('.hc-hero .fade', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.6 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const tilt = (e) => {
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
  };
  const untilt = (e) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' });

  return (
    <div ref={root}>
      <section className="hc-hero">
        <div className="hc-stage" aria-hidden="true">
          <Suspense fallback={null}>
            <NetworkScene scroll={scroll} reduced={reduced} />
          </Suspense>
        </div>
        <div className="hc-hero-copy">
          <p className="hc-eyebrow fade">Cape Town · Community platform</p>
          <h1>
            <span className="line"><span>Every neighbour</span></span>
            <span className="line"><span>deserves a <em>home.</em></span></span>
          </h1>
          <p className="hc-lead fade">
            HomeConnect brings communities together to stay informed, take part in events and back the causes that matter.
          </p>
          <div className="hc-row fade">
            <Link className="hc-btn" to="/donate">Donate</Link>
            <Link className="hc-btn ghost" to="/contact">Get involved</Link>
          </div>
        </div>
        <span className="hc-scroll fade" aria-hidden="true">Scroll</span>
      </section>

      <section className="hc-section light" aria-labelledby="about-h">
        <div className="hc-wrap narrow">
          <p className="hc-eyebrow dark reveal">About HomeConnect</p>
          <h2 id="about-h" className="reveal">Stronger bonds, one connection at a time.</h2>
          <p className="hc-big reveal">
            HomeConnect is dedicated to fostering strong community bonds by providing a platform where you can stay informed, participate in events and support local causes. We believe in the power of connection and community, and we are here to help you get the most out of yours.
          </p>
        </div>
      </section>

      <section className="hc-section light alt" aria-labelledby="ways-h">
        <div className="hc-wrap">
          <p className="hc-eyebrow dark reveal">What we offer</p>
          <h2 id="ways-h" className="reveal">Three ways to connect</h2>
          <div className="hc-cards reveal-group">
            {WAYS.map((w) => (
              <Link key={w.key} to={w.to} className="hc-card way" onPointerMove={tilt} onPointerLeave={untilt}>
                <img src={WAY_IMG[w.key]} alt="" width="72" height="72" />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span className="more">{w.cta}<Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-section dark" aria-labelledby="story-h">
        <div className="hc-wrap split">
          <div>
            <p className="hc-eyebrow reveal">Our story</p>
            <h2 id="story-h" className="reveal">Awareness is where help begins.</h2>
            <p className="hc-lead reveal">
              Behind every statistic is a person. We share stories, resources and ways to act so that more of us can respond with empathy and practical support.
            </p>
            <Link className="hc-btn reveal" to="/brochures">Read our brochures</Link>
          </div>
          <div className="hc-video reveal">
            {playing ? (
              <video src={homeVideo} autoPlay muted loop playsInline controls aria-label="HomeConnect community footage" />
            ) : (
              <button className="hc-play" onClick={() => setPlaying(true)} aria-label="Play community footage">
                <span><Icon name="play" /></span>
                <em>Play footage</em>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="hc-section light" aria-labelledby="res-h">
        <div className="hc-wrap">
          <div className="hc-head reveal">
            <div>
              <p className="hc-eyebrow dark">Free resources</p>
              <h2 id="res-h">Learn, share, support</h2>
            </div>
            <Link className="hc-link" to="/brochures">All brochures <Icon name="arrow" /></Link>
          </div>
          <div className="hc-rail reveal-group" role="list">
            {BROCHURES.map((b) => (
              <Link role="listitem" key={b.id} to="/brochures" className="hc-rail-card">
                <img src={b.img} alt="" loading="lazy" />
                <h3>{b.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-section light alt" aria-labelledby="news-h">
        <div className="hc-wrap">
          <div className="hc-head reveal">
            <div>
              <p className="hc-eyebrow dark">Latest news</p>
              <h2 id="news-h">From the community</h2>
            </div>
            <Link className="hc-link" to="/news">All news <Icon name="arrow" /></Link>
          </div>
          <div className="hc-cards reveal-group">
            {NEWS.slice(0, 3).map((n) => (
              <Link key={n.slug} to={`/news/${n.slug}`} className="hc-card news">
                <img src={n.img} alt="" loading="lazy" />
                <div>
                  <span className="hc-pill">{n.cat}</span>
                  <h3>{n.title}</h3>
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-cta" aria-labelledby="cta-h">
        <div className="hc-wrap narrow center">
          <h2 id="cta-h" className="reveal">Join us today</h2>
          <p className="hc-lead reveal">Sign up to stay updated with our latest news and ways to help.</p>
          <Link className="hc-btn big reveal" to="/contact">Sign up</Link>
        </div>
      </section>
    </div>
  );
}
