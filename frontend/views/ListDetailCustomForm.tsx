import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Crud from "../features/Crud";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { useAutoCrud } from "Frontend/features/util";
import Person from "Frontend/generated/com/example/application/endpoint/Person";
import { DatePicker } from "@hilla/react-components/DatePicker.js";

export default function ListDetailDeepLinking() {
  const crud = useAutoCrud<Person>(PersonEndpoint, (form, buttons) => {
    return (
      <HorizontalLayout>
        <TextField label="Name" {...form.field(form.model.name)}></TextField>
        <TextField label="Email" {...form.field(form.model.email)}></TextField>
        <DatePicker
          label="Date of birth"
          {...form.field(form.model.dateOfBirth)}
        ></DatePicker>
        {buttons}
      </HorizontalLayout>
    );
  });
  return (
    <>
      <Crud {...crud} style={{ height: "100%" }}></Crud>
    </>
  );
}
setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});
