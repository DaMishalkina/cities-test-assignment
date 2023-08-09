import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";

import {ROUTES} from "./components/Navigation/const/const";

import {RouteItem} from "./components/Navigation/types/types";

import "./App.scss";

function App() {
    return (
        <HashRouter>
            <Routes>
                {ROUTES.map((route: RouteItem) => (
                    route.subRoutes ? route.subRoutes.map((item: RouteItem) => (
                            <Route
                                key={`${item.key}`}
                                path={`${item.path}`}
                                Component={item.component}
                            />
                        )) :
                        <Route
                            key={`${route.key}`}
                            path={`${route.path}`}
                            Component={route.component}
                        />
                ))}
            </Routes>
        </HashRouter>
    )

}

export default App;
