const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/user-models/User');

// @route   GET api/auth
// @desc    Find a single user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User
      .findById(req.user.id)
      .select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res
      .status(500)
      .send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate and log user in
// @access  Public
router.post(
  '/', 
  [ 
    // Validate Name
    check('name', 'Name is required')
      .not()
      .isEmpty(),

    // Validate Password
    check('password', 'Password is required')
      .exists(),
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
      let user = await User.findOne({ name });
      
        if(!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return res
              .status(400)
              .json({ errors: [{ msg: 'Invalid credentials' }] });        
        }
      
        // Return JSON Web Token
      const payload = {
        user: {
          id: user.id
        }
      }      

      jwt.sign(
        payload, 
        (process.env.JWT_KEY || require('../../config/keys').JWT_KEY),
        { expiresIn: 7200 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
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
