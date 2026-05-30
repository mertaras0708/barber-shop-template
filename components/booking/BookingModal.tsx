'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useBooking, useMounted } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';

import Logo from '../Logo';
import BookingProgress from './BookingProgress';
import BookingSidebar from './BookingSidebar';
import BookingFooter from './BookingFooter';

import ServiceSelector from './steps/ServiceSelector';
import BarberSelector from './steps/BarberSelector';
import DatePicker from './steps/DatePicker';
import TimeSlotSelector from './steps/TimeSlotSelector';
import CustomerDetailsForm from './steps/CustomerDetailsForm';
import BookingSummary from './steps/BookingSummary';
import BookingSuccess from './steps/BookingSuccess';

const ease = [0.16, 1, 0.3, 1] as const;

export default function BookingModal() {
  const { state, close } = useBooking();
  const mounted = useMounted();
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Fokus beim Öffnen auf den Dialog setzen
  useEffect(() => {
    if (state.isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [state.isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          key="booking-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-[100] flex items-stretch md:items-center md:justify-center md:p-6"
          role="presentation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Modal schließen"
            onClick={close}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md cursor-default"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: reduce ? 0.15 : 0.5, ease }}
            className="
              relative w-full md:w-[min(96vw,1100px)] md:h-[min(92vh,820px)]
              h-[100dvh] bg-ink border-cream/12 md:border
              flex flex-col overflow-hidden
              shadow-2xl shadow-black/60
            "
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 md:py-5 border-b border-cream/10">
              <div className="flex items-center gap-4 min-w-0">
                <Logo />
                <span className="hidden md:inline-block h-5 w-px bg-cream/15" />
                <h2
                  id="booking-title"
                  className="hidden md:block font-serif text-lg text-cream truncate"
                >
                  Termin buchen
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Schließen"
                className="inline-flex items-center justify-center h-10 w-10 -mr-2 border border-cream/15 text-cream/85 hover:text-copper hover:border-copper transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Progress */}
            {state.phase !== 'success' && <BookingProgress />}

            {/* Body */}
            {state.phase === 'success' ? (
              <div className="flex-1 overflow-y-auto px-5 md:px-10 py-6">
                <BookingSuccess />
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-0">
                {/* Sidebar */}
                <div className="hidden lg:block border-r border-cream/10 px-7 py-8 overflow-y-auto">
                  <BookingSidebar />
                </div>

                {/* Mobile compact recap */}
                <MobileSummaryChip />

                {/* Step content */}
                <div className="relative flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto px-5 md:px-10 py-6 md:py-8">
                    <AnimatePresence mode="wait">
                      <StepRouter key={state.step} />
                    </AnimatePresence>
                  </div>
                  <BookingFooter />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function StepRouter() {
  const { state } = useBooking();
  switch (state.step) {
    case 1:
      return <ServiceSelector />;
    case 2:
      return <BarberSelector />;
    case 3:
      return <DatePicker />;
    case 4:
      return <TimeSlotSelector />;
    case 5:
      return <CustomerDetailsForm />;
    case 6:
      return <BookingSummary />;
    default:
      return null;
  }
}

function MobileSummaryChip() {
  const { state } = useBooking();
  const hasAny = state.serviceId || state.barberId || state.date;
  if (!hasAny) return null;

  const service = services.find((s) => s.id === state.serviceId);
  const barber =
    state.barberId === 'any'
      ? 'Beliebig'
      : team.find((b) => b.id === state.barberId)?.name;

  const parts: React.ReactNode[] = [];
  if (service) parts.push(<span key="s" className="text-cream">{service.title}</span>);
  if (barber) parts.push(<span key="b" className="text-cream/85">{barber}</span>);
  if (state.date) parts.push(<span key="d" className="text-cream/85">{state.date}</span>);
  if (state.time) parts.push(<span key="t" className="text-copper">{state.time}</span>);

  return (
    <div className="lg:hidden border-b border-cream/10 px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
      {parts.map((p, i) => (
        <span key={i} className="inline-flex items-center gap-4">
          {i > 0 && (
            <span className="h-3 w-px bg-cream/15" aria-hidden />
          )}
          {p}
        </span>
      ))}
    </div>
  );
}
