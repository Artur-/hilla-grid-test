import { setLocale } from "Frontend/features/applicationconfiguration";
import { useAutoCrud } from "Frontend/features/autocrud";
import {
    defineCustomFormatter,
    getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Person from "Frontend/generated/com/example/application/endpoint/Person";
import Crud from "../features/Crud";

export default function ListDetail() {
  const crud = useAutoCrud<Person>(PersonEndpoint);
  return <Crud {...crud}></Crud>;
}
setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});
