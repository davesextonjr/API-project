import { csrfFetch } from "./csrf";

//actions
    //action variables
    const LOAD = 'reviews/LOAD';

const load = reviewsList => ({
    type: LOAD,
    reviewsList
})





//thunks
export const getReviewsThunk = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviewsList = await response.json();
        dispatch(load(reviewsList))
    }
    return response
}

export default function reviewsReducer(state = {}, action) {
    switch(action.type) {
        case LOAD:
            const allReviews = {};
            action.reviewsList.Reviews.forEach(review => {
                allReviews[review.id] = review
            });
            return {
                ...state,
                ...allReviews
            };
        // case ADD_SPOT: {
        //     const newState = {...state};
        //     newState[action.newSpot.id] = action.newSpot;
        //     return newState;
        // }
        // case DELETE: {
        //     const newState = {...state}
        //     delete newState[action.spotId]
        //     return newState
        // }

        default: return state
    }
}


//reducer
