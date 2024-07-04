import { Button } from "@/components/common/Button/Button";
import { ArrowUpIcon, CloseOutlinedIcon } from "@/components/common/Icons";
import { fetchPetsByCustomer } from "@/api/pet";
import { fetchServices } from "@/api/service-booking";
import { useCurrentUser, useServiceBookingAtom } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { TouchableOpacity } from "react-native";
import { Sheet, Text, View, XStack, YStack, getToken } from "tamagui";
import { SelectedServicesQuantity } from "@/components/services/selected-services-quantity/SelectedServicesQuantity";
import { SelectedAddonsQuantity } from "@/components/services/selected-addons-quantity/SelectedAddonsQuantity";
import { useAtomValue } from "jotai";
import { PetAvatar } from "../services/pet-avatar/PetAvatar";
import { Pet, Service } from "@/api/graphql/API";
import { getAdditionalPrice } from "./utils";

type EstimatedPriceProps = {
  serviceName: string;
  title?: string;
  onOk?: () => void;
  okText?: string;
  loading?: boolean;
  disabled?: boolean;
};

type ServicesFilterType = {
  id?: { eq?: string };
  name?: { eq?: string };
};

export interface PriceDetailsSheetRef {
  estimatedPrice: number;
}

export const PriceDetailsSheet = forwardRef<
  PriceDetailsSheetRef,
  EstimatedPriceProps
>((props, ref) => {
  const {
    serviceName,
    title = "Estimated price",
    onOk,
    okText = "Confirm",
    loading,
    disabled,
  } = props;
  const { data: user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const serviceAtom = useServiceBookingAtom(serviceName as string);
  const selectedPetsServices = useAtomValue(serviceAtom);
  const petIds = useMemo(() => {
    return selectedPetsServices?.map((service) => ({
      name: { eq: service.petId },
    }));
  }, [selectedPetsServices]);

  // To get all services ID's
  const serviceIds = useMemo(() => {
    return selectedPetsServices?.map((service) => ({
      id: { eq: service.serviceId },
    })) as ServicesFilterType[];
  }, [selectedPetsServices]);

  // To get all services addons ID's
  const addonIds = useMemo(() => {
    const ids = [] as ServicesFilterType[];
    selectedPetsServices?.forEach((service) => {
      service.addons.forEach((addon) => ids.push({ id: { eq: addon } }));
    });
    return ids;
  }, [selectedPetsServices]);

  const { data: petsData } = useQuery({
    queryKey: ["pets", user?.userId, petIds],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  const { data: servicesData } = useQuery({
    queryKey: ["services", [...serviceIds, ...addonIds]],
    queryFn: () =>
      fetchServices({ filter: { or: [...serviceIds, ...addonIds] } }),
  });

  const estimatedPrice = useMemo(() => {
    return selectedPetsServices?.reduce((prevValue, selectedService) => {
      const service = servicesData?.find(
        (service: Service) => service.id === selectedService.serviceId
      );

      const pet = petsData?.find((pet) => pet.name === selectedService.petId);
      const additionalPrice = getAdditionalPrice(
        pet?.weightValue ?? 0,
        service as Service
      );

      const addonServicesPrice = selectedService.addons.reduce(
        (prevValue, serviceId) => {
          const addonService = servicesData?.find(
            (service: Service) => service.id === serviceId
          );
          const additionalAddOnPrice = getAdditionalPrice(
            pet?.weightValue ?? 0,
            addonService as Service
          );
          const addOnBasePrice = addonService?.basePrice || 0;
          return addOnBasePrice + additionalAddOnPrice + prevValue;
        },
        0
      );
      const basePrice = service?.basePrice || 0;
      return basePrice + additionalPrice + addonServicesPrice + prevValue;
    }, 0);
  }, [servicesData, selectedPetsServices, petsData]);

  const hasSelectedAddons = Object.entries(addonIds).length > 0;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPet = (petId: string) => {
    const pet = petsData?.find((pet) => pet.name === petId);
    return (
      <YStack key={petId} ai="center" maxWidth={35} rowGap="$2">
        <PetAvatar data={pet as Pet} size="$3" />
      </YStack>
    );
  };

  useImperativeHandle(ref, () => {
    return {
      estimatedPrice,
    };
  });

  return (
    <>
      <View
        shadowColor="#000"
        shadowOpacity={0.1}
        shadowRadius={10}
        h={99}
        position="absolute"
        bottom={0}
        w="$full"
        bg="#fff"
        mt="auto"
        p="$5"
        ai="center"
        jc="center"
        onPress={handleOpen}
      >
        <XStack w="$full" ai="center" jc="space-between">
          <YStack rowGap="$2.5">
            <XStack ai="center" columnGap="$2">
              <View h="$1.5" w="$1.5">
                <ArrowUpIcon />
              </View>
              <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                {title}
              </Text>
            </XStack>
            <View px={24 + getToken("$2", "space")}>
              <Text fontSize="$b3" fontWeight="$7" color="$textSecondary">
                S$ {estimatedPrice}
              </Text>
            </View>
          </YStack>
          <Button
            w="$full"
            loading={loading}
            maxWidth={157}
            type="primary"
            disabled={disabled}
            onPress={() => {
              onOk && onOk();
            }}
          >
            {okText}
          </Button>
        </XStack>
      </View>

      <Sheet
        open={open}
        snapPointsMode="mixed"
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        modal
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <Sheet.ScrollView>
            <YStack px="$5">
              <XStack py="$5" jc="space-between">
                <XStack ai="center" columnGap="$3.5">
                  <TouchableOpacity onPress={handleClose}>
                    <View h="$1.5" w="$1.5" rotate="180deg">
                      <ArrowUpIcon />
                    </View>
                  </TouchableOpacity>

                  <Text
                    fontSize="$b2"
                    fontWeight="$6"
                    textTransform="capitalize"
                  >
                    {title}
                  </Text>
                </XStack>
                <TouchableOpacity onPress={handleClose}>
                  <CloseOutlinedIcon />
                </TouchableOpacity>
              </XStack>
              <Text fontSize="$c1" fontWeight="$7">
                Selected Pets
              </Text>
              <YStack py="$3.5" rowGap="$3.5">
                <XStack columnGap="$4">
                  {selectedPetsServices?.map((service) =>
                    renderPet(service.petId as string)
                  )}
                </XStack>
                <Text fontSize="$c1" fontWeight="$7">
                  Selected Vaccination
                </Text>
                <SelectedServicesQuantity
                  selectedServices={selectedPetsServices}
                />
                {hasSelectedAddons && (
                  <>
                    <Text fontSize="$c1" fontWeight="$7">
                      Add-Ons
                    </Text>
                    <SelectedAddonsQuantity
                      selectedServices={selectedPetsServices}
                    />
                  </>
                )}
                <View flex={1} bw="$0.5" bc="$natural0" />
                <XStack jc="space-between">
                  <Text fontSize="$c1" fontWeight="$7">
                    Estimated Total Price
                  </Text>
                  <Text fontSize="$c1" fontWeight="$7">
                    S$ {estimatedPrice}
                  </Text>
                </XStack>
              </YStack>
              <View py="$6">
                <Button
                  h="$4"
                  type="primary"
                  disabled={disabled}
                  onPress={() => {
                    onOk && onOk();
                    setOpen(false);
                  }}
                >
                  {okText}
                </Button>
              </View>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
});
