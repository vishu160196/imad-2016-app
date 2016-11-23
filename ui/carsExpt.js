$(document).ready(function () {
    
    $("#submitButton").css("display", "none");

    // Find car name for templating --- use a single js file for all car pages
    var carName;
    var url = $(location).attr('href');

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/a3' || url === 'http://vishu160196.imad.hasura-app.io/cars/a3/')
        carName = "a3";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/a4' || url === 'http://vishu160196.imad.hasura-app.io/cars/a4/')
        carName = "a4";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/s5' || url === 'http://vishu160196.imad.hasura-app.io/cars/s5/')
        carName = "s5";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/a6' || url === 'http://vishu160196.imad.hasura-app.io/cars/a6/')
        carName = "a6";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/a8l' || url === 'http://vishu160196.imad.hasura-app.io/cars/a8l/')
        carName = "a8l";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/q3' || url === 'http://vishu160196.imad.hasura-app.io/cars/q3/')
        carName = "q3";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/q5' || url === 'http://vishu160196.imad.hasura-app.io/cars/q5/')
        carName = "q5";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/q7' || url === 'http://vishu160196.imad.hasura-app.io/cars/q7/')
        carName = "q7";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/rs6' || url === 'http://vishu160196.imad.hasura-app.io/cars/rs6/')
        carName = "rs6";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/rs7' || url === 'http://vishu160196.imad.hasura-app.io/cars/rs7/')
        carName = "rs7";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/tt' || url === 'http://vishu160196.imad.hasura-app.io/cars/tt/')
        carName = "tt";

    if (url === 'http://vishu160196.imad.hasura-app.io/cars/r8' || url === 'http://vishu160196.imad.hasura-app.io/cars/r8/')
        carName = "r8";


    $("#likeButton").click(function requestLikeEndPoint() {
        var request = new XMLHttpRequest;
        
        function displayLikes() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var likespan = document.getElementById("likespan");
                likespan.innerHTML = request.responseText + " Likes";
            }
        }

        request.onreadystatechange = displayLikes;
        request.open("GET", `/cars/like/${carName}`, true);
        request.send(null);
    });

    $(document).ready(function requestFeedbacks() {
        var request = new XMLHttpRequest;

        function displayFeedbacks() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var prevFeedbacks = JSON.parse(request.responseText);

                var feedbacks = document.getElementById("prevFeedbacks");

                var matter = "";

                for (var i = 0; i < prevFeedbacks.length; i++) {
                    matter += "<img src=\"/person.png\" style=\"float:left\"/><div style=\"padding-left:50px\">" + prevFeedbacks[i] + "</div><br/><br/>";
                    feedbacks.innerHTML = matter;
                }
            }
        }

        request.onreadystatechange = displayFeedbacks;

        request.open("GET", `/cars/${carName}/submit_feedback?feedback=`, true);
        request.send(null);
    });

    $("#submitButton").click(function () {

        var feedback = document.getElementById("feedback").value;
        var request = new XMLHttpRequest;
        $("#prevFeedbacks").prepend("<img src=\"/person.png\" style=\"float:left\"/><div style=\"padding-left:50px\">" + feedback + "</div><br/><br/>");

        request.open("GET", `/cars/${carName}/submit_feedback?feedback=` + feedback, true);
        request.send(null);
        $("#feedback").val("");
        $("#submitButton").css("display", "none");
    });

    $("#feedback").click(function appearCommentButton() {
        $("#submitButton").css("display", "");
    });
});