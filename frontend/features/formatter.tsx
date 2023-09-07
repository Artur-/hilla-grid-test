import { GridColumn } from "@vaadin/grid";
import { format } from "date-fns";
import { getLocale } from "./applicationconfiguration";
import { DatePickerDate } from "@hilla/react-components/DatePicker.js";
import formatDistance from "date-fns/formatDistance/index.js";
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const customFormatters: Record<string, Formatter<any>> = {};
const typeFormatters: Record<string, Formatter<any>> = {};

typeFormatters.Integer = (value: number) => {
  return new Intl.NumberFormat(getLocale(), {
    maximumFractionDigits: 0,
  }).format(value);
};
typeFormatters.Integer.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};
typeFormatters.Double = (value: number) => {
  return new Intl.NumberFormat(getLocale(), {
    maximumFractionDigits: 2,
  }).format(value);
};
typeFormatters.Double.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};
typeFormatters.LocalDate = (value: string) => {
  return format(new Date(value), "P");
};
typeFormatters.LocalDate.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};
typeFormatters.BigDecimal = (value) => {
  return new Intl.NumberFormat(getLocale(), {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true,
  }).format(value);
};
typeFormatters.BigDecimal.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};

export interface Formatter<T> {
  (value: T): string;
  columnOptions?: Partial<GridColumn>;
}
export function defineCustomFormatter(
  name: string,
  formatter: Formatter<any>,
  columnOptions?: Partial<GridColumn>
) {
  customFormatters[name] = formatter;
  customFormatters[name].columnOptions = columnOptions;
}

export function getCustomFormatter(name: string): Formatter<any> | undefined {
  const formatter = customFormatters[name];
  if (!formatter) {
    console.error(`Custom formatter '${name}' not found`);
  }
  return formatter;
}

export function getTypeFormatter(type: string): Formatter<any> | undefined {
  return typeFormatters[type];
}

export const datePickerFormatter = (formatter: Formatter<Date>) => {
  return (date: DatePickerDate): string => {
    const d = new Date(date.year, date.month, date.day);
    return formatter(d);
  };
};
