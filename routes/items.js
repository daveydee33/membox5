const express = require('express');
const router = express.Router();

// @route     GET api/items
// @desc      Get all items
// @access
router.get('/', async (req, res) => {
  res.send('got there!'); // TEMP
});

module.exports = router;
