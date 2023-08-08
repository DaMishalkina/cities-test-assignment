import {FunctionComponent, ComponentType} from "react";

export interface RouteItem {
    key: string;
    title: string;
    tooltip?: string;
    path: string;
    component?: FunctionComponent;
    enabled: boolean;
    icon?: ComponentType;
    subRoutes?: Array<RouteItem>;
    appendDivider?: boolean;
    type: "guest" | "private";
}