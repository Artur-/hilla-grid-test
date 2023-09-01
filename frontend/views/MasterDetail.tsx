import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import PersonModel from "Frontend/generated/com/example/application/endpoint/PersonModel-mod";
import Crud from "./Crud";
import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";

export default function MasterDetail() {
  return (
    <>
      <Crud style={{ height: "100%" }} endpoint={PersonEndpoint}></Crud>
    </>
  );
}
setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")(value / 100) + " €";
});
