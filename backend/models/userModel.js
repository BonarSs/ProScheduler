const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    project: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
        }
    ]
})

//Hashing password sebelum disimpan
UserSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')){
        user.password =  await bcrypt.hash(user.password, 10) //Nanti nilai salt harus diganti
    }
    next()
})


// Method to compare passwords
UserSchema.methods.comparePassword = async function (passwordToCheck) {
    return  bcrypt.compare(passwordToCheck, this.password);
};


module.exports = mongoose.model('user', UserSchema)