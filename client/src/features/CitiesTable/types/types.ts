import {ReactElement} from "react";

export type CityDateTypeForTable = {
    name: string | TableLink,
    name_native: string,
    country: string,
    continent: string,
    population: string | number,
    founded: string | number
}

export type CityDataType = CityDateTypeForTable  &{
    id?: string,
    latitude?: string,
    longitude?: string,
}

type LinkProps = {
    to: string,
    children: string | number,
}

export type TableLink = ReactElement<LinkProps>