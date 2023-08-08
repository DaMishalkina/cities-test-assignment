import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fetchData} from "../../utils/fetchData";

import "./City.scss";

type Landmarks = string[];

export const City = () => {
    const {id} = useParams();
    const [landMarks, setLandmarks] = useState<Landmarks>([]);
    useEffect(() => {
        fetchData(`http://localhost:8080/landmarks/${id}`).then(res => console.log(res))
    }, [])

    return (
        <div>
            {id}
            {landMarks?.length > 0 ? (
                <ul>
                    {landMarks.map(mark => (
                        <li>{mark}</li>
                        ))}
                </ul>
            ) : (
                <div>waiting</div>
            )}
        </div>
    )
}