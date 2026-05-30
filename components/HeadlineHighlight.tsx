import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  /** Slight 12° forward skew for "italic" feel using the condensed display
   *  font (Anton has no real italic cut, so we never want font-style: italic). */
  slant?: boolean;
  /** Sentence-case (z. B. Booking-Step-Headlines) statt UPPERCASE. */
  case?: 'upper' | 'inherit';
  className?: string;
};

/**
 * NOIR & BLADE Headline-Highlight.
 *
 * Konsistente Akzent-Spans für Headlines in der ganzen Site:
 *  - gleiche condensed Display-Schrift wie der umgebende Headline-Stack
 *  - Burnt-Copper-Farbe
 *  - optionaler 12°-Skew für "italic"-Anmutung ohne Serif zu sein
 *  - Erbt Größe & Line-Height vom Parent
 *
 * Niemals font-serif / italic / Playfair für Highlights — die Display-
 * Identität (Anton) muss erhalten bleiben.
 */
export default function HeadlineHighlight({
  children,
  slant = true,
  case: caseMode = 'upper',
  className,
}: Props) {
  return (
    <span
      className={clsx(
        'inline-block font-display text-copper tracking-tight align-baseline',
        caseMode === 'upper' && 'uppercase',
        slant && '-skew-x-[8deg]',
        className,
      )}
      // inline-block + skew = "italic" Effekt; durch sehr leichtes
      // negatives margin-right wird der rechte Buchstabe nicht abgeschnitten
      style={slant ? { marginRight: '0.05em' } : undefined}
    >
      {children}
    </span>
  );
}
