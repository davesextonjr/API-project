import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { findSpotById } from "../../store/singleSpot";


export default function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findSpotById(spotId))
    },[spotId])

    const currentSpot = useSelector(state => state.singleSpot[+spotId])
    console.log(currentSpot)

    if(! currentSpot) {
        return <div>No Spot Selcted</div>
    }




    return (
        <>
            {currentSpot && <div>{currentSpot.name}</div>}
            {currentSpot && <div>{currentSpot.address}</div>}
            {currentSpot && <div>{currentSpot.city}</div>}
            {currentSpot && <div>{currentSpot.state}</div>}
            {currentSpot && <div>{currentSpot.country}</div>}
            {currentSpot && <div>{currentSpot.price}</div>}
            {currentSpot && <div>{currentSpot.description}</div>}

            <NavLink to={`/spot/edit/${spotId}`} > Edit Spot </NavLink>

        </>

    )
}
