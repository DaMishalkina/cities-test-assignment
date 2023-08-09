import {useEffect} from "react";

export const useResize = (handler: () => void) => {
    useEffect(() => {
        window.addEventListener("resize", handler);

        return () => {
            window.removeEventListener("resize", handler);
        };
    }, [handler]);
};