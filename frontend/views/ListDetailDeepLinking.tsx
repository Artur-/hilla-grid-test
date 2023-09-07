import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Crud from "../features/Crud";
import { useAutoCrud } from "Frontend/features/util";

export default function ListDetailDeepLinking() {
  const autoCrud = useAutoCrud(PersonEndpoint);
  return (
    <>
      <Crud {...autoCrud} style={{ height: "100%" }}></Crud>
    </>
  );
}
setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});
