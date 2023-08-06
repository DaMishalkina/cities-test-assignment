
export type CityDateTypeForTable = {
    name: string,
    name_native: string,
    country: string,
    continent: string,
    population: string | number,
    founded: string | number
}

export interface CityDataType extends CityDateTypeForTable {
    id?: string,
    landmarks?: string[],
    latitude?: string,
    longitude?: string,
}