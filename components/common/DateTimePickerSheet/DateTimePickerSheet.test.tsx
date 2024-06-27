import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { DateTimePickerSheet } from "./DateTimePickerSheet";
import { useForm } from "react-hook-form";
import { PortalProvider } from "tamagui";
import { ReactTestInstance } from "react-test-renderer";
import moment from "moment";

describe("DateTimePickerSheet", () => {
  const { result } = renderHook(() => useForm());
  const { control, setValue } = result.current;

  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <PortalProvider>
            <DateTimePickerSheet
              control={control}
              name="datetime"
              label="Date & Time"
              timeSlots={[
                {
                  __typename: "TimeSlot",
                  createdAt: "",
                  updatedAt: "",
                  startDateTime: moment()
                    .set({ h: 8, m: 30 })
                    .format("YYYY-MM-DDTHH:mm:ss[Z]"),
                  endDateTime: moment()
                    .set({ h: 11, m: 30 })
                    .format("YYYY-MM-DDTHH:mm:ss[Z]"),
                  maxBookings: 1,
                  serviceId: "2",
                  id: "1",
                },
                {
                  __typename: "TimeSlot",
                  createdAt: "",
                  updatedAt: "",
                  startDateTime: moment()
                    .set({ h: 11, m: 30 })
                    .format("YYYY-MM-DDTHH:mm:ss[Z]"),
                  endDateTime: moment()
                    .set({ h: 14, m: 30 })
                    .format("YYYY-MM-DDTHH:mm:ss[Z]"),
                  maxBookings: 1,
                  serviceId: "1",
                  id: "2",
                },
              ]}
            />
          </PortalProvider>
        </Providers>
      );
    });
  });

  it("Should render input", async () => {
    expect(await screen.findByText("Date & Time")).toBeOnTheScreen();
  });

  it("should be able to change date & time", async () => {
    fireEvent.press(
      (await screen.findByText("Select Date & Time"))
        .parent as ReactTestInstance
    );

    fireEvent.press(await screen.findByTestId("next-month-button"));
    const todayDate = moment().set("date", 29).add(3, "d");

    fireEvent.press(
      (await screen.findByText(String(todayDate.get("date"))))
        .parent as ReactTestInstance
    );

    fireEvent.press(
      (await screen.findByText("08 : 30 - 11 : 30 AM"))
        .parent as ReactTestInstance
    );

    fireEvent.press(
      (await screen.findByText("11 : 30 - 02 : 30 PM"))
        .parent as ReactTestInstance
    );

    fireEvent.press(
      (await screen.findByText("Save")).parent as ReactTestInstance
    );

    const formattedDateTime =
      moment(todayDate).format("MMMM DD, ") + "11 : 30 - 02 : 30 PM";

    const matches = await screen.findAllByText(formattedDateTime);
    for (let i = 0; i < matches.length; i++) {
      expect(matches[i]).toBeOnTheScreen();
    }
  });

  it("Should be able to show default date & time", async () => {
    const defaultDatetime = moment("2024-05-16T08:30:00Z");
    setValue("datetime", { date: defaultDatetime, time: defaultDatetime });

    const formattedDateTime =
      moment("2024-05-16").format("MMMM DD, ") + "08 : 30 AM";
    expect(await screen.findByText(formattedDateTime)).toBeOnTheScreen();
  });
});
