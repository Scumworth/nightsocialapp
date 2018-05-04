// components/Header.js

import React  from 'react';
import { Jumbotron, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';

const Header = ({ status, user, handleLogin, handleAddressChange, handleChange, selectedAddress, url, userAddress }) => (
    <div>
        <Jumbotron style = {{ textAlign: 'center', minWidth: 400, padding: 50, backgroundColor: '#000000', color: '#FFFD94' }}>
            <h1 style = {{ fontFamily: "'Abril Fatface', sans-serif" }}>FreeCodeCamp Nightlife App</h1>
            <p style = {{ fontFamily: "'Raleway', sans-serif" }}>(Built using the Yelp Fusion API)</p>
            <p style = {{ fontFamily: "'Raleway', sans-serif"}}>Login to add or remove yourself from attending a bar tonight.</p>
        </Jumbotron>
        { (!status)
                ? <GoogleLogin
                    clientId = '790970535429-oupd748ofoehflep82c80h4ong2c47ut.apps.googleusercontent.com'
                    buttonText = "Login with Google"
                    onSuccess = { handleLogin }
                    onFailure = {
                        response => console.log(response)
                    }
                />
                :
                <div> 
                <p style = {{ fontFamily: "'Raleway', sans-serif" }}>Hello { user }</p>
                { (userAddress || userAddress == "") 
                    ?<Form style = {{ clear: 'both', width: '90%', margin: '0 auto' }}>
                         <FormGroup>
                            <FormControl
                                style = {{ height: 75, fontFamily: "'Raleway', sans-serif", padding: 10, fontSize: 25}}
                                type = "text"
                                placeholder = "Choose new address"
                                onChange = { handleChange }
                                name = "address"
                            />
                            <Button  style = {{ float: 'right' }} type="button" onClick = { (e) => handleAddressChange(e, selectedAddress, url, status, user) }>Change Address</Button>
                        </FormGroup>
                    </Form>
                    : null
                }
                </div>
        }
    </div>
);

export default Header;
