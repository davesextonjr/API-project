import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editSpotThunk } from "../../store/spots";
import { Redirect, useHistory, useParams } from "react-router-dom";
import './editSpotForm.css'





export default function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const {spotId} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.singleSpot[spotId])

    // if (!sessionUser) return (
    //     <Redirect to='/login' />
    // )

    // if (!currentSpot) return (
    //     <Redirect to='/' />
    // )

    const [errors, setErrors] = useState([]);
    const [address, setAdress] = useState(currentSpot.address || "")
    const [city, setCity] = useState(currentSpot.city);
    const [state, setState] = useState(currentSpot.state);
    const [country, setCountry] = useState(currentSpot.country);
    const [lat, setLat] = useState(currentSpot.lat);
    const [lng, setLng] = useState(currentSpot.lng);
    const [name, setName] = useState(currentSpot.name);
    const [description, setDescription] = useState(currentSpot.description);
    const [price, setPrice] = useState(currentSpot.price)


    const handleSubmit = async (e) => {
        const updatedSpot = {
            spotId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }



        e.preventDefault();
        setErrors([]);
        const returnSpot = await dispatch(editSpotThunk(updatedSpot))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if(errors.length) return alert("something went wrong");
        history.push(`/spots/${returnSpot.id}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
            <label htmlFor="update-address">Address
                <input
                    id="update-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    required />
            </label>
            <label htmlFor="update-city">City
                <input
                    id="update-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required />
            </label>
            <label htmlFor="update-state">State
                <input
                    id="update-state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required />
            </label>
            <label htmlFor="update-country">Country
                <input
                    id="update-country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required />
            </label>
            <label htmlFor="update-name">Spot Name
                <input
                    id="update-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
            </label>
            <label htmlFor="udate-description">Descrition
                <textarea
                    id="udate-description"

                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required />
            </label>
            <label htmlFor="udate-price">Price
                <input
                    id="update-price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required />
            </label>
            <button type="submit">Update Spot</button>


        </form>
    )
}
