// actions/index.js

import axios from 'axios';

export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const REQUEST_BARS = 'REQUEST_BARS';
export const RECEIVE_BARS = 'RECEIVE_BARS';
export const INVALIDATE_ADDRESS = 'INVALIDATE_ADDRESS';
export const LOGIN_USER = 'LOGIN_USER';

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
    console.log('test');
    axios.get(`${url}/bars/${address}`)
        .then((res) => {
            console.log(res);
            return res.data;
        }, e => console.log(e))
        .then(data => {
            console.log(data);
            dispatch(receiveBars(address, data))
        })
}

export const login = (user) => ({
    type: LOGIN_USER,
    user
});
