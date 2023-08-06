import React, {useEffect, useState} from 'react';

import {Map} from "./components/Map/Map";
import {CitiesTable} from "./features/CitiesTable/CitiesTable";

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
function App() {
    const [cities, setCities] = useState<CityDataType[]>([]);
    useEffect(() => {
        fetchData().then((data) => {
            setCities(data.cities)
        })
    }, [])
    return (
        <div className="App">
            {cities.length > 0 ? (
                <CitiesTable cities={cities} />
            ) : (
                <div>waiting</div>
            )}
            <Map data={cities} />
        </div>
  );
}

export default App;
