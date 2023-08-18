import React from "react";
import classNames from "classnames";
import ContentLoader from "react-content-loader";

import "./CityPageLoader.scss";

interface Props {
    className?: string
}

export const CityPageLoader = ({className = ""}: Props) => {
    return (
        <ContentLoader
            className={classNames("loader", className)}
            width={"100%"}
            height={"100%"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
        </ContentLoader>
    )
}