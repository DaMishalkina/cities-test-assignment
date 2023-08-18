import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fetchData} from "../../utils/fetchData";
import {CityCard} from "../../features/CityCard/CityCard";
import {CityPageLoader} from "../../features/CityPageLoader/CityPageLoader";

import {CityDataWithLandmarks} from "./types/types";

import "./City.scss";
import {Map} from "../../components/Map/Map";



export const City = () => {
    const {id} = useParams();
    const [city, setCity] = useState<CityDataWithLandmarks>();
    const [lng, setLng] = useState<string>();
    const [lat, setLat] = useState<string>();
    const [zoom, setZoom] = useState(11);
    useEffect(() => {
        fetchData(`http://localhost:8080/cities/${id}`).then(res => {
            setCity(res);
            setLat(res.latitude);
            setLng(res.longitude);
        })
    }, [id])
    return (
        <main className="city-main main--city">
            {city ? (
                <section className="city-container">
                    <CityCard
                        city={city}
                        handleLandmarkClick={(latitude, longitude) => {
                            setLng(longitude);
                            setLat(latitude);
                            setZoom(15);

                        }}
                    />
                    <Map
                        data={city?.landmarks && city?.landmarks}
                        longitude={lng}
                        latitude={lat}
                        zoom={zoom}
                    />
                </section>
            ) : (
                <section className="city-main__loader-section">
                    <h1>{id}</h1>
                    <CityPageLoader />
                </section>
            )}
        </main>
    )
}