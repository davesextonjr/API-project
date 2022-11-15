import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import logo from '../../assets/NoRoomAtTheInn.png'
import LoginForm from "../LoginFormModal/LoginForm";
import LoginFormModal from "../LoginFormModal";
import SignupFormPage from "../SignupFormPage";
import { Modal } from "../../context/Modal";

export default function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (<ProfileButton user={sessionUser} />)
    // } else {
    //     sessionLinks = (
    //         // <div className="login-signup-container">
    //         //     <NavLink to="/login">Log In</NavLink>
    //         //     <NavLink to="/signup">Sign Up</NavLink>
    //         // </div>
    //     <>
    //         <LoginFormModal />
    //         <NavLink to="/signup">Sign Up</NavLink>
    //     </>
    //     )
    // }

    return (
        // <div className="nav-bar">

        //         <NavLink exact to="/">
        //             <img id="logo" src={logo} />
        //         </NavLink>
        //         {isLoaded && (
        //             <ProfileButton
        //                 user={sessionUser}
        //                 setLogin={setLogin}
        //                 setShowModal={setShowModal}
        //                 />
        //             )}
        //         {/* {isLoaded && sessionLinks} */}
        //         {showModal && (
        //             <Modal onClose={() => setShowModal(false)}>
        //             {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal}/>}
        //         </Modal>}

        // </div>
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && (
                    <ProfileButton
                        user={sessionUser}
                        setLogin={setLogin}
                        setShowModal={setShowModal}
                    />
                )}
            </li>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {login ? (
                        <LoginForm setShowModal={setShowModal} />
                    ) : (
                        <SignupFormPage setShowModel={setShowModal} />
                    )}
                </Modal>
            )}
        </ul>
    )
}
