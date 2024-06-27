import { VaccinationIcon } from "@/components/common/Icons";
import { SelectedAddonsQuantity } from "@/components/services/selected-addons-quantity/SelectedAddonsQuantity";
import { SelectedServicesQuantity } from "@/components/services/selected-services-quantity/SelectedServicesQuantity";
import { useServiceBookingAtom } from "@/hooks";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { Text, View, XStack, YStack } from "tamagui";

export function Service() {
  const serviceAtom = useServiceBookingAtom();
  const selectedPetsServices = useAtomValue(serviceAtom);
  const hasSelectedAddons = useMemo(() => {
    return (
      selectedPetsServices.reduce((prevValue, service) => {
        return service.addons.length + prevValue;
      }, 0) > 0
    );
  }, [selectedPetsServices]);

  return (
    <YStack bg="#fff" p="$5" rowGap="$3">
      <Text fontSize="$b3" fontWeight="$6">
        Service
      </Text>
      <View py="$3.5" px="$5" bc="$natural0" bw="$0.5" br="$3">
        <YStack rowGap="$3.5">
          <XStack ai="center" columnGap="$3">
            <View w={45} h={45}>
              <VaccinationIcon />
            </View>
            <Text fontSize="$b3" fontWeight="$5">
              Pet Vaccination
            </Text>
          </XStack>
          <Text fontSize="$c1" fontWeight="$7">
            Selected Vaccination
          </Text>
          <SelectedServicesQuantity selectedServices={selectedPetsServices} />
          {hasSelectedAddons && (
            <>
              <Text fontSize="$c1" fontWeight="$7">
                Add-Ons
              </Text>
              <SelectedAddonsQuantity selectedServices={selectedPetsServices} />
            </>
          )}
        </YStack>
      </View>
    </YStack>
  );
}
