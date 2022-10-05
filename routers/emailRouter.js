const router = require('express').Router();
const email = require('../controllers/emailController')

router.post('/:id', email.sendEmail);

module.exports = router