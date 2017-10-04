// index.js

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import './index.css';
import App from './containers/App';
import store, { history } from './store';

require('dotenv').config();

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history = {history}>
            <div>
            <App
                url = 'http://localhost:3001/api'
            />
            </div>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);

//registerServiceWorker();
