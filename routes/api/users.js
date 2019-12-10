const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/user-models/User');


// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post(
  '/', 
  [ 
    // Validate Name
    check('name', 'Name is required')
      .not()
      .isEmpty(),

    // Validate Password
    // check('password', 'Please enter a password with 6 or more characters')
    //   .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      // See if user currently exists
      let user = await User.findOne({ name });
      
        // If user exists, send error
        if(user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

      // create user
      user = new User({
        name,
        password
      })

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Save user to the Database
      await user.save();
  
      // Return JSON Web Token
      const payload = {
        user: {
          id: user.id
        }
      }      

      jwt.sign(
        payload, 
        (process.env.JWT_KEY || require('../../config/keys').JWT_KEY),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ ...payload, token });
        }
      );

    } catch(err) {
      console
        .error(err.message);
      res
        .status(500)
        .send('server error');
    }

  }
);

module.exports = router;
