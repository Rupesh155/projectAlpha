let express = require('express');
let mongoose = require('mongoose');
const courseSchemaModel = require('../Models/courseSchema.model');
const Course = require('../models/courseModel');
const { protect,adminProtect } = require('../middlewares/authMiddleware'); // Authentication middleware
let router = express.Router();

// Accept
router.post("/approve-course", protect,adminProtect, async (req, res) => {
    let { _id } = req.body;


    const course = await Course.findById({ _id });
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.status = 'Approved';
    course.reason = "Good course !"
    await course.save();

    res.status(200).json({ message: 'Course approved successfully', course });

});


// Course rejected route
router.post("/reject-course", protect,adminProtect, async (req, res) => {

    let { _id } = req.body;
    console.log(_id);


    const course = await courseSchemaModel.findById({ _id });
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.status = 'Rejected';
    course.reason = "Not intrastet !"
    await course.save();

    res.status(200).json({ message: 'Course approved successfully', course });

})



module.exports = router;