$(document).ready(function () {
    var topics = ["Batman", "Superman", "Captain America", "Robin", "Spiderman", "The Hulk", "Wonder Woman", "Iron Man", "Thor"];

    function createBtns() {
        $("#btns").empty();

        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");

            gifButton.attr("ID", "gifArrayBtns");
            gifButton.attr("class", "btn btn-primary btn-space")
            gifButton.attr("data-button", topics[i]);
            gifButton.text(topics[i]);

            $("#btns").append(gifButton);
        }
    }

    createBtns();

    $("#add-keyword").click(function () {
        var keywordPush = $("#keyword-term").val();
        topics.push(keywordPush)
        createBtns();
    })

    $(document).on("click", "#gifArrayBtns", function () {
        var searchQuery = $(this).attr("data-button");
        var apiKEY = "api_key=0hG8MRmYR9lPS2VVyhHFQza79r0aGbVB";
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + apiKEY + "&q=" + searchQuery + "&limit=10";

        $("#gif-body").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var gifArray = response.data;

            console.log(gifArray)

            for (var i = 0; i < gifArray.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.attr("class", "card h-200 btn-space")
                var gifDivBody = $("<div>")
                gifDivBody.attr("class", "card-body")
                var gifRating = gifArray[i].rating;
                var rating = $("<h5>").text("Rating: " + gifRating.toUpperCase());
                rating.attr("class", "card-title")
                var gifAnimate = gifArray[i].images.fixed_height.url
                var gifStill = gifArray[i].images.fixed_height_still.url
                var gifImage = $("<img>");

                gifImage.attr("src", gifStill);
                gifImage.attr("data-still", gifStill)
                gifImage.attr("data-animate", gifAnimate)
                gifImage.attr("data-state", "still")
                gifImage.attr("class", "card-img-top gif")

                gifDiv.append(gifImage)
                gifDiv.append(gifDivBody)
                gifDivBody.append(rating);

                $("#gif-body").append(gifDiv);
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