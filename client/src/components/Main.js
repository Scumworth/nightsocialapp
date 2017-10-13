// components/Main.js

import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import SingleBar from './SingleBar';

const Main = ({ handleChange, handleSubmit, handleGoing, selectedAddress, url,
    results, allUsersResults, allBarsResults, status, user, userAddress }) => (
    <div style = {{ margin: 25 }}>
       
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
        <Form>
            <FormControl 
                type = "text"
                placeholder = "Enter your address"
                onChange = { handleChange }
                name = "address"
            />
            <Button bsStyle = "success" onClick = { 
                (event) => handleSubmit(event, selectedAddress, url, allUsersResults, status, user) } > 
                Search
            </Button>

        </Form>
        }
    </div>
);

export default Main;
