const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator/check');

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
        .error('Error Messaged');
      res
        .status(500)
        .send('Server Error');
    }
  });

  // @route   POST api/profile
  // @desc    Create or update user profile
  // @access  Private
  router.post('/', auth, async (req, res) => {

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create profile
      profile = new Profile(profileFields);
      await profile.save()
      res.json(profile);
      
    } catch(err) {
      console
        .error(err.message);

      res
        .status(500)
        .send('Server Error');
    }
  })

module.exports = router;
