const functions = require("../utils/functions");
const messages = require("../utils/messages");
const db = require("../db/config");

async function getExchange(req, res) {
  try {
    const { page, size, category, type } = req.query;

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

    var exchange = await functions.getLimitData(
      db.moneyBalance,
      {},
      page,
      size,
      include
    );

    if (exchange != null) {
      messages.returnContent(res, "Exchange List", exchange, 200);
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}

async function createExchange(req, res) {
  try {
    const { concept, amount, type, user, category } = req.body;

    var categoryCreated = await functions.createData(db.moneyBalance, {
      concept: concept,
      amount: amount,
      type_id: type,
      user_id: user,
      category_id: category,
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

    var categoryExist = await functions.checkIfExist(db.operationCategory, {
      id: category,
    });
    var typeExist = await functions.checkIfExist(db.exchangeType, { id: type });
    var userExist = await functions.checkIfExist(db.users, { id: user });

    if (categoryExist && typeExist && userExist) {
      var exchangeUpdated = await functions.editData(
        db.moneyBalance,
        {
          concept: concept,
          amount: amount,
          type_id: type,
          user_id: user,
          category_id: category,
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
      if (!categoryExist) {
        errors.category = true;
      }
      if (!userExist) {
        errors.user = true;
      }
      if (!typeExist) {
        errors.type = true;
      }
      messages.returnContent(
        res,
        `The ${errors.category ? "category" : ""}${errors.type ? ",type" : ""}${
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
module.exports = { getExchange, createExchange, editExchange, deleteExchange };
