'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  stepLabel: string;
  total?: number;
  current: number;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function StepFrame({
  stepLabel,
  current,
  total = 4,
  title,
  description,
  children,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={current}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: reduce ? 0.15 : 0.45, ease }}
      className="flex flex-col h-full"
    >
      <header className="mb-7 md:mb-9">
        <div className="flex items-center gap-3 text-eyebrow uppercase text-copper">
          <span className="numeric-marker italic text-base">
            {String(current).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-copper/60" />
          <span>
            Schritt {current} von {total}
          </span>
          <span className="text-muted">·</span>
          <span className="text-cream/65">{stepLabel}</span>
        </div>
        <h3 className="mt-4 font-display tracking-tight text-3xl md:text-4xl text-cream leading-[1.05]">
          {title}
        </h3>
        {description && (
          <p className="mt-3 text-cream/65 leading-relaxed max-w-lg">
            {description}
          </p>
        )}
      </header>

      <div className="flex-1 min-h-0">{children}</div>
    </motion.div>
  );
}
