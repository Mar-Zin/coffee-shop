const CatalogItem = require("../models/CatalogItem");
const catalogMock = require("../mock/catalog.json");

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}

module.exports = async () => {
  const catalog = await CatalogItem.find();

  if (catalog.length !== catalogMock.length) {
    await createInitialEntity(CatalogItem, catalogMock);
  }
};
