import React from "react";

import {TableHeader} from "./TableHeader/TableHeader";

import "./TableHeaders.scss";

interface Props {
    headers: string[],
    handleSort?: (header: string, sortState: string) => void,
    isSortable?: boolean
}

export const TableHeaders = ({headers,handleSort, isSortable = false}: Props) => {
    return (
        <tr className="table__headers">
            {headers.map((header, id) => (
                <TableHeader
                    isSortable={isSortable}
                    handleSort={(header, sortState) => {
                        handleSort !== undefined && handleSort(header, sortState)
                    }}
                    header={header}
                    key={id}

                />
            ))}
        </tr>
    )
}