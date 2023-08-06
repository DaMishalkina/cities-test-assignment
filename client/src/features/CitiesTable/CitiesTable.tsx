import React, {useState} from "react";

import {Table} from "../../components/Table/Table";

import {CityDataType, CityDateTypeForTable} from "./types/types";

interface Props {
    cities: CityDataType[]
}

const compare = (a: string | number, b: string | number) => {
    if(typeof a === "string"){
        return a.localeCompare(b as string)
    } else {
        return a - (b as number)
    }
}

export const CitiesTable = ({cities}: Props) => {
    const headers = Object.keys(cities[0]);
    const restructureData = (data: CityDataType[]) => {
       return  data.map(item => {
            item.population = Number(item.population);
            item.founded = Number(item.founded);
            delete item.id;
            delete item.landmarks;
            delete item.latitude;
            delete item.longitude
            return item;
        })
    }
    const [renderedCities, setRenderedCities] =  useState<CityDateTypeForTable[]>(restructureData(cities))
    const sortData = (header: string, sortState: string) => {
        const lowerCaseHeader = header.toLowerCase();
        let result = renderedCities;
        switch (sortState){
            case "ascending":
               result = [...result].sort((a, b) =>
                compare(a[lowerCaseHeader as keyof CityDateTypeForTable], b[lowerCaseHeader as keyof CityDateTypeForTable]));
                break;
            case "descending":
                result = [...result].sort((a, b) =>
                    compare(b[lowerCaseHeader as keyof CityDateTypeForTable], a[lowerCaseHeader as keyof CityDateTypeForTable]))
                break;
            case "original":
               result = restructureData(cities);
        }
        setRenderedCities(result)
    }
    return (
        <>
            <Table
                data={renderedCities}
                headers={headers}
                sortColumnData={sortData}
            />
        </>
    )
}