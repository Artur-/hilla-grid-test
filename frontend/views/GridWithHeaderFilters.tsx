import { Grid } from "@hilla/react-components/Grid.js";
import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import { useAutoGrid } from "Frontend/features/autogrid";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";

export default function GridWithHeaderFilters() {
  return (
    <Grid {...useAutoGrid(PersonEndpoint, undefined, { headerFilters: true })}></Grid>
    // fields: {'name': {type: 'ComboBox'}}, columns{'name: {...}'} })}></Grid>
  );
}

setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});
