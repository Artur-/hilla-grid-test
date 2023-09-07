import { ModelConstructor } from "@hilla/form";
import { Button } from "@hilla/react-components/Button.js";
import {
  GridDataProviderCallback,
  GridDataProviderParams,
  GridElement,
} from "@hilla/react-components/Grid.js";
import { GridColumnGroup } from "@hilla/react-components/GridColumnGroup.js";
import { GridSortColumn } from "@hilla/react-components/GridSortColumn.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import Filter from "Frontend/generated/com/example/application/util/Filter";
import Type from "Frontend/generated/com/example/application/util/PropertyFilter/Type";
import Pageable from "Frontend/generated/dev/hilla/mappedtypes/Pageable";
import Sort from "Frontend/generated/dev/hilla/mappedtypes/Sort";
import { HillaDevelopmentEndpoint } from "Frontend/generated/endpoints";
import Direction from "Frontend/generated/org/springframework/data/domain/Sort/Direction";
import { useCallback, useEffect, useRef, useState } from "react";
import { createField } from "./field-factory";
import { Formatter } from "./formatter";
import { getProperties } from "./modelutil";
import css from "./util.module.css";

export interface CrudEndpoint<T> extends ListEndpoint<T> {
  update: {
    (value: T): Promise<T>;
  };
}
export interface ListEndpoint<T> {
  list: {
    (request: Pageable, filter: Filter | undefined): Promise<T[]>;
    returnType: ModelConstructor<T, any>;
  };
}

interface ColumnOptions {
  formatter: Formatter<any>;
}

interface Options {
  headerFilters: boolean;
  columns: Record<string, ColumnOptions>;
}

export const useAutoGrid = <T,>(
  endpoint: CrudEndpoint<T>,
  filter?: Filter,
  options?: Partial<Options>
) => {
  const listMethod = endpoint.list;
  const model: ModelConstructor<T, any> = listMethod.returnType;
  const ref = useRef(null);
  const [internalFilter, setInternalFilter] = useState<Filter>();

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

      listMethod(req, filter ?? internalFilter).then((items) => {
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
  }, [filter, internalFilter]);

  const properties = getProperties(model);
  const children = properties.map((p) => {
    const name = p.name;
    let renderer = (value: any) => <>{value.item[name]}</>;
    let customProps: any = { autoWidth: true };
    const columnOptions = options?.columns?.[name];
    const formatter = p.formatter;
    const propertyColumnOptions = p.columnOptions;

    renderer = (value: any) => (
      <span className={css.number}>{formatter(value.item[p.name])}</span>
    );
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
    let column = (
      <GridSortColumn
        path={p.name}
        header={p.humanReadableName}
        key={p.name}
        {...customProps}
      >
        {renderer}
      </GridSortColumn>
    );

    if (options?.headerFilters) {
      const headerRenderer = useCallback(() => {
        return createField(p, {
          onInput: (e: any) => {
            const fieldValue = (e.target as any).value;
            const filterValue = fieldValue;

            const filter = {
              t: "prop",
              propertyId: p.name,
              filterValue,
              type: Type.GREATER_THAN_OR_EQUALS,
            };
            setInternalFilter(filter);
          },
        });
      }, []);

      column = (
        <GridColumnGroup key={"group" + p.name} headerRenderer={headerRenderer}>
          {column}
        </GridColumnGroup>
      );
    }

    return column;
  });

  return {
    ref,
    children: [
      ...children,
      <div
        slot="tooltip"
        style={{
          background: "white",
          position: "absolute",
          bottom: "1em",
          right: "1em",
          transition: "opacity 0.3s ease-in-out",
          opacity: "var(--dev-tools-opacity, 0)",
        }}
      >
        <VerticalLayout
          style={{
            display: "inline-flex",
            padding: "10px",
            border: "1px solid #00f",
            borderRadius: "5px",
          }}
        >
          Dev tools
          <Button
            onClick={(e) => {
              HillaDevelopmentEndpoint.generateData(
                "com.example.application.endpoint.Person",
                100
              ).then(() => (ref.current! as any).clearCache());
            }}
          >
            Generate
          </Button>
          <Button
            onClick={(e) => {
              HillaDevelopmentEndpoint.deleteData(
                "com.example.application.endpoint.Person"
              ).then(() => (ref.current! as any).clearCache());
            }}
          >
            Delete all
          </Button>
        </VerticalLayout>
      </div>,
    ],
  };
};
