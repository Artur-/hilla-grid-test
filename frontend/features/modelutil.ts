import { ModelConstructor } from "@hilla/form";
import { Formatter, getCustomFormatter, getTypeFormatter } from "./formatter";
import { GridColumn } from "@vaadin/grid";

export interface PropertyInfo {
  name: string;
  javaType: string;
  customFormatterName: string;
  humanReadableName: string;
  formatter: Formatter<any>;
  columnOptions: Partial<GridColumn>;
}
export const getProperties = (
  model: ModelConstructor<any, any>
): PropertyInfo[] => {
  const properties = Object.keys(
    Object.getOwnPropertyDescriptors(model.prototype)
  ).filter((p) => p !== "constructor" && !p.endsWith("Options"));

  return properties.map((name) => {
    const customOptions = new (model as any)()[name + "Options"];
    const javaType = customOptions?.javaType;
    const customFormatterName = customOptions?.customFormatter;
    const humanReadableName = _generateHeader(name);

    const typeFormatter = getTypeFormatter(javaType);
    const customFormatter = customFormatterName
      ? getCustomFormatter(customFormatterName)
      : undefined;
    let formatter = customFormatter ?? typeFormatter;

    let columnOptions = {};
    if (typeFormatter?.columnOptions) {
      columnOptions = {
        ...columnOptions,
        ...typeFormatter.columnOptions,
      };
    }
    if (formatter?.columnOptions) {
      columnOptions = {
        ...columnOptions,
        ...formatter.columnOptions,
      };
    }
    if (!formatter) {
      formatter = (value) => value;
    }

    return {
      name,
      humanReadableName,
      javaType,
      customFormatterName,
      formatter,
      columnOptions,
    };
  });
};

// This is from vaadin-grid-column.js, should be used from there maybe. At least we must be 100% sure to match grid and fields
function _generateHeader(path: string) {
  return path
    .substr(path.lastIndexOf(".") + 1)
    .replace(/([A-Z])/gu, "-$1")
    .toLowerCase()
    .replace(/-/gu, " ")
    .replace(/^./u, (match) => match.toUpperCase());
}
