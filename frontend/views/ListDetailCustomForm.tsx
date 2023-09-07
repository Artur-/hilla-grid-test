import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { setLocale } from "Frontend/features/applicationconfiguration";
import { useAutoCrud } from "Frontend/features/autocrud";
import {
    defineCustomFormatter,
    getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Person from "Frontend/generated/com/example/application/endpoint/Person";
import Crud from "../features/Crud";

export default function ListDetailCustomForm() {
  const crud = useAutoCrud<Person>(PersonEndpoint, (form, buttons) => (
    <HorizontalLayout>
      <TextField label="Name" {...form.field(form.model.name)}></TextField>
      <TextField label="Email" {...form.field(form.model.email)}></TextField>
      <DatePicker
        label="Date of birth"
        {...form.field(form.model.dateOfBirth)}
      ></DatePicker>
      {buttons}
    </HorizontalLayout>
  ));
  return <Crud {...crud}></Crud>;
}
setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});
