import { Pet, Service } from "@/api/graphql/API";
import { fetchPetsByCustomer } from "@/api/pet";
import { fetchServices } from "@/api/service-booking";
import {
  getCustomPrice,
  ServiceCustomPrice,
} from "@/components/price-details-sheet/utils";
import { useCurrentUser } from "@/hooks";
import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { XStack, Text, YStack } from "tamagui";

type ServicesFilterType = {
  id?: { eq?: string };
  name?: { eq?: string };
};

type SelectedServicesQuantityProps = {
  selectedServices?: SelectedPetServiceType[];
};

export interface ExtraPrices extends ServiceCustomPrice {
  quantity: number;
}

export const SelectedServicesQuantity: React.FC<
  SelectedServicesQuantityProps
> = ({ selectedServices }) => {
  // To get all services ID's
  const serviceIds = useMemo(() => {
    return selectedServices?.map((service) => ({
      id: { eq: service.serviceId },
    })) as ServicesFilterType[];
  }, [selectedServices]);

  const { data: user } = useCurrentUser();
  const petIds = useMemo(() => {
    return selectedServices?.map((service) => ({
      name: { eq: service.petId },
    }));
  }, [selectedServices]);

  const { data: servicesData } = useQuery({
    queryKey: ["services", serviceIds],
    queryFn: () => fetchServices({ filter: { or: serviceIds } }),
  });

  const { data: petsData } = useQuery({
    queryKey: ["pets", user?.userId, petIds],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  const servicesQuantity = useMemo(() => {
    const quantity: {
      [key: string]: {
        quantity: number;
        name: string;
        price: number;
        extraPrices: ExtraPrices[];
      };
    } = {};

    const extraPrices: ExtraPrices[] = [];
    selectedServices?.forEach((service) => {
      const serviceData = servicesData?.find(
        (s: any) => s.id === service.serviceId
      );
      const pet = petsData?.find((pet) => pet.id === service.petId);

      const serviceCustomPrice = getCustomPrice(
        pet as Pet,
        serviceData as Service
      );
      if (serviceCustomPrice) {
        const index = extraPrices.findIndex(
          (price) =>
            price.name === serviceCustomPrice.name &&
            price.serviceName === serviceCustomPrice.serviceName
        );
        if (index === -1) {
          const extraPrice = {
            ...serviceCustomPrice,
            quantity: 1,
          };
          extraPrices.push(extraPrice);
        } else {
          const extraPrice = {
            ...serviceCustomPrice,
            quantity: extraPrices[index].quantity + 1,
          };
          extraPrices[index] = extraPrice;
        }
      }

      const serviceQty = selectedServices.filter(
        (s) => s.serviceId === service.serviceId
      ).length;

      const totalBasePrice = (serviceData?.basePrice || 0) * serviceQty;

      quantity[service.serviceId as string] = {
        quantity: serviceQty,
        name: serviceData?.name || "-",
        price: totalBasePrice,
        extraPrices,
      };
    });
    return quantity;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesData, petsData, selectedServices]);

  return Object.keys(servicesQuantity).map((key) => {
    const serviceQty = servicesQuantity[key];

    const withAdditionalPrice = serviceQty.extraPrices.length > 0;
    const additionalPrices = serviceQty.extraPrices;
    return (
      <YStack key={key}>
        <XStack jc="space-between">
          <Text color="$textSecondary" fontSize="$c1" fontWeight="$5">
            {serviceQty.quantity}x {serviceQty.name}
          </Text>
          <Text color="$textSecondary" fontSize="$c1" fontWeight="$5">
            S$ {serviceQty.price}
          </Text>
        </XStack>
        {withAdditionalPrice &&
          additionalPrices.map((additional) => {
            return (
              <YStack key={additional.name}>
                {additional.amount > 0 &&
                serviceQty.name === additional.serviceName ? (
                  <XStack jc="space-between" paddingLeft="$2">
                    <Text color="$textSecondary" fontSize="$c1" fontWeight="$5">
                      {additional.quantity}x {additional.name}
                    </Text>
                    <Text color="$textSecondary" fontSize="$c1" fontWeight="$5">
                      S$ {additional.quantity * additional.amount}
                    </Text>
                  </XStack>
                ) : null}
              </YStack>
            );
          })}
      </YStack>
    );
  });
};
