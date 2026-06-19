'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;
export type BookingPhase = 'form' | 'submitting' | 'success';

export type CustomerDraft = {
  name: string;
  phone: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
};

/**
 * Von Cal.com nach erfolgreicher Buchung gemeldete Termin-Details.
 * Alle Felder optional, da das Cal-Event-Payload je nach Embed-Version variiert.
 */
export type BookedDetails = {
  /** Booking-/Event-Titel, z. B. "Herrenhaarschnitt" */
  title?: string;
  /** ISO-Startzeitpunkt des Termins */
  startTime?: string;
  /** ISO-Endzeitpunkt des Termins */
  endTime?: string;
};

export type BookingState = {
  isOpen: boolean;
  step: BookingStep;
  phase: BookingPhase;
  serviceId: string | null;
  barberId: string | null;
  /** ISO YYYY-MM-DD */
  date: string | null;
  /** HH:mm */
  time: string | null;
  customer: CustomerDraft;
  /** Befüllt, sobald Cal.com eine Buchung bestätigt hat. */
  booking: BookedDetails | null;
};

const emptyCustomer: CustomerDraft = {
  name: '',
  phone: '',
  email: '',
  message: '',
  privacyAccepted: false,
};

const initialState: BookingState = {
  isOpen: false,
  step: 1,
  phase: 'form',
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
  customer: emptyCustomer,
  booking: null,
};

type Action =
  | { type: 'OPEN'; serviceId?: string | null; barberId?: string | null; step?: BookingStep }
  | { type: 'CLOSE' }
  | { type: 'RESET' }
  | { type: 'SET_STEP'; step: BookingStep }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SET_SERVICE'; id: string }
  | { type: 'SET_BARBER'; id: string }
  | { type: 'SET_DATE'; date: string }
  | { type: 'SET_TIME'; time: string }
  | { type: 'SET_CUSTOMER'; patch: Partial<CustomerDraft> }
  | { type: 'SET_PHASE'; phase: BookingPhase }
  | { type: 'SET_SUCCESS'; booking: BookedDetails };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'OPEN': {
      const serviceId =
        action.serviceId !== undefined ? action.serviceId : state.serviceId;
      const barberId =
        action.barberId !== undefined ? action.barberId : state.barberId;

      // Smart-Step: erster nicht-erfüllter Schritt, oder explicit
      let step: BookingStep = action.step ?? 1;
      if (!action.step) {
        if (!serviceId) step = 1;
        else if (!barberId) step = 2;
        else step = 3;
      }

      return {
        ...state,
        isOpen: true,
        phase: 'form',
        serviceId,
        barberId,
        step,
      };
    }
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'RESET':
      return { ...initialState };
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'NEXT':
      // Flow hat aktuell 4 Schritte: Service, Barber, Kontakt, Termin (Cal.com)
      return {
        ...state,
        step: Math.min(4, state.step + 1) as BookingStep,
      };
    case 'BACK':
      return {
        ...state,
        step: Math.max(1, state.step - 1) as BookingStep,
      };
    case 'SET_SERVICE':
      return { ...state, serviceId: action.id };
    case 'SET_BARBER':
      // Bei Barber-Wechsel Zeit verwerfen (Verfügbarkeit ändert sich)
      return { ...state, barberId: action.id, time: null };
    case 'SET_DATE':
      return { ...state, date: action.date, time: null };
    case 'SET_TIME':
      return { ...state, time: action.time };
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.patch } };
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'SET_SUCCESS':
      return { ...state, phase: 'success', booking: action.booking };
    default:
      return state;
  }
}

type BookingContextValue = {
  state: BookingState;
  open: (prefill?: { serviceId?: string | null; barberId?: string | null; step?: BookingStep }) => void;
  close: () => void;
  reset: () => void;
  goToStep: (step: BookingStep) => void;
  next: () => void;
  back: () => void;
  setService: (id: string) => void;
  setBarber: (id: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setCustomer: (patch: Partial<CustomerDraft>) => void;
  setPhase: (phase: BookingPhase) => void;
  /** Setzt phase='success' und speichert die von Cal.com gemeldeten Termin-Details. */
  setSuccess: (booking: BookedDetails) => void;
  /** Validierung des aktuellen Schritts */
  canAdvance: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isStepValid(state: BookingState): boolean {
  switch (state.step) {
    case 1:
      return !!state.serviceId;
    case 2:
      return !!state.barberId;
    case 3: {
      // Kontaktdaten – Name und E-Mail werden zur Vorbefüllung an Cal.com
      // weitergegeben, Telefon ist optional (Cal.com fragt es selbst ab).
      const c = state.customer;
      return (
        c.name.trim().length > 1 &&
        EMAIL_RE.test(c.email.trim()) &&
        c.privacyAccepted
      );
    }
    case 4:
      // Cal.com-Embed übernimmt die finale Datum-/Uhrzeitwahl und Buchung.
      return true;
    default:
      return true;
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const open: BookingContextValue['open'] = useCallback((prefill) => {
    dispatch({
      type: 'OPEN',
      serviceId: prefill?.serviceId,
      barberId: prefill?.barberId,
      step: prefill?.step,
    });
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({
      state,
      open,
      close: () => dispatch({ type: 'CLOSE' }),
      reset: () => dispatch({ type: 'RESET' }),
      goToStep: (step) => dispatch({ type: 'SET_STEP', step }),
      next: () => dispatch({ type: 'NEXT' }),
      back: () => dispatch({ type: 'BACK' }),
      setService: (id) => dispatch({ type: 'SET_SERVICE', id }),
      setBarber: (id) => dispatch({ type: 'SET_BARBER', id }),
      setDate: (date) => dispatch({ type: 'SET_DATE', date }),
      setTime: (time) => dispatch({ type: 'SET_TIME', time }),
      setCustomer: (patch) => dispatch({ type: 'SET_CUSTOMER', patch }),
      setPhase: (phase) => dispatch({ type: 'SET_PHASE', phase }),
      setSuccess: (booking) => dispatch({ type: 'SET_SUCCESS', booking }),
      canAdvance: isStepValid(state),
    }),
    [state, open],
  );

  // Body-Scroll sperren, wenn Modal offen
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = state.isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  // Escape schließt
  useEffect(() => {
    if (!state.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.isOpen]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within <BookingProvider>');
  }
  return ctx;
}

/** Praktischer Hook für Trigger-Buttons */
export function useOpenBooking() {
  const { open } = useBooking();
  return open;
}

/** Mounted-Guard für SSR-sichere Modale */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
