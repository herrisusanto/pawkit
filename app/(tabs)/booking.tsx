import { View, Text, styled } from "tamagui";
import React from "react";
import HorizontalTabs from "@/components/bookings/horizontal-tabs/HorizontalTabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Booking = () => {
  const insets = useSafeAreaInsets();

  const BookingHeader = styled(View, {
    pt: insets.top,
    px: "$3",
    pb: "$3",
    bg: "$background",
    jc: "flex-end",
    h: 120,
  });

  return (
    <View flex={1}>
      <BookingHeader>
        <Text fontSize="$t1" fontWeight="$7">
          Bookings
        </Text>
      </BookingHeader>
      <HorizontalTabs />
    </View>
  );
};

export default Booking;
