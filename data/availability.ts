/**
 * Mock-Verfügbarkeit für den Booking-Prototyp.
 *
 * Generiert Slots deterministisch (gleiches Datum + Barber → gleiche Slots).
 * In Produktion ersetzt durch GET /api/availability?date=...&barberId=...
 *
 * Öffnungszeiten:
 *  Mo–Fr  10:00 – 20:00  (Slot-Intervall 30 Min.)
 *  Sa     10:00 – 18:00
 *  So     geschlossen
 */

export type AvailabilitySlot = {
  /** ISO-Datum YYYY-MM-DD */
  date: string;
  /** HH:mm */
  time: string;
  /** Barber-ID oder 'any' */
  barberId: string;
  /** Buchbar oder bereits belegt */
  available: boolean;
};

// Deterministischer 32-bit-Hash (FNV-1a Variante)
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1000;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Liefert true, wenn der Salon an diesem Datum geschlossen ist.
 * Sonntag = geschlossen.
 */
export function isClosed(dateISO: string): boolean {
  const d = new Date(dateISO + 'T00:00:00');
  return d.getDay() === 0;
}

/** Schließzeit für gegebenes Wochentags-Datum (Stunde, 24h). */
function closeHourFor(dateISO: string): number {
  const day = new Date(dateISO + 'T00:00:00').getDay();
  if (day === 0) return 0;
  if (day === 6) return 18;
  return 20;
}

/**
 * Generiert alle Slots eines Tages für einen Barber.
 * Für 'any' wird ein Slot als verfügbar betrachtet, sobald
 * mindestens ein Barber frei ist.
 */
export function getSlotsForDay(
  dateISO: string,
  barberId: string,
): AvailabilitySlot[] {
  if (isClosed(dateISO)) return [];

  const close = closeHourFor(dateISO);
  const slots: AvailabilitySlot[] = [];

  for (let h = 10; h < close; h++) {
    for (const m of [0, 30]) {
      const time = `${pad(h)}:${pad(m)}`;
      // Pause zwischen 13:00 und 13:30 (Crew-Pause) – wirkt realistisch
      const isLunch = h === 13 && m === 0;
      if (isLunch) continue;

      let available: boolean;
      if (barberId === 'any') {
        // Beliebig: in ~85 % der Slots ist mindestens jemand frei
        available = hash(`${dateISO}|any|${time}`) % 100 > 15;
      } else {
        // Pro Barber: ca. 65 % freie Slots – fühlt sich realistisch an
        available = hash(`${dateISO}|${barberId}|${time}`) % 100 > 35;
      }

      // Slots in der Vergangenheit grundsätzlich nicht verfügbar
      const slotDate = new Date(`${dateISO}T${time}:00`);
      if (slotDate.getTime() < Date.now()) available = false;

      slots.push({ date: dateISO, time, barberId, available });
    }
  }

  return slots;
}

/**
 * Liefert true, wenn der Tag mindestens einen freien Slot hat.
 * Genutzt für die Kalender-Indikatoren.
 */
export function hasAvailability(dateISO: string, barberId: string): boolean {
  if (isClosed(dateISO)) return false;
  const slots = getSlotsForDay(dateISO, barberId);
  return slots.some((s) => s.available);
}
