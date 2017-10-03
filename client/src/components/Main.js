// components/Main.js

import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import SingleBar from './SingleBar';

const Main = ({ handleChange, handleSubmit, selectedAddress, url, results }) => (
    <div>
        { results.length !== 0
                ? results.map(result => <SingleBar 
                    name = { result.name }
                    url = { result.url }
                    image_url = { result.image_url }
                    />)
                : 
        <Form>
            <FormControl 
                type = "text"
                placeholder = "Enter your address"
                onChange = { handleChange }
                name = "address"
            />
            <Button type = "button" onClick = { 
                (event) => handleSubmit(event, selectedAddress, url) } > 
                Search
            </Button>

        </Form>
        }
    </div>
);

export default Main;
