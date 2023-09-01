import { Grid } from "@hilla/react-components/Grid.js";
import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import { data } from "../features/util";

export default function ReadOnlyGrid() {
  return <Grid {...data(PersonEndpoint)}></Grid>;
}

setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")(value / 100) + " €";
});
