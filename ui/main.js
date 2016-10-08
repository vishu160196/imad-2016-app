var requestObject = new XMLHttpRequest;

//this function handles the response received by the server on 
requestObject.onreadystatechange = function()
{
    //check for the state of response
    //If the state has the value of XMLHttpRequest.DONE (evaluating to 4)
        //process the response
    if (requestObject.readyState === XMLHttpRequest.DONE)
    {
        // everything is good, the response is received
        // check the status code of response. a code of 200 means response received is good
        if (requestObject.status === 200)
        {
            
        }
    } 
}

requestObject.open("GET", "http://localhost:8080/ui/Koala.jpg", true);
requestObject.send(null);

