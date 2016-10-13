// JavaScript source code
function requestLikeEndPoint() {
    var request = new XMLHttpRequest;

    function displayLikes() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var likespan = document.getElementById("likespan");
            likespan.innerHTML = request.responseText + " Likes";
        }
    }

    request.onreadystatechange = displayLikes;

    request.open("GET", "/foo/like", true);
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

    request.open("GET", "/foo/submit_comment?comment=" + comment, true);
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

    request.open("GET", "/foo/submit_comment?comment=", true);
    request.send(null);
}