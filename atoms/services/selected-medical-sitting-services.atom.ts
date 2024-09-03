import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { atom } from "jotai";

export const selectedMedicalSittingServicesAtom = atom<
  SelectedPetServiceType[]
>([]);
