import clsx from 'clsx';

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: Props) {
  return (
    <header
      className={clsx(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={clsx(
            'flex items-center gap-3 text-eyebrow uppercase text-copper',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-8 bg-copper/60" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={clsx(
          'font-display uppercase text-display-md text-cream',
          eyebrow ? 'mt-6' : '',
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={clsx(
            'mt-5 text-base md:text-lg leading-relaxed text-cream/65',
            align === 'center' && 'mx-auto max-w-xl',
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
