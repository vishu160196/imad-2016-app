$(document).ready(function () {
    // JavaScript source code

    // Find car name for templating --- use a single js file for all car pages
    var carName;
    var title = $("title").text();

    if (title === "CARS | A3")
        carName = "a3";

    else if (title === "CARS | A4")
        carName = "a4";

    else if (title === "CARS | S5")
        carName = "s5";

    else if (title === "CARS | A6")
        carName = "a6";

    else if (title === "CARS | A8 L")
        carName = "a8l";

    else if (title === "CARS | Q3")
        carName = "q3";

    else if (title === "CARS | Q5")
        carName = "q5";

    else if (title === "CARS | Q7")
        carName = "q7";

    else if (title === "CARS | RS 6")
        carName = "rs6";

    else if (title === "CARS | RS 7")
        carName = "rs7";

    else if (title === "CARS | TT")
        carName = "tt";

    else if (title === "CARS | R8")
        carName = "r8";
    console.log(title);

    function requestLikeEndPoint() {
        var request = new XMLHttpRequest;

        function displayLikes() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var likespan = document.getElementById("likespan");
                likespan.innerHTML = request.responseText + " Likes";
            }
        }

        request.onreadystatechange = displayLikes;

        request.open("GET", `/cars/${carName}/like`, true);
        request.send(null);
    }


    function submitComment() {
        var comment = document.getElementById("commentsBox");
        var request = new XMLHttpRequest;

        comment = comment.value;

        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var prev_comments = JSON.parse(request.responseText);

                var comments = document.getElementById("prev_comments");

                var matter = "";
                for (var i = 0; i < prev_comments.length; i++) {
                    matter += "<img src=\"/person.png\" style=\"float:left\"/><div style=\"padding-left:50px\">" + prev_comments[i] + "</div><br/><br/>";
                    comments.innerHTML = matter;
                }

                placeholderReplace();
            }
        }

        request.open("GET", `/cars/${carName}/submit_comment?comment=` + comment, true);
        request.send(null);
    }



    function requestComments() {
        var request = new XMLHttpRequest;

        function displayComments() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var prev_comments = JSON.parse(request.responseText);

                var comments = document.getElementById("prev_comments");

                var matter = "";

                for (var i = 0; i < prev_comments.length; i++) {
                    matter += "<img src=\"/person.png\" style=\"float:left\"/><div style=\"padding-left:50px\">" + prev_comments[i] + "</div><br/><br/>";
                    comments.innerHTML = matter;
                }
            }
        }

        request.onreadystatechange = displayComments;

        request.open("GET", `/cars/${carName}/submit_comment?comment=`, true);
        request.send(null);
    }


    function appearCommentButton() {
        var commentButton = document.getElementById("appearCommentButton");

        commentButton.innerHTML = `<button class="buttonStyle" id="commentButton" onclick="submitComment()">Comment</button>`;
    }

    function placeholderReplace() {
        var placeHolder = document.getElementById("placeholderReplace");
        placeHolder.innerHTML = `<textarea cols="55" id="commentsBox" placeholder="Add a comment..." onclick="appearCommentButton()"></textarea>`;
    }
});