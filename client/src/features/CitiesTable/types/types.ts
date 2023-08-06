
export type CityDateTypeForTable = {
    name: string,
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