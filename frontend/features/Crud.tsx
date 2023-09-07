import { Button } from "@hilla/react-components/Button.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { UseFormResult } from "@hilla/react-form";
import Filter from "Frontend/generated/com/example/application/util/Filter";
import { CSSProperties, useEffect, useState } from "react";
import { CrudEndpoint, useAutoGrid } from "./util";

const filter: Filter | undefined = undefined;

export default function Crud<T = any>(props: {
  endpoint: CrudEndpoint<T>;
  form: UseFormResult<T, any>;
  formGenerator: (
    form: UseFormResult<T, any>,
    buttons: JSX.Element
  ) => JSX.Element;
  style?: CSSProperties;
}) {
  const [item, setItem] = useState<T>();
  useEffect(() => {
    props.form.setValue(item);
  }, [item]);

  const buttons = (
    <HorizontalLayout theme="spacing">
      <Button
        onClick={async (e) => {
          setItem(await props.endpoint.update(props.form.value));
          //   grid.refresh;
        }}
      >
        Save
      </Button>
      <Button>Discard</Button>
      <Button>Cancel</Button>
    </HorizontalLayout>
  );

  return (
    <HorizontalLayout
      style={{ height: "100%", ...props.style }}
      theme="spacing"
    >
      <Grid
        style={{ height: "100%" }}
        selectedItems={[item]}
        onActiveItemChanged={(e) => {
          const item = e.detail.value;
          setItem(item ? item : undefined);
        }}
        {...useAutoGrid(props.endpoint, filter)}
      ></Grid>
      {props.formGenerator(props.form, buttons)}
    </HorizontalLayout>
  );
}
