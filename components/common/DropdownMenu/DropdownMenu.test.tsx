import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { DropdownMenu } from "./DropdownMenu";

const mockOnSelect = jest.fn();
const mockOptions = [{ label: "option1", value: "value1" }];

describe("DropdownMenu", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <DropdownMenu open items={mockOptions} onSelect={mockOnSelect} />
        </Providers>
      );
    });
  });

  it("Should render correctly", async () => {
    for (let i = 0; i < mockOptions.length; i++) {
      expect(await screen.findByText(mockOptions[i].label)).toBeOnTheScreen();
    }
  });

  it("Should be able to select an option", async () => {
    fireEvent.press(await screen.findByText(mockOptions[0].label));

    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0].value);
  });
});
