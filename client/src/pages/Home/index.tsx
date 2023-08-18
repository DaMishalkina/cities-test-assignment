import {useEffect, useRef, useState}  from "react";

import {fetchData} from "../../utils/fetchData";
import {CitiesTable} from "../../features/CitiesTable/CitiesTable";
import {MainPageLoader} from "../../features/MainPageLoader/MainPageLoader";
import {Map} from "../../components/Map/Map";


import {CityDataType} from "../../features/CitiesTable/types/types";

import "./Home.scss";

const DEFAULT_CLICKED_CITY_ID = "munich";
const URL = process.env.NODE_ENV === "development" ? "http://localhost:8080/cities" : "https://raw.githubusercontent.com/DaMishalkina/cities-test-assignment/main/client/src/productionData/cities.json";

export const Home = () => {
    const [cities, setCities] = useState<CityDataType[]>([]);
    const [clickedCity, setClickedCity] = useState<CityDataType>();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const onCityClick = (city: CityDataType) => {
        setClickedCity(city);
        mapRef?.current?.scrollIntoView({behavior: "smooth"});
    }
    useEffect(() => {
        fetchData(URL).then(res => {
            const resCities = process.env.NODE_ENV === "development" ? res : [...res?.cities].map(city => {
                return (({landmarks, ...others}) => ({...others}))(city);
            });
            setCities(resCities)
            setClickedCity(resCities?.find((city: CityDataType) =>
                city.id === DEFAULT_CLICKED_CITY_ID
            ))
        });
    }, [])
    return (
        <main className="main">
            <h1>Cities</h1>
            {cities?.length > 0 ? (
                <div className="app-container">
                    <section className="app-container__item">
                        <h2>Table</h2>
                        <CitiesTable
                            cities={cities}
                            clickedCity={clickedCity}
                            onCityClick={(city) => onCityClick(city)}
                        />
                    </section>
                    <section className="app-container__item" ref={mapRef}>
                        <h2>Map</h2>
                        <Map
                            latitude={clickedCity?.latitude}
                            longitude={clickedCity?.longitude}
                            onPointClick={(city) => onCityClick(city as CityDataType)}
                            data={cities}
                        />
                    </section>
                </div>
            ): (
                <MainPageLoader className="main__loader" />
            )}
        </main>
    );
}