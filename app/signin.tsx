import React, { useState } from "react";
import TopBanner from "@/components/signin/top-banner/TopBanner";
import {
  Heading,
  Text,
  styled,
  View,
  XStack,
  YStack,
  Sheet,
  ScrollView,
} from "tamagui";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { InputNumber } from "@/components/common/InputNumber/InputNumber";
import { Button } from "@/components/common/Button/Button";
import { Check } from "@tamagui/lucide-icons";
import { Dimensions, LogBox, TouchableOpacity } from "react-native";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import TncContent from "@/components/terms-and-condition/content/TncContent";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import PrivacyPolicyContent from "@/components/privacy-policy/content/PrivacyPolicyContent";

const { height } = Dimensions.get("window");

type SignInScreenProps = {
  onSubmit: SubmitHandler<FieldValues>;
  loading?: boolean;
};

const SignInScreen: React.FC<SignInScreenProps> = ({ onSubmit, loading }) => {
  // NOTE: TEMPORARY, FIX LATER
  LogBox.ignoreAllLogs();
  const { control, handleSubmit, formState } = useFormContext();
  const { isValid } = formState;
  const [open, setOpen] = useState<boolean>(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ScrollView>
        <SignInContainer>
          <TopBanner />
          <YStackContainer gap="$4">
            <YStack alignItems="center">
              <XStack gap="$1.5">
                <Heading fontSize="$b1">Welcome to</Heading>
                <Heading fontSize="$b1" color="$primary">
                  Pawkit
                </Heading>
              </XStack>

              <Text fontSize="$c2" color="$textSecondary">
                Sign in to continue
              </Text>
            </YStack>
            <YStack flex={1} width="100%" gap="$2">
              <Text fontSize="$c1" fontWeight="600">
                Phone Number
              </Text>
              <XStack gap="$2">
                <ReadOnlyInput>
                  <Text>+65</Text>
                </ReadOnlyInput>
                <InputNumber
                  disabled
                  name="phone_number"
                  control={control}
                  flex={1}
                  placeholder="Input phone number"
                  rules={{
                    required: "Phone number is required",
                    pattern: /^\d{8}$/,
                  }}
                />
              </XStack>
              <Text fontSize="$c2" color="$textThirdy">
                Example: +6588540207
              </Text>
            </YStack>
            <YStack width="100%" pb="$2" gap="$4">
              <XStack gap="$2">
                <Controller
                  control={control}
                  name="terms_and_conditions"
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      defaultChecked={field.value || false}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    >
                      <Checkbox.Indicator bg="$primary" br="$3">
                        <Check color="#fff" />
                      </Checkbox.Indicator>
                    </Checkbox>
                  )}
                />
                <YStack>
                  <XStack>
                    <Text fontSize="$c1" fontWeight="$6">
                      I consent to the{" "}
                    </Text>
                    <TouchableOpacity onPress={handleOpen}>
                      <Text fontSize="$c1" color="$primary" fontWeight="$7">
                        Terms of Use{" "}
                      </Text>
                    </TouchableOpacity>
                    <Text>and the </Text>
                  </XStack>
                  <XStack>
                    <TouchableOpacity
                      onPress={() => setOpenPrivacyPolicy(true)}
                    >
                      <Text fontSize="$c1" color="$primary" fontWeight="$7">
                        Privacy Policy{" "}
                      </Text>
                    </TouchableOpacity>
                    <Text>of Pawkit</Text>
                  </XStack>
                </YStack>
              </XStack>
              <Button
                onPress={handleSubmit(onSubmit)}
                type="primary"
                disabled={!isValid}
                loading={loading}
              >
                Sign In
              </Button>
            </YStack>
          </YStackContainer>
        </SignInContainer>
      </ScrollView>
      <Sheet
        open={open}
        snapPointsMode="percent"
        snapPoints={[70, 50]}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        modal
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <YStack>
            <XStack px="$4" py="$3" jc="space-between">
              <XStack ai="center" columnGap="$3.5">
                <Text fontSize="$b2" fontWeight="$6">
                  Terms of Use
                </Text>
              </XStack>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <CloseOutlinedIcon />
              </TouchableOpacity>
            </XStack>
          </YStack>
          <Sheet.ScrollView>
            <TncContent />
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
      <Sheet
        open={openPrivacyPolicy}
        snapPointsMode="percent"
        snapPoints={[70, 50]}
        onOpenChange={setOpenPrivacyPolicy}
        dismissOnSnapToBottom
        modal
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <YStack>
            <XStack px="$4" py="$3" jc="space-between">
              <XStack ai="center" columnGap="$3.5">
                <Text fontSize="$b2" fontWeight="$6">
                  Privacy Policy
                </Text>
              </XStack>
              <TouchableOpacity onPress={() => setOpenPrivacyPolicy(false)}>
                <CloseOutlinedIcon />
              </TouchableOpacity>
            </XStack>
          </YStack>
          <Sheet.ScrollView>
            <PrivacyPolicyContent />
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const SignInContainer = styled(View, {
  flex: 1,
});

const YStackContainer = styled(YStack, {
  flex: 1,
  width: "100%",
  marginTop: -15,
  padding: 16,
  backgroundColor: "#fff",
  borderTopRightRadius: 24,
  borderTopLeftRadius: 24,
  height: height - 281 + 15,
  alignItems: "center",
});

const ReadOnlyInput = styled(View, {
  borderRadius: "$2",
  borderColor: "#BDBDBD",
  borderWidth: 1,
  justifyContent: "center",
  paddingHorizontal: "$3",
  bg: "#FCFCFC",
  height: 42,
});

export default SignInScreen;
