////////////pseudocode//////////////

//when buttons are clicked, API is called upon to generate gifs

//when user clicks image, the gif animates

//when user click again, animation stops

//need an array for the inital buttons on the page.
topics = ["Arsenic and Old Lace", "Proof", "Seminar", "These Shining Lives", "Epic Proportions", "Fawlty Towers", "She Kills Monsters", "One Flew Over The Cuckoos Nest", "12 Angry Jurors", "Lost In Yonkers", "True West" ];

//need a function to generate buttons 
function renderButtons() {
    //clear div to reset or else repeats are created everytime the function is called upon
    $("#buttons-view").empty();

    //create a for loop to generate buttons in the array
    for (var i = 0; i < topics.length; i++) {

        //generate buttons for each play in the array using jquery.
        var a = $("<button class='btn btn-secondary btn-lg m-1'>");
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
            var gdiv = $("<div>");
            var g = $("<img class='gif' gif-state = 'img'>");
            g.attr("src", playResults[j].images.original_still.url);
            g.attr("img", playResults[j].images.original_still.url);
            g.attr("gif", playResults[j].images.original.url);

            var rate = $("<p>");
            rate.prepend("Rated: "+playResults[j].rating);
            gdiv.prepend(g);
            $("#gif-view").prepend(gdiv, rate);
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

//event listener for when the gifs get clicked
$("#gif-view").on("click", ".gif", function () {
    console.log("User clicked a gif");
    //collecting attributes of the specific gif clicked
    var state = $(this).attr("gif-state")
    var gif = $(this).attr("gif");
    var img = $(this).attr("img");

    //if gif is an image, switch to actual animated gif
    if (state === "img") {
        $(this).attr("src", gif);
        $(this).attr("gif-state", "gif");
    // otherwise, switch from gif to image
    } else if (state === "gif") {
        $(this).attr("src", img);
        $(this).attr("gif-state", "img");
    }

});
renderButtons();