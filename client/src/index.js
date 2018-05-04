// index.js

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import './index.css';
import store, { history } from './store';
import WebFont from 'webfontloader';
//import registerServiceWorker from './registerServiceWorker';

WebFont.load({
    google: {
        families: ['Abril Fatface', 'Raleway']
    }
});

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history = {history}>
            <div>
            <App
                url = 'https://yelpnightlifeapp.herokuapp.com/api'
            />
            </div>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);

//registerServiceWorker();
