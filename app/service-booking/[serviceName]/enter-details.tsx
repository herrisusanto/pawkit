import { Header } from "@/components/common/Header/Header";
import { PriceDetailsSheet } from "@/components/price-details-sheet/PriceDetailsSheet";
import { OrderDetails } from "@/components/service-booking/order-details/OrderDetails";
import { OwnerDetails } from "@/components/service-booking/owner-details/OwnerDetails";
import { StepsIndicator } from "@/components/service-booking/steps-indicator/StepsIndicator";
import { useContinueServiceBookingAllowed } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAttributes } from "aws-amplify/auth";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { ScrollView, YStack, getToken } from "tamagui";

export default function () {
  const form = useFormContext();
  const { serviceName } = useLocalSearchParams();
  const allowed = useContinueServiceBookingAllowed(serviceName as string);
  const queryClient = useQueryClient();
  const mutationUpdateUserAttributes = useMutation({
    mutationFn: updateUserAttributes,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user_attributes"] });
    },
  });

  const watchName = form.watch("name");
  const watchEmail = form.watch("email");
  const watchAddress = form.watch("address");

  const handleOk: SubmitHandler<FieldValues> = async (values) => {
    try {
      if (!disableContinueButton()) {
        await mutationUpdateUserAttributes.mutateAsync({
          userAttributes: values,
        });
        router.push(`/service-booking/${serviceName}/required-questions`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disableContinueButton = () => {
    if (watchName && watchEmail && watchAddress && allowed) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          header() {
            return <Header title="Enter Details" />;
          },
        }}
      />
      <ScrollView bg="$accent0" showsVerticalScrollIndicator={false}>
        <YStack rowGap="$2" pb={99 + getToken("$5", "space")}>
          {/** Steps Indicator */}
          <StepsIndicator currentStep={1} />
          {/** Owner's Details */}
          <OwnerDetails />
          {/** Order Detail */}
          <OrderDetails />
        </YStack>
      </ScrollView>
      {/** Estimated Price */}
      <PriceDetailsSheet
        serviceName={serviceName as string}
        okText="Continue"
        onOk={form.handleSubmit(handleOk)}
        loading={mutationUpdateUserAttributes.isPending}
        disabled={disableContinueButton()}
      />
    </>
  );
}
