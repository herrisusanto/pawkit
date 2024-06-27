import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { DatePicker } from "./DatePicker";
import { useForm } from "react-hook-form";
import { ReactTestInstance } from "react-test-renderer";
import moment from "moment";

describe("DatePicker", () => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <DatePicker
            control={control}
            name="birth_date"
            placeholder="Select Birth Date"
          />
        </Providers>
      );
    });
  });

  it("Should render correctly", async () => {
    expect(await screen.findByText("Select Birth Date")).toBeOnTheScreen();
  });

  it("Should open calendar modal when pressed", async () => {
    const placeholder = await screen.findByText("Select Birth Date");
    fireEvent.press(placeholder.parent as ReactTestInstance);
    expect(await screen.findByTestId("cells")).toBeOnTheScreen();
  });

  it("Should be able to select a date", async () => {
    const placeholder = await screen.findByText("Select Birth Date");
    fireEvent.press(placeholder.parent as ReactTestInstance);
    const cell = (await screen.findByTestId("cells"))
      .children[10] as ReactTestInstance;
    fireEvent.press(cell);
    const date = (await screen.findByTestId("date")).children[0] as string;
    expect(moment(date).isValid()).toBe(true);
  });
});
