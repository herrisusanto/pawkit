import { Image, Spinner, Text, View, XStack, YStack } from "tamagui";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { Booking } from "@/api/graphql/API";
import { downloadServiceImage } from "@/api/service-booking";
import { PetCard } from "./PetCard";

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
  const { data: image, isLoading } = useQuery({
    queryKey: ["service-image", data],
    queryFn: () => downloadServiceImage(data?.serviceId!),
    enabled: !!data,
  });

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
        <XStack alignItems="center" columnGap="$2">
          {isLoading ? (
            <View w={50} h={50} jc="center" ai="center">
              <Spinner color="$accent3" size="small" />
            </View>
          ) : (
            <Image
              key={data?.serviceId}
              source={{
                uri: image?.href,
                width: 50,
                height: 50,
              }}
              height={50}
              width={50}
              borderRadius="$2"
            />
          )}
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
      <PetCard
        pet={{
          id: data?.petIds[0],
          petType: data?.petType,
          name: data?.pets?.items[0]?.pet.name,
          birthdate: data?.pets?.items[0]?.pet.birthdate,
          s3ImageKey: data?.pets?.items[0]?.pet.s3ImageKey,
        }}
      />
    </View>
  );
};

export default BookingCard;
