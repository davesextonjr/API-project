import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";



export function UserBookings() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [bookings, setBookings] = useState ([])
    useEffect(() => {
        csrfFetch('').then(() => setIsLoaded(true))
    })
    return isLoaded && (
        <>
            <div className="tester">Here</div>
        </>
    )
}
