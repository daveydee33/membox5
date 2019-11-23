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

      // create new item record
      const newItem = new Item({
        title,
        description
      });

      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error('Error saving new item');
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/items/:id
// @desc      Update an Item
// @access    Restricted
/* TODO:  I would probably refactor this a lot.  
- The 404 doesn't work.  
- I wouldn't use 'let item' and re-assign it.  I would return a different variable name - so we know it's the new record, and not the original record.  eg.  updatedItem'.  
- Also, I would put the same field validation here as we did in the create new item route.  eg, add verification that name is not empty, and type is only 'personal' or 'professional'
- Brad didn't know what the 'new: true' option actually does.
- Some of Brad's HTTP codes are not exactly correct.
- I don't know if this will work we want to change a value to empty.  
  - eg, If we have name: "Name", and we want to clear it, the PUT contents would have name: "", but it doesn't seem to clear it by setting with empty string.  It looks like it just ignores it.  Might be a #BUG that we need to fix later.
*/
router.put('/:id', requireLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, description } = req.body;

  // Build an Item object
  const itemData = {};
  if (title) itemData.title = title;
  if (description) itemData.description = description;
  itemData.dateModified = Date.now();

  try {
    let item = await Item.findById(req.params.id);
    console.log('Attempting to edit this item: ', item);

    // TODO: Fix this - because it's never being called in the PUT or DELETE -- it goes straight to the catch/500
    if (!item) return res.status(404).json({ msg: 'Item not found' }); // looks like this doesn't get called-- the catch-error is called instead.

    // Make sure logged in user making request (from x-auth-token header) owns item
    if (item.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: 'You dont have authorization to edit this record' });

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemData },
      { new: true } // tells mongoose to return the new/updated version of the record, instead of the previous
    );
    console.log('New updated item: ', item);

    res.json(item);
  } catch (err) {
    console.error('Error updating item: ', err);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/items/:id
// @desc      Delete an Item
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
