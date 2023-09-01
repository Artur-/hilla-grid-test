import {
    DatePickerDate,
    DatePickerI18n,
} from "@hilla/react-components/DatePicker.js";
import {
    getAdjustedYear,
    parseDate
} from "@vaadin/date-picker/src/vaadin-date-picker-helper.js";

export const datePickerDefaulti18n: DatePickerI18n = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  weekdays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  firstDayOfWeek: 0,
  today: "Today",
  cancel: "Cancel",
  referenceDate: "",
  formatDate(d: DatePickerDate) {
    const yearStr = String(d.year).replace(
      /\d+/u,
      (y) => "0000".substr(y.length) + y
    );
    return [d.month + 1, d.day, yearStr].join("/");
  },
  parseDate(text: string) {
    const parts = text.split("/");
    const today = new Date();
    let date,
      month = today.getMonth(),
      year = today.getFullYear();

    if (parts.length === 3) {
      month = parseInt(parts[0]) - 1;
      date = parseInt(parts[1]);
      year = parseInt(parts[2]);
      if (parts[2].length < 3 && year >= 0) {
        const usedReferenceDate = this.referenceDate
          ? parseDate(this.referenceDate)
          : new Date();
        year = getAdjustedYear(
          usedReferenceDate,
          year,
          month,
          date
        ) as any as number;
      }
    } else if (parts.length === 2) {
      month = parseInt(parts[0]) - 1;
      date = parseInt(parts[1]);
    } else if (parts.length === 1) {
      date = parseInt(parts[0]);
    }

    if (date !== undefined) {
      return { day: date, month, year };
    }
    return undefined
  },
  formatTitle: (monthName: string, fullYear: number) => {
    return `${monthName} ${fullYear}`;
  },
};
