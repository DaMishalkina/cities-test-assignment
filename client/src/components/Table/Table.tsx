import React from "react";

import {TableHeaders} from "./TableHeaders/TableHeaders";
import {TableRow} from "./TableRow/TableRow";

import {TableDataType} from "./types/types";

import "./Table.scss"

interface Props {
    data: TableDataType,
    headers?: string[]
}

export const Table = ({data, headers}: Props) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                {typeof headers !== "undefined" && headers.length > 0 && (
                    <thead className="table__heading">
                    <TableHeaders headers={headers} />
                    </thead>
                )}
                <tbody>
                {data.map((row, id) => (
                  <TableRow row={row} key={id} />
                ))}
                </tbody>
            </table>
        </div>
    )
}