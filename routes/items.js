const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Item = require('../models/Item');
const requireLogin = require('../middleware/requireLogin');

// @route     GET api/items
// @desc      Get all records - for ALL users
// @access    Restricted
router.get('/', requireLogin, async (req, res) => {
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
// @access    Restricted
router.post(
  '/',
  [
    requireLogin,
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

// @route     DELETE api/contacts/:id
// @desc      Delete a contact
// @access    Restricted
router.delete('/:id', requireLogin, async (req, res) => {
  console.log('Attempt to delete item:', req.params.id);
  try {
    // TODO: Make sure requesting user owns the record
    // ...

    // Attempt the delete, or return if not found
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    // There seems to be an issue here that the above error only gets called if the provided id `req.params.id` is a valid "ObjectId".  If it's something like 'zzzzzz' or not correct format, it will just skip down here and get picked up in the catch statement below

    res.json({ msg: 'Item deleted', item }); // Do we want to include the full item in the response?
    console.log('Item deleted', item);
  } catch (err) {
    console.log('Error trying to delete: ', req.params.id);
    console.error(err.message);
    res.status(500).send(`Server error - trying to delete: ${req.params.id}`);
  }
});

module.exports = router;
