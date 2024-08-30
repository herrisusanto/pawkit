import { fetchBookingById } from "@/api/service-booking";
import { Button } from "@/components/common/Button/Button";
import {
  AddressIcon,
  CalendarIcon,
  DollarOutlinedIcon,
} from "@/components/common/Icons";
import { WalletIcon } from "@/components/common/Icons/WalletIcon";
import { UpcomingBookingItem } from "@/components/home/upcoming-booking/UpcomingBooking";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import * as Linking from "expo-linking";
import { Text, XStack, YStack, getToken } from "tamagui";
import { fetchPayment } from "@/api/payment";
import { Booking, Pet } from "@/api/graphql/API";
import { fetchOrder } from "@/api/order";
import { downloadPetImage } from "@/api/pet";
import { Avatar } from "@/components/common/Avatar";

const BookingDetails = () => {
  const { data: user } = useCurrentUser();
  const { id } = useLocalSearchParams();
  const { data: bookings } = useQuery({
    queryKey: ["bookings", user?.userId, id],
    queryFn: () => fetchBookingById(id as string),
    enabled: !!user && !!id,
  });

  const { data: order } = useQuery({
    queryKey: ["orders", bookings?.booking.orderId],
    queryFn: () => fetchOrder(bookings?.booking.orderId as string),
    enabled: !!bookings?.booking.orderId,
  });
  const { data: paymentRequest } = useQuery({
    queryKey: ["payment_requests", order?.paymentRequestId],
    queryFn: () => fetchPayment(order?.paymentRequestId as string),
    enabled: !!order?.paymentRequestId,
  });

  const handleContactUs = async () => {
    const phoneNumber = "6588540207";
    const textContent = `Hello Pawkit! I would like to amend my booking. My booking reference number is ${id}`;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${textContent}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        throw new Error("Cannot open URL");
      }
    } catch {
      Linking.openURL(`https://wa.me/${phoneNumber}?text=${textContent}`);
    }
  };

  return (
    <YStack flex={1} rowGap="$3" jc="space-between">
      <YStack p="$5" rowGap="$4" bg="#fff">
        <Text fontSize="$b2" fontWeight="$7">
          Booking
        </Text>
        <YStack rowGap="$3.5">
          <UpcomingBookingItem hidePet data={bookings?.booking as Booking} />
          <XStack>
            <YStack w="$full" rowGap="$2">
              <XStack ai="center" columnGap="$2">
                <XStack w="$full" maxWidth={128} ai="center" columnGap="$2">
                  <CalendarIcon
                    width={20}
                    strokeColor={getToken("$secondary", "color")}
                  />
                  <Text
                    fontSize="$c1"
                    fontWeight="$4"
                    color="$textSecondary"
                    flex={1}
                  >
                    Date & Time
                  </Text>
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    :
                  </Text>
                </XStack>
                <Text
                  fontSize="$c1"
                  fontWeight="$4"
                  color="$textSecondary"
                  numberOfLines={1}
                  flex={1}
                >
                  {bookings?.booking?.startDateTime
                    ? moment(bookings.booking?.startDateTime).format(
                        "DD MMM hh:mm A"
                      )
                    : "-"}
                </Text>
              </XStack>
              <XStack ai="flex-start" columnGap="$2" overflow="hidden">
                <XStack w="$full" maxWidth={128} ai="center" columnGap="$2">
                  <AddressIcon
                    width={20}
                    strokeColor={getToken("$secondary", "color")}
                  />
                  <Text
                    fontSize="$c1"
                    flex={1}
                    fontWeight="$4"
                    color="$textSecondary"
                  >
                    Address
                  </Text>
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    :
                  </Text>
                </XStack>
                <Text
                  fontSize="$c1"
                  fontWeight="$4"
                  color="$textSecondary"
                  adjustsFontSizeToFit
                  numberOfLines={3}
                  flex={1}
                  lineHeight={18}
                >
                  {bookings?.booking.address}
                </Text>
              </XStack>
              <XStack ai="center" columnGap="$2">
                <XStack w="$full" maxWidth={128} ai="center" columnGap="$2">
                  <DollarOutlinedIcon
                    strokeColor={getToken("$secondary", "color")}
                  />
                  <Text
                    fontSize="$c1"
                    fontWeight="$4"
                    color="$textSecondary"
                    flex={1}
                  >
                    Total
                  </Text>
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    :
                  </Text>
                </XStack>
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  {bookings
                    ? `${bookings?.booking.currency} ${bookings?.booking.amount}`
                    : null}
                </Text>
              </XStack>
              <XStack ai="center" columnGap="$2">
                <XStack w="$full" maxWidth={128} ai="center" columnGap="$2">
                  <WalletIcon strokeColor={getToken("$secondary", "color")} />
                  <Text
                    fontSize="$c1"
                    fontWeight="$4"
                    color="$textSecondary"
                    flex={1}
                  >
                    Payment
                  </Text>
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    :
                  </Text>
                </XStack>
                <Text
                  fontSize="$c1"
                  fontWeight="$4"
                  color="$textSecondary"
                  tt="capitalize"
                >
                  {paymentRequest?.paymentMethod?.replaceAll("_", " ")}
                </Text>
              </XStack>
            </YStack>
          </XStack>
          <XStack columnGap={8} ai="center">
            {bookings?.booking?.pets?.items &&
              bookings?.booking?.pets?.items?.map((pet: any, index: number) => (
                <PetCard key={index} pet={pet.pet} />
              ))}
          </XStack>
        </YStack>
      </YStack>
      <YStack>
        <YStack bg="#fff" px="$5" py="$6" gap="$5">
          <Text fontSize="$c1" fontWeight="$7">
            If you want to amend bookings, please
          </Text>
          <XStack justifyContent="space-between" gap="$3">
            <Button type="secondary" flex={1} onPress={handleContactUs}>
              Contact Us
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default BookingDetails;

type PetCardProps = {
  pet: Pet;
};

const PetCard = XStack.styleable<PetCardProps>(({ pet, ...props }, ref) => {
  const { data: user } = useCurrentUser();
  const petId = pet.s3ImageKey?.split("/")[2];

  const { data: petImage, isFetching: petImageLoading } = useQuery({
    queryKey: ["pet-image", user?.userId, pet?.id],
    queryFn: () => downloadPetImage(user?.userId as string, petId as string),
    enabled: !!user && !!pet,
  });

  return (
    <XStack key={pet?.name} columnGap={8} ai="center">
      <Avatar
        size={35}
        circular
        src={petImage?.href}
        defaultSource={petDefaultAvatar(pet?.petType)}
        loading={petImageLoading}
      />
      <YStack>
        <Text fontSize="$c1" fontWeight="$5">
          {pet?.name}
        </Text>
        <Text fontSize="$c2" fontWeight="$4" color="$natural2">
          {pet?.birthdate ? moment(pet?.birthdate).fromNow(true) : null}
        </Text>
      </YStack>
    </XStack>
  );
});
