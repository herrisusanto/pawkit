import { render, screen, waitFor } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { ListSlider, ListSliderProps } from "./ListSlider";
import { Text } from "tamagui";

const mockItems: ListSliderProps["items"] = [
  { content: <Text>Content of Item 1</Text> },
  { content: <Text>Content of Item 2</Text> },
  { content: <Text>Content of Item 3</Text> },
];

describe("ListSlider", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <ListSlider items={mockItems} />
        </Providers>
      );
    });
  });
  it("Should render correctly", async () => {
    for (let i = 0; i < mockItems.length; i++) {
      expect(
        await screen.findByText(`Content of Item ${i + 1}`)
      ).toBeOnTheScreen();
    }
  });
});
