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
import { Formatter } from "./formatter";
import { getProperties } from "./modelutil";

export interface CrudEndpoint<T> extends ListEndpoint<T> {}
export interface ListEndpoint<T> {
  list: {
    (request: Pageable): Promise<T[]>;
    returnType: ModelConstructor<T, any>;
  };
}

interface ColumnOptions {
  formatter: Formatter<any>;
}
interface Options {
  columns: Record<string, ColumnOptions>;
}
export const data = <T,>(endpoint: ListEndpoint<T>, options?: Options) => {
  const listMethod = endpoint.list;
  const model: ModelConstructor<T, any> = listMethod.returnType;
  const ref = useRef(null);
  useEffect(() => {
    const grid = ref.current as any as GridElement<T>;

    let first = true;
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
        if (first) {
          first = false;
          setTimeout(() => grid.recalculateColumnWidths(), 0);
        }
      });
    };
  }, []);

  const properties = getProperties(model);
  const children = properties.map((p) => {
    const name = p.name;
    let renderer = (value: any) => <>{value.item[name]}</>;
    let customProps: any = { autoWidth: true };
    const columnOptions = options?.columns?.[name];
    const formatter = p.formatter;
    const propertyColumnOptions = p.columnOptions;

    renderer = (value: any) => <>{formatter(value.item[p.name])}</>;
    if (propertyColumnOptions) {
      customProps = { ...customProps, ...propertyColumnOptions };
    }
    if (columnOptions) {
      customProps = { ...customProps, columnOptions };
    }
    //   if (isEntityReference(Model, p)) {
    //     return html`<vaadin-grid-sort-column
    //       auto-width
    //       path="${p}.name"
    //     ></vaadin-grid-sort-column>`;
    //   } else {
    return (
      <GridSortColumn
        path={p.name}
        header={p.humanReadableName}
        key={p.name}
        {...customProps}
      >
        {renderer}
      </GridSortColumn>
    );
  });

  return {
    ref,
    children,
  };
};
