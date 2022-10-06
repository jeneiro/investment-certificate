const router  = require('express').Router();
const investmentController = require('../controllers/investmentController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, investmentController.investment)


module.exports = router