import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";
import React from "react";
import { View } from "tamagui";
import moment, { Moment } from "moment";
import { useController, useForm } from "react-hook-form";

const CalendarMeta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1} px="$5">
        <Story />
      </View>
    ),
  ],
};

export default CalendarMeta;

export const Basic: StoryObj<typeof Calendar> = {
  render() {
    const CalendarView = () => {
      const { control } = useForm();
      const { field } = useController({ control, name: "date" });

      const handleCalendarChange = (date: Moment) => {
        field.onChange(date.format());
      };

      return (
        <Calendar
          value={moment(field.value)}
          onChange={handleCalendarChange}
          px="$5"
        />
      );
    };
    return <CalendarView />;
  },
};

export const WithDisabledPastDates: StoryObj<typeof Calendar> = {
  render() {
    const CalendarView = () => {
      const { control } = useForm();
      const { field } = useController({ control, name: "date" });

      const handleCalendarChange = (date: Moment) => {
        field.onChange(date.format());
      };

      return (
        <Calendar
          value={moment(field.value)}
          onChange={handleCalendarChange}
          px="$5"
          disabledDates={(date) => {
            return date.isBefore(moment());
          }}
        />
      );
    };
    return <CalendarView />;
  },
};

export const WithMarkedDates: StoryObj<typeof Calendar> = {
  render() {
    const CalendarView = () => {
      const { control } = useForm();
      const { field } = useController({ control, name: "date" });

      const handleCalendarChange = (date: Moment) => {
        field.onChange(date.format());
      };

      return (
        <Calendar
          value={moment(field.value)}
          onChange={handleCalendarChange}
          px="$5"
          disabledDates={(date) => {
            return date.isBefore(moment());
          }}
          markedDates={{
            "2024-03-22": { count: 3 },
            "2024-03-24": { count: 2 },
          }}
        />
      );
    };
    return <CalendarView />;
  },
};
