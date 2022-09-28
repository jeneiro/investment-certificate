const router = require("express").Router();
const PDFcontroller = require("../controllers/PDFcontroller")

router.post("/",PDFcontroller.createPDF);
router.get("/view",PDFcontroller.viewPDF);
module.exports = router;