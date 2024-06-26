const express = require('express')
const router = express.Router()
const taskModel = require('../models/taskModel')


// Basic CRUD Endpoints
router.post('/CRUD', async (req,res) => {
    try {
        const input_value = req.body
        const new_document = new taskModel(input_value)
        const new_docSaved = await new_document.save()
        return res.status(201).json(new_docSaved)
    } catch (error) {
        console.error("Error creating data:", error);
        return res.status(500).json({ error: "Server Error!" })
    }
})

router.post('/insertMany', async (req,res) => {
    try {
        const inputArray = req.body;

        // Ensure input is an array
        if (!Array.isArray(inputArray)) {
            return res.status(400).json({ error: "Input must be an array" });
        }

        const savedDocuments = await taskModel.insertMany(inputArray);

        return res.status(201).json(savedDocuments)
    } catch (error) {
        console.error("Error creating data:", error);
        return res.status(500).json({ 
            error: "Server Error!",
            details_error : error
        })
    }
})

router.get('/CRUD', async (req,res) => {
    try {
        const results = await taskModel.find()
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
        const dataToUpdate = await taskModel.findOne({_id: id})
        const newData = req.body

        if(!dataToUpdate){
            return res.status(404).json({
                message: "task tidak ditemukan"
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
        const deletedData = await taskModel.findOneAndDelete({_id: id})

        if(!deletedData || deletedData.length === 0){
            return res.json({
                message: "task tidak ditemukan"
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