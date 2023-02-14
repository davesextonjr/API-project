import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewThunk, editReviewThunk } from "../../store/reviews";
import "./editReviewForm.css";

export default function EditReviewForm({onComplete}) {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserObject = useSelector(state => state.session)
    const currentUserId = currentUserObject.user.id
    const currentReviewArray = useSelector(state => Object.values(state.reviews))
    const currentReview = currentReviewArray.find(review => review.userId === currentUserId)
    const [errors, setErrors] = useState([]);
    const [stars, setStars] = useState(currentReview.stars);
    const [review, setReview] = useState(currentReview.review);
    const [reviewImages, setReviewImages] = useState(currentReview.ReviewImages || [])

    const handleDeleteReview = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete your review?")) {
            dispatch(deleteReviewThunk(currentReview.id))
            onComplete();
        }
    }


    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const reviewInfo = {
            spotId,
            stars,
            review,
            currentUserObject,
            reviewImages,
            reviewId: currentReview.id
        }

        const returnReview = await dispatch(editReviewThunk(reviewInfo))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors);
        })
        if(errors.length) return alert('something went wrong');
        onComplete();
    }

    return (
        <form id="edit-Review-container" onSubmit={onSubmit}>
            <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
            <label htmlFor="edit-review-stars">How was your stay overall?</label>
                <input
                    id="edit-review-stars"
                    type="text"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required />
            <label htmlFor="edit-review-body">Descrition</label>
                <textarea
                    id="edit-review-body"

                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required />
            <button type="submit">Update Review</button>
            <button onClick={handleDeleteReview} id="delete-review">Delete Your Review</button>
        </form>
    )
}
