import classNames from "classnames";
import React from "react";


import {TableItem} from "./TableItem/TableItem";

import {RowType} from "../types/types";

import "./TableRow.scss";

interface Props {
    row:  RowType,
    isRowActive?: boolean,
    onClick?: (row: RowType) => void,
    isClickable?: boolean
}

export const TableRow = ({row, isRowActive = false, onClick, isClickable = false}: Props) => {
    return (
        <tr
            className={classNames(
                "table__row",
                isClickable && "table-row--clickable",
                isRowActive && "table-row--active"
                )}
            onClick={() => {
                isClickable && onClick && onClick(row);
            }}
        >
            {Object.values(row).map((value, id) => (
                <TableItem value={value} key={id} />
            ))}
        </tr>
    )
}