import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";



export function UserBookings() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [bookings, setBookings] = useState ([])
    useEffect(() => {
        (async () => {
            const res = await csrfFetch('/api/bookings/current')
            const fetchedBookings = await res.json()
            setBookings(fetchedBookings)
            setIsLoaded(true)
        })()


        // .then((res) => setBookings(res.json())).then(() => setIsLoaded(true))
    },[isLoaded])
    console.log(bookings)
    return isLoaded && (
        <>
            <div className="tester">Here</div>
        </>
    )
}
