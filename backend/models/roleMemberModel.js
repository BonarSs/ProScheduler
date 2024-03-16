const mongoose = require('mongoose')

const role_memberSchema = new mongoose.Schema({
    name_role: String,
    role_desc: String
})

module.exports = mongoose.model('role_member', role_memberSchema)