import { Button } from "@hilla/react-components/Button.js";
import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { useForm } from "@hilla/react-form";
import { datePickerDefaulti18n } from "Frontend/features/datepickerdefault";
import { datePickerFormatter } from "Frontend/features/formatter";
import { getProperties } from "Frontend/features/modelutil";
import { CSSProperties, useEffect, useState } from "react";
import { CrudEndpoint, data } from "../features/util";
export default function Crud<T = any>(props: {
  style: CSSProperties;
  endpoint: CrudEndpoint<T>;
}) {
  const [item, setItem] = useState<T>();
  const model = props.endpoint.list.returnType;
  const form = useForm(model);
  useEffect(() => {
    form.setValue(item);
  }, [item]);
  const fields = getProperties(model).map((prop) => {
    let field;
    const commonProps = {
      label: prop.humanReadableName,
      key: prop.name,
      ...form.field(form.model[prop.name]),
    };
    if (prop.javaType === "LocalDate") {
      field = (
        <DatePicker
          {...commonProps}
          i18n={{
            ...datePickerDefaulti18n,
            formatDate: datePickerFormatter(prop.formatter),
          }}
        ></DatePicker>
      );
    } else {
      field = <TextField {...commonProps}></TextField>;
    }
    return field;
  });
  const buttons = (
    <HorizontalLayout theme="spacing">
      <Button onClick={(e) => console.log("click")}>Save</Button>
      <Button>Discard</Button>
      <Button>Cancel</Button>
    </HorizontalLayout>
  );
  const formLayout = (
    <VerticalLayout theme="padding spacing">
      {fields}
      {buttons}
    </VerticalLayout>
  );

  return (
    <HorizontalLayout style={{ ...props.style }} theme="spacing">
      <Grid
        style={{ height: "100%" }}
        {...data(props.endpoint)}
        selectedItems={[item]}
        onActiveItemChanged={(e) => {
          const item = e.detail.value;
          setItem(item ? item : undefined);
        }}
      ></Grid>
      {formLayout}
    </HorizontalLayout>
  );
}
