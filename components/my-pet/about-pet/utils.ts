import moment from "moment";

export const calculateAge = (birthdate?: string | null, short?: boolean) => {
  if (birthdate) {
    const birth = moment(birthdate);
    const today = moment();
    const years = today.diff(birth, "years");
    birth.add(years, "years");
    const months = today.diff(birth, "months");
    birth.add(months, "months");
    const days = today.diff(birth, "days");

    const formattedYears =
      years > 0 ? `${years} year${years !== 1 ? "s" : ""}, ` : "";
    const formattedMonths =
      months > 0 ? `${months} month${months !== 1 ? "s" : ""}, ` : "";

    const shortFormattedYears = years > 0 ? `${years}y ` : "";
    const shortFormattedMonths = months > 0 ? `${months}m ` : "";

    const ageString =
      `${formattedYears}` +
      `${formattedMonths}` +
      `${days} day${days !== 1 ? "s" : ""}`;
    const sortAgeString = `${shortFormattedYears} ${shortFormattedMonths} ${days}d`;

    return short ? sortAgeString : ageString;
  } else {
    return "-";
  }
};
