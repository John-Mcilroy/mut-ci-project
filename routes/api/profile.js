const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/user-models/Profile');
const User = require('../../models/user-models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get(
  '/me', 
  auth, 
  async (req, res) => {
    try {
      const profile = await Profile
        .findOne({ user: req.user.id })
        .populate('user', ['name']);

      if(!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }

      res.json(profile);

    } catch(err) {
      console
        .error(err.msg);
      res
        .status(500)
        .send('Server Error');
    }
  });

module.exports = router;
