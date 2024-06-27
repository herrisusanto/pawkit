import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Select } from "./Select";
import { useForm } from "react-hook-form";
import { ReactTestInstance } from "react-test-renderer";
import React from "react";

const mockOptions = [
  { label: "item1", value: "value1" },
  { label: "item2", value: "value2" },
  { label: "item3", value: "value3" },
  { label: "item4", value: "value4" },
  { label: "item5", value: "value5" },
  { label: "item6", value: "value6" },
  { label: "item7", value: "value7" },
  { label: "item8", value: "value8" },
  { label: "item9", value: "value9" },
  { label: "item10", value: "value10" },
  { label: "item11", value: "value11" },
  { label: "item12", value: "value12" },
];

describe("Select", () => {
  const { result } = renderHook(() => useForm());
  const { control } = result.current;

  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <Select
            control={control}
            name="pet_breed"
            placeholder="Select"
            options={mockOptions}
          />
        </Providers>
      );
    });
  });

  it("Should work correctly", async () => {
    await waitFor(() => expect(screen.getByText("Select")).toBeOnTheScreen());
  });

  it("Should store height of select", async () => {
    const setState = jest.fn();
    const selectEl = (await screen.findByText("Select"))
      .parent as ReactTestInstance;

    fireEvent(selectEl, "press", {
      currentTarget: {
        measure: (callback: any) => {
          callback();
          setState(42);
        },
      },
    });

    expect(setState).toHaveBeenCalledWith(42);
  });

  it("Should render dropdown when clicked", async () => {
    const selectEl = (await screen.findByText("Select"))
      .parent as ReactTestInstance;
    fireEvent.press(selectEl);

    mockOptions.slice(0, 9).forEach((option) => {
      expect(screen.getByText(option.label)).toBeOnTheScreen();
    });
  });

  it("Should change value if pressed an item", async () => {
    const selectEl = (await screen.findByText("Select"))
      .parent as ReactTestInstance;
    fireEvent.press(selectEl);

    const optionEl = screen.getByText(mockOptions[0].label)
      .parent as ReactTestInstance;
    fireEvent.press(optionEl);

    expect(screen.getByText(mockOptions[0].label)).toBeOnTheScreen();

    fireEvent.press(
      (await screen.findByText(mockOptions[0].label))
        .parent as ReactTestInstance
    );

    const anotherOptionEl = screen.getByText(mockOptions[2].label)
      .parent as ReactTestInstance;
    fireEvent.press(anotherOptionEl);

    expect(screen.getByText(mockOptions[2].label)).toBeOnTheScreen();

    expect(result.current.getValues()["pet_breed"]).toMatch(
      mockOptions[2].value
    );
  });
});
