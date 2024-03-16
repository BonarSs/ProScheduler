const express = require('express')
const router = express.Router()
const project_taskModel = require('../models/project_taskModel')

router.post('/', async (req,res) => {
    try {
        const input_value = req.body
        const new_document = new project_taskModel(input_value)
        const new_docSaved = await new_document.save()
        return res.status(201).json(new_docSaved)
    } catch (error) {
        console.error("Error creating data:", error);
        return res.status(500).json({ error: "Server Error!" })
    }
})

router.get('/', async (req,res) => {
    try {
        const results = await project_taskModel.find().populate('project_id')
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

module.exports = router