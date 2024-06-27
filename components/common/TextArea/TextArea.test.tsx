import { render, renderHook, screen } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { TextArea } from "./TextArea";
import { Text } from "react-native";
import { useForm } from "react-hook-form";

describe("TextArea", () => {
  it("Should work correctly", async () => {
    const { result } = renderHook(() => useForm());
    const { control } = result.current;

    render(
      <Providers>
        <TextArea control={control} name="message" label="Message">
          <Text>TextArea</Text>
        </TextArea>
      </Providers>
    );

    expect(await screen.findByLabelText("Message")).toBeDefined();
  });
});
