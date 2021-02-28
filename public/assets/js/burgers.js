// wait to attach handlers until the DOM loads
$(function() {
  $(".devourIt").on("click", function(event) {
    var id = $(this).data("id");
    var devourIt = $(this).data("devoutIt");

    var newDevour = {
      newName: devoutIt
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevour
    }).then(
      function() {
        console.log("changed to devour", devourIt);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ca").val().trim(),
      //newName: $("[name=name]").val().trim()
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

})
