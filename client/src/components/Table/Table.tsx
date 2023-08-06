import React from "react";

import {TableHeaders} from "./TableHeaders/TableHeaders";
import {TableRow} from "./TableRow/TableRow";

import {RowType, TableDataType} from "./types/types";

import "./Table.scss"

interface Props {
    data: TableDataType,
    headers?: string[],
    sortColumnData?: (header: string, sortState: string) => void,
    activeRow?: RowType,
    onRowCLick?: (row: RowType) => void,
}

export const Table = ({
                          data,
                          headers,
                          sortColumnData,
                          activeRow,
                          onRowCLick}: Props) => {
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
                  <TableRow
                      row={row}
                      key={id}
                      isRowActive={row.name=== activeRow?.name}
                      isClickable={!!activeRow}
                      onClick={onRowCLick}
                  />
                ))}
                </tbody>
            </table>
        </div>
    )
}