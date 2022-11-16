import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import './Navigation.css'
import ProfileButton from "./ProfileButton";
import logo from '../../assets/NoRoomAtTheInn.png'
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormPage";
import { Modal } from "../../context/Modal";

export default function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)


    return (

        <div className="nav-bar">
            <NavLink exact to="/">
                <img className="logo" src={logo} />
            </NavLink>
            <div className="nav-button-container">
                <NavLink  to="/addSpot">
                    <button id="add-spot-button">Add Your Spot</button>
                </NavLink>
                {isLoaded && (
                    <ProfileButton
                    user={sessionUser}
                    setLogin={setLogin}
                    setShowModal={setShowModal}
                    />
                    )}

                {showModal && ( //control which form is shown

                    <Modal onClose={() => setShowModal(false)}>
                        {login ? (<LoginForm setShowModal={setShowModal} />) : (<SignupFormPage setShowModel={setShowModal} />)
                            }
                    </Modal>
                )}
            </div>

        </div>
    )
}
