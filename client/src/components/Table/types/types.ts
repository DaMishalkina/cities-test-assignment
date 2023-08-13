import {TableLink} from "../../../features/CitiesTable/types/types";

export interface RowType {
    [key: string]: string | number | TableLink
}

export type TableDataType = RowType[]

