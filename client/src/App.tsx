import React, {useEffect, useState} from "react";


import {Map} from "./components/Map/Map";
import {CitiesTable} from "./features/CitiesTable/CitiesTable";
import {MainPageLoader} from "./features/MainPageLoader/MainPageLoader";


import {CityDataType} from "./features/CitiesTable/types/types";

import "./App.scss";


const DEFAULT_CLICKED_CITY_ID = "munich"
function App() {
    const [cities, setCities] = useState<CityDataType[]>([]);
    const [clickedCity, setClickedCity] = useState<CityDataType>();
    const onCityClick = (city: CityDataType) => {
        setClickedCity(city)
    }
    useEffect(() => {
        const fetchData = async (url: string) => {
            try {
                let response = await fetch(url);
                if (response.status === 200) {
                    return  await response.json();
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData("http://localhost:8080/cities").then(res => {
            setCities(res.cities)
            setClickedCity(res.cities.find((city: CityDataType) =>
                city.id === DEFAULT_CLICKED_CITY_ID
            ))
        });
    }, [])
    return (
        <main className="main">
            <h1>Cities Test Assignment</h1>
            {cities.length > 0 ? (
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
                <MainPageLoader />
            )}
        </main>
  );
}

export default App;
