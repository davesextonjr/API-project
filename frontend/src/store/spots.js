import { csrfFetch } from "./csrf";

//actions
    // action variables
    const LOAD = 'spots/LOAD';
    const ADD_SPOT = 'spots/ADD_SPOT'

const load = spotsList => ({
    type: LOAD,
    spotsList
})

const addSpot = (newSpot) => ({
    type: ADD_SPOT,
    newSpot
})


//thunks
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok){
        const spotsList = await response.json();
        dispatch(load(spotsList))
    }
};

    //new spot should be an object
export const addSpotThunk = ({address, city, state, country, lat, lng, name, description, price}) => async dispatch =>{
    const response = await csrfFetch('api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    })
    if (!response.ok) {
        return response.json()
    }else {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
    return newSpot;
    }
}

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
            };
        case ADD_SPOT: {
            const newState = {...state};
            newState[action.newSpot.id] = action.newSpot;
            return newState;
        }

        default: return state
    }
}
