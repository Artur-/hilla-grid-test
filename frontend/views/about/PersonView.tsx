import { Grid } from "@hilla/react-components/Grid.js";
import { data } from "./util";
import { PersonEndpoint } from "Frontend/generated/endpoints";
import PersonModel from "Frontend/generated/com/example/application/endpoint/PersonModel";

export default function PersonView() {
  return <Grid {...data(PersonEndpoint, PersonModel)}></Grid>;
}
