import { ModelConstructor } from "@hilla/form";

export interface PropertyInfo {
  name: string;
  javaType: string;
  customFormatterName: string;
  humanReadableName: string;
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
    return { name, humanReadableName, javaType, customFormatterName };
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
