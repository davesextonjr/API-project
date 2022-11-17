import { csrfFetch } from "./csrf";

//actions
    //action variables
    const LOAD = 'reviews/LOAD';
    const ADD_REVIEW = 'reviews/ADD_REVIEW'

const load = reviewsList => ({
    type: LOAD,
    reviewsList
})

const addReview = newReview => ({ //used for adding and editing reviews
    type: ADD_REVIEW,
    newReview
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


export const addReviewThunk = ({spotId, stars, review, currentUserObject, ReviewImages}) => async dispatch =>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            stars,
            review
        })
    })
    if (!response.ok) {
        return response.json()
    }else {
    const returnedReview = await response.json();
    const newReview = {...returnedReview, spotId: +spotId, User: currentUserObject, ReviewImages}
    dispatch(addReview(newReview));
    return newReview;
    }
}

export const editReviewThunk = ({spotId, reviewId, stars, review, currentUserObject, ReviewImages}) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
            stars,
            review
        })
    })
    if (!response.ok) {
        return response.json()
    }else {
    const returnedReview = await response.json();
    const newReview = {...returnedReview, spotId: +spotId, User: currentUserObject, ReviewImages}
    dispatch(addReview(newReview));
    return newReview;
    }
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
        case ADD_REVIEW: {
            const newState = {...state};
            newState[action.newReview.id] = action.newReview;
            return newState;
        }
        // case DELETE: {
        //     const newState = {...state}
        //     delete newState[action.spotId]
        //     return newState
        // }

        default: return state
    }
}


//reducer
