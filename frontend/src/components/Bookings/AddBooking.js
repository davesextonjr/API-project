import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

export default function AddBooking() {
    const {spotId} = useParams()
    const currentUserObject = useSelector(state => state.session)
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const onSubmit = async e => {
        e.preventDefault()
        setErrors([])
        const millisecToday = new Date().getTime()
        const millisecStart = new Date(startDate).getTime()
        const millisecEnd = new Date(endDate).getTime()
        if(millisecStart < millisecToday) {
            setErrors(["You cannot book in the past"])
            return null
        }
        if(millisecEnd <= millisecStart){
            setErrors(["Checkout must come after checkin"])
            return
        }

        const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const currentDay = daysOfTheWeek[new Date(startDate).getDay()]

        const lengthOfStay = (new Date(endDate).getTime() - new Date(startDate).getTime())/86400000

        const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST',
            body: JSON.stringify({
                startDate,
                endDate
            })
        }).catch( async res => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors);

        })
        if (res.ok) history.push("/bookings")
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
                required
            />
            <label htmlFor="end-date">Check-in</label>
            <input
                type="date"
                value={endDate}
                onChange = {e => setEndDate(e.target.value)}
                required
            />
            <button type="submit">Book Now</button>
        </form>

    )
}
