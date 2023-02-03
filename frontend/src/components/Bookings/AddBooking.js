import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AddBooking() {
    const {spotId} = useParams
    const dispatch = useDispatch
    const currentUserObject = useSelector(state => state.session)

    const [errors, setErrors] = useState([])
    const [startDate, setStartDate] = useState[""]
    const [endDate, setEndDate] = useState[""]

    const onSubmit = async e => {
        e.preventDefault();
        const booking = {
            startDate,
            endDate
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <ul>

            </ul>
        </form>
    )
}
