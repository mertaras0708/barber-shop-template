'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Lädt das offizielle Cal.com Embed-Script genau einmal in die Seite.
 * Es wird KEIN API-Key und KEINE Cal.com-API benötigt – der Embed
 * kommuniziert direkt mit cal.com und steuert dort Verfügbarkeit,
 * Buchung und Google-Calendar-Sync.
 *
 * Das Snippet entspricht dem offiziellen Cal.com Bootstrap-Loader.
 */
function ensureCal(): any {
  const w = window as any;
  if (w.Cal) return w.Cal;

  const A = 'https://app.cal.com/embed/embed.js';
  const L = 'init';
  const d = w.document;
  const push = (a: any, ar: any) => {
    a.q.push(ar);
  };

  w.Cal = function (...args: any[]) {
    const cal = w.Cal;
    const ar = args;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement('script')).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function (...a: any[]) {
        push(api, a);
      };
      const namespace = ar[1];
      api.q = (api as any).q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace], ar);
        push(cal, ['initNamespace', namespace]);
      } else {
        push(cal, ar);
      }
      return;
    }
    push(cal, ar);
  };

  return w.Cal;
}

type Prefill = {
  name?: string;
  email?: string;
  notes?: string;
};

/** Aus dem Cal.com-Event extrahierte Termin-Details (alle Felder optional). */
export type CalBookingDetails = {
  title?: string;
  startTime?: string;
  endTime?: string;
};

type Props = {
  /** Cal.com-Pfad, z. B. "origami-concepts/noah-haarschnitt" */
  calPath: string;
  prefill?: Prefill;
  /** Wird aufgerufen, sobald Cal.com eine Buchung erfolgreich abgeschlossen hat. */
  onBookingSuccess?: (details: CalBookingDetails) => void;
};

/**
 * Liest Termin-Details defensiv aus dem Cal.com Success-Event.
 *
 * Das Payload-Format unterscheidet sich je nach Embed-Version:
 *  - "bookingSuccessful"   (v1): verschachtelt -> data.booking.{startTime,endTime,title,attendees}
 *  - "bookingSuccessfulV2" (v2): flach        -> data.{startTime,endTime,title}
 * Zusätzlich liegen die Daten unter e.detail.data. Wir prüfen alle bekannten
 * Pfade und liefern null-sichere Felder zurück.
 */
function parseBookingEvent(e: any): CalBookingDetails {
  const detail = e?.detail ?? e ?? {};
  const data = detail.data ?? detail;
  const booking = data?.booking ?? data ?? {};

  return {
    title:
      booking?.title ??
      data?.title ??
      data?.eventType?.title ??
      undefined,
    startTime: booking?.startTime ?? data?.startTime ?? data?.date ?? undefined,
    endTime: booking?.endTime ?? data?.endTime ?? undefined,
  };
}

/**
 * Bettet einen Cal.com Event-Type als Inline-Kalender direkt im Buchungsmodal ein.
 * Name und E-Mail aus dem eigenen Formular werden – falls vorhanden – vorbefüllt.
 */
export default function CalEmbed({ calPath, prefill, onBookingSuccess }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Callback in einem Ref halten, damit das Cal-Event-Abo nicht bei jeder
  // Prop-Änderung neu registriert werden muss.
  const onSuccessRef = useRef(onBookingSuccess);
  onSuccessRef.current = onBookingSuccess;

  useEffect(() => {
    if (!ref.current) return;
    const Cal = ensureCal();

    Cal('init', { origin: 'https://cal.com' });

    // Markenfarben des Templates an Cal.com weitergeben
    Cal('ui', {
      theme: 'dark',
      cssVarsPerTheme: {
        dark: { 'cal-brand': '#C4622D' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    const config: Record<string, string> = { theme: 'dark' };
    if (prefill?.name) config.name = prefill.name;
    if (prefill?.email) config.email = prefill.email;
    if (prefill?.notes) config.notes = prefill.notes;

    Cal('inline', {
      elementOrSelector: ref.current,
      calLink: calPath,
      layout: 'month_view',
      config,
    });

    // Cal feuert ein "linkReady"-Event, sobald der Kalender gerendert ist.
    Cal('on', {
      action: 'linkReady',
      callback: () => setLoaded(true),
    });

    // Erfolgreiche Buchung: Cal.com feuert in der aktuellen Embed-Version das
    // Event "bookingSuccessful". Ältere/neuere Builds nutzen zusätzlich
    // "bookingSuccessfulV2" – wir hören defensiv auf beide, damit der eigene
    // Success-Screen zuverlässig ausgelöst wird (kein Timeout/Text-Parsing).
    const handleSuccess = (e: any) =>
      onSuccessRef.current?.(parseBookingEvent(e));
    Cal('on', { action: 'bookingSuccessful', callback: handleSuccess });
    Cal('on', { action: 'bookingSuccessfulV2', callback: handleSuccess });

    // Fallback, falls das Event nicht ankommt (z. B. langsame Verbindung)
    const t = window.setTimeout(() => setLoaded(true), 4000);

    return () => {
      window.clearTimeout(t);
      Cal('off', { action: 'bookingSuccessful', callback: handleSuccess });
      Cal('off', { action: 'bookingSuccessfulV2', callback: handleSuccess });
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [calPath, prefill?.name, prefill?.email, prefill?.notes]);

  return (
    <div className="relative w-full">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-cream/70">
          <Loader2 className="h-6 w-6 animate-spin text-copper" aria-hidden />
          <span className="text-xs uppercase tracking-widest2">
            Kalender wird geladen …
          </span>
        </div>
      )}
      <div
        ref={ref}
        className="w-full min-h-[560px] overflow-auto"
        aria-label="Cal.com Terminkalender"
      />
    </div>
  );
}
