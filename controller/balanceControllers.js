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
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}
module.exports = { getExchange, createExchange };
