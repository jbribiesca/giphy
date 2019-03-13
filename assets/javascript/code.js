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

    function renderFavs(favs){
        $("#gif-favorites").empty();

        for (var i = 0; i < favs.length; i++) {
            var favsImg = $("<img>")
            favsImg.attr("src", favs[i]);
            favsImg.attr("style", "width: 150px; height: 150px")
            favsImg.addClass("btn-space")

            $("#gif-favorites").append(favsImg)
        }
    }

    $("#add-keyword").click(function () {
        var keywordPush = $("#keyword-term").val();
        topics.push(keywordPush);
        createBtns();
        $("#keyword-term").val("");
    })

    $(document).on("click", "#gifArrayBtns", function () {
        var searchQuery = $(this).attr("data-button");
        var apiKEY = "api_key=0hG8MRmYR9lPS2VVyhHFQza79r0aGbVB";
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + apiKEY + "&q=" + searchQuery + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var gifArray = response.data;

            for (var i = 0; i < gifArray.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("card btn-space")
                gifDiv.attr("style", "width: 20em")
                var gifDivBody = $("<div>")
                gifDivBody.addClass("card-body")

                var gifRating = gifArray[i].rating;
                var gifTitle = gifArray[i].title;
                var gifTitleShort = gifTitle.slice(0, 15);

                var title = $("<strong>").text(gifTitleShort.toUpperCase() + "...");
                title.attr("class", "card-title")
                var rating = $("<p>").text("Rating: " + gifRating.toUpperCase());
                rating.attr("class", "card-body")

                var originalDownload = gifArray[i].images.original.url;
                var downloadBtn = $("<a>").text("Download");
                downloadBtn.attr("href", originalDownload);
                downloadBtn.attr("download", "giphy.gif");
                downloadBtn.addClass("btn btn-primary btn-space");
            
                var gifAnimate = gifArray[i].images.fixed_height.url
                var gifStill = gifArray[i].images.fixed_height_still.url
                var gifImage = $("<img>");
                gifImage.attr("src", gifStill);
                gifImage.attr("data-still", gifStill)
                gifImage.attr("data-animate", gifAnimate)
                gifImage.attr("data-state", "still")
                gifImage.addClass("card-img-top gif")

                var heartSpan = $("<i>");
                heartSpan.addClass("fa fa-heart");
                heartSpan.attr("aria-hidden", "true")
                heartSpan.attr("span-image", gifAnimate)

                gifDiv.append(gifImage);
                gifDiv.append(gifDivBody);
                gifDivBody.append(title);
                gifDivBody.append(rating);
                gifDivBody.append(downloadBtn);
                gifDivBody.append(heartSpan)

                $("#gif-body").prepend(gifDiv);

            }
        });
    })

    $(document).on("click", ".fa", function(){
        var favImg = $(this).attr("span-image");
        favs.push(favImg);
        renderFavs(favs);
        localStorage.setItem("favs-array", JSON.stringify(favs));
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

    var favs = JSON.parse(localStorage.getItem("favs-array"));
    if (!Array.isArray(favs)) {
        favs = [];
      }
    
    renderFavs(favs);
    

});