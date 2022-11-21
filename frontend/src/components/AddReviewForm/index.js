import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReviewThunk } from "../../store/reviews";
import './addReviewForm.css'


export default function AddReviewForm({ onComplete }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const currentUserObject = useSelector(state => state.session)

    const [errors, setErrors] = useState([]);
    const [stars, setStars] = useState(5);
    const [review, setReview] = useState("It was the BEST!!!");
    const [reviewImages, setReviewImages] = useState([])

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const reviewInfo = {
            spotId,
            stars,
            review,
            currentUserObject,
            reviewImages
        }

        const returnReview = await dispatch(addReviewThunk(reviewInfo))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (errors.length) return alert('something went wrong');
        onComplete();
    }

    return (
        <form id="add-Review-container" onSubmit={onSubmit}>
            <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
            <label htmlFor="review-stars">How was your stay overall?</label>
            <select
                id="review-stars"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required >
                    <option value={1}>"One Star"</option>
                    <option value={2}>"Two Stars"</option>
                    <option value={3}>"Three Stars"</option>
                    <option value={4}>"Four Stars"</option>
                    <option value={5}>"Five Stars"</option>

            </select>

            <label htmlFor="add-review-body">Descrition </label>
            <textarea
                id="add-review-body"

                value={review}
                onChange={(e) => setReview(e.target.value)}
                required />

            <button type="submit">Submit Review</button>
        </form>
    )
}
