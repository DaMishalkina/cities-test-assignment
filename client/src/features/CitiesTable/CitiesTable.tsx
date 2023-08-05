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
    const [headers, setHeaders] = useState(Object.keys(cities[0]).map(key => {
        key = key.replace( "_", " ");
        return key;
    }));
    const [renderedCities, setRenderedCities] =  useState<CityTableType[]>(cities.map(city => {
        delete city.id;
        delete city.landmarks;
        delete city.latitude;
        delete city.longitude
        return city;
    }))
    return (
        <>
            <Table data={renderedCities} headers={headers} />
        </>
    )
}