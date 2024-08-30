import { selectedDogWalkingServicesAtom } from "@/atoms/services/selected-dog-walking-services.atom";
import { selectedGroomingServicesAtom } from "@/atoms/services/selected-grooming-services.atom";
import { selectedMedicalSittingServicesAtom } from "@/atoms/services/selected-medical-sitting-services.atom";
import { selectedMicrochippingServicesAtom } from "@/atoms/services/selected-microchipping-services.atom";
import { selectedPetSittingServicesAtom } from "@/atoms/services/selected-pet-sitting-services.atom";
import { selectedPetTransportServicesAtom } from "@/atoms/services/selected-pet-transport-services.atom";
import { selectedVaccinationServicesAtom } from "@/atoms/services/selected-vaccination-services.atom";
import { selectedVetConsultServicesAtom } from "@/atoms/services/selected-vet-consult-services.atom";
import { selectedWellnessServicesAtom } from "@/atoms/services/selected-wellness-services.atom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";

export const useCurrentUser = () => {
  const mutationGetCurrentUser = useMutation({
    mutationFn: getCurrentUser,
  });

  useEffect(() => {
    mutationGetCurrentUser.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mutationGetCurrentUser;
};

export const useUserAttributes = () => {
  const { data: userAttributes } = useQuery({
    queryKey: ["user_attributes"],
    queryFn: fetchUserAttributes,
  });

  return userAttributes;
};

export const useServiceBookingAtom = (serviceName: string) => {
  const serviceAtom = useMemo(() => {
    switch (serviceName) {
      case "vaccination":
        return selectedVaccinationServicesAtom;
      case "grooming":
        return selectedGroomingServicesAtom;
      case "medical-sitting":
        return selectedMedicalSittingServicesAtom;
      case "vet-consult":
        return selectedVetConsultServicesAtom;
      case "wellness":
        return selectedWellnessServicesAtom;
      case "dog-walking":
        return selectedDogWalkingServicesAtom;
      case "pet-sitting":
        return selectedPetSittingServicesAtom;
      case "pet-transport":
        return selectedPetTransportServicesAtom;
      case "microchipping":
        return selectedMicrochippingServicesAtom;
      default:
        return selectedVaccinationServicesAtom;
    }
  }, [serviceName]);

  return serviceAtom;
};

export const useContinueServiceBookingAllowed = (serviceName: string) => {
  const serviceAtom = useServiceBookingAtom(serviceName);
  const selectedPetsServices = useAtomValue(serviceAtom);

  return useMemo(() => {
    return !selectedPetsServices.some((petService) => !petService.timeSlot);
  }, [selectedPetsServices]);
};
