import React, {useState} from "react";

import {Table} from "../../components/Table/Table";


export type CityTableType = {
    name: string,
    name_native: string,
    country: string,
    continent: string,
    population: string,
    founded: string
}

interface CityDataType extends CityTableType {
    id?: string,
    landmarks?: string[],
    latitude?: string,
    longitude?: string,
}

interface Props {
    cities: CityDataType[]
}

export const CitiesTable = ({cities}: Props) => {
    const [renderedCities, setRenderedCities] =  useState<CityTableType[]>(
        JSON.parse(JSON.stringify(cities))
            .map((city: CityDataType) => {
                delete city.id;
                delete city.landmarks;
                delete city.latitude;
                delete city.longitude
                return city;
            }))
    const [headers, setHeaders] = useState(Object.keys(renderedCities[0]).map(key => {
        key = key.replace( "_", " ");
        return key;
    }));
    return (
        <>
            <Table data={renderedCities} headers={headers} />
        </>
    )
}