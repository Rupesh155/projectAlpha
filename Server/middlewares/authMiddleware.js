const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    

    try {
      token = req.headers.authorization;
      console.log(token,"token ");
      
      const decoded = jwt.verify(token, 'jdsbfiuwhfiuwhfwuif');
      console.log(decoded,"hehehe");
      
      req.user = await User.findById(decoded.id).select('-password');
      console.log(req.user,'userrr');
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'un...' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const adminProtect = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();

  } 
  else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
};

module.exports = { protect, adminProtect };
