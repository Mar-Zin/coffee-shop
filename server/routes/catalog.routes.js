const express = require("express");
const CatalogItem = require("../models/CatalogItem");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const fs = require("fs/promises");
const path = require("path");

const catalogPath = path.join(__dirname, "../", "mock", "catalog.json");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await CatalogItem.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newItem = await CatalogItem.create({
        ...req.body,
      });

      const catalog = await fs.readFile(catalogPath, { encoding: "utf-8" });
      const parseCatalog = JSON.parse(catalog);
      parseCatalog.push({ ...req.body, _id: Date.now().toString() });
      await fs.writeFile(catalogPath, JSON.stringify(parseCatalog));

      return res.status(201).send(newItem);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  });

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const currentItem = await CatalogItem.findById(id);
    const catalog = await fs.readFile(catalogPath, { encoding: "utf-8" });
    const parseCatalog = JSON.parse(catalog);

    const itemIndex = parseCatalog.findIndex(
      (item) => item.title === currentItem.title
    );
    const updatedItem = await CatalogItem.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    parseCatalog[itemIndex] = {
      title: updatedItem.title,
      price: updatedItem.price,
      method: updatedItem.method,
      processing: updatedItem.processing,
      _id: Date.now().toString(),
    };

    await fs.writeFile(catalogPath, JSON.stringify(parseCatalog));

    res.send(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const removedItem = await CatalogItem.findById(id);

    const catalog = await fs.readFile(catalogPath, { encoding: "utf-8" });
    const parseCatalog = JSON.parse(catalog);

    filterCatalog = parseCatalog.filter(
      (item) => item.title !== removedItem.title
    );
    await fs.writeFile(catalogPath, JSON.stringify(filterCatalog));

    await removedItem.remove();

    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

module.exports = router;
