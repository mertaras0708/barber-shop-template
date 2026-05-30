'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';
import { useBooking } from '@/lib/booking-context';
import StepFrame from '../StepFrame';
import HeadlineHighlight from '@/components/HeadlineHighlight';

const fieldBase =
  'peer w-full border-0 border-b border-cream/15 bg-transparent px-0 pt-5 pb-2 text-cream placeholder-transparent focus:border-copper transition-colors';
const labelBase =
  'absolute left-0 top-5 text-cream/55 text-sm transition-all duration-300 pointer-events-none ' +
  'peer-focus:top-0 peer-focus:text-xs peer-focus:text-copper peer-focus:uppercase peer-focus:tracking-widest2 ' +
  "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest2";

export default function CustomerDetailsForm() {
  const { state, setCustomer } = useBooking();
  const c = state.customer;

  return (
    <StepFrame
      current={5}
      stepLabel="Kontakt"
      title={
        <>
          Deine{' '}
          <HeadlineHighlight case="inherit">Kontaktdaten</HeadlineHighlight>.
        </>
      }
      description="Damit wir dich erreichen können, falls sich etwas am Termin ändert. Daten werden ausschließlich für diese Buchung verwendet."
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"
        noValidate
      >
        <div className="relative md:col-span-2">
          <input
            id="cust-name"
            type="text"
            placeholder="Vor- und Nachname"
            autoComplete="name"
            value={c.name}
            onChange={(e) => setCustomer({ name: e.target.value })}
            className={fieldBase}
          />
          <label htmlFor="cust-name" className={labelBase}>
            Vor- und Nachname
          </label>
        </div>

        <div className="relative">
          <input
            id="cust-phone"
            type="tel"
            placeholder="Telefonnummer"
            autoComplete="tel"
            value={c.phone}
            onChange={(e) => setCustomer({ phone: e.target.value })}
            className={fieldBase}
          />
          <label htmlFor="cust-phone" className={labelBase}>
            Telefonnummer
          </label>
        </div>

        <div className="relative">
          <input
            id="cust-email"
            type="email"
            placeholder="E-Mail"
            autoComplete="email"
            value={c.email}
            onChange={(e) => setCustomer({ email: e.target.value })}
            className={fieldBase}
          />
          <label htmlFor="cust-email" className={labelBase}>
            E-Mail
          </label>
        </div>

        <div className="relative md:col-span-2">
          <textarea
            id="cust-message"
            rows={2}
            placeholder="Wunsch oder Nachricht (optional)"
            value={c.message}
            onChange={(e) => setCustomer({ message: e.target.value })}
            className={`${fieldBase} resize-none`}
          />
          <label htmlFor="cust-message" className={labelBase}>
            Wunsch oder Nachricht (optional)
          </label>
        </div>

        <div className="md:col-span-2 mt-6">
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <span
              className={clsx(
                'mt-0.5 flex h-5 w-5 items-center justify-center border transition-all flex-shrink-0',
                c.privacyAccepted
                  ? 'bg-copper border-copper text-ink'
                  : 'border-cream/30 text-transparent group-hover:border-cream/60',
              )}
              aria-hidden
            >
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={c.privacyAccepted}
              onChange={(e) =>
                setCustomer({ privacyAccepted: e.target.checked })
              }
            />
            <span className="text-sm text-cream/70 leading-relaxed">
              Ich akzeptiere die{' '}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="link-copper text-cream"
              >
                Datenschutzerklärung
              </a>{' '}
              und stimme der Kontaktaufnahme zur Bestätigung dieses Termins zu.
            </span>
          </label>
        </div>
      </form>
    </StepFrame>
  );
}
