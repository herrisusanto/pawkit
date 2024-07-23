import { Input } from "@/components/common/Input/Input";
import { useUserAttributes } from "@/hooks";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Text, YStack } from "tamagui";
import { PetsSchedulesSheet } from "../pets-schedules-sheet/pets-schedules-sheet";

export function OrderDetails() {
  const { control, setValue } = useFormContext();
  const userAttributes = useUserAttributes();

  useEffect(() => {
    if (userAttributes) {
      setValue("address", userAttributes.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAttributes]);

  return (
    <YStack bg="#fff" p="$5" rowGap="$3.5">
      <Text fontSize="$b3" fontWeight="$6">
        Order Details
      </Text>
      <Input
        control={control}
        name="address"
        label="Please enter your full address, including postal code and unit number"
        placeholder="Input address"
        requiredMark
        rules={{ required: "Address is required" }}
      />
      <PetsSchedulesSheet />
    </YStack>
  );
}
