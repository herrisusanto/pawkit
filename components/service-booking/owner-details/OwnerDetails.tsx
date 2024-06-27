import { Input } from "@/components/common/Input/Input";
import { InputNumber } from "@/components/common/InputNumber/InputNumber";
import { useUserAttributes } from "@/hooks";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Text, YStack } from "tamagui";

export function OwnerDetails() {
  const { control, setValue } = useFormContext();
  const userAttributes = useUserAttributes();

  useEffect(() => {
    if (userAttributes) {
      setValue("name", userAttributes.name);
      setValue("email", userAttributes.email);
      setValue("phone_number", userAttributes.phone_number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAttributes]);

  return (
    <YStack bg="#fff" p="$5" rowGap="$3.5">
      <Text fontSize="$b3" fontWeight="$6">
        Owner's Details
      </Text>
      <Input
        control={control}
        name="name"
        label="Name"
        placeholder="Input owner name"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        placeholder="Input owner email"
      />
      <InputNumber
        control={control}
        name="phone_number"
        prefix={<Text color="$natural0">+65</Text>}
        label="Phone Number"
        placeholder="Input owner phone number"
        inputProps={{ readOnly: true }}
      />
    </YStack>
  );
}
