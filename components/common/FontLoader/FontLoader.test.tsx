import { Text } from "tamagui";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { ReactTestInstance } from "react-test-renderer";

describe("FontLoader And TamaguiProvider", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <Text fontSize="$t1">FontLoader Rendered</Text>
        </Providers>
      );
    });
  });

  it("Should work correctly", async () => {
    expect(
      (await screen.findByText("FontLoader Rendered")).props
    ).toHaveProperty("style.fontSize", 28);

    expect(await screen.findByText("FontLoader Rendered")).toBeDefined();
  });

  it("Should load fonts", async () => {
    const mockHideSplash = jest.fn();

    fireEvent(
      (await screen.findByTestId("fontloader")) as ReactTestInstance,
      "layout",
      mockHideSplash()
    );

    await waitFor(() => {
      expect(mockHideSplash).toHaveBeenCalled();
    });
  });
});
