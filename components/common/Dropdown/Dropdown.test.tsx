import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Dropdown } from "./Dropdown";
import { Text } from "tamagui";
import { ReactTestInstance } from "react-test-renderer";

const mockItems = [{ label: "option1", value: "value1" }];
const mockOnChange = jest.fn();

describe("Dropdown", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <Dropdown items={mockItems} onChange={mockOnChange}>
            <Text>Dropdown</Text>
          </Dropdown>
        </Providers>
      );
    });
  });

  it("Should render correctly", async () => {
    expect(await screen.findByText("Dropdown")).toBeOnTheScreen();
  });

  it("Should show dropdown menu on press", async () => {
    fireEvent.press(
      (await screen.findByText("Dropdown")).parent as ReactTestInstance
    );

    for (let i = 0; i < mockItems.length; i++) {
      expect(await screen.findByText(mockItems[i].label)).toBeOnTheScreen();
    }
  });

  it("Should be able to press an item", async () => {
    fireEvent.press(
      (await screen.findByText("Dropdown")).parent as ReactTestInstance
    );

    fireEvent.press(await screen.findByText(mockItems[0].label));

    expect(mockOnChange).toHaveBeenCalledWith(mockItems[0].value);
  });

  it("Should store height of select", async () => {
    const setState = jest.fn();
    const selectEl = (await screen.findByText("Dropdown"))
      .parent as ReactTestInstance;

    fireEvent(selectEl, "press", {
      target: {
        measure: (callback: any) => {
          callback();
          setState(42);
        },
      },
    });

    expect(setState).toHaveBeenCalledWith(42);
  });
});
