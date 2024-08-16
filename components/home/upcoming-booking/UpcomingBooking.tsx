import { Avatar, Image, Spinner, Text, View, XStack, YStack } from "tamagui";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";

import { Booking, PetBookings } from "@/api/graphql/API";
import { downloadPetImage } from "@/api/pet";
import { downloadServiceImage, fetchBookings } from "@/api/service-booking";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { ListSlider } from "@/components/common/ListSlider/ListSlider";
import BookingCard from "@/components/bookings/booking-card/BookingCard";
import { images } from "@/constants";
import { useCurrentUser } from "@/hooks";

export const UpcomingBooking = () => {
  const { data: user } = useCurrentUser();
  const currentDate = moment().format();
  const { data: bookings } = useQuery({
    queryKey: ["bookings", currentDate],
    queryFn: () =>
      fetchBookings({
        filter: {
          customerId: { eq: user?.userId },
          startDateTime: { ge: currentDate },
        },
      }),
    enabled: !!user,
  });

  return (
    <YStack bg="#fff" pt="$5" pb="$3" rowGap="$4">
      <XStack px="$5" jc="space-between" ai="center">
        <Text fontSize="$b2" fontWeight="$7">
          Upcoming Booking
        </Text>
      </XStack>
      {(bookings?.length || 0) > 0 ? (
        <ListSlider
          items={
            bookings
              ? bookings
                  ?.sort(
                    (a: Booking, b: Booking) =>
                      new Date(a.startDateTime).getTime() -
                      new Date(b.startDateTime).getTime()
                  )
                  .slice(0, 4)
                  .map((item: any) => ({
                    content: (
                      <Link href={`/bookings/${item.id}`} asChild>
                        <View px="$5">
                          <BookingCard key={item.id} data={item} />
                        </View>
                      </Link>
                    ),
                  }))
              : []
          }
        />
      ) : (
        <View px="$5">
          <NoUpcomingBooking />
        </View>
      )}
    </YStack>
  );
};

type UpcomingBookingItemProps = {
  data?: Booking;
  hidePet?: boolean;
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

export const UpcomingBookingItem = YStack.styleable<UpcomingBookingItemProps>(
  ({ data, hidePet, ...props }, ref) => {
    const { data: image, isLoading } = useQuery({
      queryKey: ["service-image", data?.serviceId],
      queryFn: () => downloadServiceImage(data?.serviceId!),
      enabled: !!data,
    });

    return (
      <YStack
        ref={ref}
        bw="$0.5"
        bc="$natural0"
        br="$4"
        py="$3.5"
        rowGap="$3.5"
        jc="center"
        {...props}
      >
        <XStack px="$3.5" jc="space-between" ai="center">
          <XStack ai="center" columnGap="$1.5">
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
                mr="$2"
              />
            )}
            <YStack rowGap="$2" maxWidth={160}>
              <Text
                fontSize="$b3"
                fontWeight="$5"
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {data?.serviceName}
              </Text>
              <Text
                fontSize="$c2"
                fontWeight="$4"
                color="$natural2"
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {data?.startDateTime &&
                  moment(data?.startDateTime).format("DD MMM hh:mm A")}
              </Text>
            </YStack>
          </XStack>
          {renderStatus(data?.status)}
        </XStack>
        {!hidePet && (
          <XStack>
            {Array.from(data?.pets?.items || []).map((petBooking) => (
              <PetCard key={petBooking?.id} petBooking={petBooking} />
            ))}
          </XStack>
        )}
      </YStack>
    );
  }
);

export const NoUpcomingBooking = YStack.styleable(({ ...props }, ref) => {
  return (
    <YStack
      ref={ref}
      bw="$0.5"
      bc="$natural0"
      br="$4"
      py="$3.5"
      rowGap="$3.5"
      {...props}
    >
      <XStack px="$3" jc="space-between" ai="center" columnGap="$3">
        <View>
          <Image
            source={{ uri: images.noBooking, width: 116, height: 74 }}
            height={74}
            width={116}
            resizeMode="contain"
          />
        </View>
        <YStack rowGap="$2" flex={1}>
          <Text fontSize="$b3" fontWeight="$6" numberOfLines={1}>
            No Active Bookings
          </Text>
          <Text
            fontSize="$c2"
            fontWeight="$4"
            color="$natural2"
            lineHeight={16.8}
          >
            You do not have any bookings yet, please select a service from the
            options below
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
});

type PetCardProps = {
  petBooking: PetBookings | null;
};

const PetCard = XStack.styleable<PetCardProps>(
  ({ petBooking, ...props }, ref) => {
    const { data: user } = useCurrentUser();

    const { data: petImage } = useQuery({
      queryKey: ["pet-image", user?.userId, petBooking?.petId],
      queryFn: () =>
        downloadPetImage(user?.userId as string, petBooking?.petId as string),
      enabled: !!user && !!petBooking,
    });

    const petBirthdateInMonths = moment().diff(
      moment(petBooking?.pet.birthdate),
      "months"
    );
    const petYearsOld = (petBirthdateInMonths / 12).toFixed();
    const petMonthsOld = (petBirthdateInMonths / 12)
      .toFixed(1)
      .toString()
      .split(".")[1]
      ?.slice(0, 1);
    return (
      <XStack key={props?.id} columnGap={8} px="$5" ai="center">
        <Avatar size={35} circular>
          <Avatar.Image
            src={petImage?.href ?? petDefaultAvatar(petBooking?.pet.petType)}
            resizeMode="cover"
            bg="$primary"
          />
        </Avatar>
        <YStack>
          <Text fontSize="$c1" fontWeight="$5">
            {petBooking?.pet.name}
          </Text>
          <Text fontSize="$c2" fontWeight="$4" color="$natural2">
            {petBooking?.pet.birthdate
              ? `${petYearsOld}y ${petMonthsOld}m`
              : "unknown"}
          </Text>
        </YStack>
      </XStack>
    );
  }
);
