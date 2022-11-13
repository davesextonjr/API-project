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
            console.log("error logging in")
            return response.json()
        }else {
        const user = await response.json();
            dispatch(loginUser(user));
            return user;
        }
    }

    export const loadCurrentUserThunk = () => async dispatch => {
        const response = await csrfFetch('api/session');
        const data = await response.json();
        dispatch(loginUser(data.user))
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
