import { Booking } from "@/api/graphql/API";
import { GroomingIcon } from "@/components/common/Icons";
import { images } from "@/constants";
import { Avatar, Image, Text, View, XStack, YStack } from "tamagui";
import moment from "moment";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { ListSlider } from "@/components/common/ListSlider/ListSlider";
import { Link } from "expo-router";
import { fetchBookingsByCustomer } from "@/api/service-booking";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks";
import BookingCard from "@/components/bookings/booking-card/BookingCard";

export const UpcomingBooking = () => {
  const { data: user } = useCurrentUser();

  const { data: bookings } = useQuery({
    queryKey: ["bookings", user?.userId],
    queryFn: () => fetchBookingsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  return (
    <YStack bg="#fff" pt="$5" pb="$3" rowGap="$4">
      <XStack px="$5" jc="space-between" ai="center">
        <Text fontSize="$b2" fontWeight="$7">
          Upcoming Booking
        </Text>
      </XStack>
      {bookings?.length > 0 ? (
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
            <View width={50} height={50}>
              <GroomingIcon />
            </View>
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
            {Array.from(data?.pets?.items || []).map((petBooking) => {
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
                <XStack key={data?.id} columnGap={8} px="$5" ai="center">
                  <Avatar size={35} circular>
                    <Avatar.Image
                      src={
                        petBooking?.pet.imageUrl ||
                        petDefaultAvatar(petBooking?.pet.petType)
                      }
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
            })}
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
            source={{ uri: images.catNapImg, width: 116, height: 74 }}
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
