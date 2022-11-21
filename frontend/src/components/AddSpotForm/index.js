import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addSpotThunk } from "../../store/spots";
import { Redirect, useHistory } from "react-router-dom";
import './addSpotForm.css'





export default function AddSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [address, setAdress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(37.7645358);
    const [lng, setLng] = useState(-122.4730327);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(100);
    const [url, setUrl] = useState("");

    console.log(sessionUser)
    if (!sessionUser) return (
        <div id="no-user-add-spot-container">
            <div id="no-user-add-spot-header">
                <div>What could you do</div>
                <div>With a little extra cash?</div>
            </div>
            <div> Login or signup to begin exploring your earning potential!</div>
        </div>
    )


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            url,
            preview: true // todo: add dynamic funcionality
        }



        const returnSpot = await dispatch(addSpotThunk(newSpot))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if(errors.length) return alert("something went wrong");
        history.push(`/spots/${returnSpot.id}`)

    }

    return (
        <form id="add-spot-container" onSubmit={handleSubmit}>
            <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
            <label htmlFor="spot-address">Address</label>
                <input
                    id="spot-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    required />

            <label htmlFor="spot-city">City</label>
                <input
                    id="spot-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required />
            <label htmlFor="spot-state">State</label>
                <input
                    id="spot-state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required />
            <label htmlFor="spot-country">Country</label>
                <input
                    id="spot-country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required />
            <label htmlFor="spot-name">Spot Name</label>
                <input
                    id="spot-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
            <label htmlFor="spot-description">Descrition</label>
                <textarea
                    id="spot-description"

                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required />
            <label htmlFor="spot-price">Price</label>
                <input
                    id="spot-price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required />
            <label htmlFor="spot-url">Your spot will look better with an image. Enter one now or come back to it soon.</label>
                <input
                    id="spot-url"
                    type='url'
                    placeholder="https://example.com"
                    pattern="https://.*"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    ></input>


            <button type="submit">Add Spot</button>


        </form>
    )
}
