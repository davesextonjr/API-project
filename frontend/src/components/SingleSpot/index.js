import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { findSpotById, resetSingleSpotState } from "../../store/singleSpot";
import { deleteSpotThunk } from "../../store/spots";
import './singleSpot.css'


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
        <div id="spot-page">
            {/* header */}
            <div id="spot-header">
                 <div>{currentSpot.name}</div>
                 <div id="spot-header-nav">
                    <div id="spot-header-nav-left">
                       <div>★{currentSpot.avgStarRating}</div>
                       <div>{currentSpot.numReviews}</div>
                       <div>{currentSpot.city}, {currentSpot.state}, {currentSpot.country} </div>
                    </div>
                    <div id="spot-header-nav-right">
                        <div>Share</div>
                    </div>
                 </div>
            </div>
            {/* pictures */}
            <div id="spot-picture-container">
                <img src={currentSpot.SpotImages[0].url} />
            </div>
            <div id="spot-owner-container">
                <div>This spot is hosted by {currentSpot.Owner.firstName}</div>
                <div>{currentSpot.city}</div>
                <div>{currentSpot.state}</div>
            </div>
            <div id="spot-detail-card">
                <div id="spot-price"><span>${currentSpot.price}</span> night</div>
                <div>★{currentSpot.avgStarRating}</div>
                <div>{currentSpot.numReviews}</div>

                <NavLink to={`/reviews/${spotId}/add`} id="write-review">Write a Review</NavLink>
                <NavLink to={`/reviews/${spotId}`} id="get-review">See All Reviews</NavLink>
            </div>

            <div id="reviews"></div>


            <NavLink to={`/spot/edit/${spotId}`} > Edit Spot </NavLink>
            <button onClick={deleteHandler}>Delete</button>

        </div>

    )
}
