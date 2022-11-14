import { csrfFetch } from "./csrf";

//actions
    // action variables
    const LOAD = 'spots/LOAD';

const load = spotsList => ({
    type: LOAD,
    spotsList
})


//thunks
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok){
        const spotsList = await response.json();
        dispatch(load(spotsList))
    }
};


//selectors



//reducer
export default function spotsReducer(state = {}, action) {
    switch(action.type) {
        case LOAD:
        const allSpots = {};
        action.spotsList.Spots.forEach(spot => {
            allSpots[spot.id] = spot
        });
        return {
            ...state,
            ...allSpots
        }
        default: return state
    }
}
