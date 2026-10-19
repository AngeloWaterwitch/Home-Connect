import { useRef, useState } from 'react';
import { useReveal } from '../hooks';
import { Icon } from '../components/Icons';
import PageHero from '../components/PageHero';

const TOPICS = ['Volunteer', 'Donate', 'Partner with us', 'Media', 'Something else'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const root = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  useReveal(root);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!EMAIL.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Add a short message (at least 10 characters).';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const field = (k, label, props = {}) => (
    <label className="hc-field">
      <span>{label}</span>
      {props.as === 'textarea' ? (
        <textarea rows="5" value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} />
      ) : (
        <input value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} {...props} />
      )}
      {errors[k] && <small id={`${k}-err`} className="hc-help err">{errors[k]}</small>}
    </label>
  );

  return (
    <div ref={root}>
      <PageHero eyebrow="Contact" title="Let us connect" text="Volunteer, partner, ask a question or sign up for updates." />
      <section className="hc-section light">
        <div className="hc-wrap split top">
          <div className="reveal">
            <h2>How can we help?</h2>
            <p className="hc-prose">Tell us a little about what you have in mind and we will get back to you.</p>
            <p className="hc-note">Contact details and a map will be added once confirmed.</p>
          </div>
          <form className="hc-panel reveal" onSubmit={submit} noValidate>
            {sent ? (
              <div className="center" role="status">
                <Icon name="check" size={40} />
                <h3>Message ready</h3>
                <p>Thanks, {form.name.split(' ')[0]}. The form is not connected to an inbox yet, so this message was not sent.</p>
                <button type="button" className="hc-btn" onClick={() => setSent(false)}>Edit message</button>
              </div>
            ) : (
              <>
                {field('name', 'Name', { autoComplete: 'name' })}
                {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
                <label className="hc-field">
                  <span>Topic</span>
                  <select value={form.topic} onChange={set('topic')}>
                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                {field('message', 'Message', { as: 'textarea' })}
                <button className="hc-btn big full">Send message</button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
