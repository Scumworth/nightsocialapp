// containers/App.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './../components/Main';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { selectAddress, invalidateAddress, getBars, login } from './../actions';

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
        const { dispatch } = this.props;
    }
    componentWillReceiveProps(nextProps) {
    }
    
    render() {
        return (
            <div>
                <Header handleLogin = { this.props.handleLogin } status = { this.props.status } user = { this.props.user }/>
                <Route exact path = "/" render  = { (props) => 
                        <Main {...props} handleChange = { this.props.handleChange } handleSubmit = { this.props.handleSubmit } selectedAddress= { this.props.selectedAddress } url = { this.props.url } results = { this.props.results } />
                } />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { selectedAddress, bars, login } = state;
    const { isFetching, lastUpdated, results } = bars;
    const { status, user } = login;
    return { selectedAddress, results, isFetching, lastUpdated };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {
            console.log('handling change');
            e.preventDefault();
            const target = e.target;
            const value = target.value;
            dispatch(selectAddress(value));
        },
        handleSubmit: (e, address, url) => {
            console.log('handling submit');
            e.preventDefault();
            dispatch(getBars(address, url));
        },
        handleLogin: (response) => {
           dispatch(login(response.profileObj.email));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
