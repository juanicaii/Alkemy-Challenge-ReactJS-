const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

function createIfNotExist(model, where, item) {
  return model.findOne({ where: where }).then((foundItem) => {
    if (!foundItem) {
      var a = model.create(item);
      return a;
    }

    return null;
  });
}
function createData(model, item) {
  return model.create(item).then((createdItem) => {
    return createdItem;
  });
}
function getAllData(model, where) {
  return model.findAll({ where: where, raw: true }).then((foundItem) => {
    if (foundItem) {
      return foundItem;
    }
    return null;
  });
}
function getOneData(model, where) {
  return model.findOne({ where: where, raw: true }).then((foundItem) => {
    if (foundItem) {
      return foundItem;
    }
    return null;
  });
}

function deleteData(model, where) {
  return model.destroy({ where: where }).then((deletedItem) => {
    if (deletedItem == 1) {
      return true;
    }
    return false;
  });
}

function checkIfExist(model, where) {
  return model.findOne({ where: where }).then((foundItem) => {
    if (foundItem) {
      return true;
    }

    return false;
  });
}

function getLimitData(model, where, page, size, include) {
  var pagination = getPagination(page, size);
  return model
    .findAndCountAll({
      where: where,
      limit: pagination.limit,
      offset: pagination.offset,
      include: include,
      raw: true,
    })
    .then((foundItem) => {
      if (foundItem) {
        return foundItem;
      }

      return null;
    });
}

function editData(model, data, where) {
  return model.update(data, { where: where }).then((updatedItem) => {
    if (updatedItem != 0) {
      return true;
    }
    return false;
  });
}

function getTotalBalance(model, attributes, where) {
  return model.findAll({ attributes, where }).then((res) => {
    if (res) {
      return res;
    }
    return null;
  });
}
module.exports = {
  createIfNotExist,
  getAllData,
  deleteData,
  getLimitData,
  editData,
  createData,
  checkIfExist,
  getOneData,
  getTotalBalance,
};
