const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    date_start: {
        type : Date,
        required : true
    },
    date_end: {
        type : Date,
        required : true
    },
    description: String,
    team_num: {
        type : Number,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    task_id: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
        }
    ],
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    isCompleted : {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model ('project', projectSchema)      