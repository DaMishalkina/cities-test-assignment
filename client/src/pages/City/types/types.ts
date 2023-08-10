import {CityDataType} from "../../../features/CitiesTable/types/types";

type Landmark = {
    name: string,
    latitude: string,
    longitude: string
}

type Landmarks = Landmark[];
export type CityDataWithLandmarks = CityDataType & {
    landmarks: Landmarks
}