 let express=  require('express')
 let User=   require('../models/userModel')
 let router=   express.Router()
 const crypto = require('crypto');
let {sendEmail} = require('../utils/sendEmail')
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

  
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; 
    await user.save();


    const resetUrl = `${req.protocol}://${req.get('host')}/api/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      'Password Reset Request',
      `Click the link below to reset your password:\n\n${resetUrl}`
    );

    res.status(200).send('Password reset email sent');
  } catch (error) {
    res.status(500).send('Error sending password reset email: ' + error.message);
  }
});



module.exports=router