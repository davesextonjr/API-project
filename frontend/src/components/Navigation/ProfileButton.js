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
                <div className="dots">... | </div>
                <i className="fa-regular fa-circle-user"></i>
            </button>
            {isMenuShown && ( user ?
                (<ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button id="logout-button" onClick={clickHandler}>Log Out</button>
                    </li>
                </ul>) : (
                    <ul className="profile-dropdown">
                        <li>
                            <button onClick={() => {
                                setLogin(true)
                                setShowModal(true)
                            }}>Log In</button>
                        </li>
                        <li>
                            <button onClick={() => {
                                setLogin(false)
                                setShowModal(true)
                            }}>Sign Up</button>
                        </li>
                        <li>
                            <NavLink to="/addSpot">
                                <button>
                                    Add A Spot
                                </button>
                            </NavLink>
                        </li>

                    </ul>
                )
            )}
        </>

    )
}
