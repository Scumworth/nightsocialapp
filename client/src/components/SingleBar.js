// components/SingleBar.js

import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const SingleBar = ({ name, url, image_url, numUsersGoing, handleGoing, user, yelpUrl, selectedAddress, userAddress, allBarsResults }) => (
    <div>
        <a href = { yelpUrl }>
            <div style = {{ backgroundColor: '#000000', color: '#FFFD94', margin: 10, padding: 20, borderRadius: 10, maxWidth: 1000, minWidth: 600  }}>
                <Grid>
                    <Row>
                        <Col xs = {2}>
                            <img src = { image_url } height = { 75 } width = { 75 }/>
                        </Col>
                        <Col xs = {10}>
                            <h3>{ name }</h3>
                            <Button bsStyle="info"
                                onClick = { 
                                    event => handleGoing(event, name, user, url, userAddress, allBarsResults)
                                }> { numUsersGoing } users going </Button> 
                        </Col>
                    </Row>
                </Grid>
            </div>
        </a>
    </div>
);

export default SingleBar;
