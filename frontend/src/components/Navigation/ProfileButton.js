import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';


export default function ProfileButton ({user, setLogin, setShowModal}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [isMenuShown, setIsMenuShown] = useState(false);

    const displayMenu = () => {
        if (isMenuShown) return;
        setIsMenuShown(true);
    }

    const closeMenu = () => {
        setIsMenuShown(false)
    }

    useEffect(() => {
        if (!isMenuShown) return;
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener("click", closeMenu)
    }, [isMenuShown])

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUserThunk())
    }

    const loginDemoUser = async (e) => {

        e.preventDefault();
        setErrors([]);
        const response = await dispatch(sessionActions.loginUserThunk("19Years4Bread", "VictorHugo"))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            return
        });
        if(response) setShowModal(false);
    }

    return (
        <>
            <button id="display-menu" onClick={displayMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-regular fa-circle-user"></i>
            </button>
            {isMenuShown && ( user ?
                (<div className="profile-dropdown">
                   <div id="username-email-container">
                        <div id="dropdown-username">{user.username}</div>
                        <div>{user.email}</div>
                   </div>
                <div id="dropdown-add-spot-logout-container">
                    <div>

                   <NavLink className="add-spot-container" to="/addSpot">
                        <button className="demo-add-user-buttons" id="dropdown-add-spot-button">
                            Add A Spot
                        </button>
                    </NavLink>
                    </div>
                    <div>

                    <NavLink to="/bookings">
                        <button className="demo-add-user-buttons">
                            Your Upcoming Stays
                        </button>
                    </NavLink>
                    </div>


                    <div id="logout-button-container">
                        <button className="demo-add-user-buttons" id="logout-button" onClick={clickHandler}>Log Out</button>
                    </div>
                </div>
                </div>) : (
                    <div className="profile-dropdown">
                        <div id="dropdown-login-signup">
                            <div>
                                <button id="dropdown-login-button" onClick={() => {
                                    setLogin(true)
                                    setShowModal(true)
                                }}>Log In</button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setLogin(false)
                                    setShowModal(true)
                                }}>Sign Up</button>
                            </div>
                        </div>
                      <div id="dropdown-demo-user-add-spot-container">

                        <div className="hover">
                            <button className="demo-add-user-buttons" onClick={loginDemoUser}>Demo User</button>
                        </div>
                        <div>

                        <NavLink className="add-spot-container" to="/addSpot">
                            <button
                            className="demo-add-user-buttons">
                                Add A Spot
                            </button>
                        </NavLink>
                        </div>
                      </div>
                    </div>
                )
            )}
        </>

    )
}
