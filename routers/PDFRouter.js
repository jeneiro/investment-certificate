const router = require("express").Router();
const PDFcontroller = require("../controllers/PDFcontroller")

router.post("/",PDFcontroller.createPDF);
router.get("/:id",PDFcontroller.downloadPDF);
router.get("/view",PDFcontroller.viewPDF);
module.exports = router;