module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    startingBid: DataTypes.INTEGER,
    currentBid: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    auctionEnd: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    imageUrl: DataTypes.TEXT
  });
  return Product;
};
