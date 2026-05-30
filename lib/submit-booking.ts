/**
 * Booking Submit — Mock-Implementierung.
 *
 * Aktueller Zustand (Demo):
 *  - Loggt die Buchung in der Browser-Konsole
 *  - Persistiert sie zusätzlich in localStorage (Schlüssel "noirblade-bookings")
 *  - Simuliert kurze Latenz (700 ms)
 *  - Gibt eine Mock-ID zurück
 *
 * Späterer Produktiv-Workflow (TODO Backend):
 *  1. Kunde wählt Service, Barber, Datum, Slot
 *  2. Frontend ruft POST /api/bookings mit BookingData auf
 *  3. Backend prüft Verfügbarkeit nochmal serverseitig
 *  4. Backend legt Termin im Kalender des Barbers an
 *     (Google Calendar / Cal.com / Calendly / Supabase + DB)
 *  5. Backend versendet Mail an Barber: "Neuer Termin gebucht"
 *  6. Backend versendet Bestätigung an Kunden (Resend / SendGrid / SMTP)
 *  7. Slot wird für weitere Kunden gesperrt
 *  8. Optional: Admin/Barber-Dashboard für bestätigen / verschieben / stornieren
 *
 * Spätere Integrations-Optionen:
 *  - Google Calendar API   (Service Account + Domain-wide-Delegation)
 *  - Cal.com               (Webhooks + REST)
 *  - Calendly              (Embed oder Server-Webhook)
 *  - Supabase + Resend     (eigene DB + transaktionale Mails)
 *  - Firebase + Email      (Realtime DB + Cloud Functions)
 *  - Eigener Next.js Endpoint app/api/bookings/route.ts
 *
 * Für den Wechsel zu echter API:
 *  Einfach den Inhalt von submitBooking() durch einen fetch()-Call
 *  auf /api/bookings ersetzen. Interface bleibt identisch.
 */

export type BookingData = {
  serviceId: string;
  serviceName: string;
  /** Dauer in Minuten */
  duration: number;
  /** Preis ab X EUR */
  priceFrom: number;
  barberId: string;
  barberName: string;
  /** ISO YYYY-MM-DD */
  date: string;
  /** HH:mm */
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  message?: string;
  privacyAccepted: boolean;
};

export type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

const STORAGE_KEY = 'noirblade-bookings';

export async function submitBooking(data: BookingData): Promise<SubmitResult> {
  // Sanity: notwendige Felder vorhanden?
  if (!data.serviceId || !data.barberId || !data.date || !data.time) {
    return { ok: false, error: 'Unvollständige Buchungsdaten.' };
  }
  if (!data.privacyAccepted) {
    return { ok: false, error: 'Datenschutz muss akzeptiert werden.' };
  }

  // Log für Demo-Zwecke
  // eslint-disable-next-line no-console
  console.log('[NOIR & BLADE] Booking submitted →', data);

  // localStorage-Persistenz (nur Demo)
  try {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: Array<BookingData & { id: string; createdAt: string }> = raw
        ? JSON.parse(raw)
        : [];
      const id = `mock-${Date.now()}`;
      list.push({ ...data, id, createdAt: new Date().toISOString() });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  } catch {
    /* noop – privacy mode */
  }

  // Latenz fakes
  await new Promise((r) => setTimeout(r, 700));

  // -------------------------------------------------------------------------
  // FUTURE: ersetze obigen Mock durch echten API-Call:
  //
  //   const res = await fetch('/api/bookings', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   });
  //   if (!res.ok) {
  //     const err = await res.json().catch(() => ({}));
  //     return { ok: false, error: err.message ?? 'Buchung fehlgeschlagen.' };
  //   }
  //   const json = await res.json();
  //   return { ok: true, id: json.id };
  // -------------------------------------------------------------------------

  return { ok: true, id: `mock-${Date.now()}` };
}
