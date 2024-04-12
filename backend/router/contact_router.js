const express = require('express');
const router = express.Router();
const path = require("path");

const contactForm = require('../controllers/contact_controller');

// Use the upload middleware for single file upload
router.post('/contact', contactForm);

module.exports = router;
