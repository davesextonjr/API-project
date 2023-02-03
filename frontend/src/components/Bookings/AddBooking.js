import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

export default function AddBooking() {
    const {spotId} = useParams()
    const currentUserObject = useSelector(state => state.session)

    const [errors, setErrors] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        console.log(errors)
        const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const currentDay = daysOfTheWeek[new Date(startDate).getDay()]
        console.log(currentDay)

        const lengthOfStay = (new Date(endDate).getTime() - new Date(startDate).getTime())/86400000
        await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST',
            body: JSON.stringify({
                startDate,
                endDate
            })
        }).catch( async res => {
            const data = await res.json()
            console.log(data)
            if (data && data.errors) setErrors(data.errors);
        })
    }

    return (
        <form id="bookings" onSubmit={onSubmit}>
              <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
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
