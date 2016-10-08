function requestLikeEndPoint()
{
    var request = new XMLHttpRequest;

    function displayLikes()
    {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            var likespan = document.getElementById("likespan");
            likespan.innerHTML = request.responseText + " Likes";
        }
    }

    request.onreadystatechange = displayLikes;

    request.open("GET", "/like", true);
    request.send(null);
}

function submitComment()
{
    var button = document.getElementById("commentButton");
    
}