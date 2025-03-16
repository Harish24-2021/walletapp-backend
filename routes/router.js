const express = require('express');
const router = express.Router();
const addRecord= require('./addRecord'); // Import the addRecordRouter
const fetchUserData= require('./fetchUserData'); // Import the addRecordRouter

router.use(addRecord); // Use the addRecord to handle requests to /addRecord
router.use(fetchUserData);

module.exports = router;