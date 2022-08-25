const router = require("express").Router();
const PDFcontroller = require("../controllers/PDFcontroller")

router.get("/",PDFcontroller.createPDF);
module.exports = router;