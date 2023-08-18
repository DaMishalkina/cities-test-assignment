import React from "react";
import classNames from "classnames";
import ContentLoader from "react-content-loader";

import "./MainPageLoader.scss";

interface Props {
    className?: string
}

export const MainPageLoader = ({className = ""}: Props) => {
    return (
        <ContentLoader
            className={classNames("loader", className)}
            width={"100%"}
            height={"100%"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width="153" height="43"  />
            <rect x="0" y="59" rx="10" ry="10" width="100%" height="200" />
            <rect x="0" y="289" rx="5" ry="5" width="153" height="43"  />
            <rect x="0" y="348" rx="10" ry="10" width="100%" height="200" />
        </ContentLoader>
    )
}