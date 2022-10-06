const router = require("express").Router();
const auth = require("../controllers/authController.js")
const authMiddleware = require('../middleware/auth');

router.post("/login",auth.login);
router.post("/register", authMiddleware, auth.register);

module.exports = router;