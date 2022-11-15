import { csrfFetch } from "./csrf";

//actions
    // action variables
    const SET_SPOT ='singleSpot/SET_SPOT'
    const RESET = 'singleSpot/RESET'

const setSpot = spot => ({
    type: SET_SPOT,
    spot
})

export const resetSingleSpotState = () =>{
    return{
        type: RESET
    }
}



//thunk
export const findSpotById =  spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json();
        dispatch(setSpot(spot))
    }
}

export default function singleSpotReducer(state = {}, action) {
    switch(action.type) {
        case SET_SPOT: {
            const newState = {...state};
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case RESET: {
            const newState = {};
            return newState
        }

        default: return state
    }
}
