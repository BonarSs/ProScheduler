const express = require('express')
const router = express.Router()
const roleMemberModel = require('../models/roleMemberModel')

//Basic CRUD Endpoints
router.post('/CRUD', async (req,res) => {
    try {
        const input_value = req.body
        const new_document = new roleMemberModel(input_value)
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
        const results = await roleMemberModel.find()
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
        const dataToUpdate = await roleMemberModel.findOne({_id: id})
        const newData = req.body

        if(!dataToUpdate){
            return res.status(404).json({
                message: "role tidak ditemukan"
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
        const deletedData = await roleMemberModel.findOneAndDelete({_id: id})

        if(!deletedData || deletedData.length === 0){
            return res.json({
                message: "role tidak ditemukan"
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