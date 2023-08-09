import DeckGL from "@deck.gl/react/typed";
import MapGL, {ViewState} from "react-map-gl";
import React, {useCallback, useEffect, useState} from "react";
import { ScatterplotLayer} from "@deck.gl/layers/typed";

import {useResize} from "../../hooks/useResize";
import {
    MAPBOX_TOKEN,
    DEFAULT_ZOOM,
    DEFAULT_POINT_SIZE,
    RADIUS_SCALE,
    DEFAULT_BEARING,
    DEFAULT_PITCH,
    DEFAULT_PADDING
} from "./const/const";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";

type MapDataType = {
    [key: string]: string | number
}

interface Props {
    data: MapDataType[],
    longitude?: string,
    latitude?: string,
    onPointClick?: (object: MapDataType) => void,
    zoom?: number
}
const pointSizeFn = (zoom: number) => {
    if (zoom >= 15) return 5;
    if (zoom < 15 && zoom >= 10) return 20;
    if(zoom < 10 && zoom >= 8) return 50;
    if(zoom < 8 && zoom > 5) return -(800/3)*zoom + 7000/3;
    if(zoom <= 5 && zoom > 1) return -1000*zoom + 6000;
    return  -2250*zoom + 12250;
}

export const Map = ({
                        data,
                        longitude = "11.576124",
                        latitude = "48.137154",
                        onPointClick,
                        zoom = DEFAULT_ZOOM}: Props) => {
    const [lng, setLng] = useState(Number(longitude));
    const [lat, setLat] = useState(Number(latitude));
    const [viewState, setViewState] = useState<ViewState>({
        latitude: lat,
        longitude: lng,
        zoom: zoom,
        bearing: DEFAULT_BEARING,
        pitch: DEFAULT_PITCH,
        padding: DEFAULT_PADDING
    });

    const onResize = useCallback(() => {
        setViewState({ ...viewState });
    }, []);

    useResize(onResize);
    const [pointSize, setPointSize] = useState<number>(DEFAULT_POINT_SIZE);
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
            zoom:zoom
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
            radiusScale: RADIUS_SCALE,
            getFillColor:[0, 119, 255],
            getRadius: pointSize,
            pickable: true,
            onClick: (info) => handlePointClick(info.object)
        })
    ]
    useEffect(() => {
        setLng(Number(longitude));
        setLat(Number(latitude));
        setViewState({
            ...viewState,
            longitude: Number(longitude),
            latitude: Number(latitude),
            zoom: zoom})
        setPointSize(pointSizeFn(zoom))
    }, [latitude, longitude, zoom])
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