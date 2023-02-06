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
    const [isChange, setIsChange] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()
        setErrors([])
        const today = Date()
        console.log(today, startDate, today > startDate)
        if(startDate < today) {
            setErrors(["You cannot book in the past"])
            return null
        }
        if(endDate <= startDate){
            setErrors(["Checkout must come after checkin"])
            return
        }

        const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const currentDay = daysOfTheWeek[new Date(startDate).getDay()]
        console.log(currentDay)

        const lengthOfStay = (new Date(endDate).getTime() - new Date(startDate).getTime())/86400000

        const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
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
        // if (res.ok) history.push("/")
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
                min={Date()}
                required
            />
            <label htmlFor="end-date">Check-in</label>
            <input
                type="date"
                value={endDate}
                onChange = {e => setEndDate(e.target.value)}
                min={endDate ? endDate : Date()}
                required
            />
            <button type="submit">Book Now</button>
        </form>

    )
}
