const router = require('express').Router();
const signatureController = require('../controllers/signatureController');

router.get('/1', signatureController.getSignature)
router.get('/2', signatureController.getSignature2)
router.post('/1', signatureController.updateSignature)
router.post('/2', signatureController.updateSignature2)




module.exports = router