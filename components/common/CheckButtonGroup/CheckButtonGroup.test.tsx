import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { CheckButtonGroup } from "./CheckButtonGroup";
import { mockOptions } from "./__mock__";
import { useForm } from "react-hook-form";

describe("CheckButtonGroup", () => {
  const { result } = renderHook(() => useForm());
  const { control, getValues } = result.current;

  it("Should render correctly", async () => {
    waitFor(() => {
      render(
        <Providers>
          <CheckButtonGroup
            control={control}
            name="check_button_group"
            items={mockOptions}
          />
        </Providers>
      );
    });

    for (let i = 0; i < mockOptions.length; i++) {
      expect(
        await screen.findByText(mockOptions[i].children)
      ).toBeOnTheScreen();
    }
  });

  it("Multiple choices should work correctly", async () => {
    waitFor(() => {
      render(
        <Providers>
          <CheckButtonGroup
            control={control}
            name="check_button_group"
            items={mockOptions}
          />
        </Providers>
      );
    });

    const itemEl = await screen.findByText(mockOptions[0].children);
    const itemEl2 = await screen.findByText(mockOptions[1].children);
    fireEvent.press(itemEl);
    fireEvent.press(itemEl2);

    expect(getValues()).toMatchObject({
      check_button_group: [mockOptions[0].value, mockOptions[1].value],
    });

    fireEvent.press(itemEl);

    expect(getValues()).toMatchObject({
      check_button_group: [mockOptions[1].value],
    });
  });

  it("Single choice should work correctly", async () => {
    waitFor(() => {
      render(
        <Providers>
          <CheckButtonGroup
            multiple={false}
            control={control}
            name="check_button_group"
            items={mockOptions}
          />
        </Providers>
      );
    });

    const itemEl = await screen.findByText(mockOptions[0].children);
    const itemEl2 = await screen.findByText(mockOptions[1].children);

    fireEvent.press(itemEl);

    expect(getValues()).toMatchObject({
      check_button_group: mockOptions[0].value,
    });

    fireEvent.press(itemEl2);

    expect(getValues()).toMatchObject({
      check_button_group: mockOptions[1].value,
    });
  });
});
