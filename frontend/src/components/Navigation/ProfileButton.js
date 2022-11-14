import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';

export default function ProfileButton ({user}) {
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
            {isMenuShown && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button id="logout-button" onClick={clickHandler}>Log Out</button>
                    </li>
                </ul>
            )}
        </>

    )
}
