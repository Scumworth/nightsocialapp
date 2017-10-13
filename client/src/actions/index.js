// actions/index.js

import axios from 'axios';

export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const REQUEST_BARS = 'REQUEST_BARS';
export const RECEIVE_BARS = 'RECEIVE_BARS';
export const INVALIDATE_ADDRESS = 'INVALIDATE_ADDRESS';
export const LOGIN_USER = 'LOGIN_USER';
export const REQUEST_ALL_BARS = 'REQUEST_ALL_BARS';
export const RECEIVE_ALL_BARS = 'RECEIVE_ALL_BARS';
export const REQUEST_ALL_USERS = 'REQUEST_ALL_USERS';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const selectAddress = address => ({
    type: SELECT_ADDRESS,
    address
});

export const invalidateAddress = address => ({
    type: INVALIDATE_ADDRESS,
    address
});

export const requestBars = address => ({
    type: REQUEST_BARS,
    address
});

export const receiveBars = (address, data) => ({
    type: RECEIVE_BARS,
    address,
    bars: data.businesses.map(bar => ({...bar})),
    receivedAt: Date.now()
});

export const getBars = (address, url)  => dispatch => {
    dispatch(requestBars(address)); 
    axios.get(`${url}/bars/${address}`)
        .then((res) => {
            return res.data;
        }, e => console.log(e))
        .then(data => {
            dispatch(receiveBars(address, data));
        })
}

export const requestAllBars = () => ({
    type: REQUEST_ALL_BARS
});

export const receiveAllBars = (data) => ({
    type: RECEIVE_ALL_BARS,
    allBarsResults: data.map(bar => ({...bar}))
});

export const getAllBars = (url) => dispatch => {
    dispatch(requestAllBars);
    axios.get(`${url}/allbars`)
        .then((res) => {
            return res.data;
        }, e => console.log(e))
        .then(data => {
            console.log(data);
            dispatch(receiveAllBars(data));
        });
}

export const requestAllUsers = () => ({
    type: REQUEST_ALL_USERS
});

export const receiveAllUsers = (data) => ({
    type: RECEIVE_ALL_USERS,
    allUsersResults: data.map(user => ({...user}))
});


export const getAllUsers = (url) => dispatch => {
    dispatch(requestAllUsers);
    axios.get(`${url}/allusers`)
        .then((res) => {
            return res.data;
        }, e => console.log(e))
        .then(data => {
            dispatch(receiveAllUsers(data));
        });
}

export const login = (user, userAddress) => ({
    type: LOGIN_USER,
    user,
    userAddress
});
