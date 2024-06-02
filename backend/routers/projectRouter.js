const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const projectModel = require('../models/projectModel')
const userModel = require('../models/userModel')
const {VerifyJWT} = require('../middleware/auth')
const axios = require('axios')

//Endpoit to retreive all someone's projects
router.get('/', VerifyJWT, async (req, res) => {
    try {
        const user_email = req.user.email
        const projects = await userModel.findOne({email : user_email}).populate("project")
        const returned_data = projects.project.map(item => ({project_name : item.project_name, _id : item._id, isCompleted : item.isCompleted}))

        return res.status(200).json(returned_data)

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
})

//Endpoint to retreive single project document
router.get('/:id_project',VerifyJWT, async (req, res) => {
    try {
        const {id_project} = req.params;
        const user = req.user

        const ProjectRelated = await projectModel.findOne({ _id : id_project}).populate("task_id")

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
        const inputAI = {
            project_category: input_value.category,
            team_members: input_value.team_num,
            start_date: input_value.date_start,
            end_date: input_value.date_end
        }

        const AIResponse = await axios.post('https://pro-scheduler.vercel.app//expert-systems/generate-timeline', inputAI)
        const inputTask = AIResponse.data

        const responsePostTask = await axios.post("http://localhost:3000/task/insertMany", inputTask)
        const tasksId = responsePostTask.data.map(task => task._id)

        input_value.collaborators = [user._id];
        input_value.task_id = tasksId;

        const new_document = new projectModel(input_value)
        let new_docSaved = await new_document.save()

        // Update the local object
        new_docSaved = new_docSaved.toObject();
        new_docSaved.task_id = responsePostTask.data;

        await user.project.push(new_docSaved._id)        
        await userModel.findOneAndUpdate({_id : user._id}, {project : user.project})

        console.log(responsePostTask.data)
        return res.status(201).json(new_docSaved)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error.message
        })
    }
})

//Endpoint to add collaborators project
router.patch('/addCollaborators/:project_id',VerifyJWT, async (req,res) => {
    try {
        const {project_id} = req.params
        let projecttoUpdate = await projectModel.findOne({_id : project_id})
        let user_id = req.body.user_id
        
        if(!projecttoUpdate){
            return res.status(404).json({
                message: "project tidak ditemukan"
            })
        }
        await projecttoUpdate.collaborators.push(...user_id)
        
        user_id.map(async id => {
            let user = await userModel.findOne({_id : id})
            await user.project.push(project_id)
            user.save()
        })

        const updatedProject = await projecttoUpdate.save();
        return res.status(201).json(updatedProject)

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: `Error while updating Data => ${error.message}`
        })
    }
})







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

module.exports = router
