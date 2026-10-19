import { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

// Scroll-reveals every `.reveal` (and staggered `.reveal-group > *`) inside the ref.
export function useReveal(ref, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.reveal').forEach((el) =>
          gsap.from(el, {
            opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        );
        gsap.utils.toArray('.reveal-group').forEach((group) =>
          gsap.from(group.children, {
            opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          })
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// In-page jump that works under HashRouter, where a bare "#id" href would change the route.
export function jumpTo(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia(QUERY).matches ? 'auto' : 'smooth' });
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}
