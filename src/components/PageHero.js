export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="hc-pagehero">
      <div className="hc-wrap">
        {eyebrow && <p className="hc-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {text && <p className="hc-lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}
