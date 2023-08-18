import {useEffect, useState}  from "react";

import {fetchData} from "../../utils/fetchData";
import {CitiesTable} from "../../features/CitiesTable/CitiesTable";
import {MainPageLoader} from "../../features/MainPageLoader/MainPageLoader";
import {Map} from "../../components/Map/Map";


import {CityDataType} from "../../features/CitiesTable/types/types";

import "./Home.scss";

const DEFAULT_CLICKED_CITY_ID = "munich"

export const Home = () => {
    const [cities, setCities] = useState<CityDataType[]>([]);
    const [clickedCity, setClickedCity] = useState<CityDataType>();
    const onCityClick = (city: CityDataType) => {
        setClickedCity(city)
    }
    useEffect(() => {
        fetchData("http://localhost:8080/cities").then(res => {
            setCities(res)
            setClickedCity(res?.find((city: CityDataType) =>
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
                    <section className="app-container__item">
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