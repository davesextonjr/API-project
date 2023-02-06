import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { dateFormatter } from "../utilities";



export function UserBookings() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [bookings, setBookings] = useState ([])
    const history = useHistory()
    useEffect(() => {
        (async () => {
            const res = await csrfFetch('/api/bookings/current')
            const fetchedBookings = await res.json()
            setBookings(fetchedBookings.Bookings)
            setIsLoaded(true)
        })()


        // .then((res) => setBookings(res.json())).then(() => setIsLoaded(true))
    },[isLoaded])
    console.log(bookings)
    return isLoaded && (
        <div className="bookingsContainer">
            <div className="title">Your Upcoming Stays</div>
            <div className="sub-title">Click on a reservation to see that spot's details</div>
            {bookings.length && bookings.map(booking => {
                return (
                    <div key={`booking-${booking.id}`} onClick={(() => history.push(`/spots/${booking.spotId}`))}>{dateFormatter(booking.startDate, booking.endDate)}</div>
                )
            })}
        </div>
    )

}
