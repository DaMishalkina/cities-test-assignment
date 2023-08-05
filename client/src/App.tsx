import React, {useEffect, useState} from 'react';

type City = {
    name: string,
    name_native: string,
    country: string,
    continent: string,
    latitude: string,
    longitude: string,
    population: string,
    founded: string,
    landmarks: string[]
}

const fetchData = async () => {

    return await fetch("http://localhost:8080/cities", {mode: "cors"}).
    then(response => {
        return response.json();
    }).catch((err) => {
        console.error(err);
    });
}
function App() {
    const [cities, setCities] = useState<City[]>([]);
    useEffect(() => {
        fetchData().then((data) => {
            setCities(data.cities)
        })
    }, [])
    return (
        <div>
            {cities.map((city, id) => (
                <div key={id}>{JSON.stringify(city)}</div>
            ))}
        </div>
  );
}

export default App;
