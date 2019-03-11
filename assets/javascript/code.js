$(document).ready(function () {
    var topics = ["legos", "batman"];


    function createBtns() {
        $(".container").empty();

        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");

            gifButton.attr("ID", "gifArrayBtns");
            gifButton.attr("data-button", topics[i]);
            gifButton.text(topics[i]);

            $(".container").append(gifButton);
        }
    }
    createBtns();
    
    $("#add-keyword").click(function(){
        var keywordPush = $("#keyword-term").val();
        topics.push(keywordPush)
        createBtns();
    })

    $(document).on("click", "#gifArrayBtns",function () {

        var searchQuery = $(this).attr("data-button");
        var apiKEY = "api_key=0hG8MRmYR9lPS2VVyhHFQza79r0aGbVB";
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + apiKEY + "&q=" + searchQuery + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var gifArray = response.data;

            console.log(gifArray)

            for (var i = 0; i < gifArray.length; i++) {
                var gifDiv = $("<div>");
                var gifRating = gifArray[i].rating;
                var rating = $("<p>").text(gifRating);
                var gifAnimate = gifArray[i].images.fixed_height.url
                var gifStill = gifArray[i].images.fixed_height_still.url
                var gifImage = $("<img>");

                gifImage.attr("src", gifStill);
                gifImage.attr("data-still", gifStill)
                gifImage.attr("data-animate", gifAnimate)
                gifImage.attr("data-state", "still")
                gifImage.attr("class", "gif")

                gifDiv.append(gifImage);
                gifDiv.append(rating);

                $(".card").prepend(gifDiv);
            }
        });
    })

    $(document).on("click", "img.gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })

});