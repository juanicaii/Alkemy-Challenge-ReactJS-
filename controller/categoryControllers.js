const db = require("../db/config");
const functions = require("../utils/functions");
const messages = require("../utils/messages");

async function getCategories(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      var categoryId = await functions.getAllData(db.moneyBalance, {
        user_id: userId,
      });

      var categories = await Promise.all(
        categoryId.map(async (cate) => {
          const category = await functions.getOneData(db.operationCategory, {
            id: cate.category_id,
          });
          var catea = {};

          catea = { ...category };

          return catea;
        })
      );

      if (categories != null) {
        messages.returnContent(res, "Category List", categories, 200);
      }
    } else {
      const category = await functions.getAllData(db.operationCategory, {});
      if (category != null) {
        messages.returnContent(res, "Category List", category, 200);
      }
    }
  } catch (err) {
    console.log(err);
    messages.returnErrorAdmin(res);
  }
}

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    // I CHECK IF IT EXISTS, IF NOT , I MAKE IT
    const category = await functions.createIfNotExist(
      db.operationCategory,
      { name },
      { name }
    );

    //  IF NOT NULL RETURN CREATED
    if (category != null) {
      messages.returnContent(res, "Category Created", category, 201);
      //   ELSE THE CATEGORY EXIST
    } else {
      messages.returnContent(res, "Category Exist", category, 200);
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    var categoryDeleted = await functions.deleteData(db.operationCategory, {
      id,
    });

    if (categoryDeleted) {
      messages.returnContent(res, "Category Deleted", { delete: true }, 200);
    } else {
      messages.returnContent(
        res,
        "the category does not exist",
        { delete: true },
        404
      );
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}

module.exports = { getCategories, createCategory, deleteCategory };
