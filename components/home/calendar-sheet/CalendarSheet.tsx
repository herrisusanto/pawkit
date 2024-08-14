import { Button } from "@/components/common/Button/Button";
import { Calendar } from "@/components/common/Calendar/Calendar";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import { HOME_HEADER_HEIGHT, TABS_HEIGHT, images } from "@/constants";
import { Link, router } from "expo-router";
import moment, { Moment } from "moment";
import { useMemo, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Image, Sheet, Text, View, XStack, YStack } from "tamagui";
import { UpcomingBookingItem } from "../upcoming-booking/UpcomingBooking";
import { useQuery } from "@tanstack/react-query";
import { Booking } from "@/api/graphql/API";
import { fetchBookings } from "@/api/service-booking";
import { useCurrentUser } from "@/hooks";

const { height } = Dimensions.get("window");

type CalendarSheetProps = {
  open?: boolean;
  onClose?: () => void;
};

export const CalendarSheet: React.FC<CalendarSheetProps> = ({
  open,
  onClose,
}) => {
  const { data: user } = useCurrentUser();
  const [disableDrag, setDisableDrag] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const formattedSelectedDate = useMemo(() => {
    return selectedDate.format("YYYY-MM-DD");
  }, [selectedDate]);
  const { data: bookings } = useQuery({
    queryKey: ["bookings", formattedSelectedDate],
    queryFn: () =>
      fetchBookings({
        filter: {
          customerId: { eq: user?.userId },
          startDateTime: { beginsWith: formattedSelectedDate },
        },
      }),
    enabled: !!user && !!formattedSelectedDate,
  });
  const hasBookings = useMemo(() => {
    return (bookings?.length || 0) > 0;
  }, [bookings]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose && onClose();
    }
  };

  const NoActiveBookings = () => {
    return (
      <YStack py={30} rowGap="$4" jc="center" ai="center">
        <YStack rowGap={30} jc="center" ai="center">
          <Image
            resizeMode="contain"
            source={images.noBooking}
            height={191 / 2}
            width={192}
          />
          <YStack rowGap="$2" ai="center">
            <Text fontSize="$b3" fontWeight="$6">
              No Active Bookings
            </Text>
            <Text fontSize="$c2" fontWeight="$4" color="$natural1">
              Find a service and book now!
            </Text>
          </YStack>
        </YStack>
        <Link href="/home" onPress={onClose} asChild>
          <Button h="$4" w={160} type="secondary">
            Home
          </Button>
        </Link>
      </YStack>
    );
  };

  return (
    <Sheet
      open={open}
      snapPointsMode="constant"
      snapPoints={[height - HOME_HEADER_HEIGHT + TABS_HEIGHT]}
      dismissOnSnapToBottom
      onOpenChange={handleOpenChange}
      disableDrag={disableDrag}
      modal
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame>
        <Sheet.ScrollView>
          <YStack flex={1} pb="$5" rowGap="$5">
            <XStack h={70} jc="space-between" ai="center" px="$5">
              <Text fontSize="$b2" fontWeight="$6">
                Calendar
              </Text>
              <TouchableOpacity onPress={onClose}>
                <CloseOutlinedIcon />
              </TouchableOpacity>
            </XStack>
            <View pb="$5" px="$5" borderBottomWidth="$0.5" bc="$natural0">
              <Calendar
                px="$5"
                onChange={setSelectedDate}
                disabledDates={(date) =>
                  date.isBefore(moment().subtract(1, "day"))
                }
                highlightToday
                onDropdownOpenChange={setDisableDrag}
              />
            </View>
            <YStack px="$5" rowGap="$4">
              <XStack ai="center" jc="space-between">
                <Text fontSize="$b2" fontWeight="$7">
                  {selectedDate.format("DD MMMM")}
                </Text>
                <Text fontSize="$b3" fontWeight="$4" color="$natural2">
                  {bookings?.length ?? 0} Bookings
                </Text>
              </XStack>
              {/** No Active Bookings */}
              {!hasBookings && <NoActiveBookings />}
              {/** END / No Active Bookings */}
              <YStack pb="$5" rowGap="$4">
                {bookings &&
                  bookings
                    .sort(
                      (a, b) =>
                        new Date(a.startDateTime).getTime() -
                        new Date(b.startDateTime).getTime()
                    )
                    .map((booking) => {
                      return (
                        <TouchableOpacity
                          key={booking.id}
                          onPress={() => {
                            onClose && onClose();
                            router.push(`/bookings/${booking.id}`);
                          }}
                        >
                          <UpcomingBookingItem
                            data={booking as Booking}
                            hidePet
                          />
                        </TouchableOpacity>
                      );
                    })}
              </YStack>
            </YStack>
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};
