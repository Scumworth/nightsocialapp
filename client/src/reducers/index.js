// reducers/index.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    SELECT_ADDRESS, INVALIDATE_ADDRESS,
    REQUEST_BARS, RECEIVE_BARS, LOGIN_USER
} from '../actions';

const selectedAddress = (state = null, action) => {
    switch (action.type){
        case SELECT_ADDRESS:
            return action.address;
        default: 
            return state;
    }
}

const bars = (state = {
    isFetching: false,
    didInvalidate: false,
    results: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_ADDRESS:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_BARS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_BARS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                results: action.bars,
                lastUpdated: action.receivedAt
            }
        default: 
            return state;
    }
}

const login = (state = {
    status: false,
    user: null
}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                status: true,
                user: action.user
            }
         default:
            return state;
    }
}


const nightSocialApp = combineReducers({
    router: routerReducer,
    bars,
    selectedAddress
});

export default nightSocialApp;
