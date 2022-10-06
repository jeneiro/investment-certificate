const router = require('express').Router();
const signatureController = require('../controllers/signatureController');
const authMiddleware = require('../middleware/auth');

router.get('/1', authMiddleware, signatureController.getSignature)
router.get('/2', authMiddleware, signatureController.getSignature2)
router.post('/1', authMiddleware, signatureController.updateSignature)
router.post('/2', authMiddleware, signatureController.updateSignature2)




module.exports = router