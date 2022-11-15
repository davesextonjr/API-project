import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css'

export default function SignupFormPage({ setShowModel }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    if (sessionUser) return (
        <Redirect to='/' />
    )

    const handleSubmit = async (e) => {
        //stop page from reloading
        e.preventDefault();

        //check for passwords to match
        if (password !== confirmPassword) return setErrors(['Password Fields Must Match'])

        setErrors([]);
        const response = await dispatch(sessionActions.signUpUserThunk(firstName, lastName, email, username, password))

        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            return
            });

        if(response) setShowModel(false)

            // const handleSubmit = async (e) => {
            //     e.preventDefault();
            //     setErrors([]);
            //     const response = await dispatch(sessionActions.loginUserThunk(credential, password))
            //     .catch(async (res) => {
            //         const data = await res.json();
            //         if (data && data.errors) setErrors(data.errors);
            //         return
            //     });
            //     if (response) setShowModal(false)
            // }
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
            <label htmlFor="signup-first-name">First Name
                <input
                    id="signup-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required />
            </label>
            <label htmlFor="signup-last-name">Last Name
                <input
                    id="signup-last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required />
            </label>
            <label htmlFor="signup-email">Email
                <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </label>
            <label htmlFor="signup-username">Username
                <input
                    id="signup-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
            </label>
            <label htmlFor="signup-password">Password
                <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </label>
            <label htmlFor="signup-confrim-password">Password
                <input
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
            </label>
            <button type="submit">Sign Up</button>


        </form>
    )
}
