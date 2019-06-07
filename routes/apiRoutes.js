var db = require("../models");

module.exports = function(app) {
  // Get all Products
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // Create a new Product
  app.post("/api/products", function(req, res) {
    console.log(req.body);
    db.Product.create(req.body).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get a Product by Category
  app.get("/api/products/:category", function(req, res) {
    db.Product.findAll({ where: { category: req.params.category } }).then(
      function(dbProducts) {
        res.json(dbProducts);
      }
    );
  });
};
