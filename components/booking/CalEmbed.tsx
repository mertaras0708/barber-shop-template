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

type Props = {
  /** Cal.com-Pfad, z. B. "origami-concepts/noah-haarschnitt" */
  calPath: string;
  prefill?: Prefill;
};

/**
 * Bettet einen Cal.com Event-Type als Inline-Kalender direkt im Buchungsmodal ein.
 * Name und E-Mail aus dem eigenen Formular werden – falls vorhanden – vorbefüllt.
 */
export default function CalEmbed({ calPath, prefill }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

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

    // Fallback, falls das Event nicht ankommt (z. B. langsame Verbindung)
    const t = window.setTimeout(() => setLoaded(true), 4000);

    return () => {
      window.clearTimeout(t);
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
