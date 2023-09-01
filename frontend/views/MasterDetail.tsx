import { Grid } from "@hilla/react-components/Grid.js";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import { data } from "../features/util";
import Person from "Frontend/generated/com/example/application/endpoint/Person";
import { useState } from "react";

export default function MasterDetail() {
  const [selectedItems, setSelectedItems] = useState<Person[]>([]);
  return (
    <>
      <Grid
        {...data(PersonEndpoint)}
        selectedItems={selectedItems}
        onActiveItemChanged={(e) => {
          const item = e.detail.value;
          setSelectedItems(item ? [item] : []);
        }}
      ></Grid>
    </>
  );
}
