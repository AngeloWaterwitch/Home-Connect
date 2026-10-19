import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NEWS, formatDate } from '../data';
import { useReveal } from '../hooks';
import { Icon } from '../components/Icons';
import PageHero from '../components/PageHero';

export function NewsList() {
  const root = useRef(null);
  const [cat, setCat] = useState('All');
  const cats = useMemo(() => ['All', ...new Set(NEWS.map((n) => n.cat))], []);
  const list = NEWS.filter((n) => cat === 'All' || n.cat === cat);
  const [lead, ...rest] = list;

  useReveal(root, [cat]);

  return (
    <div ref={root}>
      <PageHero eyebrow="News" title="Stories from the community" text="Events, resources and updates from across Cape Town." />
      <section className="hc-section light">
        <div className="hc-wrap">
          <div className="hc-filters reveal" role="group" aria-label="Filter by category">
            {cats.map((c) => (
              <button key={c} className={c === cat ? 'on' : ''} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          {lead && (
            <Link to={`/news/${lead.slug}`} className="hc-feature reveal">
              <img src={lead.img} alt="" />
              <div>
                <span className="hc-pill">{lead.cat}</span>
                <h2>{lead.title}</h2>
                <p>{lead.excerpt}</p>
                <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                <span className="more">Read story <Icon name="arrow" /></span>
              </div>
            </Link>
          )}

          <div className="hc-cards reveal-group">
            {rest.map((n) => (
              <Link key={n.slug} to={`/news/${n.slug}`} className="hc-card news">
                <img src={n.img} alt="" loading="lazy" />
                <div>
                  <span className="hc-pill">{n.cat}</span>
                  <h3>{n.title}</h3>
                  <p>{n.excerpt}</p>
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function NewsArticle() {
  const { slug } = useParams();
  const root = useRef(null);
  const i = NEWS.findIndex((n) => n.slug === slug);
  useReveal(root, [slug]);

  if (i < 0) {
    return (
      <PageHero eyebrow="404" title="Story not found" text="That article may have moved.">
        <Link className="hc-btn" to="/news">Back to news</Link>
      </PageHero>
    );
  }
  const n = NEWS[i];
  const next = NEWS[(i + 1) % NEWS.length];

  return (
    <article ref={root}>
      <PageHero eyebrow={n.cat} title={n.title} text={formatDate(n.date)} />
      <section className="hc-section light">
        <div className="hc-wrap narrow">
          <img className="hc-article-img reveal" src={n.img} alt="" />
          {n.body.map((p, k) => (
            <p key={k} className="hc-prose reveal">{p}</p>
          ))}
          <div className="hc-row between reveal">
            <Link className="hc-link" to="/news"><span className="flip"><Icon name="arrow" /></span> All news</Link>
            <Link className="hc-link" to={`/news/${next.slug}`}>Next: {next.title} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </article>
  );
}
