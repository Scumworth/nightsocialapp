// Header.js
import React  from 'react';
import { Jumbotron } from 'react-bootstrap';

const Header = () => (
    <div>
        <Jumbotron style = {{textAlign: 'center'}}>
            <h1>FreeCodeCamp Nightlife App</h1>
            <p>(Built using the Yelp Fusion API)</p>
            <p>Login to add or remove yourself from attending a bar tonight.</p>
        </Jumbotron>
    </div>
);

export default Header;
