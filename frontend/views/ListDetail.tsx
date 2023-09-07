import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Crud from "../features/Crud";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useAutoCrud } from "Frontend/features/util";
import Person from "Frontend/generated/com/example/application/endpoint/Person";

export default function ListDetail() {
  const crud = useAutoCrud<Person>(PersonEndpoint);
  //   , (form) => {
  //     return (
  //       <VerticalLayout>
  //         <HorizontalLayout>
  //           <TextField {...form.field(form.model.name)}></TextField>
  //         </HorizontalLayout>
  //       </VerticalLayout>
  //     );
  //   });
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
