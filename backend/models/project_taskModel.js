const mongoose = require('mongoose')

const project_taskSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }
})

module.exports = mongoose.model('project_task', project_taskSchema)