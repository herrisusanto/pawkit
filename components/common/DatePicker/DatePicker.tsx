import moment, { Moment } from "moment";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Text, View, XStack } from "tamagui";
import { InputProps } from "../Input/Input";
import { CloseIcon, IconProps } from "../Icons";
import { Modal } from "../Modal/Modal";
import { Calendar, CalendarProps } from "../Calendar/Calendar";

type DatePickerProps = InputProps & Pick<CalendarProps, "disabledDates">;

export const DatePicker = View.styleable<DatePickerProps>(
  (
    {
      control,
      name,
      placeholder,
      label,
      labelProps,
      inputProps,
      errorProps,
      prefixIcon,
      prefixIconProps,
      disabledDates,
      ...props
    },
    ref
  ) => {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const { field, fieldState } = useController({ control, name });
    const { invalid, error } = fieldState;
    const { onChange, value } = field;

    const closeCalendarModal = () => {
      setCalendarOpen(false);
    };

    const openCalendarModal = () => {
      setCalendarOpen(true);
    };

    const handleChange = (value: Moment) => {
      onChange && onChange(value);
      closeCalendarModal();
    };

    const handleClearDate = () => {
      onChange && onChange("");
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
            onPress={openCalendarModal}
          >
            {prefixIcon &&
              React.cloneElement<IconProps>(prefixIcon, { ...prefixIconProps })}
            <Text flex={1} testID="date" fontSize="$c1" fontWeight="$5">
              {(value && moment(value).format("YYYY-MM-DD")) ||
                placeholder ||
                "Select Date"}
            </Text>
            {value && (
              <TouchableOpacity onPress={handleClearDate}>
                <CloseIcon />
              </TouchableOpacity>
            )}
          </XStack>
          {error && (
            <Text fontSize="$c2" fontWeight="$4" color="$error" {...errorProps}>
              {error.message}
            </Text>
          )}
        </View>
        <Modal
          open={calendarOpen}
          onClose={closeCalendarModal}
          px="$5"
          contentProps={{ px: 12 }}
        >
          <Calendar
            headerContainerProps={{ px: "$2" }}
            px={36}
            onChange={handleChange}
            disabledDates={disabledDates}
            maxDate={moment()}
            minDate={moment().subtract(12, "years")}
            withTitle
            onCloseCalendar={closeCalendarModal}
          />
        </Modal>
      </>
    );
  }
);
