import { ScrollView, YStack } from "tamagui";
import EmptyStates from "../empty-states/EmptyStates";
import BookingCard from "../booking-card/BookingCard";
import { Booking } from "@/api/graphql/API";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const BookingSection = ({ bookingData }: { bookingData: Booking[] }) => {
  const router = useRouter();

  return bookingData.length > 0 ? (
    <ScrollView>
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
