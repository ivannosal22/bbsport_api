
const mongoose = require('mongoose');

const metaSchema = mongoose.Schema({

    metaKey: {
        type: String,
        required: true
    },
    metaValue: {
        type: String,
        required: false,
    }

});

const meta = module.exports = mongoose.model('meta', metaSchema);