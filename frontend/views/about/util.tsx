import { ModelConstructor, ObjectModel } from "@hilla/form";
import {
  GridElement,
  GridDataProviderParams,
  GridDataProviderCallback,
} from "@hilla/react-components/Grid.js";
import { GridSortColumn } from "@hilla/react-components/GridSortColumn.js";
import Pageable from "Frontend/generated/dev/hilla/mappedtypes/Pageable";
import Sort from "Frontend/generated/dev/hilla/mappedtypes/Sort";
import Direction from "Frontend/generated/org/springframework/data/domain/Sort/Direction";
import { useEffect, useRef } from "react";

type EndpointType<T> = { list: (request: Pageable) => Promise<T[]> };

export const data = <T,>(
  endpoint: EndpointType<T>,
  model: ModelConstructor<T, any>
) => {
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

      endpoint.list(req).then((items) => {
        let size;
        console.log("Response for ", req);
        if (items.length === pageSize) {
          size = (pageNumber + 1) * pageSize + 1;
        } else {
          size = pageNumber * pageSize + items.length;
        }
        // callback(items, Math.max((grid as any)._cache.size, size));
        callback(items, size);
      });
    };
  }, []);

  //   const children = model.
  const properties = Object.keys(
    Object.getOwnPropertyDescriptors(model.prototype)
  ).filter((p) => p !== "constructor");
  const children = properties.map(
    (p) => {
      //   if (isEntityReference(Model, p)) {
      //     return html`<vaadin-grid-sort-column
      //       auto-width
      //       path="${p}.name"
      //     ></vaadin-grid-sort-column>`;
      //   } else {
      return <GridSortColumn path={p}></GridSortColumn>;
    }
    // }
    // ${renderer(Model, p, dataStore)}
  );

  return {
    ref,
    children
  };
};
