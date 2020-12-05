var express = require("express");
const { routes } = require("../app");
var router = express.Router();
var categoryController = require("../controller/categoryControllers");

router.get("/", categoryController.getCategories);
router.post("/create", categoryController.createCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
