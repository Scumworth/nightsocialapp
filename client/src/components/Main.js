// components/Main.js

import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import SingleBar from './SingleBar';

const Main = ({ handleChange, handleSubmit, handleGoing, selectedAddress, url,
    results, allUsersResults, allBarsResults, status, user, userAddress }) => (
    <div style = {{ marginTop: 100, marginBottom: 100 }}>
       
        { results.length !== 0
                ? results.map(result => <SingleBar 
                    name = { result.name }
                    userAddress = { userAddress }
                    yelpUrl = { result.url }
                    url = { url }
                    user = { user }
                    image_url = { result.image_url }
                    handleGoing = { handleGoing }
                    selectedAddress = { selectedAddress }
                    allBarsResults = { allBarsResults }
                    numUsersGoing = {
                        allBarsResults.find((bar) => bar.name === result.name) !== undefined
                            ? allBarsResults.find((bar) => bar.name === result.name).usersGoing.length
                        : 0
             
                    }
                    />)
                : 
            <Form style = {{ clear: 'both', maxWidth: 1200, margin: '0 auto' }}>
            <FormControl 
                style = {{ maxWidth: 1200, height: 75, fontFamily: "'Raleway', sans-serif", padding: 10, fontSize: 50 }}
                type = "text"
                placeholder = "Enter your address"
                onChange = { handleChange }
                name = "address"
            />
            <Button style = {{ float: 'right' }} bsStyle = "success" onClick = { 
                (event) => handleSubmit(event, selectedAddress, url, allUsersResults, status, user) } > 
                Search
            </Button>

        </Form>
        }
    </div>
);

export default Main;
