const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    _id: Number,
    status_name: String
})

module.exports = mongoose.model('status', statusSchema)