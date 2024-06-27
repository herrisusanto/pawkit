import { render, renderHook, screen } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { InputNumber } from "./InputNumber";
import { useForm } from "react-hook-form";
import { Text } from "tamagui";

describe("InputNumber", () => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  it("Should work correctly", async () => {
    render(
      <Providers>
        <InputNumber
          control={control}
          name="phone_number"
          label="Phone Number"
          placeholder="Input Phone Number"
          prefix={<Text>+65</Text>}
        />
      </Providers>
    );

    expect(await screen.findByText("+65")).toBeOnTheScreen();
    expect(
      await screen.findByPlaceholderText("Input Phone Number")
    ).toBeOnTheScreen();
    expect(await screen.findByLabelText("Phone Number")).toBeOnTheScreen();
  });
});
