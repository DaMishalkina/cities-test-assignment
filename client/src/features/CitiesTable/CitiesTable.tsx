import React, {useState} from "react";

import {Table} from "../../components/Table/Table";

import {CityDataType, CityDateTypeForTable} from "./types/types";
import {RowType} from "../../components/Table/types/types";

interface Props {
    cities: CityDataType[],
    clickedCity?: CityDataType,
    onCityClick?: (city: CityDataType) => void
}

const compare = (a: string | number, b: string | number) => {
    if(typeof a === "string"){
        return a.localeCompare(b as string)
    } else {
        return a - (b as number)
    }
}

export const CitiesTable = ({cities, clickedCity, onCityClick}: Props) => {
    const restructureData = (data: CityDataType[]) => {
       return  JSON.parse(JSON.stringify(data)).map((item: CityDataType ) => {
            item.population = Number(item.population);
            item.founded = Number(item.founded);
            delete item.id;
            delete item.latitude;
            delete item.longitude
            return item;
        })
    }
    const [renderedCities, setRenderedCities] =  useState<CityDateTypeForTable[]>(restructureData(cities));
    const headers = Object.keys(renderedCities[0]);
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
    const handelRowCLick = (city: CityDateTypeForTable | RowType) => {
        const res = cities.find(item => item.name === city.name);
        onCityClick && res && onCityClick(res);
    }
    return (
        <>
            <Table
                activeRow={clickedCity}
                onRowCLick={(city) => handelRowCLick(city)}
                data={renderedCities}
                headers={headers}
                sortColumnData={sortData}
            />
        </>
    )
}