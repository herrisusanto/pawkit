import { selectedGroomingServicesAtom } from "@/atoms/services/selected-grooming-services.atom";
import { selectedVaccinationServicesAtom } from "@/atoms/services/selected-vaccination-services.atom";
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
