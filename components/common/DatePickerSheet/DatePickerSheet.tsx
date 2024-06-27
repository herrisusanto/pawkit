import moment, { Moment } from "moment";
import React, { useState } from "react";
import { Sheet, Text, View, XStack, YStack } from "tamagui";
import { useController } from "react-hook-form";
import { IconProps } from "@/components/common/Icons";
import { Calendar } from "@/components/common/Calendar/Calendar";
import { Button } from "@/components/common/Button/Button";
import { InputProps } from "@/components/common/Input/Input";

export const DatePickerSheet = View.styleable<
  InputProps & { disabledDates?: "after" | "before" }
>(
  (
    {
      control,
      name,
      label,
      labelProps,
      placeholder,
      rules,
      prefixIcon,
      prefixIconProps,
      errorProps,
      children,
      disabledDates,
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
    const saveButtonDisabled = !selectedDate;

    const handleOpenChange = (open: boolean) => {
      if (!open) {
        setOpen(false);
      }
    };

    const openDatePickerSheet = () => {
      setOpen(true);
    };

    const handleSave = () => {
      const datetime = moment(selectedDate);
      onChange(datetime);
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
            onPress={openDatePickerSheet}
          >
            {prefixIcon &&
              React.cloneElement<IconProps>(prefixIcon, { ...prefixIconProps })}
            <Text fontSize="$c1" fontWeight="$5">
              {(value && moment(value).format("MMMM DD, YYYY")) ||
                "Select Date"}
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
          snapPoints={[583]}
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
                      disabledDates={(date) =>
                        disabledDates
                          ? disabledDates === "after"
                            ? date.isAfter(moment())
                            : date.isBefore(moment())
                          : false
                      }
                      highlightToday
                      onDropdownOpenChange={setDisableDrag}
                    />
                  </View>
                </YStack>
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
                    {selectedDate?.format("MMMM DD, YYYY") || ""}
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
