const router = require('express').Router();
const TandC = require('../controllers/tandcController')
router.get('/',TandC.getTandC)
router.post('/', TandC.createTandC);
router.post('/update/:id', TandC.updateTandC);


module.exports = router;