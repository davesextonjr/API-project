import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';



export default function ProfileButton ({user, setLogin, setShowModal}) {
    const dispatch = useDispatch();
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

                   <NavLink className="add-spot-container" to="/addSpot">
                        <button id="dropdown-add-spot-button">
                            Add A Spot
                        </button>
                    </NavLink>

                    <div id="logout-button-container">
                        <button id="logout-button" onClick={clickHandler}>Log Out</button>
                    </div>
                </div>) : (
                    <div className="profile-dropdown">
                        <div>
                            <button onClick={() => {
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
                        <NavLink className="add-spot-container" to="/addSpot">
                            <button>
                                Add A Spot
                            </button>
                        </NavLink>
                    </div>
                )
            )}
        </>

    )
}
