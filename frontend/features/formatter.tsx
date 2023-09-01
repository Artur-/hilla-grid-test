import { GridColumn } from "@vaadin/grid";
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const customFormatters: Record<string, Formatter> = {};
const typeFormatters: Record<string, Formatter> = {};

typeFormatters.Integer = (value) => value;
typeFormatters.Integer.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};
typeFormatters.Double = (value) => {
  return value;
};
typeFormatters.Double.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};
typeFormatters.LocalDate = (value) => {
  // return format(new Date(value))
  return value;
};
typeFormatters.LocalDate.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};
typeFormatters.BigDecimal = (value) => (value as number).toFixed(2);
typeFormatters.BigDecimal.columnOptions = {
  textAlign: "end",
  flexGrow: 0,
  autoWidth: true,
};

export interface Formatter {
  (value: any): string;
  columnOptions?: Partial<GridColumn>;
}
export function defineCustomFormatter(
  name: string,
  formatter: Formatter,
  columnOptions?: Partial<GridColumn>
) {
  customFormatters[name] = formatter;
  customFormatters[name].columnOptions = columnOptions;
}

export function getCustomFormatter(name: string): Formatter | undefined {
  return customFormatters[name];
}

export function getTypeFormatter(type: string) {
  return typeFormatters[type];
}
