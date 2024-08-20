import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Calendar } from "./Calendar";
import moment from "moment";
import { ReactTestInstance } from "react-test-renderer";

const mockWeekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const mockDate = moment();
const mockDaysInMonth = mockDate.daysInMonth();

describe("Calendar", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    waitFor(() => {
      render(
        <Providers>
          <Calendar value={mockDate} onChange={mockOnChange} />
        </Providers>
      );
    });
  });

  it("Should render correct date on the header", async () => {
    expect(await screen.findByText(mockDate.format("MMMM,"))).toBeOnTheScreen();
  });

  it("Should be able to go to previous/next month", async () => {
    const previousMonth = await screen.findByTestId("previous-month-button");
    const nextMonth = await screen.findByTestId("next-month-button");

    fireEvent.press(previousMonth);
    expect(
      await screen.findByText(moment(mockDate).subtract(1, "M").format("MMMM,"))
    ).toBeOnTheScreen();

    fireEvent.press(nextMonth);
    fireEvent.press(nextMonth);

    expect(
      await screen.findByText(moment(mockDate).add(1, "M").format("MMMM,"))
    ).toBeOnTheScreen();
  });

  it("Should render week days correctly", async () => {
    for (let i = 0; i < mockWeekDays.length; i++) {
      expect(await screen.findByText(mockWeekDays[i])).toBeOnTheScreen();
    }
  });

  it("Should render days of month correctly", async () => {
    for (let i = 0; i < mockDate.daysInMonth(); i++) {
      expect(await screen.findByText(String(i + 1))).toBeOnTheScreen();
    }
  });

  it("Should be able to press cells of the visible month", async () => {
    for (let i = 0; i < mockDaysInMonth; i++) {
      const cell = (await screen.findByText(String(i + 1)))
        .parent as ReactTestInstance;
      fireEvent.press(cell);
    }

    expect(mockOnChange).toHaveBeenCalledTimes(mockDaysInMonth);
  });

  it("Should be able to change the visible year", async () => {
    const year = await screen.findByText("2024");
    fireEvent.press(year);

    fireEvent.press(
      (await screen.findByText("2080")).parent as ReactTestInstance
    );

    expect(await screen.findByText("2080")).toBeOnTheScreen();
  });
});
