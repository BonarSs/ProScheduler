const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const {GenerateJWT, VerifyJWT} = require('../middleware/auth')
const bcrypt = require('bcryptjs/dist/bcrypt')

//Helper variable
const cookieDuration = 6 * 60 * 60 * 1000


//Basic CRUD Endpoints
router.post('/CRUD', async (req,res) => {
    try {
        const input_value = req.body
        const new_document = new userModel(input_value)
        const new_docSaved = await new_document.save()
        return res.status(201).json(new_docSaved)
    } catch (error) {
        console.error("Error creating data:", error);
        return res.status(500).json({ 
            error: "Server Error!",
            message: error.message
     })
    }
})

router.get('/CRUD', async (req,res) => {
    try {
        const results = await userModel.find().populate("project")
        if(!results || results.length === 0){
            return res.json({
                message: "tidak ada data ditemukan"
            })
        }
        return res.status(200).json(results)
    } catch (error) {
        console.error("Error pulling data: ", error);
        return res.status(500).json({error: "Server error!"});
    }
})

router.patch('/CRUD/:username', async (req,res) => {
    try {
        const {username} = req.params
        const dataToUpdate = await userModel.findOne({username: username})
        const newData = req.body

        if(!dataToUpdate){
            return res.status(404).json({
                message: "user tidak ditemukan"
            })
        }

        Object.keys(newData).forEach(key => {
            if (newData[key]){
                dataToUpdate[key] = newData[key]
            }
        })

        const updatedData = await dataToUpdate.save()
        return res.status(201).json(updatedData)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: `Error while updating Data => ${error.message}`
        })
    }
})

router.delete('/CRUD/:id', async (req,res) => {
    try {
        const {id} = req.params
        const deletedData = await userModel.findOneAndDelete({_id: id})

        if(!deletedData || deletedData.length === 0){
            return res.json({
                message: "user tidak ditemukan"
            })
        }

        return res.status(201).json(deletedData)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: `Error while deleting Data => ${error.message}`
        })
    }
})

// SignUp Endpoint
router.post('/SignUp', async (req,res) => {
    try {
        const input_value = req.body

        const user = await userModel.findOne({email : input_value.email})
        if (user){
            return res.status(400).json({
                message: "email sudah digunakan"
            })
        }

        const newUser = new userModel(input_value)
        const savedUser = await newUser.save()
        const token = GenerateJWT(savedUser)

        return res.cookie('token', token,{maxAge: 360000000 , httpOnly: true, secure: true, sameSite: 'None'}).json({
            username : savedUser.username,
            email: savedUser.email,
            id: savedUser._id
        })
    } catch (error) {
        console.error("Error creating User:", error);
        return res.status(500).json({ error: error });
    }

})
// {  
//     "username": "bonar",
//     "email": "boaruli42@gmail.com",
//     "password": "test1"
// }

//Login Endpoint
router.post('/LogIn', async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email: email})
   
        if(user && await user.comparePassword(password)){
            const token = GenerateJWT(user)
            return res.cookie('token', token, {maxAge: 360000000 , httpOnly: true, secure: true, sameSite: 'None'}).json({
                username: user.username,
                email: user.email,
                id: user._id
            })
        }else{
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
})

//LogOut Endpoint
router.post('/LogOut',VerifyJWT, async (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "You are now logged out." });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
})



module.exports = router
