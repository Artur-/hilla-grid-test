import { Grid } from "@hilla/react-components/Grid.js";
import Person from "Frontend/generated/com/example/application/endpoints/helloreact/Person";
import { data } from "./util";
import { PersonEndpoint } from "Frontend/generated/endpoints";
import PersonModel from "Frontend/generated/com/example/application/endpoints/helloreact/PersonModel";

export default function PersonView() {
  return <Grid<Person> {...data(PersonEndpoint, PersonModel)}></Grid>;
}
