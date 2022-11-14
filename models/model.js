const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    rsvp: {
        required: true,
        type: Boolean
    },
    goodies: {
        required: true,
        type: String
    },
    drinks: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)