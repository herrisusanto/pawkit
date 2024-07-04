import { HOME_HEADER_HEIGHT, TABS_HEIGHT } from "@/constants";
import moment, { Moment } from "moment";
import React, { useMemo, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  ScrollView,
  Sheet,
  Text,
  View,
  XStack,
  YStack,
  getToken,
} from "tamagui";
import { CalendarIcon, CloseOutlinedIcon } from "@/components/common/Icons";
import { Calendar } from "@/components/common/Calendar/Calendar";
import { Button } from "@/components/common/Button/Button";
import { Pet, Service, TimeSlot } from "@/api/graphql/API";
import { useQuery } from "@tanstack/react-query";
import { fetchTimeSlots, fetchServices } from "@/api/service-booking";
import {
  useContinueServiceBookingAllowed,
  useCurrentUser,
  useServiceBookingAtom,
} from "@/hooks";
import { useAtom } from "jotai";
import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { PetAvatar } from "@/components/services/pet-avatar/PetAvatar";
import { fetchPetsByCustomer } from "@/api/pet";
import { useLocalSearchParams } from "expo-router";

const { height, width } = Dimensions.get("window");

export const PetsSchedulesSheet = View.styleable(({ ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const { serviceName } = useLocalSearchParams();
  const serviceAtom = useServiceBookingAtom(serviceName as string);
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const [selectedPetsServices, setSelectedPetsServices] = useAtom(serviceAtom);
  const [selectedPetService, setSelectedPetService] =
    useState<SelectedPetServiceType>(selectedPetsServices[0]);
  const allowed = useContinueServiceBookingAllowed(serviceName as string);
  const { data: pets } = useQuery({
    queryKey: ["pets", user?.userId],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });
  const { data: timeSlots = [] } = useQuery({
    queryKey: ["time_slots", selectedPetService?.serviceId, selectedDate],
    queryFn: () =>
      fetchTimeSlots({
        serviceId: selectedPetService?.serviceId as string,
        startDateTime: { beginsWith: selectedDate },
        filter: { isFull: { eq: false } },
      }),
    enabled: !!selectedPetService && !!selectedDate,
  });
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices({}),
  });
  const selectedPetServiceHasDateTime = useMemo(() => {
    return selectedPetService.timeSlot;
  }, [selectedPetService]);
  const hasTimeSlots = (timeSlots?.length || 0) > 0;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  const openDateTimePickerSheet = () => {
    setOpen(true);
  };

  const handleSelectDate = (date: Moment) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    const petServiceIdx = selectedPetsServices.findIndex(
      (petService) => petService.petId === selectedPetService?.petId
    );
    const petService = selectedPetsServices[petServiceIdx];
    const service = services?.find(
      (service) => service.id === petService.serviceId
    );
    const updatedPetService = {
      ...petService,
      service: service as Service,
      date: formattedDate,
    };
    setSelectedPetService(updatedPetService);
    setSelectedPetsServices((prev) => {
      return [
        ...prev.slice(0, petServiceIdx),
        updatedPetService,
        ...prev.slice(petServiceIdx + 1),
      ];
    });
  };

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    const petServiceIdx = selectedPetsServices.findIndex(
      (petService) => petService.petId === selectedPetService?.petId
    );
    const petService = selectedPetsServices[petServiceIdx];
    const service = services?.find(
      (service) => service.id === petService.serviceId
    );
    const isSelected = selectedPetService.timeSlot?.id === timeSlot.id;
    const updatedPetService = {
      ...petService,
      service: service as Service,
      timeSlot: isSelected ? undefined : (timeSlot as TimeSlot),
    };
    setSelectedPetService(updatedPetService);
    setSelectedPetsServices((prev) => {
      return [
        ...prev.slice(0, petServiceIdx),
        updatedPetService,
        ...prev.slice(petServiceIdx + 1),
      ];
    });
  };

  const handleSave = () => {
    handleOpenChange(false);
  };

  const renderSelectedPets = () => (
    <>
      <Text fontSize="$b1" fontWeight="$5">
        Selected Pet(s)
      </Text>
      <ScrollView horizontal marginLeft={-25} marginRight={-25}>
        <XStack
          paddingLeft={25}
          paddingRight={25}
          fw="wrap"
          columnGap="$5"
          rowGap="$4"
        >
          {selectedPetsServices?.map((item) => {
            const pet = pets?.find((pet) => pet.name === item.petId);
            return <PetAvatar key={item.petId} data={pet as Pet} />;
          })}
        </XStack>
      </ScrollView>
    </>
  );

  return (
    <>
      <View ref={ref} rowGap="$4" {...props}>
        <YStack rowGap="$3">{renderSelectedPets()}</YStack>
        <Text fontSize="$c1" fontWeight="$5" color="$textPrimary">
          Date & Time
        </Text>
        <XStack
          h={42}
          bw="$0.5"
          bc="$natural0"
          br="$2"
          px="$2.5"
          ai="center"
          gap="$2.5"
          bg="$formColor"
          onPress={openDateTimePickerSheet}
          jc="space-between"
        >
          <Text fontSize="$c1" fontWeight="$5">
            {selectedPetServiceHasDateTime
              ? moment(selectedPetService?.timeSlot?.startDateTime).format(
                  "MMMM DD, hh : mm A"
                )
              : "Select"}
          </Text>
          <CalendarIcon strokeColor="#121315" width={18} height={18} />
        </XStack>
      </View>
      <Sheet
        open={open}
        snapPointsMode="constant"
        snapPoints={[height - HOME_HEADER_HEIGHT + TABS_HEIGHT]}
        onOpenChange={handleOpenChange}
        dismissOnSnapToBottom
        dismissOnOverlayPress
        modal
      >
        <Sheet.Overlay
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame>
          <Sheet.ScrollView>
            <YStack bg="$accent0">
              {/** Date */}
              <YStack
                flex={1}
                borderBottomWidth="$0.5"
                borderBottomColor="$natural0"
              >
                <XStack
                  jc="space-between"
                  ai="center"
                  py="$5"
                  px="$5"
                  bg="#fff"
                >
                  <Text fontSize="$b2" fontWeight="$7">
                    Date
                  </Text>
                  <TouchableOpacity onPress={() => handleOpenChange(false)}>
                    <CloseOutlinedIcon />
                  </TouchableOpacity>
                </XStack>
                <YStack rowGap="$4" bg="#fff">
                  <YStack px="$5" rowGap="$2">
                    {renderSelectedPets()}
                  </YStack>
                  <View pb="$5" px="$5">
                    <Calendar
                      px="$5"
                      defaultValue={
                        selectedPetService?.date
                          ? moment(selectedPetService?.date)
                          : undefined
                      }
                      onChange={handleSelectDate}
                      disabledDates={(date) =>
                        date.isBefore(moment().subtract(1, "day"))
                      }
                      highlightToday
                    />
                  </View>
                </YStack>
              </YStack>
              {/** Time */}
              {hasTimeSlots && (
                <YStack
                  py="$5"
                  rowGap="$5"
                  bg="#fff"
                  borderBottomWidth="$0.5"
                  borderBottomColor="$natural0"
                >
                  <Text fontSize="$c1" fontWeight="$7" px="$5">
                    Please select your preferred time slots, we will confirm the
                    exact time within a couple of hours
                  </Text>
                  <XStack
                    fw="wrap"
                    ai="center"
                    jc="space-between"
                    gap="$2.5"
                    px="$5"
                  >
                    {timeSlots.map((timeSlot, i) => {
                      const itemWidth = width * 0.5;
                      const calculatedWidth =
                        itemWidth -
                        getToken("$5", "space") -
                        getToken("$2.5", "space");
                      const isSelected =
                        timeSlot.id === selectedPetService?.timeSlot?.id;
                      const alreadySelected = selectedPetsServices.some(
                        (petService) => petService.timeSlot?.id === timeSlot.id
                      );
                      return (
                        <View
                          key={timeSlot.id}
                          py="$2.5"
                          px="$5"
                          w={calculatedWidth}
                          bc={
                            isSelected
                              ? "$primary"
                              : alreadySelected
                                ? "$red"
                                : "$natural2"
                          }
                          bg={
                            isSelected
                              ? "$thirdy"
                              : alreadySelected
                                ? "$error"
                                : "$colorTransparent"
                          }
                          bw="$0.5"
                          br="$2"
                          onPress={() =>
                            (!alreadySelected || isSelected) &&
                            handleSelectTimeSlot(timeSlot)
                          }
                        >
                          <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            fontSize="$c1"
                            fontWeight="$5"
                            textAlign="center"
                            color={
                              alreadySelected && !isSelected
                                ? "$accent0"
                                : "$textSecondary"
                            }
                          >
                            {moment(timeSlot.startDateTime).format("hh : mm A")}
                          </Text>
                        </View>
                      );
                    })}
                  </XStack>
                </YStack>
              )}
              {/** Save */}
              <YStack
                ai="center"
                jc="center"
                px="$5"
                py="$5"
                rowGap="$3.5"
                bg="#fff"
              >
                <Text fontSize="$b3" fontWeight="$5">
                  {selectedPetService &&
                    moment(selectedPetService.date).format("MMMM DD, ") +
                      moment(selectedPetService.timeSlot?.startDateTime).format(
                        "hh : mm A"
                      )}
                </Text>
                <Button
                  disabled={!allowed}
                  type="primary"
                  h="$4"
                  w="$full"
                  onPress={() => handleSave()}
                >
                  Save
                </Button>
              </YStack>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
});
