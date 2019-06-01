module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    startingBid: DataTypes.INTEGER,
    currentBid: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  });
  return Product;
};
