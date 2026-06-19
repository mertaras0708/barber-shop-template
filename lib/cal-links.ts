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
 * ZUKÜNFTIGE ERWEITERUNG – aktuell DEAKTIVIERT.
 *
 * Die Option „Beliebiger Barber" wurde in der UI entfernt, weil sie ein
 * Cal.com Team-/Round-Robin-Event voraussetzt (kostenpflichtiges Team-Feature).
 * Das aktuelle kostenlose Setup nutzt ausschließlich konkrete Barber-Links.
 *
 * Dieses Mapping bleibt als Vorlage erhalten: Sobald ein Cal.com-Team mit
 * Round-Robin-Events existiert, hier pro Service GENAU EINE Team-Event-URL
 * eintragen (Format: https://cal.com/team/origami-concepts/herrenhaarschnitt)
 * und in `BarberSelector` wieder eine „Beliebig"-Option (id 'any') anbieten.
 *
 * Solange `state.barberId` nie 'any' werden kann, ist dieser Pfad toter Code
 * und kann keinen unerreichbaren Zustand erzeugen.
 */
export const anyBarberLinks: Record<string, string> = {
  'herrenhaarschnitt': '',
  'skin-fade': '',
  'haare-bart': '',
  'bart-trimmen': '',
  'nassrasur': '',
  'styling-finish': '',
};

/**
 * Ermittelt die volle Cal.com-URL für eine Kombination aus Barber und Service.
 *
 * - Konkreter Barber: Lookup in `calLinks[barberId][serviceId]`.
 * - „Beliebiger Barber" (barberId === 'any'): Lookup im Team-/Round-Robin-Mapping
 *   `anyBarberLinks[serviceId]`.
 *
 * Gibt `null` zurück, wenn keine passende Buchung hinterlegt ist.
 */
export function getCalLink(
  barberId: string | null,
  serviceId: string | null,
): string | null {
  if (!barberId || !serviceId) return null;

  // „Beliebiger Barber": auf den Team-/Round-Robin-Event mappen.
  // Leerer String = noch nicht konfiguriert -> null (kein stiller Fehlschlag).
  if (barberId === 'any') {
    return anyBarberLinks[serviceId] || null;
  }

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
