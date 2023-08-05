import React from "react";

import "./TableHeader.scss";


interface Props {
    header: string
}

export const TableHeader = ({header}: Props) => {
    return (
        <th className="table__header">{header}</th>
    )
}