// index.js

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import './index.css';
import store, { history } from './store';
console.log('test');

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history = {history}>
            <div>
            <App
                url = 'https://yelpnightlifeapp.herokuapp.com//api'
            />
            </div>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);

//registerServiceWorker();
