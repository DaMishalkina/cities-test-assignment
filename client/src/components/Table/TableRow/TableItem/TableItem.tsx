import React from "react";

import "./TableItem.scss";

interface Props {
    value: string | number
}

export const TableItem = ({value}: Props) => {
    return (
        <td className="table__column">{value}</td>
    )
}