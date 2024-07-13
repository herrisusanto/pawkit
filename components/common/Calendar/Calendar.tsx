import moment, { Moment } from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  View as TamaguiView,
  Text,
  View,
  XStack,
  XStackProps,
  YStack,
  getToken,
  getTokens,
  styled,
} from "tamagui";
import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import { Dropdown } from "../Dropdown/Dropdown";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const years = moment("2080-01-01").diff("1979-01-01", "year");
const yearsAsOptions = Array.from({ length: years }).map((_, i) => {
  const formattedYear = moment("1979-01-01")
    .add(i + 1, "year")
    .format("YYYY");
  return { label: formattedYear, value: formattedYear };
});

export type CalendarProps = {
  value?: Moment;
  defaultValue?: Moment;
  onChange?: (date: Moment) => void;
  disabledDates?: (date: Moment) => boolean;
  onDropdownOpenChange?: (open: boolean) => void;
  markedDates?: { [key: string]: { count?: number } };
  headerContainerProps?: XStackProps;
  highlightToday?: boolean;
};

const StyledView = styled(TamaguiView, {
  w: "$full",
});

export const Calendar = StyledView.styleable<CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onDropdownOpenChange,
      disabledDates,
      headerContainerProps,
      markedDates,
      highlightToday,
      px,
      ...props
    },
    ref
  ) => {
    const paddingX =
      typeof px === "number"
        ? px
        : getToken(px as keyof typeof getTokens, "space") || 0;
    const [visibleMonth, setVisibleMonth] = useState(moment());
    const [selectedDate, setSelectedDate] = useState<Moment>(value as Moment);
    // First day of the month
    const startDate = useMemo(
      () => moment(visibleMonth).startOf("month"),
      [visibleMonth]
    );
    const endDate = useMemo(
      () => moment(visibleMonth).endOf("month"),
      [visibleMonth]
    );
    const prefixDays = useMemo(() => {
      return startDate.get("day") ? startDate.get("day") - 1 : 6;
    }, [startDate]);
    const numberOfDays = useMemo(
      () => visibleMonth.daysInMonth(),
      [visibleMonth]
    );
    const suffixDays = useMemo(() => 5 - endDate.get("day"), [endDate]);

    const previousMonth = () => {
      const month = moment(visibleMonth).subtract(1, "month");
      setVisibleMonth(month);
    };

    const nextMonth = () => {
      const month = moment(visibleMonth).add(1, "month");
      setVisibleMonth(month);
    };

    const handleYearChange = (year: string) => {
      const month = moment(visibleMonth).set("year", Number(year));
      setVisibleMonth(month);
    };

    const handleChange = (dayNumber: number) => {
      const newDate = moment(visibleMonth).set("date", dayNumber);
      onChange && onChange(newDate);
      setSelectedDate(newDate);
    };

    useEffect(() => {
      if (defaultValue) {
        setSelectedDate(defaultValue);
      }
    }, [defaultValue]);

    const totalRows = Math.ceil((prefixDays + numberOfDays + suffixDays) / 7);

    return (
      <StyledView ref={ref} {...props}>
        <YStack rowGap="$3.5">
          {/** Calendar Header */}
          <XStack
            jc="space-between"
            ai="center"
            zi={10000}
            {...headerContainerProps}
          >
            <XStack columnGap="$2">
              <Text fontSize="$b3" fontWeight="$5">
                {visibleMonth.format("MMM,")}
              </Text>
              <Dropdown
                items={yearsAsOptions}
                onChange={(value) => handleYearChange(value)}
                menuProps={{ minWidth: "$5" }}
                onOpenChange={onDropdownOpenChange}
              >
                <Text fontSize="$b3" fontWeight="$5">
                  {visibleMonth.format("YYYY")}
                </Text>
              </Dropdown>
            </XStack>
            <XStack columnGap="$2">
              <TouchableOpacity
                onPress={previousMonth}
                testID="previous-month-button"
              >
                <LeftArrowIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextMonth} testID="next-month-button">
                <RightArrowIcon />
              </TouchableOpacity>
            </XStack>
          </XStack>
          {/** End of Calendar Header */}
          {/** Week Days */}
          <XStack jc="space-around">
            {weekDays.map((day) => {
              return (
                <View key={day} flex={1} ai="center">
                  <Text
                    fontSize="$c1"
                    fontWeight="$5"
                    color="$textThirdy"
                    textTransform="uppercase"
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
          </XStack>
          {/** End of Week Days */}
          <XStack fw="wrap" gap="$1" testID="cells">
            {Array.from({ length: prefixDays }).map((_, i) => {
              const size = SCREEN_WIDTH - paddingX * 2;
              const dividedSize = size / 7;
              return (
                <CalendarCell
                  key={`{prefix}_${i}`}
                  bg="$colorTransparent"
                  size={dividedSize - 2}
                />
              );
            })}
            {Array.from({ length: numberOfDays }).map((_, i) => {
              const cellDate = moment(visibleMonth).set("date", i + 1);
              const isSelected =
                selectedDate && cellDate.isSame(selectedDate, "date");
              const isToday = cellDate.isSame(moment(), "date");
              const size = SCREEN_WIDTH - paddingX * 2;
              const dividedSize = size / 7;
              const isDisabled = disabledDates && disabledDates(cellDate);
              const count =
                markedDates &&
                markedDates[cellDate.format("YYYY-MM-DD")]?.count;
              return (
                <CalendarCell
                  key={`day_${i}`}
                  bg={
                    isSelected
                      ? "$primary"
                      : highlightToday && isToday
                        ? "$thirdy"
                        : isDisabled
                          ? "#F2F2F2"
                          : "$colorTransparent"
                  }
                  bw={highlightToday && isToday ? "$0.5" : "$0"}
                  bc={
                    highlightToday && isToday ? "$primary" : "$colorTransparent"
                  }
                  size={dividedSize - 2}
                  onPress={() => {
                    !isDisabled && handleChange(i + 1);
                  }}
                >
                  <Text
                    fontSize="$c1"
                    fontWeight="$5"
                    color={isSelected ? "#fff" : "$textPrimary"}
                  >
                    {i + 1}
                  </Text>
                  {count && (
                    <View
                      position="absolute"
                      top={2}
                      right={2}
                      h={16}
                      w={16}
                      bg={isSelected ? "#fff" : "$primary"}
                      jc="center"
                      ai="center"
                      br="$12"
                    >
                      <Text
                        fontSize="$c2"
                        color={isSelected ? "$primary" : "#fff"}
                      >
                        {count}
                      </Text>
                    </View>
                  )}
                </CalendarCell>
              );
            })}
            {Array.from({ length: suffixDays }).map((_, i) => {
              const size = SCREEN_WIDTH - paddingX * 2;
              const dividedSize = size / 7;
              return (
                <CalendarCell
                  key={`{suffix}_${i}`}
                  bg="$colorTransparent"
                  size={dividedSize - 2}
                />
              );
            })}
            {totalRows < 6 &&
              Array.from({ length: 7 }).map((_, i) => {
                const size = SCREEN_WIDTH - paddingX * 2;
                const dividedSize = size / 7;
                return (
                  <CalendarCell
                    key={`{suffix}_${i}`}
                    bg="$colorTransparent"
                    size={dividedSize - 2}
                  />
                );
              })}
          </XStack>
        </YStack>
      </StyledView>
    );
  }
);

type CalendarCellProps = {
  size: number;
};

const CalendarCell = View.styleable<CalendarCellProps>(
  ({ children, size, ...props }, ref) => {
    return (
      <View
        ref={ref}
        w={size}
        h={size}
        jc="center"
        ai="center"
        flexShrink={0}
        {...props}
      >
        {children}
      </View>
    );
  }
);
