import React, {useState} from "react";

import {CityDataWithLandmarks} from "../../pages/City/types/types";

import "./CityCard.scss";

interface Props {
    city: CityDataWithLandmarks,
    handleLandmarkClick?: (latitude: string, longitude: string) => void;
}

export const CityCard = ({city, handleLandmarkClick}: Props) => {
    const {name, landmarks} = city;
    const [isToggle, setIsToggle] = useState(true);
    return (
        <div className="city-card">
            <div className="city-card__header">
                <h1>{name}</h1>
                <button
                    onClick={() => setIsToggle((prevState) => !prevState)}
                    className="city-card__button"
                >
                    <svg
                        className="city-card__icon"
                        viewBox="0 0 13 18"
                        role="img"
                        width="18"
                        height="15"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{transform: isToggle ? "rotate(90deg)": "rotate(-90deg)"}}
                    >
                        <title>Arrow Icon</title>
                        <path d="m2 1 8 8-8 8" stroke="currentColor" strokeWidth="3" fill="none" fillRule="evenodd"/>

                    </svg>
                </button>
            </div>
            {isToggle && (
                <div className="city-card__container">
                    <ul>
                        {Object.entries((({landmarks, name, id, longitude, latitude, ...others}) => ({...others}))(city)).map(item => {
                            const [key, value] = item;
                            return (
                                <li key={key}>
                                    <strong>{key.replace("_", " ")}: </strong>
                                    {value}
                                </li>
                            )
                        })}
                    </ul>
                    {landmarks.length > 0 && (
                        <div className="landmarks city-card__landmarks">
                            <h2>Landmarks</h2>
                            <ul className="landmarks__list">
                                {landmarks.map(mark => {
                                    const {name, latitude, longitude} = mark;
                                    return (
                                        <li className="landmark landmarks__item" key={name}>
                                            <button
                                                className="landmark__button"
                                                onClick={() => {
                                                    handleLandmarkClick && handleLandmarkClick(latitude, longitude);
                                                    setIsToggle(false);
                                                }}
                                            >
                                                {name}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}