var topics=['Dallas Cowboys', 'New York Giants', 'Philadelphia Eagles', 'Washington Redskins'];

// Performs API call and populates the screen with 10 gifs
    function callTheGifs(){
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "b10d1f55538648ad8708d3e811c5f7fa"
        });
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(result) {
          console.log(result);
        }).fail(function(err) {
          throw err;
        });
    }

// Changes the GIF from 'still' to 'active' and back upon click
    function playTheGifs(){
        var pauseOrPlay = $(this).attr("data-current");                     // Grab value of data-current (still or active)
        if (pauseOrPlay === "still") {                                      // If the gif is still...
            var activeURL = $(this).attr("data-activeURL");                     // Activate it
            $(this).attr("src", activeURL);
            $(this).attr("data-current", "active");                             // Change data-current to 'active'
        } else if (pauseOrPlay === "active"){                              // If the gif is active...
            var stillURL = $(this).attr("data-stillURL");                       // Stop it
            $(this).attr("src", stillURL);
            $(this).attr("data-current", "still");                              // Change data-current to 'still'
        }
    }

// Adds new button to the screen from the user input
    $("#add-new-item").on("click", function(e) {
        e.preventDefault();                                                 // Stops the form submit from refreshing the page
        var userInput = $("#new-input").val().trim();                       // Captures user input
        $("#new-input").val("");                                            // Clears the input field
        topics.push(userInput);                                             // Adds user input to topics[]
        renderButtons();                                                    // Generates the button
    });

// Creates the buttons using the topics array
    function renderButtons() {
        $("#buttonsHere").empty();                                          // Clear old buttons
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='topicBtns btn btn-lg btn-default'>"); // Create button with bootstrap classes
            a.attr("name", topics[i]);                                      // Gives the button a name for the API call
            a.text(topics[i]);                                              // Gives the button visible text for the user
            $("#buttonsHere").append(a);                                    // Adds the button to the buttons div
        }
    }

$(document).on("click", ".topicBtns", callTheGifs);                         // Click a .topicBtns class item, run callTheGifs()
$(document).on("click", ".gifsPulled", playTheGifs);                        // Click a .gifsPulled class item, run callTheGifs()
renderButtons();                                                            // Generates buttons on load