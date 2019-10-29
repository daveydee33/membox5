const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000; // process.env.PORT value will be set by Heroku.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
