import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function SingleSpot() {
    const { spotId } = useParams();





    return (
        <>
            {/* <div>{currentSpot.name}</div>
            <div>{currentSpot.address}</div>
            <div>{currentSpot.city}</div>
            <div>{currentSpot.state}</div>
            <div>{currentSpot.country}</div>
            <div>{currentSpot.price}</div>
            <div>{currentSpot.description}</div> */}
            {spotId}
        </>

    )
}
