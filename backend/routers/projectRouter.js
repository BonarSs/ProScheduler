const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const projectModel = require('../models/projectModel')
const userModel = require('../models/userModel')
const {VerifyJWT} = require('../middleware/auth')

// Basic CRUD Endpoints
router.post('/CRUD', async (req,res) => {
    try {
        const input_value = req.body
        const new_document = new projectModel(input_value)
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
        const results = await projectModel.find().populate("task_id collaborators")
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

router.patch('/CRUD/:id', async (req,res) => {
    try {
        const {id} = req.params
        const dataToUpdate = await projectModel.findOne({_id: id})
        const newData = req.body

        if(!dataToUpdate){
            return res.status(404).json({
                message: "project tidak ditemukan"
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
        const deletedData = await projectModel.findOneAndDelete({_id: id})

        if(!deletedData || deletedData.length === 0){
            return res.json({
                message: "taskroject tidak ditemukan"
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

//Endpoint to retreive single project document
router.get('/:id_project',VerifyJWT, async (req, res) => {
    try {
        const {id_project} = req.params;
        const user = req.user

        const ProjectRelated = await projectModel.findOne({ _id : id_project})

        const userIsCollaborator = await user.project.includes(id_project)
        const projectIsUsersProject = await ProjectRelated.collaborators.includes(user._id)
        
        if(!userIsCollaborator || !projectIsUsersProject){
            throw new Error("User tidak memiliki akses ke project terkait")
            return
        }

        return res.status(200).json(ProjectRelated)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
} )

//Endpoint to Create single project document
router.post('/create',VerifyJWT, async (req,res) => {
    try {
        const user = req.user;
        let input_value = req.body;

        input_value.collaborators = [user._id]
        
        const new_document = new projectModel(input_value)
        const new_docSaved = await new_document.save()
        
        await user.project.push(new_docSaved._id)
        
        await userModel.findOneAndUpdate({_id : user._id}, {project : user.project})

        return res.status(201).json(new_docSaved)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router