import React, {useEffect, useState} from "react";
import DeckGL from "@deck.gl/react/typed";
import { ScatterplotLayer} from "@deck.gl/layers/typed";
import {Map as Mapbox} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "./Map.scss";

type MapDataType = {
    [key: string]: string | number
}

interface Props {
    data: MapDataType[],
    longitude?: string,
    latitude?: string
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN as string;
const  INITIAL_VIEW_STATE = {
    bearing: 0,
    pitch: 0
};

export const Map = ({
                        data,
                        longitude = "11.576124",
                        latitude = "48.137154"}: Props) => {

    const [lng, setLng] = useState(Number(longitude));
    const [lat, setLat] = useState(Number(latitude));
    const [zoom, setZoom] = useState(8);


    const layers = [
        new ScatterplotLayer({
            id: "scatterplot-layer",
            data: data,
            getPosition: (d: MapDataType) => [Number(d.longitude), Number(d.latitude), 0],
            getFillColor: [0, 119, 255],
            getRadius: 400,
            radiusScale: 10,
            radiusMinPixels: 1,
        })
    ]
    return (
        <div className="map-container">
            <DeckGL
                initialViewState={{
                    ...INITIAL_VIEW_STATE,
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom
                }}
                controller={true}
                layers={layers}
            >
                <Mapbox
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                />
            </DeckGL>
        </div>
    )
}