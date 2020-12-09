const functions = require("../utils/functions");
const messages = require("../utils/messages");
const db = require("../db/config");

async function getExchange(req, res) {
  try {
    const { page, size, category, type, userId } = req.query;

    const include = [
      {
        model: db.exchangeType,
        as: "type",
        where: type ? { id: parseInt(type) } : {}, // specifies how we want to be able to access our joined rows on the returned data
      },
      {
        model: db.operationCategory,
        as: "category",
        where: category ? { id: parseInt(category) } : {}, // specifies how we want to be able to access our joined rows on the returned data
      },
    ];

    var where = userId ? { user_id: userId } : {};
    var exchange = await functions.getLimitData(
      db.moneyBalance,
      where,
      page,
      size,
      include
    );

    if (exchange != null) {
      var categories = await functions.getAllData(
        db.moneyBalance,
        userId ? { user_id: userId } : {},
        [
          [
            db.sequelize.fn("DISTINCT", db.sequelize.col("category_id")),
            "category_id",
          ],
        ],
        {
          model: db.operationCategory,
          as: "category",
        }
      );

      messages.returnContent(
        res,
        "Exchange List",
        { exchange, categories },
        200
      );
    }
  } catch (err) {
    console.log(err);
    messages.returnErrorAdmin(res);
  }
}

async function getOneExchange(req, res) {
  try {
    const { id } = req.params;
    const include = [
      {
        model: db.exchangeType,
        as: "type",
        // specifies how we want to be able to access our joined rows on the returned data
      },
      {
        model: db.operationCategory,
        as: "category",
      },
    ];
    var exchange = await functions.getOneData(
      db.moneyBalance,
      { id: id },
      include
    );

    if (exchange != null) {
      messages.returnContent(res, "Exchange:", exchange, 200);
    } else {
      messages.returnContent(res, "The exchange doesnt exist", null, 404);
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}
async function getTotalType(req, res) {
  try {
    const { type_id } = req.params;
    const { userId } = req.query;
    var attributes = [
      [
        db.sequelize.fn("SUM", db.sequelize.col("amount")),
        `${type_id == 1 ? "TotalIncome" : "TotalOutflow"}`,
      ],
    ];
    var where = { type_id: type_id };
    if (userId) {
      where = { type_id: type_id, user_id: userId };
    }
    var totalType = await functions.getTotalBalance(
      db.moneyBalance,
      attributes,
      where
    );

    if (totalType != null) {
      messages.returnContent(
        res,
        `${type_id == 1 ? "Total Money Income" : "Total Money Outflow"}`,
        { total: totalType },
        200
      );
    }
  } catch (err) {
    console.log(err);
    messages.returnErrorAdmin(res);
  }
}

async function createExchange(req, res) {
  try {
    const { concept, amount, type, user, category } = req.body;

    const categoryId = await functions.createIfNotExist(
      db.operationCategory,
      { name: category },
      { name: category },
      true
    );

    var categoryCreated = await functions.createData(db.moneyBalance, {
      concept: concept,
      amount: amount,
      type_id: type,
      user_id: user,
      category_id: categoryId.id,
    });

    if (categoryCreated) {
      messages.returnContent(res, "Exchange created", categoryCreated, 201);
    }
  } catch (err) {
    console.log(err);
  }
}

async function editExchange(req, res) {
  try {
    const { concept, amount, type, user, category } = req.body;

    const { id } = req.params;

    const categoryId = await functions.createIfNotExist(
      db.operationCategory,
      { name: category },
      { name: category },
      true
    );
    var typeExist = await functions.checkIfExist(db.exchangeType, { id: type });
    var userExist = await functions.checkIfExist(db.users, { id: user });

    if (typeExist && userExist) {
      var exchangeUpdated = await functions.editData(
        db.moneyBalance,
        {
          concept: concept,
          amount: amount,
          type_id: type,
          user_id: user,
          category_id: categoryId.id,
        },
        { id: id }
      );

      if (exchangeUpdated) {
        messages.returnContent(res, "Exchange Updated", { update: true }, 200);
      } else {
        messages.returnContent(
          res,
          "The exchange doesnt exist",
          { update: false },
          404
        );
      }
    } else {
      var errors = {};

      if (!userExist) {
        errors.user = true;
      }
      if (!typeExist) {
        errors.type = true;
      }
      messages.returnContent(
        res,
        `The${errors.type ? ",type" : ""}${
          errors.user ? ",user" : ""
        } doesnt exist`,
        { update: false },
        404
      );
    }
  } catch (err) {
    console.log(err);
    messages.returnErrorAdmin(res);
  }
}

async function deleteExchange(req, res) {
  try {
    const { id } = req.params;

    var exchangeDeleted = await functions.deleteData(db.moneyBalance, {
      id: id,
    });
    if (exchangeDeleted) {
      messages.returnContent(res, "Exchange Deleted", { delete: true }, 200);
    } else {
      messages.returnContent(
        res,
        "The exchange doesnt exist",
        { delete: false },
        404
      );
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}
module.exports = {
  getExchange,
  createExchange,
  editExchange,
  deleteExchange,

  getTotalType,
  getOneExchange,
};
