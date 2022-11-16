import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './spots.css'


export default function SpotsPage() {

    const spots = useSelector(state => {
        return Object.values(state.spots)
    })

    return(
        <div className="spots-container">
            {spots.map((spot) => {
                return (
                    // <div className="card">
                        <NavLink className="card" key={`spot-${spot.id}`} to={`/spots/${spot.id}`}>
                            <div className="card-image-container">
                                <img className="card-image" src={spot.previewImage} />
                            </div>
                            <div className='card-city-state-price'>
                                <h3 id="card-city-state">{spot.city}, {spot.state}</h3>
                                <p id="card-price">${spot.price} night</p>
                            </div>

                            <p id="card-reviews">★ {spot.avgRating}</p>

                        </NavLink>
                    // </div>
                )
            })}
        </div>
    )
}
