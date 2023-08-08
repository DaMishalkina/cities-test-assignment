import React from "react";
import ContentLoader from "react-content-loader";

export const MainPageLoader = () => {
    return (
        <ContentLoader
            width={"100%"}
            height={"100vh"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width="153" height="43"  />
            <rect x="0" y="59" rx="10" ry="10" width="100%" height="50%" />
            <rect x="0" y="calc(50% + 100px)" rx="5" ry="5" width="153" height="43"  />
            <rect x="0" y="calc(50% + 160px)" rx="5" ry="5" width="100%" height="50%"  />
        </ContentLoader>
    )
}