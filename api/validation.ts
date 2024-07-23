import { BookingStatus } from "./graphql/API";

const bookingStatusTransitions: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.PENDING]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED],
  [BookingStatus.IN_PROGRESS]: [BookingStatus.COMPLETED],
  [BookingStatus.CONFIRMED]: [
    BookingStatus.IN_PROGRESS,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.COMPLETED]: [],
  [BookingStatus.CANCELLED]: [],
};

export function isValidBookingStatusTransition(
  from: BookingStatus,
  to: BookingStatus
): boolean {
  return bookingStatusTransitions[from].includes(to);
}

export function isValidDateTime(dateTimeString: string): boolean {
  // Regular expression for ISO 8601 datetime format (with optional milliseconds)
  const dateTimeRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))?$/;
  return (
    dateTimeRegex.test(dateTimeString) && !isNaN(Date.parse(dateTimeString))
  );
}

export function isValidDate(dateString: string): boolean {
  // Regular expression for ISO 8601 date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString) && !isNaN(Date.parse(dateString));
}

export function isStartDateBeforeEndDate(
  startDateString: string,
  endDateString: string
): boolean {
  // Parse the date strings into Date objects
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Compare the Date objects
  return startDate < endDate;
}
