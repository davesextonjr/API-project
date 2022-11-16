import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function AddReviewForm() {
    const {spotId} = useParams();

    const [errors, setErrors] = useSelector([]);
    const [stars, setStars] = useSelector(5);
    const [review, setReview] = useSelector("");

    const onSubmit = e => {
        e.preventDefault()

        const reviewInfo = {
            spotId,
            stars,
            review
        }
    }

    return null;
}
