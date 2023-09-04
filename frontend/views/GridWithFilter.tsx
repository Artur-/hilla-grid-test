import { Grid } from "@hilla/react-components/Grid.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { setLocale } from "Frontend/features/applicationconfiguration";
import {
  defineCustomFormatter,
  getTypeFormatter,
} from "Frontend/features/formatter";
import * as PersonEndpoint from "Frontend/generated/PersonEndpoint-modified.js";
import { data } from "../features/util";
import { useState } from "react";
import Filter from "Frontend/generated/com/example/application/util/Filter";

export default function GridWithFilter() {
  const [filter, setFilter] = useState<Filter>();
  return (
    <VerticalLayout theme="spacing padding">
      Note, only the filter text field changed last is applied
      <TextField
        onInput={(e) => {
          setFilter({
            type: "prop",
            propertyId: "name",
            filterValue: (e.target as any).value,
          });
        }}
        label="Search for name"
      ></TextField>
      <TextField
        onInput={(e) => {
          setFilter({
            type: "or",
            children: [
              {
                type: "prop",
                propertyId: "name",
                filterValue: (e.target as any).value,
              },
              {
                type: "prop",
                propertyId: "email",
                filterValue: (e.target as any).value,
              },
            ],
          });
        }}
        label="Search for name or email"
      ></TextField>
      Filter: {JSON.stringify(filter)}
      <Grid {...data(PersonEndpoint, filter)}></Grid>;
    </VerticalLayout>
  );
}

setLocale("fi");
// defineCustomFormatter("intToEuros", (value: number) => {
//   return getTypeFormatter("Integer")!(value / 100) + " €";
// });
