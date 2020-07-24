
const mongoose = require('mongoose');

const historySchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    history: [
        {
            activityId: String
        }
    ]

});

const history = module.exports = mongoose.model('history', historySchema);