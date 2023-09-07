import { Grid } from "@hilla/react-components/Grid.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { setLocale } from "Frontend/features/applicationconfiguration";
import { useAutoGrid } from "Frontend/features/util";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import Filter from "Frontend/generated/com/example/application/util/Filter";
import Type from "Frontend/generated/com/example/application/util/PropertyFilter/Type";
import { useState } from "react";

export default function GridWithFilter() {
  const [filter, setFilter] = useState<Filter>();
  return (
    <VerticalLayout theme="spacing padding">
      <TextField
        style={{ width: "25em" }}
        onInput={(e) => {
          setFilter({
            t: "or",
            children: [
              {
                t: "prop",
                propertyId: "name",
                filterValue: (e.target as any).value,
                type: Type.CONTAINS,
              },
              {
                t: "prop",
                propertyId: "email",
                filterValue: (e.target as any).value,
                type: Type.CONTAINS,
              },
            ],
          });
        }}
        label="Search for name or email"
      ></TextField>
      Filter: {JSON.stringify(filter)}
      <Grid {...useAutoGrid(PersonEndpoint, filter)}></Grid>;
    </VerticalLayout>
  );
}

setLocale("fi");
// defineCustomFormatter("intToEuros", (value: number) => {
//   return getTypeFormatter("Integer")!(value / 100) + " €";
// });
