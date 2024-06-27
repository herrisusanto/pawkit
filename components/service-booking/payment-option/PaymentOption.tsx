import { Image, XStack, View, Text } from "tamagui";
import { images } from "@/constants";

const PAYMENTS_IMAGES = {
  PAYNOW_QR_CODE: (
    <Image w={73} h={16} resizeMode="contain" src={images.paynow} />
  ),
  PAYNOW_TO_UEN: (
    <Image w={73} h={16} resizeMode="contain" src={images.paynow} />
  ),
  APPLEPAY: <Image w={38} h={16} resizeMode="contain" src={images.applepay} />,
  GOOGLEPAY: (
    <Image w={39} h={16} resizeMode="contain" src={images.googlepay} />
  ),
  GRABPAY: <Image w={60} h={16} resizeMode="contain" src={images.grabpay} />,
  UOB: <Image w={53} h={16} resizeMode="contain" src={images.uob} />,
  AMEX: <Image w={22} h={16} resizeMode="contain" src={images.amex} />,
  VISA: <Image w={50} h={16} resizeMode="contain" src={images.visa} />,
  MASTERCARD: (
    <Image w={65} h={16} resizeMode="contain" src={images.mastercard} />
  ),
};

const PAYMENTS_LABELS = {
  PAYNOW_QR_CODE: "PayNow QR Code",
  PAYNOW_TO_UEN: "PayNow To UEN",
  APPLEPAY: "Apple Pay",
  GOOGLEPAY: "Google Pay",
  GRABPAY: "Grab Pay",
  UOB: "United Overseas Bank",
  AMEX: "Amercian Express",
  VISA: "Visa",
  MASTERCARD: "Mastercard",
};

type PaymentOptionProps = {
  checked?: boolean;
  label?: string;
  value: string;
  onChange?: (value: string) => void;
};

const PaymentOption: React.FC<PaymentOptionProps> = ({
  label,
  value,
  checked,
  onChange,
}) => (
  <XStack
    w="$full"
    p="$3"
    jc="space-between"
    bc="$natural0"
    bw="$0.5"
    br="$2"
    ai="center"
    onPress={() => {
      onChange && onChange(value);
    }}
  >
    <XStack columnGap="$2" ai="center">
      <View w={73} h={16}>
        {PAYMENTS_IMAGES[value as keyof typeof PAYMENTS_IMAGES]}
      </View>
      <Text fontSize="$c1" fontWeight="$5">
        {PAYMENTS_LABELS[value as keyof typeof PAYMENTS_LABELS] || label}
      </Text>
    </XStack>
    <View
      bc={checked ? "$primary" : "$natural0"}
      bw="$0.5"
      w="$1"
      h="$1"
      br="$12"
      jc="center"
      ai="center"
      bg={checked ? "$primary" : "$colorTransparent"}
    >
      <View bc="#fff" bw="$0.5" w={12} h={12} br="$12" />
    </View>
  </XStack>
);

export default PaymentOption;
