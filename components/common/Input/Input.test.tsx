import { render, renderHook, screen } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Input } from "./Input";
import { useForm } from "react-hook-form";

describe("Input", () => {
  it("Should work correctly", async () => {
    const { result } = renderHook(() => useForm());
    const { control } = result.current;

    render(
      <Providers>
        <Input
          control={control}
          name="first_name"
          label="Name"
          placeholder="Name"
        />
      </Providers>
    );

    expect(await screen.findByPlaceholderText("Name")).toBeOnTheScreen();
    expect(await screen.findByLabelText("Name")).toBeOnTheScreen();
  });
});
