const mongoose = require('mongoose');

const facilitySchema = mongoose.Schema({

    facilityName: {
        type: String,
        required: true
    },
});

const facility = module.exports = mongoose.model('facility', facilitySchema);