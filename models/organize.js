const mongoose = require('mongoose');

const organizeSchema = mongoose.Schema({

    organizerId: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    },
    eventStartTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventEndTime: {
        type: String,
        required: true
    },
    stadiumId: {
        type: String,
        required: true
    },
    acceptedUser: [
        {
            userId: String
        }
    ],
    invitedUser: [
        {
            userId: String
        }
    ],
    type: {
        type: String,
        required: true
    },
    comments: [
        {
            username: String,
            userImage: String,
            comments: String,
            commentImage: String
        }
    ]

});

const organize = module.exports = mongoose.model('organize', organizeSchema);
