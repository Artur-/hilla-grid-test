import { Grid } from "@hilla/react-components/Grid.js";
import Person from "Frontend/generated/com/example/application/endpoints/helloreact/Person";
import PersonModel from "Frontend/generated/com/example/application/endpoints/helloreact/PersonModel";
import { PersonEndpoint } from "Frontend/generated/endpoints";
import { data } from "./util";

export default function AboutView() {
  return (
    <Grid<Person>
      style={{ height: "500px" }}
      {...data(PersonEndpoint, PersonModel)}
      pageSize={5}
    ></Grid>
  );
}
