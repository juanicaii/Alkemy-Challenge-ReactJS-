var express = require("express");
var router = express.Router();
var sessionsController = require("../controller/sessionController");
/* GET home page. */
router.post("/login", sessionsController.login);
router.post("/register", sessionsController.register);
router.get("/isLogin", sessionsController.isLogin);
router.get("/logout", sessionsController.logout);

module.exports = router;
