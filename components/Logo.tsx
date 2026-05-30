import clsx from 'clsx';

type Props = {
  className?: string;
  variant?: 'horizontal' | 'stacked';
};

export default function Logo({ className, variant = 'horizontal' }: Props) {
  if (variant === 'stacked') {
    return (
      <div className={clsx('inline-flex flex-col leading-none', className)}>
        <span className="font-display text-3xl uppercase tracking-[0.02em] text-cream">
          NOIR
          <span className="mx-1 text-copper">&amp;</span>
          BLADE
        </span>
        <span className="mt-2 text-eyebrow text-muted uppercase">
          Premium Barbershop · Berlin
        </span>
      </div>
    );
  }

  return (
    <a
      href="#top"
      className={clsx(
        'group inline-flex items-center gap-3 leading-none',
        className,
      )}
      aria-label="NOIR & BLADE, Startseite"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 text-copper transition-transform duration-500 group-hover:rotate-[8deg]"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.25">
          <circle cx="16" cy="16" r="14.5" />
          <path d="M9 23 L23 9" />
          <path d="M9 9 L23 23" opacity="0.35" />
          <circle cx="16" cy="16" r="1.4" fill="currentColor" />
        </g>
      </svg>
      <span className="font-display text-xl uppercase tracking-[0.04em] text-cream">
        NOIR<span className="mx-0.5 text-copper">&amp;</span>BLADE
      </span>
    </a>
  );
}
