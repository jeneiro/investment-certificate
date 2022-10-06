const router = require("express").Router();
const PDFcontroller = require("../controllers/PDFcontroller")
const authMiddleware = require('../middleware/auth');

router.post("/",authMiddleware, PDFcontroller.createPDF);
router.get("/:id", authMiddleware, PDFcontroller.downloadPDF);
router.get("/view", authMiddleware, PDFcontroller.viewPDF);
module.exports = router;