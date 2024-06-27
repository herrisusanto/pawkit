import { CheckButtonGroup } from "@/components/common/CheckButtonGroup/CheckButtonGroup";
import { useFormContext } from "react-hook-form";
import { Platform } from "react-native";
import { ScrollView, Text, YStack } from "tamagui";
import PaymentOption from "../payment-option/PaymentOption";

const PaymentMethodForm = () => {
  const { control } = useFormContext();

  let directPaymentOptions = [
    {
      value: "PAYNOW_QR_CODE",
    },
    {
      value: "PAYNOW_TO_UEN",
    },
    {
      value: "GOOGLEPAY",
    },
    {
      value: "GRABPAY",
    },
  ];

  if (Platform.OS === "ios") {
    directPaymentOptions = [
      ...directPaymentOptions.slice(0, 2),
      {
        value: "APPLEPAY",
      },
      ...directPaymentOptions.slice(2),
    ];
  }

  const bankTransferPaymentOptions = [
    {
      value: "UOB",
    },
    {
      value: "AMEX",
    },
  ];

  const creditCardPaymentOptions = [
    {
      value: "VISA",
      children: "Visa",
    },
    {
      value: "MASTERCARD",
    },
  ];

  return (
    <ScrollView>
      <YStack flex={1} bg="$accent0" rowGap="$5" px="$5" py="$8">
        {/** Direct Payment */}
        <YStack rowGap="$3">
          <Text fontSize="$c1" fontWeight="$5">
            Direct Payment
          </Text>
          <YStack rowGap="$3">
            <CheckButtonGroup
              control={control}
              name="payment_method"
              multiple={false}
              items={directPaymentOptions}
              renderItem={({ children, value, checked, onChange }) => (
                <PaymentOption
                  key={value}
                  label={children as string}
                  value={value}
                  checked={checked}
                  onChange={onChange}
                />
              )}
            />
          </YStack>
        </YStack>
        {/** Bank Transfer */}
        <YStack rowGap="$3">
          <Text fontSize="$c1" fontWeight="$5">
            Bank Transfer
          </Text>
          <YStack rowGap="$3">
            <CheckButtonGroup
              control={control}
              name="payment_method"
              multiple={false}
              items={bankTransferPaymentOptions}
              renderItem={({ children, value, checked, onChange }) => (
                <PaymentOption
                  key={value}
                  label={children as string}
                  value={value}
                  checked={checked}
                  onChange={onChange}
                />
              )}
            />
          </YStack>
        </YStack>
        {/** Credit Card */}
        <YStack rowGap="$3">
          <Text fontSize="$c1" fontWeight="$5">
            Credit Card
          </Text>
          <YStack rowGap="$3">
            <CheckButtonGroup
              control={control}
              name="payment_method"
              multiple={false}
              items={creditCardPaymentOptions}
              renderItem={({ children, value, checked, onChange }) => (
                <PaymentOption
                  key={value}
                  label={children as string}
                  value={value}
                  checked={checked}
                  onChange={onChange}
                />
              )}
            />
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default PaymentMethodForm;
