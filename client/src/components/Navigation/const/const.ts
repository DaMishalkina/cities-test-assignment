import {Home} from "../../../pages/Home";
import {City} from "../../../pages/City";

import {RouteItem} from "../types/types";

export const PAGE_TITLE_HOME = "Home";
export const PAGE_TITLE_CITY = "City";
export const ROUTES: Array<RouteItem> = [
    {
        key: "router-city",
        title: PAGE_TITLE_CITY,
        tooltip: PAGE_TITLE_CITY,
        path: "/:id",
        enabled: true,
        component: City,
        appendDivider: true,
        type: "guest"
    },
    {
        key: "router-home",
        title: PAGE_TITLE_HOME,
        tooltip: PAGE_TITLE_HOME,
        path: "/",
        enabled: true,
        component: Home,
        appendDivider: true,
        type: "guest"
    }
]