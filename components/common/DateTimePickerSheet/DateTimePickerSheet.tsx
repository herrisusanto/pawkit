import { HOME_HEADER_HEIGHT, TABS_HEIGHT } from "@/constants";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Sheet, Text, View, XStack, YStack, getToken } from "tamagui";
import { useController } from "react-hook-form";
import { IconProps } from "@/components/common/Icons";
import { Calendar } from "@/components/common/Calendar/Calendar";
import { Button } from "@/components/common/Button/Button";
import { InputProps } from "@/components/common/Input/Input";
import { TimeSlot } from "@/api/graphql/API";

const { height, width } = Dimensions.get("window");

export const DateTimePickerSheet = View.styleable<
  InputProps & { timeSlots?: TimeSlot[] }
>(
  (
    {
      control,
      name,
      label,
      labelProps,
      placeholder = "Select Date & Time",
      rules,
      prefixIcon,
      prefixIconProps,
      errorProps,
      children,
      timeSlots = [],
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const { field, fieldState } = useController({
      control,
      name,
      rules,
    });
    const { invalid, error } = fieldState;
    const { onChange, value } = field;
    const [disableDrag, setDisableDrag] = useState(false);
    const [selectedDate, setSelectedDate] = useState<null | Moment>(null);
    const [selectedTime, setSelectedTime] = useState<null | string>(null);
    const saveButtonDisabled = !selectedDate || !selectedTime;
    const hasTimeSlots = timeSlots.length > 0;
    const selectedTimeSlot = timeSlots.find(
      (timeSlot) => timeSlot.id === selectedTime
    );

    const handleOpenChange = (open: boolean) => {
      if (!open) {
        setOpen(false);
      }
    };

    const openDateTimePickerSheet = () => {
      setOpen(true);
    };

    const handleSave = () => {
      const date = moment(selectedDate);
      const timeSlot = moment(
        timeSlots.find((timeSlot) => timeSlot.id === selectedTime)
          ?.startDateTime
      );
      onChange({ date, time: timeSlot });
      handleOpenChange(false);
    };

    return (
      <>
        <View ref={ref} rowGap="$2" {...props}>
          {label && (
            <Text
              fontSize="$c1"
              fontWeight="$5"
              color="$textPrimary"
              {...labelProps}
            >
              {label}
            </Text>
          )}
          <XStack
            h={42}
            bw="$0.5"
            bc={invalid ? "$error" : "$natural0"}
            br="$2"
            px="$2.5"
            ai="center"
            gap="$2.5"
            bg={invalid ? "$bgError" : "$formColor"}
            onPress={openDateTimePickerSheet}
          >
            {prefixIcon &&
              React.cloneElement<IconProps>(prefixIcon, { ...prefixIconProps })}
            <Text fontSize="$c1" fontWeight="$5">
              {value
                ? moment(value.date).format("MMMM DD, ") +
                  moment(value.time).format("hh : mm A")
                : placeholder}
            </Text>
          </XStack>
          {error && (
            <Text fontSize="$c2" fontWeight="$4" color="$error" {...errorProps}>
              {error.message}
            </Text>
          )}
        </View>
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
                    <Text fontSize="$b2" fontWeight="$6">
                      Date
                    </Text>
                  </XStack>
                  <View pb="$5" px="$5" bg="#fff">
                    <Calendar
                      px="$5"
                      onChange={setSelectedDate}
                      disabledDates={(date) => date.isBefore(moment())}
                      highlightToday
                      onDropdownOpenChange={setDisableDrag}
                    />
                  </View>
                </YStack>
                {children}
                {/** Time */}
                {hasTimeSlots && (
                  <YStack
                    py="$5"
                    rowGap="$5"
                    bg="#fff"
                    borderBottomWidth="$0.5"
                    borderBottomColor="$natural0"
                  >
                    <Text fontSize="$b2" fontWeight="$6" px="$5">
                      Time
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
                        const isSelected = timeSlot.id === selectedTime;
                        return (
                          <View
                            key={timeSlot.id}
                            py="$2.5"
                            px="$5"
                            w={calculatedWidth}
                            bc={isSelected ? "$primary" : "$natural2"}
                            bg={isSelected ? "$thirdy" : "$colorTransparent"}
                            bw="$0.5"
                            br="$2"
                            onPress={() => setSelectedTime(timeSlot.id)}
                          >
                            <Text
                              adjustsFontSizeToFit
                              numberOfLines={1}
                              fontSize="$c1"
                              fontWeight="$5"
                              color="$textSecondary"
                            >
                              {moment(timeSlot.startDateTime).format(
                                "hh : mm "
                              ) +
                                moment(
                                  timeSlot.endDateTime || timeSlot.startDateTime
                                ).format(" - hh : mm A")}
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
                    {selectedDate &&
                      selectedTimeSlot &&
                      selectedDate.format("MMMM DD, ") +
                        moment(selectedTimeSlot.startDateTime).format(
                          "hh : mm "
                        ) +
                        moment(
                          selectedTimeSlot.endDateTime ||
                            selectedTimeSlot.startDateTime
                        ).format(" - hh : mm A")}
                  </Text>
                  <Button
                    disabled={saveButtonDisabled}
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
  }
);
