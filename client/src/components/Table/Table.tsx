import React from "react";

import {TableHeaders} from "./TableHeaders/TableHeaders";
import {TableRow} from "./TableRow/TableRow";

import {TableDataType} from "./types/types";

import "./Table.scss"

interface Props {
    data: TableDataType,
    headers?: string[],
    sortColumnData?: (header: string, sortState: string) => void
}

export const Table = ({data, headers, sortColumnData}: Props) => {
    const sortData = (header: string, sortState: string) => {
        typeof sortColumnData !== "undefined" && sortColumnData(header, sortState);
    };
    return (
        <div className="table-wrapper">
            <table className="table">
                {typeof headers !== "undefined" && headers.length > 0 && (
                    <thead className="table__heading">
                    <TableHeaders
                        isSortable={sortColumnData !== undefined}
                        headers={headers}
                        handleSort={(header, sortState) => {
                            typeof sortColumnData !== "undefined" && sortData(header, sortState)
                        }}
                    />
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