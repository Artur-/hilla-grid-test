import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { UseFormResult } from "@hilla/react-form";
import { datePickerDefaulti18n } from "./datepickerdefault";
import { datePickerFormatter } from "./formatter";
import { PropertyInfo } from "./modelutil";

export function createField(
  prop: PropertyInfo,
  additionalProps: Record<string, any>
) {
  let field;
  let commonProps = {
    label: prop.humanReadableName,
    key: prop.name,
  };
  commonProps = { ...commonProps, ...additionalProps };
  if (prop.javaType === "LocalDate") {
    field = (
      <DatePicker
        {...commonProps}
        i18n={{
          ...datePickerDefaulti18n,
          formatDate: datePickerFormatter(prop.formatter),
        }}
      ></DatePicker>
    );
  } else {
    field = <TextField {...commonProps}></TextField>;
  }

  return field;
}
