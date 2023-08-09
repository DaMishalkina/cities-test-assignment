import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fetchData} from "../../utils/fetchData";

import {CityDataType} from "../../features/CitiesTable/types/types";

import "./City.scss";
import {Map} from "../../components/Map/Map";

type Landmark = {
    name: string,
    latitude: string,
    longitude: string
}

type Landmarks = Landmark[];
type CityDataWithLandmarks = CityDataType & {
    landmarks: Landmarks
}


export const City = () => {
    const {id} = useParams();
    const [city, setCity] = useState<CityDataWithLandmarks>();
    useEffect(() => {
        fetchData(`http://localhost:8080/cities/${id}`).then(res => setCity(res))
    }, [])
    return (
        <main className="main--city">
            {city ? (
                <Map
                    data={city?.landmarks && city?.landmarks}
                    longitude={city?.longitude}
                    latitude={city?.latitude}
                    zoom={11}
                />
            ) : (
                <div>waiting</div>
            )}

        </main>
    )
}