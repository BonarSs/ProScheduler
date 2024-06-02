const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    assigned_to : String,
    task: String,
    start_date: Date,
    end_date: Date,
    sprint: Number
})

module.exports = mongoose.model('task', taskSchema)