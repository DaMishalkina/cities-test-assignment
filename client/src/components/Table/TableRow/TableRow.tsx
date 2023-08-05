import React from "react";

import {TableItem} from "./TableItem/TableItem";

import {RowType} from "../types/types";

import "./TableRow.scss";

interface Props {
    row:  RowType
}

export const TableRow = ({row}: Props) => {
    return (
        <tr className="table__row">
            {Object.values(row).map((value, id) => (
                <TableItem value={value} key={id} />
            ))}
        </tr>
    )
}