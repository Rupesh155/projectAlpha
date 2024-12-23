
const express = require('express');
const Course = require('../models/courseModel');
const User = require('../models/userModel');
const {sendEmail} = require('../utils/sendEmail');
const { protect,adminProtect } = require('../middlewares/authMiddleware'); // Authentication middleware
const router = express.Router();
router.post('/addCourse', async (req, res) => {
  const { title, description, category, price, level, language, videos, resources } = req.body;
  try {
    const course = new Course({
      title,
      description,
      category,
      price,
      level,
      language,
      videos,
      resources
    });

    await course.save();
    
          const users = await User.find().select('email -_id');
          const emailList = users.map((user) => user.email);
          console.log(emailList,"emaoill");
          
    


      const subject = `New Course Added: ${course.title}`;
      const text = `
        Hello,

        A new course titled "${course.title}" has been added to our platform.

        Category: ${course.category}
        Price: $${course.price}
        Level: ${course.level}
        Language: ${course.language}

        Check it out on our website!

        Regards,
        Your Platform Team
      `;


         for (const email of emailList) {
          console.log(subject,text);
          
          await sendEmail(email, subject, text);
        }

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});

router.get('/get-course', async (req, res) => {

  let newCourse = await Course.find();
  res.send(newCourse);
})






module.exports = router;


