import { YStack, XStack, Image, View, ScrollView } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import React, { useEffect, useState } from "react";
import { HOME_HEADER_HEIGHT, TABS_HEIGHT, images } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CalendarIcon } from "@/components/common/Icons";
import { Dimensions, RefreshControl, TouchableOpacity } from "react-native";
import { UpcomingBooking } from "@/components/home/upcoming-booking/UpcomingBooking";
import { PopularServices } from "@/components/home/popular-services/PopularServices";
import { MyPets } from "@/components/home/my-pets/MyPets";
import { CalendarSheet } from "@/components/home/calendar-sheet/CalendarSheet";
import { useQueryClient } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";

const { height } = Dimensions.get("screen");

const Home = () => {
  const insets = useSafeAreaInsets();

  const [calendarSheetOpen, setCalendarSheetOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setIsRefreshing(false);
  };

  const toggleCalendarSheet = () => {
    setCalendarSheetOpen(!calendarSheetOpen);
  };

  useEffect(() => {
    (async () => {
      console.log((await fetchAuthSession()).tokens?.accessToken.toString());
    })();
  }, []);

  return (
    <>
      <YStack flex={1} bg="#fff">
        {/** Header */}
        <View
          position="absolute"
          h={HOME_HEADER_HEIGHT}
          bg="$primary"
          w="$full"
          jc="center"
          ai="center"
          px="$5"
        >
          <LinearGradient
            position="absolute"
            left={0}
            right={0}
            height="$full"
            colors={["#04C8B8", "$primary", "#04C8B8"]}
            start={[1, 1]}
            end={[0, 0]}
          />
          <XStack w="$full" ai="center" jc="space-between">
            <Image source={images.logoPawkit} resizeMode="contain" w={89} />
            <XStack columnGap="$3.5">
              <TouchableOpacity onPress={toggleCalendarSheet}>
                <CalendarIcon />
              </TouchableOpacity>
            </XStack>
          </XStack>
        </View>
        {/** END / Header */}
        <YStack
          top={HOME_HEADER_HEIGHT - 24}
          h={height - HOME_HEADER_HEIGHT - 9 - TABS_HEIGHT + insets.bottom / 2}
          borderTopStartRadius="$5"
          borderTopEndRadius="$5"
          overflow="hidden"
          bg="#fff"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            {/* <GetStarted /> */}
            <UpcomingBooking />
            <MyPets />
            <PopularServices />
          </ScrollView>
        </YStack>
      </YStack>
      <CalendarSheet open={calendarSheetOpen} onClose={toggleCalendarSheet} />
    </>
  );
};

export default Home;
