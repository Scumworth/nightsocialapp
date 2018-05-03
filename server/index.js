// server/index.js
'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Bar } = require('./models/bar');
const bodyParser = require('body-parser');
const path = require('path');
const yelp = require('yelp-fusion');
//let client;
//yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
    //.then(response => {
        //client = yelp.client(response.jsonBody.access_token);
    //})
    //.catch(e => {
        //console.log(e);
    //});
const client = yelp.client(process.env.YELP_API_KEY);
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

router.route('/allbars')
    //retrieve all bars stored in db
    .get((req, res) => {
        Bar.find({}).then((bars) => {
            res.json(bars);
        }, (e) => {
            res.status(400).send(e)
        });
    })
    //add bar to db
    .post((req, res) => {
        Bar.findOne({ name: req.body.barName }).then((bar) => {
            if(bar === null) {
                const newBar = new Bar({
                    name: req.body.barName,
                    usersGoing: [req.body.userName]
                });
                newBar.save().then((newBar) => {
                    res.send({ message: 'Bar added.' });
                }, (e) => {
                    res.status(400).send(e);
                });
            }
        }, (e) => res.status(400).send(e))
    })
    .put((req, res) => {
        Bar.findOne({ name: req.body.barName }).then((bar) => {
            if(bar && bar.usersGoing.indexOf(req.body.userName) === -1){
                Bar.findOneAndUpdate(
                    { name: req.body.barName },
                    { $set: { usersGoing: bar.usersGoing.concat([req.body.userName]) } },
                    { new: true }
                ).then((bar) => {
                    res.send({ message: 'User has been added to bar' });
                }, (e) => res.status(400).send(e));
            }
            else if(bar && bar.usersGoing.indexOf(req.body.userName) !== -1) {
                Bar.findOneAndUpdate(
                    { name: req.body.barName },
                    { $set: { usersGoing: bar.usersGoing.filter((user) => user !== req.body.userName) } },
                    { new: true }
                ).then((bar) => {
                    res.send({ message: 'User has been removed from bar' });
                }, (e) => res.status(400).send(e));
            } 
        }, (e) => {
            res.status(400).send(e);
        })
    });

router.route('/allusers')
    .get((req, res) => {
        User.find({}).then((users) => {
            res.json(users);
        }, (e) => {
            res.status(400).send(e)
        });
    })
    .post((req, res) => {
        const user = new User({
            name: req.body.name,
            address: req.body.address
        });
        user.save().then((user) => {
           res.send({message: 'User added.'});
        }, (e) => {
            res.status(400).send(e);
        });
    })
    .put((req, res) => {
        User.findOneAndUpdate(
            { name: req.body.name },
            { $set: { address : req.body.address } },
            { new: true}
        ).then((user) => {
            res.send({ message: "User's address has been updated."}, (e) => {
                res.status(400).send(e);
            });
        });
    })

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
