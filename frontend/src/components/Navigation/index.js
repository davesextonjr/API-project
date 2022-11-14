import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import logo from '../../assets/NoRoomAtTheInn.png'


export default function Navigaion({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (<ProfileButton user={sessionUser} />)
    } else {
        sessionLinks = (
            <div className="login-signup-container">
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        )
    }

    return (
        <div className="nav-bar">

                <NavLink exact to="/">
                    <img id="logo" src={logo} />
                </NavLink>
                {isLoaded && sessionLinks}

        </div>
    )
}
