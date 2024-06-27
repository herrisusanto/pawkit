import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { DatePickerSheet } from "./DatePickerSheet";
import { useForm } from "react-hook-form";
import { PortalProvider } from "tamagui";
import { ReactTestInstance } from "react-test-renderer";
import moment from "moment";

describe("DatePickerSheet", () => {
  const { result } = renderHook(() => useForm());
  const { control, setValue } = result.current;

  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <PortalProvider>
            <DatePickerSheet control={control} name="date" label="Date Only" />
          </PortalProvider>
        </Providers>
      );
    });
  });

  it("Should render input", async () => {
    expect(await screen.findByText("Date Only")).toBeOnTheScreen();
  });

  it("should be able to change date", async () => {
    fireEvent.press(
      (await screen.findByText("Select Date")).parent as ReactTestInstance
    );

    fireEvent.press(await screen.findByTestId("next-month-button"));
    const todayDate = moment().set("date", 29).add(3, "d");

    fireEvent.press(
      (await screen.findByText(String(todayDate.get("date"))))
        .parent as ReactTestInstance
    );

    fireEvent.press(
      (await screen.findByText("Save")).parent as ReactTestInstance
    );

    const formattedDateTime = moment(todayDate).format("MMMM DD, YYYY");

    const matches = await screen.findAllByText(formattedDateTime);
    for (let i = 0; i < matches.length; i++) {
      expect(matches[i]).toBeOnTheScreen();
    }
  });

  it("Should be able to show default date", async () => {
    const defaultDatetime = moment().set({ h: 8, m: 30, s: 0 });
    setValue("date", defaultDatetime);

    const formattedDateTime = defaultDatetime.format("MMMM DD, YYYY");
    expect(await screen.findByText(formattedDateTime)).toBeOnTheScreen();
  });
});
