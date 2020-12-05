var express = require("express");
var router = express.Router();
var balanceController = require("../controller/balanceControllers");

router.get("/balance", balanceController.getExchange);
router.post("/moneyExchange/create", balanceController.createExchange);
router.put("moneyExchange/edit/:id");
router.delete("moneyExchange/delete/:id");

module.exports = router;
