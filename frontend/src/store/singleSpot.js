import { csrfFetch } from "./csrf";

//actions
    // action variables
    const SET_SPOT ='singleSpot/SET_SPOT'

const setSpot = spot => ({
    type: SET_SPOT,
    spot
})



//thunk
export const findSpotById =  spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = response.json();
        dispatch(setSpot(spot))
    }
}

export default function spotsReducer(state = {}, action) {
    switch(action.type) {


        default: return state
    }
}
