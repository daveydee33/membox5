const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Item = require('../models/Item');

// @route     GET api/items
// @desc      Get all records - for ALL users
// @access
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({
      dateCreated: -1
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route     POST api/items
// @desc      Create a record
// @access
router.post(
  '/',
  [
    [
      check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
    ]
  ],
  async (req, res) => {
    // check for errors and return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      // I could check for a duplicate record here - but I don't think we should care

      // create new contact record
      const newItem = new Item({
        title,
        description
      });

      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error('Error saving new contact');
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
