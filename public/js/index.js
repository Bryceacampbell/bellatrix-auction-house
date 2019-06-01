// Get references to page elements
var $productName = $("#product-name");
var $productDescription = $("#product-description");
var $productCategory = $("#product-category");
var $startingPrice = $("#starting-price");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  createProduct: function(product) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/products",
      data: JSON.stringify(product)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var product = {
    name: $productName.val(),
    description: $productDescription.val(),
    category: $productCategory.val(),
    startingBid: $startingPrice.val()
  };

  console.log(product);

  if (
    !(
      product.name &&
      product.description &&
      product.startingBid &&
      product.category
    )
  ) {
    alert("You must enter information for all fields");
    return;
  }

  API.createProduct(product).then(function() {
    // refreshExamples();
    console.log("product created");
  });

  $productName.val("");
  $productDescription.val("");
  $productCategory.val("");
  $startingPrice.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
