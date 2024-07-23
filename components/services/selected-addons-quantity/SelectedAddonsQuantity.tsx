import { Pet, Service } from "@/api/graphql/API";
import { fetchPetsByCustomer } from "@/api/pet";
import { fetchServices } from "@/api/service-booking";
import { getCustomPrice } from "@/components/price-details-sheet/utils";
import { useCurrentUser } from "@/hooks";
import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { XStack, Text, YStack } from "tamagui";
import { ExtraPrices } from "../selected-services-quantity/SelectedServicesQuantity";

type ServicesFilterType = {
  id?: { eq?: string };
  name?: { eq?: string };
};

type SelectedAddonsQuantityProps = {
  selectedServices?: SelectedPetServiceType[];
};

export const SelectedAddonsQuantity: React.FC<SelectedAddonsQuantityProps> = ({
  selectedServices,
}) => {
  // To get all services addons ID's
  const addonIds = useMemo(() => {
    const ids = [] as ServicesFilterType[];
    selectedServices?.forEach((service) => {
      service.addons.forEach((addon) => ids.push({ id: { eq: addon } }));
    });
    return ids;
  }, [selectedServices]);

  const { data: user } = useCurrentUser();
  const petIds = useMemo(() => {
    return selectedServices?.map((service) => ({
      name: { eq: service.petId },
    }));
  }, [selectedServices]);

  const { data: servicesData } = useQuery({
    queryKey: ["services", addonIds],
    queryFn: () => fetchServices({ filter: { or: addonIds } }),
  });

  const { data: petsData } = useQuery({
    queryKey: ["pets", user?.userId, petIds],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  const addonsQuantity = useMemo(() => {
    const quantity: {
      [key: string]: {
        quantity: number;
        name: string;
        price: number;
        extraPrices: ExtraPrices[];
      };
    } = {};
    const extraPrices: ExtraPrices[] = [];
    const addonPetIds = selectedServices?.reduce<
      { id: string; petId?: string | null }[]
    >((prevArray, service) => {
      const addons = service.addons.map((id) => ({
        id,
        petId: service.petId,
      }));
      return [...prevArray, ...addons];
    }, []);

    addonPetIds?.forEach((addon) => {
      const addonData = servicesData?.find(
        (service: any) => service.id === addon.id
      );
      const addonQty = addonPetIds.filter(
        (addonPet) => addonPet.id === addon.id
      ).length;

      const pet = petsData?.find((pet) => pet.id === addon.petId);
      const addonCustomPrice = getCustomPrice(pet as Pet, addonData as Service);

      if (addonCustomPrice) {
        const index = extraPrices.findIndex(
          (price) =>
            price.name === addonCustomPrice.name &&
            price.serviceName === addonCustomPrice.serviceName
        );
        if (index === -1) {
          const extraPrice = {
            ...addonCustomPrice,
            quantity: 1,
          };
          extraPrices.push(extraPrice);
        } else {
          const extraPrice = {
            ...addonCustomPrice,
            quantity: extraPrices[index].quantity + 1,
          };
          extraPrices[index] = extraPrice;
        }
      }
      const totalBasePrice = (addonData?.basePrice || 0) * addonQty;
      quantity[addon.id as string] = {
        quantity: addonQty,
        name: addonData?.name || "-",
        price: totalBasePrice,
        extraPrices,
      };
    });
    return quantity;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesData, petsData]);

  return Object.keys(addonsQuantity).map((key) => {
    const addonQty = addonsQuantity[key];
    const withAdditionalPrice = addonQty.extraPrices.length > 0;
    const additionalPrices = addonQty.extraPrices;
    return (
      <YStack key={key}>
        <XStack jc="space-between">
          <Text color="$textSecondary" fontSize="$c1" fontWeight="$5">
            {addonQty.quantity}x {addonQty.name}
          </Text>
          <Text color="$textSecondary" fontSize="$c1" fontWeight="$5">
            S$ {addonQty.price}
          </Text>
        </XStack>
        {withAdditionalPrice &&
          additionalPrices.map((additional) => {
            return (
              <YStack key={additional.name}>
                {additional.amount > 0 &&
                addonQty.name === additional.serviceName ? (
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
