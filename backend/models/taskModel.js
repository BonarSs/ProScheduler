const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task_name: String,
    start_date: Date,
    end_date: Date,
    sprint:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('task', taskSchema)