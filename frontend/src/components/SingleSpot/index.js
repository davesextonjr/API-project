import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { findSpotById, resetSingleSpotState } from "../../store/singleSpot";
import { deleteSpotThunk } from "../../store/spots";
import './singleSpot.css'
import sign from '../../assets/lets-be-cozy.jpeg'
import kitchen from '../../assets/rustic-kitchen.jpeg'
import garden from "../../assets/indoor-garden.jpeg"
import library from "../../assets/overstuffed chair.jpeg"


export default function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(findSpotById(spotId))
        dispatch(getReviewsThunk(spotId))
    },[spotId])

    const currentSpot = useSelector(state => state.singleSpot[+spotId])
    console.log(currentSpot)

    const reviewsArray = useSelector(state => Object.values(state.reviews));

    const reviewerId = reviewsArray.map(reviewObj => reviewObj.userId)

    const currentUser= useSelector(state => state.session.user)

    if (currentUser && currentSpot) console.log("Owner Check: ", currentUser.id, currentSpot.Owner.id, currentUser.id === currentSpot.Owner.id)



    if (currentUser) console.log("current user has a review", reviewerId.includes(currentUser.id))
    // console.log("Array of reviewer ids", reviewerId)

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
                 <div id="spot-header-name" >{currentSpot.name}</div>
                 <div id="spot-header-nav">
                    <div id="spot-header-nav-left">
                       <div id="spot-header-rating" >★ {currentSpot.avgStarRating}</div>
                       <div id="spot-header-review-number">{currentSpot.numReviews} reviews</div>
                       <div>{currentSpot.city}, {currentSpot.state}, {currentSpot.country} </div>
                    </div>
                    <div id="spot-header-nav-right">
                        <div>Share</div>
                    </div>
                 </div>
            </div>
            {/* pictures */}
            <div id="spot-picture-container">
                <div id="spot-default-image-container">
                    <img id="spot-default-image" src={currentSpot.SpotImages[0].url} />
                </div>
                <div className="spot-secondary-pictures pic-one">
                    {currentSpot.SpotImages[1] ? (<img src={currentSpot.SpotImages[1].url}/>) :
                    (<img src={sign}/>)}
                </div>
                <div className="spot-secondary-pictures pic-two">
                    {currentSpot.SpotImages[2] ? (<img src={currentSpot.SpotImages[1].url}/>) : (<img src={kitchen}/>)}
                </div>
                <div className="spot-secondary-pictures pic-three">
                    {currentSpot.SpotImages[3] ? (<img src={currentSpot.SpotImages[1].url}/>) : (<img src={garden}/>)}
                </div>
                <div className="spot-secondary-pictures pic-four">
                    {currentSpot.SpotImages[4] ? (<img src={currentSpot.SpotImages[1].url}/>) : (<img src={library}/>)}
                </div>
            </div>
            <div id="spot-owner-container">
                <div id="onwner-title">This spot is hosted by {currentSpot.Owner.firstName}

                { currentUser && currentSpot && currentUser.id === currentSpot.Owner.id &&
                    (<div id="edit-delete-spot-container">

                    <NavLink to={`/spot/edit/${spotId}`} > Edit Spot </NavLink>
                    <button onClick={deleteHandler}>Delete</button>

                    </div>)}

                </div>
                <div id="city-state-undercard">
                    <div>{currentSpot.city},</div>
                    <div>{currentSpot.state}</div>
                </div>

            <div id="spot-detail-card">
                <div id="spot-detail-card-header">

                    <div id="spot-price"><span>${currentSpot.price}</span> night</div>

                    <div id="spot-detail-card-review-container">

                    <div>★ {currentSpot.avgStarRating} </div>
                    <div>・</div>
                    <div>{currentSpot.numReviews} reviews</div>
                    </div>

                </div>



            {currentUser && reviewerId.includes(currentUser.id) &&  <NavLink to={`/reviews/${spotId}/edit`} id="write-review">Edit Your Review</NavLink>}

            {currentUser && !(reviewerId.includes(currentUser.id)) && <NavLink to={`/reviews/${spotId}/add`} id="write-review">Write a Review</NavLink>}

            {!currentUser && (
                <p>Please log in or sign up to leave a review</p>
                )}

                <NavLink to={`/reviews/${spotId}`} id="get-review">See All Reviews</NavLink>



            </div>

             <div id="spot-description-container">
                <div>{currentSpot.description}</div>
             </div>


            </div>

        </div>

    )
}
