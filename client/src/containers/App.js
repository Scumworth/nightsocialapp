// containers/App.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './../components/Main';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { selectAddress, invalidateAddress, getBars, login, getAllBars, getAllUsers } from './../actions';
import axios from 'axios';
const Loader = require('react-loader');

class App extends Component {
    static propTypes = {
        selectedAddress: PropTypes.string,
        results: PropTypes.array,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        url: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getAllUsers(this.props.url);
        this.props.getAllBars(this.props.url);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const user = this.props.allUsersResults.find(user => {
                return user.name === nextProps.user;
            })  
            if(user){
                this.props.updateBars(user.address, this.props.url);
            }
        }    
        
    }
    render() {
        return (
            <div>
                <Loader loaded = { (this.props.allBarsLoaded && this.props.allUsersLoaded) }>
                    <Header 
                        handleChange = { this.props.handleChange }
                        handleLogin = { this.props.handleLogin } 
                        user = { this.props.user } 
                        handleAddressChange = { this.props.handleAddressChange }
                        selectedAddress = { this.props.selectedAddress }
                        url = { this.props.url}
                        status = { this.props.status }
                        userAddress = { this.props.userAddress}
                    />
                <Route exact path = "/" render  = { (props) => 
                        <Main {...props} 
                            handleChange = { this.props.handleChange } 
                            handleSubmit = { this.props.handleSubmit } 
                            selectedAddress= { this.props.selectedAddress } 
                            url = { this.props.url }
                            results = { this.props.results } 
                            allUsersResults = { this.props.allUsersResults }
                            allBarsResults = { this.props.allBarsResults }
                            status = { this.props.status }
                            user = { this.props.user }
                            handleGoing = { this.props.handleGoing }
                            userAddress = { this.props.userAddress }
                        />
                } />
                <Footer />
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { selectedAddress, bars, login, allBars, allUsers } = state;
    const { isFetching, lastUpdated, results, userAddress } = bars;
    const { isFetchingAllBars, allBarsResults, allBarsLoaded } = allBars;
    const { isFetchingAllUsers, allUsersResults, allUsersLoaded } = allUsers;
    const { status, user } = login;
    return { selectedAddress, results, isFetching, lastUpdated, status, user,
        isFetchingAllBars, allBarsResults, isFetchingAllUsers, allUsersResults,
        allBarsLoaded, allUsersLoaded, userAddress
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {
            e.preventDefault();
            const target = e.target;
            const value = target.value;
            dispatch(selectAddress(value));
        },
        handleSubmit: (e, address, url, allUsersResults, status, user) => {
            e.preventDefault();
            if(address !== null) {
                dispatch(getBars(address, url));
            }
            if (allUsersResults.length === 0 && address !== null) {
                axios.post(`${url}/allusers`, {
                    name: user,
                    address
                })
            }
            const allUserNames = allUsersResults.map((userrecord) => {
                return userrecord.name;
            });
            if(status && allUserNames.indexOf(user) !== -1) {
                axios.post(`${url}/allusers`, {
                    name: user,
                    address
                })
            }
        },
        handleLogin: (response) => {
           dispatch(login(response.profileObj.email));
        },
        getAllUsers: (url) => {
            dispatch(getAllUsers(url));
        },
        getAllBars: (url) => {
            dispatch(getAllBars(url));
        },
        updateBars: (address, url) => {
            dispatch(getBars(address, url));
        },
        handleAddressChange: (e, address, url, status, user) => {
            e.preventDefault(); 
            axios.put(`${url}/allusers`, {
                name: user,
                address
            });
            dispatch(getBars(address, url));
        },
        handleGoing: (e, barName, userName, url, userAddress, allBarsResults) => {
            e.preventDefault();
            const allBarNames = allBarsResults.map((barRecord) => {
                return barRecord.name;
            })
            if (allBarNames.indexOf(barName) !== -1 && userName !== null) {
                axios.put(`${url}/allbars`, {
                    barName,
                    userName
                }).then((e)=> {
                    dispatch(getAllBars(url));
                });
            }

            else if (userName !== null) {
                axios.post(`${url}/allbars`, {
                barName,
                userName
                }).then(() => {
                    dispatch(getAllBars(url));
                });
            }
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
