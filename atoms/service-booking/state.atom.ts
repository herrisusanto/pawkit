import { atom } from "jotai";

export const serviceBookingAtom = atom<{ orderId?: string }>({
  orderId: undefined,
});
