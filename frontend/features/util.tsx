import { ModelConstructor } from "@hilla/form";
import {
    GridDataProviderCallback,
    GridDataProviderParams,
    GridElement,
} from "@hilla/react-components/Grid.js";
import { GridSortColumn } from "@hilla/react-components/GridSortColumn.js";
import Pageable from "Frontend/generated/dev/hilla/mappedtypes/Pageable";
import Sort from "Frontend/generated/dev/hilla/mappedtypes/Sort";
import Direction from "Frontend/generated/org/springframework/data/domain/Sort/Direction";
import { useEffect, useRef } from "react";
import { Formatter, getCustomFormatter, getTypeFormatter } from "./formatter";

type EndpointType<T> = {
  list: {
    (request: Pageable): Promise<T[]>;
    // returnType: ModelConstructor<T, any>;
  };
};

export const data = <T,>(endpoint: EndpointType<T>, options?: any) => {
  const listMethod = endpoint.list;

  const model: ModelConstructor<T, any> = (listMethod as any).returnType;
  const ref = useRef(null);
  useEffect(() => {
    const grid = ref.current as any as GridElement<T>;

    grid.dataProvider = (
      params: GridDataProviderParams<T>,
      callback: GridDataProviderCallback<T>
    ) => {
      const sort: Sort = {
        orders: params.sortOrders.map((order) => ({
          property: order.path,
          direction: order.direction == "asc" ? Direction.ASC : Direction.DESC,
          ignoreCase: false,
        })),
      };

      const pageNumber = params.page;
      const pageSize = params.pageSize;
      const req = {
        pageNumber,
        pageSize,
        sort,
      };
      console.log("Request for ", req);

      listMethod(req).then((items) => {
        let size;
        console.log("Response for ", req);
        if (items.length === pageSize) {
          size = (pageNumber + 1) * pageSize + 1;
          if (size < (grid as any)._cache.size) {
            // Only allow size to grow here
            size = undefined;
          }
        } else {
          size = pageNumber * pageSize + items.length;
        }
        callback(items, size);
      });
    };
  }, []);

  const properties = Object.keys(
    Object.getOwnPropertyDescriptors(model.prototype)
  ).filter((p) => p !== "constructor" && !p.endsWith("Options"));
  const children = properties.map((p) => {
    let renderer = (value: any) => <>{value.item[p]}</>;
    let customProps: any = { AutoWidth: true };
    let columnOptions = options?.columns;
    columnOptions = columnOptions ? columnOptions[p] : undefined;
    const customOptions = new (model as any)()[p + "Options"];
    const propertyType = customOptions?.javaType;
    console.log("propertyType", propertyType);
    const customFormatterName = customOptions?.customFormatter;
    let formatter: Formatter | undefined = columnOptions?.formatter;
    if (!formatter) {
      formatter = getCustomFormatter(customFormatterName);
    }
    if (!formatter) {
      formatter = getTypeFormatter(propertyType);
    }
    if (formatter) {
      renderer = (value: any) => <>{formatter!(value.item[p])}</>;
      if (formatter.columnOptions) {
        customProps = { ...customProps, ...formatter.columnOptions };
      }
    }
    if (p === "taxesPaid") {
      customProps.textAlign = "end";
      customProps.flexGrow = 0;
    }
    //   if (isEntityReference(Model, p)) {
    //     return html`<vaadin-grid-sort-column
    //       auto-width
    //       path="${p}.name"
    //     ></vaadin-grid-sort-column>`;
    //   } else {
    return (
      <GridSortColumn path={p} key={p} {...customProps}>
        {renderer}
      </GridSortColumn>
    );
  });

  return {
    ref,
    children,
  };
};
