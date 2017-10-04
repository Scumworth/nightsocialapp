// components/SingleBar.js

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const SingleBar = ({ name, url, image_url }) => (
    <div>
        <a href = {url}>
            <div>
                <Grid>
                    <Row>
                        <Col xs = {2}>
                            <img src = { image_url } height = { 75 } width = { 75 }/>
                        </Col>
                        <Col xs = {10}>
                            <h3>{ name }</h3>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </a>
    </div>
);

export default SingleBar;
