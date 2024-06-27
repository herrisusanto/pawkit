import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import PaymentMethodForm from "@/components/service-booking/payment-method-form/PaymentMethodForm";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { View } from "tamagui";

const SelectPaymentMethod = () => {
  const form = useForm();
  const router = useRouter();
  const { serviceName } = useLocalSearchParams();

  const submitHandler: SubmitHandler<FieldValues> = (values) => {
    console.log(values);
    router.push(`/service-booking/${serviceName}/payment-confirmation`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Select Payment Method" />;
          },
        }}
      />

      <FormProvider {...form}>
        <PaymentMethodForm />
      </FormProvider>
      <View py="$8" px="$3" bg="#fff">
        <Button type="primary" onPress={form.handleSubmit(submitHandler)}>
          Continue
        </Button>
      </View>
    </>
  );
};

export default SelectPaymentMethod;
