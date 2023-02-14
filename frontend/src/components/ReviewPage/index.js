import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import "./reviewPage.css"


export default function ReviewPage() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    },[spotId])

    const reviews = useSelector(state => Object.values(state.reviews))

    if(!reviews.length) {
        return <div id="no-reviews">There are currently no reviews to display</div>
    } //need to refactor this check

    return (
        <div className="review-modal">
            <div className="header">Reviews</div>
            {reviews.map(review => (
                <div key={`review-${review.id}`} className="review-card">
                    <div className="stars">{review.stars} Stars</div>
                    <div className="reviews">{review.review}</div>
                    <div className="first-name">- {review.User.firstName}</div>
                </div>
            ))}
        </div>
    )
}
