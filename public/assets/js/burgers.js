// wait to attach handlers until the DOM loads
$(function() {
  $(".devourIt").on("click", function(event) {
    var id = $(this).data("id");
    var newDevourIt = $(this).data("newdevourIt");

    var newDevourState = {
      devoured: newDevourIt
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed to devour", newDevourIt);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


$(".devoured-burger").on("click", function(event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/burgers/" + id, {
    type: "DELETE"
  }).then(
    function() {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});
});