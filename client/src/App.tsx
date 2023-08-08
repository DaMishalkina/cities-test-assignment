import React, {useEffect, useState} from "react";


import {Map} from "./components/Map/Map";
import {CitiesTable} from "./features/CitiesTable/CitiesTable";
import {MainPageLoader} from "./features/MainPageLoader/MainPageLoader";


import {CityDataType} from "./features/CitiesTable/types/types";

import "./App.scss";

const fetchData = async () => {

    return await fetch("http://localhost:8080/cities", {mode: "cors"}).
    then(response => {
        return response.json();
    }).catch((err) => {
        console.error(err);
    });
}


const DEFAULT_CLICKED_CITY_ID = "munich"
function App() {
    const [cities, setCities] = useState<CityDataType[]>([]);
    const [clickedCity, setClickedCity] = useState<CityDataType>(
        cities?.filter(city => city.id === DEFAULT_CLICKED_CITY_ID)[0]);
    const onCityClick = (city: CityDataType) => {
        setClickedCity(city)
    }
    useEffect(() => {
        fetchData().then((data) => {
            setCities(data.cities)
            setClickedCity(data.cities?.filter((city: CityDataType) => city.id === DEFAULT_CLICKED_CITY_ID)[0]);
        })
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
                            latitude={clickedCity.latitude}
                            longitude={clickedCity.longitude}
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
