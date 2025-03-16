
const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes/router');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', router); // Use t
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });