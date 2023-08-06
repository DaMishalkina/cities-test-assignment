import DeckGL from "@deck.gl/react/typed";
import MapGL, {ViewState} from "react-map-gl";
import React, {useEffect, useState} from "react";
import { ScatterplotLayer} from "@deck.gl/layers/typed";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";

type MapDataType = {
    [key: string]: string | number
}

interface Props {
    data: MapDataType[],
    longitude?: string,
    latitude?: string,
    onPointClick?: (object: MapDataType) => void
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN as string;

export const Map = ({
                        data,
                        longitude = "11.576124",
                        latitude = "48.137154",
                        onPointClick}: Props) => {
    const [lng, setLng] = useState(Number(longitude));
    const [lat, setLat] = useState(Number(latitude));
    const [viewState, setViewState] = useState<ViewState>({
        latitude: lat,
        longitude: lng,
        zoom: 8,
        bearing: 0,
        pitch: 0,
        padding: {top: 0, bottom: 0, left: 0, right: 0}
    });
    const [pointSize, setPointSize] = useState<number>(10);
    const pointSizeFn = (zoom: number) => {
        if(zoom >= 8) return 200;
        if(zoom < 8 && zoom > 5) return -(800/3)*zoom + 7000/3;
        if(zoom <= 5 && zoom > 1) return -1000*zoom + 6000;
        return  -2250*zoom + 12250;
    }
    const handleZoomChange = (newViewport: ViewState) => {
        const newPointSize = pointSizeFn(newViewport.zoom);
        setPointSize(newPointSize);
        setViewState(newViewport);

    }
    const handlePointClick = (city: MapDataType) => {
        const {longitude, latitude} = city;
        setViewState({
            ...viewState,
            longitude: Number(longitude),
            latitude: Number(latitude),
            zoom: 8
        });
        setPointSize(pointSizeFn(8))
        setLat(Number(latitude));
        setLng(Number(longitude));
        onPointClick !== undefined && onPointClick(city);
    };


    const layers = [
        new ScatterplotLayer({
            id: "scatterplot-layer",
            data,
            getPosition: (d: MapDataType) => [Number(d.longitude), Number(d.latitude), 0],
            radiusScale: 10,
            getFillColor: [0, 119, 255],
            getRadius: pointSize,
            pickable: true,
            onClick: (info) => handlePointClick(info.object)
        })
    ]
    useEffect(() => {
        setLng(Number(longitude));
        setLat(Number(latitude));
        setViewState({...viewState, longitude: Number(longitude), latitude: Number(latitude)})
    }, [latitude, longitude])
    return (
        <div className="map">
            <DeckGL
                getCursor={() => "pointer"}
                initialViewState={viewState}
                onViewStateChange={evt => handleZoomChange(evt.viewState as ViewState)}
                controller={true}
                layers={layers}
            >
                <MapGL
                    {...viewState}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                />

            </DeckGL>
        </div>
    )

}