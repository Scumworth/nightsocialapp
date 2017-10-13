//models/bar.js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarSchema = new Schema({
    name: { type: String, required: true },
    usersGoing: [{type: String}]
});

const Bar = mongoose.model('Bar', BarSchema);

module.exports = { Bar };
