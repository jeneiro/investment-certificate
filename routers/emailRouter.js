const router = require('express').Router();
const email = require('../controllers/emailController')
const authMiddleware = require('../middleware/auth');

router.post('/:id', authMiddleware, email.sendEmail);

module.exports = router