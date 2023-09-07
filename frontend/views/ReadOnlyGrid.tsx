import { Grid } from "@hilla/react-components/Grid.js";
import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import { useAutoGrid } from "../features/util";
import { Button } from "@hilla/react-components/Button.js";
import { useState } from "react";
import PersonModel from "Frontend/generated/com/example/application/endpoint/PersonModel-mod";

export default function ReadOnlyGrid() {
  const [showGrid, setShowGrid] = useState(true);

  // const autoGrid = useAutoGrid(PersonEndpoint);
  // const form = useFormGenerator(PersonModel);
  //   const autoCrud = useAutoCrud(PersonEndpoint);

  return (
    <>
      {/* (showGrid ?  */}
      <Grid {...useAutoGrid(PersonEndpoint)}></Grid>
      {/* <Button
        onClick={(e) => {
          setShowGrid(true);
        }}
      >
        Show grid
      </Button>
      ); */}
    </>
  );
}

setLocale("fi");
defineCustomFormatter("intToEuros", (value: number) => {
  return getTypeFormatter("Integer")!(value / 100) + " €";
});
