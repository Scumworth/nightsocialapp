// components/Header.js

import React  from 'react';
import { Jumbotron } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

const Header = ({ status, user, handleLogin }) => (
    <div>
        <Jumbotron style = {{textAlign: 'center'}}>
            <h1>FreeCodeCamp Nightlife App</h1>
            <p>(Built using the Yelp Fusion API)</p>
            <p>Login to add or remove yourself from attending a bar tonight.</p>
        </Jumbotron>
        { (!status)
                ? <GoogleLogin
                    clientId = {process.env.GOOGLE_USER_ID}
                    buttonText = "Login with Google"
                    onSuccess = { handleLogin }
                    onFailure = {
                        response => console.log(response)
                    }
                />
                : <p>Hello { user }</p>
        }
    </div>
);

export default Header;
