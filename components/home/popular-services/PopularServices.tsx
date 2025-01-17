import {
  GroomingIcon,
  HospiceCareIcon,
  MedicalSittingIcon,
  NursingIcon,
  VaccinationIcon,
  VetConsultIcon,
  WellnessIcon,
  PetTransportIcon,
  PetSittingIcon,
  MicrochippingIcon,
  DogWalkingIcon,
} from "@/components/common/Icons";
import { router } from "expo-router";
import { Dimensions, TouchableOpacity } from "react-native";
import { getToken, Text, View, XStack, YStack } from "tamagui";

const { width } = Dimensions.get("screen");

const serviceList = [
  {
    id: 1,
    name: "Grooming",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <GroomingIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/grooming",
    available: true,
  },
  {
    id: 2,
    name: "Vaccination",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <VaccinationIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/vaccination",
    available: true,
  },
  {
    id: 3,
    name: "Pet\nSitting",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <PetSittingIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/pet-sitting",
    available: true,
  },
  {
    id: 4,
    name: "Nursing",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <NursingIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/nursing",
    available: false,
  },
  {
    id: 5,
    name: "Wellness",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <WellnessIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/wellness",
    available: false,
  },
  {
    id: 6,
    name: "Dog Walking",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <DogWalkingIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/dog-walking",
    available: true,
  },

  {
    id: 7,
    name: "Vet\nConsult",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <VetConsultIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/vet-consult",
    available: true,
  },
  {
    id: 8,
    name: "Pet Transport",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <PetTransportIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/pet-transport",
    available: false,
  },
  {
    id: 9,
    name: "Microchipping",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <MicrochippingIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/microchipping",
    available: true,
  },
  {
    id: 10,
    name: "Medical Sitting",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <MedicalSittingIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/medical-sitting",
    available: false,
  },
  {
    id: 11,
    name: "Hospice Care",
    serviceIcon: (strokeColor: string, fillColor: string) => (
      <HospiceCareIcon strokeColor={strokeColor} fillColor={fillColor} />
    ),
    routePath: "/services/hospice-care",
    available: false,
  },
];

export const PopularServices = () => {
  return (
    <YStack bg="#fff" rowGap="$4" p="$5" pb="$6" mb="$3.5">
      <Text fontSize="$b2" fontWeight="$7">
        Popular Services
      </Text>
      <XStack fw="wrap" columnGap="$2" rowGap="$6">
        {serviceList
          .filter((service) => service.available)
          .map((item) => {
            const itemWidth = width - 69;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(item.routePath)}
                disabled={!item.available}
              >
                <YStack w={itemWidth / 4} rowGap="$1.5" ai="center" mt="$2">
                  {!item.available && (
                    <View
                      pos="absolute"
                      bg="$red9"
                      py="$1.5"
                      px="$2"
                      br="$5"
                      zIndex={99}
                      top={-5}
                      transform={[{ translateY: -12 }]}
                    >
                      <Text fontSize="$c3" color="$gray1">
                        Coming Soon
                      </Text>
                    </View>
                  )}

                  <View w={60} h={60}>
                    {item.serviceIcon(
                      item.available
                        ? undefined
                        : getToken("$natural0", "color"),
                      item.available ? undefined : getToken("$bgGrey", "color")
                    )}
                  </View>
                  <Text
                    fontSize="$c1"
                    fontWeight="$5"
                    maxWidth={75}
                    wordWrap="break-word"
                    textAlign="center"
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    color={item.available ? "$natural3" : "$natural0"}
                  >
                    {item.name}
                  </Text>
                </YStack>
              </TouchableOpacity>
            );
          })}
      </XStack>
    </YStack>
  );
};
