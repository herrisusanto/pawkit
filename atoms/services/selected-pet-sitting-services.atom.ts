import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { atom } from "jotai";

export const selectedPetSittingServicesAtom = atom<SelectedPetServiceType[]>(
  []
);
