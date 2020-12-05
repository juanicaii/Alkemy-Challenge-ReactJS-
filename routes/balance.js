var express = require("express");
var router = express.Router();
var MoneyBalance = require("../models/moneyBalance");
/* GET home page. */
router.get("/", function (req, res, next) {
  MoneyBalance.create({
    concept: "Food",
    amount: 1500,
    type_id: 1,
  });
  res.json({ hola: "hola" });
});

module.exports = router;
