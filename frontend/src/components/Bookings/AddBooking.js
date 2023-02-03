import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { ErrorMapper } from "../utilities";

export default function AddBooking() {
    const {spotId} = useParams
    const dispatch = useDispatch
    const currentUserObject = useSelector(state => state.session)

    const [errors, setErrors] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const onSubmit = async e => {
        e.preventDefault();
        const booking = {
            startDate,
            endDate
        }
        console.log(booking)
    }

    return (
        <form onSubmit={onSubmit}>
            {/* <ErrorMapper errArray={errors}/> */}
            <label htmlFor="start-date">Check-in</label>
            <input
                type="date"
                value={startDate}
                onChange = {e => setStartDate(e.target.value)}
            />
            <label htmlFor="end-date">Check-in</label>
            <input
                type="date"
                value={endDate}
                onChange = {e => setEndDate(e.target.value)}
            />
            <button type="submit">Book Now</button>
        </form>

    )
}
