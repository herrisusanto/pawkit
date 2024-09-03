import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { atom } from "jotai";

export const selectedPetTransportServicesAtom = atom<SelectedPetServiceType[]>(
  []
);
