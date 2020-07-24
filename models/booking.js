const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    stadiumId: {
        type: String,
        required: true
    },
    bookedDate: {
        type: String,
        required: true
    },
    bookedStartTime: {
        type: String,
        required: true
    },
    bookedEndTime: {
        type: String,
        required: true
    }
});

const booking = module.exports = mongoose.model('booking', bookingSchema);