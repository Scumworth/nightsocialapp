// components/Header.js

import React  from 'react';
import { Jumbotron, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

const Header = ({ status, user, handleLogin, handleAddressChange, handleChange, selectedAddress, url }) => (
    <div>
        <Jumbotron style = {{textAlign: 'center'}}>
            <h1>FreeCodeCamp Nightlife App</h1>
            <p>(Built using the Yelp Fusion API)</p>
            <p>Login to add or remove yourself from attending a bar tonight.</p>
        </Jumbotron>
        { (!status)
                ? <GoogleLogin
                    clientId = '790970535429-0d3b0vhsh8s009g6i8dcksf7jjomrc9b.apps.googleusercontent.com'
                    buttonText = "Login with Google"
                    onSuccess = { handleLogin }
                    onFailure = {
                        response => console.log(response)
                    }
                />
                :
                <div> 
                <p>Hello { user }</p>
                <Form>
                    <FormGroup>
                        <FormControl
                            type = "text"
                            placeholder = "Choose new address"
                            onChange = { handleChange }
                            name = "address"
                        />
                        <Button type="button" onClick = { (e) => handleAddressChange(e, selectedAddress, url, status, user) }>Change Address</Button>
                    </FormGroup>
                </Form>
                </div>
        }
    </div>
);

export default Header;
