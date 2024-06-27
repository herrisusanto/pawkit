import React, { useEffect, useMemo, useState } from "react";
import { Link, router, Stack, usePathname } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import {
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  getToken,
  styled,
} from "tamagui";
import { PetAvatar } from "@/components/services/pet-avatar/PetAvatar";
import { AddNewPet } from "@/components/bookings/add-new-pet/AddNewPet";
import ServiceCard from "@/components/services/service-card/ServiceCard";
import ServiceCardAddon from "@/components/services/service-card-addon/ServiceCardAddon";
import { TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks";
import { fetchPetsByCustomer } from "@/api/pet";
import { fetchServices } from "@/api/service";
import { Pet, Service, ServiceCategory } from "@/api/graphql/API";
import { useAtom } from "jotai";
import { selectedGroomingServicesAtom } from "@/atoms/services/selected-grooming-services.atom";
import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { PriceDetailsSheet } from "@/components/price-details-sheet/PriceDetailsSheet";

const GroomingScreen = () => {
  const pathname = usePathname();
  const [selectedPetId, setSelectedPetId] = useState<string>();
  const [selectedPetsService, setSelectedPetsService] = useAtom(
    selectedGroomingServicesAtom
  );
  const { data: user } = useCurrentUser();
  const { data: pets } = useQuery({
    queryKey: ["pets", user?.userId],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });
  const selectedPet = useMemo(() => {
    return pets?.find((pet) => pet.name === selectedPetId);
  }, [selectedPetId, pets]);
  const { data: services } = useQuery({
    queryKey: [
      "services",
      user?.userId,
      ServiceCategory.GROOMING,
      selectedPet?.petType,
    ],
    queryFn: () =>
      fetchServices({
        filter: {
          serviceCategory: { eq: ServiceCategory.GROOMING },
          petType: { eq: selectedPet?.petType },
        },
      }),
    enabled: !!selectedPet,
  });
  const selectedService = useMemo(() => {
    const selectedPetService = selectedPetsService.find(
      (petService) => petService.petId === selectedPetId
    );
    return services?.find(
      (service) => service.id === selectedPetService?.serviceId
    );
  }, [selectedPetsService, services, selectedPetId]);
  const selectedServiceAddons = useMemo(() => {
    return services?.filter((service) =>
      selectedService?.childServiceIds?.includes(service.id)
    );
  }, [services, selectedService]);
  const selectedPetService = useMemo(
    () => selectedPetsService.find((item: any) => item.petId === selectedPetId),
    [selectedPetsService, selectedPetId]
  );
  const renderPetServices = useMemo(() => {
    const sortedServices = services?.sort((a, b) => {
      if (a.displayPriority && b.displayPriority)
        return a.displayPriority - b.displayPriority;
      return 0;
    });
    if (sortedServices && selectedPetService && selectedPetService?.serviceId) {
      return sortedServices
        ?.sort((a, b) => {
          if (a.displayPriority && b.displayPriority)
            return a.displayPriority - b.displayPriority;
          return 0;
        })
        .filter((service) => selectedPetService?.serviceId === service.id)
        .map((service, i) => {
          return (
            <ServiceCard
              key={i}
              data={service as Service}
              isSelected={selectedPetService?.serviceId === service.id}
              onSelected={() =>
                handleAddService(selectedPetId as string, service.id)
              }
              removeSelected={() =>
                handleRemoveService(selectedPetId as string, service.id)
              }
            />
          );
        });
    } else if (services) {
      return services
        .filter((service) => !service.parentServiceIds)
        ?.map((service, i) => {
          return (
            <ServiceCard
              key={i}
              data={service as Service}
              isSelected={selectedPetService?.serviceId === service.id}
              onSelected={() =>
                handleAddService(selectedPetId as string, service.id)
              }
              removeSelected={() =>
                handleRemoveService(selectedPetId as string, service.id)
              }
            />
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPetId, selectedPetService, services]);

  const handleAddService = (petId: string, serviceId: string) => {
    const newMapping = services
      ?.filter((service) => service.id === serviceId)
      .map(() => {
        return {
          petId,
          serviceId,
          addons: [],
        };
      }) as SelectedPetServiceType[];

    setSelectedPetsService((prev) => [...prev, ...newMapping]);
  };

  const handleRemoveService = (petId: string, serviceId: string) => {
    setSelectedPetsService((prev) =>
      prev.filter((service) => service.petId !== petId)
    );
  };

  const handleAddonChange = (checked: boolean, addonId: string) => {
    if (checked) {
      const newMapping = Array.from(selectedPetsService).map((petService) => {
        if (petService.petId === selectedPetId) {
          return { ...petService, addons: [...petService.addons, addonId] };
        }
        return petService;
      });
      setSelectedPetsService(newMapping);
    } else {
      setSelectedPetsService((prev) => {
        return prev.map((petService) => {
          if (petService.petId === selectedPetId) {
            return {
              ...petService,
              addons: petService.addons.filter((id) => id !== addonId),
            };
          }
          return petService;
        });
      });
    }
  };

  const handleOk = () => {
    router.push("/service-booking/grooming/enter-details");
  };

  useEffect(() => {
    if (pets?.length) {
      setSelectedPetId(pets[0].name);
    }
  }, [pets]);

  return (
    <View flex={1}>
      <SelectedPetWrapper>
        <Text fontSize="$c1">Selected Pet</Text>
        <XStack fw="wrap" columnGap="$5" rowGap="$4">
          {pets?.map((item) => {
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => setSelectedPetId(item.name)}
              >
                <PetAvatar
                  data={item as Pet}
                  isSelected={item.name === selectedPetId}
                />
              </TouchableOpacity>
            );
          })}
          <Link
            href={`/pet-onboarding/about-your-pet?from=${pathname}`}
            asChild
          >
            <AddNewPet />
          </Link>
        </XStack>
      </SelectedPetWrapper>
      <ScrollView>
        <YStack gap="$2" py="$2" pb={99 + getToken("$5", "space")}>
          <Stack.Screen
            options={{
              header() {
                return <Header title="Select Grooming" />;
              },
            }}
          />
          {renderPetServices}
          {selectedServiceAddons?.length ? (
            <YStack bg="$background">
              <Text fontSize="$b3" fontWeight="$7" px="$4" mt="$4">
                Add-Ons{" "}
                <Text fontSize="$c2" fontWeight="$4">
                  (Optional)
                </Text>
              </Text>
              {selectedServiceAddons?.map((addon) => (
                <React.Fragment key={addon.id}>
                  <ServiceCardAddon
                    data={addon as Service}
                    isChecked={selectedPetService?.addons.includes(addon.id)}
                    onCheckedChange={(checked) => {
                      handleAddonChange(checked, addon.id);
                    }}
                  />
                  <Separator />
                </React.Fragment>
              ))}
            </YStack>
          ) : null}
        </YStack>
      </ScrollView>
      <PriceDetailsSheet
        serviceName="grooming"
        onOk={handleOk}
        disabled={selectedPetsService.length === 0}
      />
    </View>
  );
};

const SelectedPetWrapper = styled(View, {
  px: "$4",
  py: "$3",
  bg: "$background",
  gap: "$3",
});

export default GroomingScreen;
