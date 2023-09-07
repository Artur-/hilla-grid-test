import { Grid } from "@hilla/react-components/Grid.js";
import { useAutoGrid } from "Frontend/features/autogrid";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";

export default function TestView() {
  return <Grid {...useAutoGrid(PersonEndpoint)}></Grid>;
}
