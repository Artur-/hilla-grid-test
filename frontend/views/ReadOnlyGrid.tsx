import { Grid } from "@hilla/react-components/Grid.js";
import { defineCustomFormatter } from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import { data } from "../features/util";
import { setLocale } from "Frontend/features/applicationconfiguration";

export default function ReadOnlyGrid() {
  return <Grid {...data(PersonEndpoint)}></Grid>;
}

setLocale("fi-FI");
defineCustomFormatter(
  "intToEuros",
  (value: number) => {
    return (value / 100).toFixed(2) + " €";
  },
  { textAlign: "end", flexGrow: 0 }
);
