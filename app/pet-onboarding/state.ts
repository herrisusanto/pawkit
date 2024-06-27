import { PetType } from "@/api/graphql/API";
import { atom } from "jotai";

type petOnboardingAtomType = {
  petId?: string | null;
  petType?: PetType | null;
};

export const petOnboardingAtom = atom<petOnboardingAtomType>({
  petId: null,
  petType: null,
});
