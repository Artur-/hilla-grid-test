import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { UseFormResult, useForm } from "@hilla/react-form";
import { createField } from "./field-factory";
import { getProperties } from "./modelutil";
import { CrudEndpoint } from "./autogrid";

export const useAutoCrud = <T,>(
  endpoint: CrudEndpoint<T>,
  formGenerator?: (
    form: UseFormResult<T, any>,
    buttons: JSX.Element
  ) => JSX.Element
): {
  endpoint: CrudEndpoint<T>;
  form: UseFormResult<T, any>;
  formGenerator: (
    form: UseFormResult<T, any>,
    buttons: JSX.Element
  ) => JSX.Element;
} => {
  const model = endpoint.list.returnType;
  const form = useForm(model);
  if (!formGenerator) {
    formGenerator = (form, buttons) => (
      <VerticalLayout theme="padding spacing">
        {getProperties(model).map((prop) =>
          createField(prop, form.field(form.model[prop.name]))
        )}
        {buttons}
      </VerticalLayout>
    );
  }
  return { endpoint, form, formGenerator };
};
