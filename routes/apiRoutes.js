// var db = require("../models");

module.exports = function(app) {
  // Get all Products
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // Create a new Product
  app.post("/api/products", function(req, res) {
    db.Product.create(req.body).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // Delete an Product by id
  app.delete("/api/products/:id", function(req, res) {
    db.Product.destroy({ where: { id: req.params.id } }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
};
