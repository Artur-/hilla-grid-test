import { setLocale } from "Frontend/features/applicationconfiguration";
import { createField } from "Frontend/features/field-factory";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import { getProperties } from "Frontend/features/modelutil";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Person from "Frontend/generated/com/example/application/endpoint/Person";
import Crud from "../features/Crud";
import css from "./ListDetailCustomAutoGeneratedForm.module.css";
import { useAutoCrud } from "Frontend/features/autocrud";
export default function ListDetailCustomAutoGeneratedForm() {
  const crud = useAutoCrud<Person>(PersonEndpoint, (form, buttons) => (
    <div className={css.myform}>
      {getProperties(form.model.constructor).map((property) =>
        createField(property, {})
      )}
      <div style={{ width: "100%" }}></div>
      {buttons}
    </div>
  ));
  return <Crud {...crud}></Crud>;
}
setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});