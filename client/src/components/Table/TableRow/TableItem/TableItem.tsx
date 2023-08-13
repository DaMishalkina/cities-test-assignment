import React from "react";

import {TableLink} from "../../../../features/CitiesTable/types/types";

import "./TableItem.scss";

interface Props {
    value: string | number | TableLink
}

export const TableItem = ({value}: Props) => {
    return (
        <td className="table__column">{value}</td>
    )
}