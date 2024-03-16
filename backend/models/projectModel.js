const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    date_end: Date,
    description: String,
    team_num: Number,
    category_id: Number,
    task_id: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'task'}
    ]
}, {timestamps: true})

module.exports = mongoose.model ('project', projectSchema)      