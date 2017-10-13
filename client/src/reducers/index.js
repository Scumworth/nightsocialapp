// reducers/index.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    SELECT_ADDRESS, INVALIDATE_ADDRESS,
    REQUEST_BARS, RECEIVE_BARS, LOGIN_USER,
    REQUEST_ALL_BARS, RECEIVE_ALL_BARS,
    REQUEST_ALL_USERS, RECEIVE_ALL_USERS
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
                lastUpdated: action.receivedAt,
                userAddress: action.address
            }
        default: 
            return state;
    }
}

const allBars = (state = {
    isFetchingAllBars: false,
    allBarsResults: []
}, action) => {
    switch (action.type) {
        case REQUEST_ALL_BARS:
            return {
                ...state,
                isFetchingAllBars: true
            }
        case RECEIVE_ALL_BARS:
            return {
                ...state,
                isFetchingAllBars: false,
                allBarsResults: action.allBarsResults,
                allBarsLoaded: true
            }
         default:
            return state;
    }
}

const allUsers = (state = {
    isFetchingAllUsers: false,
    allUsersResults: []
}, action) => {
    switch (action.type) {
        case REQUEST_ALL_USERS:
            return {
                ...state,
                isFetchingAllUsers: true
            }
        case RECEIVE_ALL_USERS:
            return {
                ...state,
                isFetchingAllUsers: false,
                allUsersResults: action.allUsersResults,
                allUsersLoaded: true
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
                user: action.user,
                userAddress: action.userAddress 
            }
         default:
            return state;
    }
}


const nightSocialApp = combineReducers({
    router: routerReducer,
    bars,
    allBars,
    allUsers,
    selectedAddress,
    login
});

export default nightSocialApp;
