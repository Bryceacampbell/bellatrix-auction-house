var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/products/:category", function(req, res) {
    db.Product.findAll({ where: { category: req.params.category } }).then(
      function(dbProduct) {
        console.log(dbProduct);
        res.render("index", {
          products: dbProduct
        });
      }
    );
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
