import { ScrollView, YStack } from "tamagui";
import EmptyStates from "../empty-states/EmptyStates";
import BookingCard from "../booking-card/BookingCard";
import { Booking } from "@/api/graphql/API";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const BookingSection = ({ bookingData }: { bookingData: Booking[] }) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setIsRefreshing(false);
  };

  return bookingData.length > 0 ? (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <YStack padding="$3" gap="$3">
        {bookingData.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              router.push(`/bookings/${item.id}`);
            }}
          >
            <BookingCard data={item} />
          </TouchableOpacity>
        ))}
      </YStack>
    </ScrollView>
  ) : (
    <EmptyStates
      title="No Active Bookings"
      subtitle="Find a service and book now!"
    />
  );
};

export default BookingSection;
