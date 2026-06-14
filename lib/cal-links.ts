/**
 * Zentrales Mapping der Cal.com Event-Type-Links.
 *
 * Struktur:  barber -> service -> Cal.com-URL
 *
 * Die Keys entsprechen exakt den IDs aus `data/team.ts` (barber)
 * und `data/services.ts` (service), damit die Zuordnung ohne Übersetzung
 * funktioniert.
 *
 * Hinweis: Hier wird KEINE Cal.com-API verwendet. Die Buchung läuft
 * vollständig über den Cal.com Embed bzw. die verlinkte Cal.com-Seite.
 * Die echte Verfügbarkeit und der Google-Calendar-Sync werden von Cal.com
 * im Hintergrund verwaltet.
 */
export const calLinks: Record<string, Record<string, string>> = {
  noah: {
    'herrenhaarschnitt': 'https://cal.com/origami-concepts/noah-haarschnitt',
    'skin-fade': 'https://cal.com/origami-concepts/noah-skin-fade',
    'haare-bart': 'https://cal.com/origami-concepts/noah-haare-bart',
    'bart-trimmen': 'https://cal.com/origami-concepts/noah-bart-trimmen',
    'nassrasur': 'https://cal.com/origami-concepts/noah-nassrasur',
    'styling-finish': 'https://cal.com/origami-concepts/noah-styling-finish',
  },
  malik: {
    'herrenhaarschnitt': 'https://cal.com/origami-concepts/malik-haarschnitt',
    'skin-fade': 'https://cal.com/origami-concepts/malik-skin-fade',
    'haare-bart': 'https://cal.com/origami-concepts/malik-haare-bart',
    'bart-trimmen': 'https://cal.com/origami-concepts/malik-bart-trimmen',
    'nassrasur': 'https://cal.com/origami-concepts/malik-nassrasur',
    'styling-finish': 'https://cal.com/origami-concepts/malik-styling-finish',
  },
  elias: {
    'herrenhaarschnitt': 'https://cal.com/origami-concepts/elias-haarschnitt',
    'skin-fade': 'https://cal.com/origami-concepts/elias-skin-fade',
    'haare-bart': 'https://cal.com/origami-concepts/elias-haare-bart',
    'bart-trimmen': 'https://cal.com/origami-concepts/elias-bart-trimmen',
    'nassrasur': 'https://cal.com/origami-concepts/elias-nassrasur',
    'styling-finish': 'https://cal.com/origami-concepts/elias-styling-finish',
  },
};

/**
 * Ermittelt die volle Cal.com-URL für eine Kombination aus Barber und Service.
 * Gibt `null` zurück, wenn keine passende Buchung hinterlegt ist
 * (z. B. bei „Beliebig" oder einer noch nicht gepflegten Kombination).
 */
export function getCalLink(
  barberId: string | null,
  serviceId: string | null,
): string | null {
  if (!barberId || !serviceId) return null;
  return calLinks[barberId]?.[serviceId] ?? null;
}

/**
 * Der Cal.com Embed erwartet nicht die volle URL, sondern nur den Pfad
 * (z. B. "origami-concepts/noah-haarschnitt"). Diese Funktion extrahiert
 * den Pfad aus der gemappten URL.
 */
export function getCalEmbedPath(
  barberId: string | null,
  serviceId: string | null,
): string | null {
  const url = getCalLink(barberId, serviceId);
  if (!url) return null;
  try {
    return new URL(url).pathname.replace(/^\/+/, '');
  } catch {
    return url.replace(/^https?:\/\/[^/]+\//, '');
  }
}
