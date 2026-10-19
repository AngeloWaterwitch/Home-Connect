import { useRef, useState } from 'react';
import { GIFT_AMOUNTS, formatRand } from '../data';
import { useReveal } from '../hooks';
import { Icon } from '../components/Icons';
import PageHero from '../components/PageHero';

export default function Donate() {
  const root = useRef(null);
  const [freq, setFreq] = useState('once');
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState('');
  const [sent, setSent] = useState(false);
  useReveal(root);

  const value = custom ? Number(custom) : amount;
  const valid = Number.isFinite(value) && value >= 10 && value <= 100000;

  const submit = (e) => {
    e.preventDefault();
    if (valid) setSent(true);
  };

  return (
    <div ref={root}>
      <PageHero eyebrow="Donate" title={<>Help <em>others</em></>} text="Your gift supports community events, free resources and local causes." />
      <section className="hc-section light">
        <div className="hc-wrap split top">
          <div className="reveal">
            <h2>Where your gift goes</h2>
            <ul className="hc-checks">
              <li><Icon name="check" /> Free educational brochures and printing</li>
              <li><Icon name="check" /> Community events and volunteer coordination</li>
              <li><Icon name="check" /> Local causes supported through our store and partners</li>
            </ul>
            <p className="hc-note">Breakdowns and receipts will be confirmed once the payment provider is connected.</p>
          </div>

          <form className="hc-panel reveal" onSubmit={submit} noValidate>
            {sent ? (
              <div className="center" role="status">
                <Icon name="heart" size={40} />
                <h3>Thank you</h3>
                <p>Online payments are not connected yet, so nothing has been charged. Your selection of {formatRand(value)} {freq === 'monthly' ? 'monthly' : 'once-off'} was not stored.</p>
                <button type="button" className="hc-btn" onClick={() => setSent(false)}>Back</button>
              </div>
            ) : (
              <>
                <fieldset>
                  <legend>Frequency</legend>
                  <div className="hc-seg">
                    {[['once', 'Once-off'], ['monthly', 'Monthly']].map(([k, l]) => (
                      <label key={k} className={freq === k ? 'on' : ''}>
                        <input type="radio" name="freq" value={k} checked={freq === k} onChange={() => setFreq(k)} />{l}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Amount (ZAR)</legend>
                  <div className="hc-amounts">
                    {GIFT_AMOUNTS.map((a) => (
                      <label key={a} className={!custom && amount === a ? 'on' : ''}>
                        <input type="radio" name="amount" checked={!custom && amount === a} onChange={() => { setAmount(a); setCustom(''); }} />
                        {formatRand(a)}
                      </label>
                    ))}
                  </div>
                  <label className="hc-field">
                    <span>Other amount</span>
                    <input type="number" inputMode="numeric" min="10" step="1" placeholder="R" value={custom} onChange={(e) => setCustom(e.target.value)} aria-invalid={!valid} aria-describedby="amt-help" />
                  </label>
                  <p id="amt-help" className={`hc-help ${valid ? '' : 'err'}`}>{valid ? 'Minimum gift is R10.' : 'Enter an amount between R10 and R100 000.'}</p>
                </fieldset>
                <button className="hc-btn big full" disabled={!valid}>
                  Give {valid ? formatRand(value) : ''} {freq === 'monthly' ? 'monthly' : ''}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
