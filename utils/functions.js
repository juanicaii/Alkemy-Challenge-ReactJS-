const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

function createIfNotExist(model, where, item, returnItem) {
  return model.findOne({ where: where }).then((foundItem) => {
    if (!foundItem) {
      var a = model.create(item);
      return a;
    }

    if (returnItem) {
      return foundItem;
    }
    return null;
  });
}
function createData(model, item) {
  return model.create(item).then((createdItem) => {
    return createdItem;
  });
}
function getAllData(model, where, attributes, include) {
  return model
    .findAll({
      where: where,
      attributes,
      raw: true,
      distinct: true,
      include,
    })
    .then((foundItem) => {
      if (foundItem) {
        return foundItem;
      }
      return null;
    });
}
function getOneData(model, where, include) {
  return model
    .findOne({ where: where, include, raw: true })
    .then((foundItem) => {
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
  // Unused pagination system
  //var pagination = getPagination(page, size);
  return model
    .findAndCountAll({
      where: where,
      //limit: pagination.limit,
      //offset: pagination.offset,
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
