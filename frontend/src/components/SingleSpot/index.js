import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { findSpotById, resetSingleSpotState } from "../../store/singleSpot";
import { deleteSpotThunk } from "../../store/spots";


export default function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(findSpotById(spotId))
    },[spotId])

    const currentSpot = useSelector(state => state.singleSpot[+spotId])
    console.log(currentSpot)

    if(! currentSpot) {
        return <div>No Spot Selcted</div>
    }

    const deleteHandler = (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure you want to delete this spot?")) {
            dispatch(deleteSpotThunk(spotId))
            dispatch(resetSingleSpotState())
            history.push('/')
        }
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
            <button onClick={deleteHandler}>Delete</button>
        </>

    )
}
