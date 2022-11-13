import { csrfFetch } from "./csrf";

const LOGIN_USER = 'session/LOGIN_USER';
const LOGOUT_USER = 'session/LOGOUT_USER';

//actions
    export const loginUser = (user) => {
        return{
            type: LOGIN_USER,
            user
        }
    }

    export const logoutUser = () => {
        return {type: LOGOUT_USER}
    }





//thunks
    export const loginUserThunk = (credential, password) => async (dispatch) => {
        const response = await csrfFetch ('api/session', {
            method: 'POST',
            body: JSON.stringify({credential, password})
        })
        if (!response.ok) {
            return response.json()
        }else {
        const data = await response.json();
            dispatch(loginUser(data.user));
            return response.json;
        }
    }

    export const loadCurrentUserThunk = () => async dispatch => {
        const response = await csrfFetch('api/session');
        const data = await response.json();
        dispatch(loginUser(data.user))
    }

    export const signUpUserThunk = (firstName, lastName, email, username, password) => async dispatch => {
        const response = await csrfFetch('api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password
            })
        })
        if (!response.ok) {
            return response.json()
        }else {
        const data = await response.json();
        dispatch(loginUser(data.user));
        return response.json;
        }
    }


//reducer
const initialState = {user: null}

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER: {
            return {...state,  user: action.user}
        }
        case LOGOUT_USER: {
            return initialState
        }
        default: return state
    }

}
