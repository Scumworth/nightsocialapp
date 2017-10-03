// server/index.js
'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const yelp = require('yelp-fusion');
let client;
yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
    .then(response => {
        client = yelp.client(response.jsonBody.access_token);
    })
    .catch(e => {
        console.log(e);
    });
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req,res) => {
    res.json({ message: 'API Initialized!' });
});

router.route('/bars/:address')
    //retrieve all bars from yelp api by address
    .get((req, res) => {
        client.search({
            location: req.params.address,
            categories: 'bars'
        })
            .then(response  => res.send(response.jsonBody), e => console.log(e))
            .catch((e) => console.log(e))
    });

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
})

