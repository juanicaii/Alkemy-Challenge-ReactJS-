var express = require("express");
var router = express.Router();
var balanceController = require("../controller/balanceControllers");

router.get("/balance", balanceController.getExchange);
router.post("/moneyExchange/create", balanceController.createExchange);
router.put("/moneyExchange/edit/:id", balanceController.editExchange);
router.delete("/moneyExchange/delete/:id", balanceController.deleteExchange);

module.exports = router;
