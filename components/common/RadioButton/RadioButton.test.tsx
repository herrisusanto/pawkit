import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { RadioButton } from "./RadioButton";
import { useForm } from "react-hook-form";

describe("RadioButton", () => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <RadioButton control={control} name="gender" value="male">
            Male
          </RadioButton>
        </Providers>
      );
    });
  });

  it("Should work correctly", async () => {
    expect(await screen.findByText("Male")).toBeDefined();
  });

  it("Should change value", async () => {
    fireEvent.press(await screen.findByText("Male"));

    expect(result.current.getValues()["gender"]).toMatch("male");
  });
});
