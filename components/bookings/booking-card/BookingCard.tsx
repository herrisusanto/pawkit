import { Image, Text, View, XStack, YStack } from "tamagui";
import { images } from "@/constants";
import moment from "moment";
import { Booking } from "@/api/graphql/API";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";

type BookingCardProps = {
  data?: Booking;
};

const renderStatus = (status: string = "pending") => {
  const statusLowerCase = status.toLowerCase();
  if (statusLowerCase === "completed" || statusLowerCase === "confirmed") {
    return (
      <View bg="#ECFDF3" ai="center" jc="center" py="$1" px="$2.5" br="$12">
        <Text fontSize="$c1" fontWeight="$5" color="#027A48">
          {status.toUpperCase()}
        </Text>
      </View>
    );
  } else if (statusLowerCase === "pending") {
    return (
      <View bg="$yellow4" ai="center" jc="center" py="$1" px="$2.5" br="$12">
        <Text fontSize="$c1" fontWeight="$5" color="$yellow11">
          {status.toUpperCase()}
        </Text>
      </View>
    );
  } else if (statusLowerCase === "cancelled") {
    return (
      <View bg="$red4" ai="center" jc="center" py="$1" px="$2.5" br="$12">
        <Text fontSize="$c1" fontWeight="$5" color="$red">
          {status.toUpperCase()}
        </Text>
      </View>
    );
  }
};

const BookingCard: React.FC<BookingCardProps> = ({ data }) => {
  return (
    <View
      paddingVertical="$2"
      paddingHorizontal="$3"
      borderWidth="$0.5"
      borderColor="$textFourty"
      borderRadius="$4"
      backgroundColor="$background"
    >
      <XStack jc="space-between" ai="center">
        <XStack alignItems="center" gap="$1">
          <Image
            source={{
              uri: images.tempServiceImg,
              width: 50,
              height: 50,
            }}
            height={50}
            width={50}
          />
          <YStack>
            <Text fontSize="$b3" fontWeight="$5">
              {data?.serviceName}
            </Text>
            <Text fontSize="$c2" fontWeight="$4" color="$textSecondary">
              {data?.startDateTime &&
                moment(data.startDateTime).format("DD MMM h:mm A")}
            </Text>
          </YStack>
        </XStack>
        {renderStatus(data?.status)}
      </XStack>
      <XStack gap="$1" alignItems="center">
        <View width={50} height={50} ai="center" jc="center">
          <Image
            source={{
              uri:
                data?.pets?.items[0]?.pet?.imageUrl ||
                petDefaultAvatar(data?.petType),
              width: 50,
              height: 50,
            }}
            borderRadius={200}
            height={35}
            width={35}
          />
        </View>
        <YStack>
          <Text fontSize="$b3" fontWeight="$5">
            {data?.pets?.items[0]?.pet?.name}
          </Text>
          <Text fontSize="$c2" fontWeight="$4" color="$textSecondary">
            {data?.pets?.items[0]?.pet?.birthdate}
          </Text>
        </YStack>
      </XStack>
    </View>
  );
};

export default BookingCard;
