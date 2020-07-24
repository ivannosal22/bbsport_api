const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema({

    promotionText: {
        type: String,
        required: true
    },
    promotionStadiumId: {
        type: String,
        required: true
    },
    promotionImage: {
        type: String,
        required: true
    },
});

const promotion = module.exports = mongoose.model('promotion', promotionSchema);