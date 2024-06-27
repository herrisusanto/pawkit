import { fireEvent, render, screen } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Button } from "./Button";

describe("Button", () => {
  const handlePress = jest.fn();

  it("Should work correctly", async () => {
    render(
      <Providers>
        <Button type="primary" onPress={handlePress}>
          Primary Button
        </Button>
      </Providers>
    );

    fireEvent.press(await screen.findByText("Primary Button"));

    expect(await screen.findByText("Primary Button")).toBeDefined();
    expect(handlePress).toHaveBeenCalled();
  });
});
