import { useState } from "react";
import { LogBox } from "react-native";
import { StackProps, TabLayout, Tabs, Text, YStack } from "tamagui";
import BookingSection from "../booking-section/BookingSection";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchBookingsByCustomer } from "@/api/service-booking";
import { Booking, BookingStatus } from "@/api/graphql/API";

const HorizontalTabs = () => {
  const { data: user } = useCurrentUser();

  const { data: bookings } = useQuery({
    queryKey: ["bookings", user?.userId],
    queryFn: () => fetchBookingsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  LogBox.ignoreLogs([
    "Warning: Cannot update a component (`ForwardRef`) while rendering a different component (`TabsTrigger`). To locate the bad setState() call inside `TabsTrigger`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
  ]);

  const [activeAt, setActiveAt] = useState<TabLayout | null>(null);

  const [currentTab, setCurrentTab] = useState<string>("tab1");

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      flex={1}
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$bgGrey"
      position="relative"
    >
      <YStack>
        {activeAt && (
          <TabsRovingIndicator
            active
            width={activeAt.width}
            height="$0.25"
            zIndex={90}
            x={activeAt.x}
            bottom={0}
          />
        )}
        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage Booking"
          gap="$2"
          paddingHorizontal="$4"
          backgroundColor="$background"
          justifyContent="space-between"
        >
          <Tabs.Tab
            unstyled
            value="tab1"
            padding="$3"
            width="auto"
            onInteraction={(type, layout) => {
              if (type === "select") {
                setActiveAt(layout);
              }
            }}
          >
            <Text
              fontSize="$c1"
              color={currentTab === "tab1" ? "$textPrimary" : "$textThirdy"}
            >
              All
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="tab2"
            unstyled
            padding="$3"
            width="auto"
            onInteraction={(type, layout) => {
              if (type === "select") {
                setActiveAt(layout);
              }
            }}
          >
            <Text
              fontSize="$c1"
              color={currentTab === "tab2" ? "$textPrimary" : "$textThirdy"}
            >
              Confirmed
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="tab3"
            unstyled
            padding="$3"
            width="auto"
            onInteraction={(type, layout) => {
              if (type === "select") {
                setActiveAt(layout);
              }
            }}
          >
            <Text
              fontSize="$c1"
              color={currentTab === "tab3" ? "$textPrimary" : "$textThirdy"}
            >
              Pending
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="tab4"
            unstyled
            padding="$3"
            width="auto"
            onInteraction={(type, layout) => {
              if (type === "select") {
                setActiveAt(layout);
              }
            }}
          >
            <Text
              fontSize="$c1"
              color={currentTab === "tab4" ? "$textPrimary" : "$textThirdy"}
            >
              Completed
            </Text>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>

      <Tabs.Content value="tab1" flex={1}>
        <BookingSection
          bookingData={
            bookings?.sort(
              (a: Booking, b: Booking) =>
                new Date(a.startDateTime).getTime() -
                new Date(b.startDateTime).getTime()
            ) ?? []
          }
        />
      </Tabs.Content>

      <Tabs.Content value="tab2" flex={1}>
        <BookingSection
          bookingData={
            bookings
              ?.sort(
                (a: Booking, b: Booking) =>
                  new Date(a.startDateTime).getTime() -
                  new Date(b.startDateTime).getTime()
              )
              .filter((item: any) => item.status === BookingStatus.CONFIRMED) ??
            []
          }
          // bookingData={bookings?.filter((item) => item.status === "Confirmed") ?? []}
        />
      </Tabs.Content>

      <Tabs.Content value="tab3" flex={1}>
        <BookingSection
          bookingData={
            bookings
              ?.sort(
                (a: Booking, b: Booking) =>
                  new Date(a.startDateTime).getTime() -
                  new Date(b.startDateTime).getTime()
              )
              .filter((item: any) => item.status === BookingStatus.PENDING) ??
            []
          }

          // bookingData={bookings?.filter((item) => item.status === "Pending")}
        />
      </Tabs.Content>

      <Tabs.Content value="tab4" flex={1}>
        <BookingSection
          bookingData={
            bookings
              ?.sort(
                (a: Booking, b: Booking) =>
                  new Date(a.startDateTime).getTime() -
                  new Date(b.startDateTime).getTime()
              )
              .filter((item: any) => item.status === BookingStatus.COMPLETED) ??
            []
          }
        />
      </Tabs.Content>
    </Tabs>
  );
};

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$primary",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

export default HorizontalTabs;
