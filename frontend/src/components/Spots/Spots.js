import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


export default function SpotsPage() {

    const spots = useSelector(state => {
        return Object.values(state.spots)
    })

    return(
        <div className="spotsContainer">
            {spots.map((spot) => {
                return (
                    <NavLink key={`spot-${spot.id}`} to={`/spots/${spot.id}`}>
                        {spot.name}
                    </NavLink>
                )
            })}
        </div>
    )
}
