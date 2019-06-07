// Get references to page elements
var $productName = $("#product-name");
var $productDescription = $("#product-description");
var $productCategory = $("#product-category");
var $startingPrice = $("#starting-price");
var $submitBtn = $("#submit");
var $isActive = true;
var $imageLink;
var $submitBid = $("#submit-bid");
var $currentBid = $("#new-bid");

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
  getProducts: function(category) {
    return $.ajax({
      url: "api/products/" + category,
      type: "GET"
    });
  },
  bidOnProduct: function(id) {
    return $.ajax({
      url: "api/products/" + id,
      type: "PUT"
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
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var product = {
    name: $productName.val(),
    description: $productDescription.val(),
    category: $productCategory.val(),
    startingBid: $startingPrice.val(),
    currentBid: $startingPrice.val(),
    imageUrl: $imageLink,
    active: $isActive,
    auctionEnd: moment()
      .add(7, "days")
      .format("MMM D, YYYY")
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
  location.reload();
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Upload image
$(function() {
  $("#fileupload").fileupload({
    url: "https://vgy.me/upload",
    dataType: "json",
    done: function(err, data) {
      // single-file upload
      if (typeof data.result.url !== "undefined") {
        // replaces upload input when image has been uploaded
        $("<p/>")
          .text("Image uploaded")
          .replaceAll("#fileupload");
        $imageLink = data.result.image;
      } else {
        throw err;
      }
    }
  });
});

// Bid on product
var bidOnProduct = function() {
  if ($currentBid > this.id.currentBid) {
    $("<div/>")
      .text("Highest Bid: $" + $currentBid)
      .replaceAll(".currentBid");
  } else {
    alert("Your bid is not high enough. Please enter a new bid.");
    return;
  }
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$submitBid.on("click", bidOnProduct);
