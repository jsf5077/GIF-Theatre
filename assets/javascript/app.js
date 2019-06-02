////////////pseudocode//////////////

//when buttons are clicked, API is called upon to generate gifs

//when user clicks image, the gif animates

//when user click again, animation stops

//need an array for the inital buttons on the page.
topics = ["arsenic and old lace", "proof", "seminar", "these shining lives", "epic proportions", "fawlty towers", "she kills monsters", "one flew over the cuckoos nest", "12 angry jurors", "lost in yonkers", "true west" ];

//need a function to generate buttons 
function renderButtons() {
    //clear div to reset or else repeats are created everytime the function is called upon
    $("#buttons-view").empty();

    //create a for loop to generate buttons in the array
    for (var i = 0; i < topics.length; i++) {

        //generate buttons for each play in the array using jquery.
        var a = $("<button>");
        // Add a class
        a.addClass("playButton");
        // Add a data-attribute with a value of the play at index i
        a.attr("data-name", topics[i]);
        // Create the button's text with a value of the play at index i
        a.text(topics[i]);
        // Add the button to the HTML
        $("#buttons-view").append(a);
    }
}
function displayGIF() {
    $("#gif-view").empty();
    var play = $(this).attr("data-name");
    console.log(play);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WaAIxnVpQ5UQ7Cn4V85lxhGj63yI9yEg&q="+play+"&limit=10&offset=0&lang=en"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var playResults = response.data;
      
        console.log(playResults);

        for (var j = 0; j < playResults.length; j++) {
            var gdiv = $("<div class='gif'>");
            var g = $("<img>");
            g.attr("src", playResults[j].images.original_still.url);
            g.attr("rating", playResults[j].rating);
            console.log("rating "+playResults[j].rating);
            gdiv.prepend(g);
            $("#gif-view").prepend(gdiv);
        };
    });
}

//when user submits a new button, generate new button and add to the array
  $("#add-play").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // Grab the text from the input box
    var play = $("#play-input").val().trim();
    // The text from the textbox is then added to our array
    topics.push(play);

    // reset the buttons on the page
    renderButtons();
  });
//add event listeners to dynamically generated elements
$(document).on("click", ".playButton", displayGIF);

renderButtons();
