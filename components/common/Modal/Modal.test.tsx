import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Modal } from "./Modal";
import { Text } from "react-native";

const mockOnClose = jest.fn();

describe("Modal", () => {
  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <Modal open onClose={mockOnClose}>
            <Text>Modal</Text>
          </Modal>
        </Providers>
      );
    });
  });

  it("Should render correctly", async () => {
    expect(await screen.findByText("Modal")).toBeOnTheScreen();
  });

  it("Should close when press on overlay", async () => {
    fireEvent.press(await screen.findByTestId("overlay"));

    waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
