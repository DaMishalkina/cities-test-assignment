import React from "react";

import {TableHeader} from "./TableHeader/TableHeader";

import "./TableHeaders.scss";

interface Props {
    headers: string[]
}

export const TableHeaders = ({headers}: Props) => {
    return (
        <tr className="table__headers">
            {headers.map((header, id) => (
                <TableHeader header={header} key={id}/>
            ))}
        </tr>
    )
}