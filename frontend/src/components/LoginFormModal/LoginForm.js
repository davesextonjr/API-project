import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './loginForm.css'


export default function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const response = await dispatch(sessionActions.loginUserThunk(credential, password))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            return
        });
        if (response) setShowModal(false)
    }

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <p>Please log in</p>
            </div>
            <div id="welcome-back"> Welcome Back</div>
            <ul>
                {errors.map((err) => <li key={err}>{err}</li>)}
            </ul>
            <label htmlFor="login-credential">Username or Email</label>
                <input
                    id="login-credential"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required />
            <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            <button type="submit">Login</button>


        </form>
    )
}
