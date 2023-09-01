import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { DatePicker as DatePickerWebComponent } from "@vaadin/date-picker/vaadin-date-picker.js";
import { datePickerFormatter } from "Frontend/features/formatter";
import { useEffect, useRef } from "react";

export default function DatePickerView() {
  const ref = useRef<DatePickerWebComponent>(null);
  useEffect(() => {
    const datePicker = ref.current!;
    datePicker.i18n = {
      ...datePicker.i18n,
      formatDate: datePickerFormatter,
    };
  });
  return <DatePicker ref={ref}></DatePicker>;
}
