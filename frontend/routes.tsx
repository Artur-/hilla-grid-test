import MainLayout from "Frontend/MainLayout.js";
import { lazy } from "react";
import {
    createBrowserRouter,
    IndexRouteObject,
    NonIndexRouteObject,
    useMatches,
} from "react-router-dom";
import MasterDetail from "./views/MasterDetail";

const ReadOnlyGrid = lazy(async () => import("Frontend/views/ReadOnlyGrid.js"));
export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
  {
    element: <MainLayout />,
    handle: { icon: "null", title: "Main" },
    children: [
      {
        path: "/",
        element: <></>,
      },
      {
        path: "/readonly-grid",
        element: <ReadOnlyGrid />,
        handle: { icon: "file", title: "Read only grid" },
      },
      {
        path: "/master-detail",
        element: <MasterDetail />,
        handle: { icon: "file", title: "Master detail" },
      },
    ],
  },
];

const router = createBrowserRouter([...routes]);
export default router;
