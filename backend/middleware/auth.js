const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

//Generate JWT
const GenerateJWT = (user) => {
    return jwt.sign({
        id : user._id
    }, 
    process.env.SECRET_KEY_JWT,
    {
        expiresIn: "6h"
    })
}

//Middleware for verifying user JWT 
const VerifyJWT = async (req,res,next) => {
    try {
        const hashedToken = req.cookies.token
        const decodedToken = await jwt.verify(hashedToken, process.env.SECRET_KEY_JWT)
        const user_id = decodedToken.id

        const user = await userModel.findOne({_id : user_id}, "nama email project")

        if(!user){
            throw new Error()
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

module.exports = {
    GenerateJWT,
    VerifyJWT
}