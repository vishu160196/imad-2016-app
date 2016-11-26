// JavaScript source code

$(document).ready(function () {
    var car1 = $("#car1");
    var car2 = $("#car2");
    car1.animate({ left: '0%' }, 1000);

    car2.animate({ left: '80%' }, 1000);
    
    $("#signup_button").click(function () {

        var userName = $("#select_username");
        var userPassword = $("#select_password");
        var signupMessage = $("#signup_message");
        
        //check whether there is content in input fields
        if(userName.val()==='' || userPassword.val()==='')
        {
            signupMessage.css("color", "red");
            signupMessage.text("One of the entry fields is empty");
        }

        else {

            //make the JSON request object
            var request = {
                userName: userName.val(),
                userPassword: userPassword.val()
            };

            //make post request to /create-user endpoint
            $.ajax({
                url: "/create-user",
                type: "POST",
                data: JSON.stringify(request),
                contentType: "application/json",
                success: function (data) {
                    //render the response received and also remove the field entries
                    signupMessage.css("color", "green");
                    signupMessage.text(data);
                    userName.val('');
                    userPassword: userPassword.val('');
                },
                error: function (data) {
                    signupMessage.css("color", "red");
                    signupMessage.text("Sorry this username is taken please try another one");
                    userName.val('');
                    userPassword: userPassword.val('');
                }
            });
        }
    });

    $("#login_button").click(function () {
        var userName = $("#username");
        var userPassword = $("#password");
        var loginMessage = $("#login_message");

        //check whether there is content in input fields
        if (userName.val() === '' || userPassword.val() === '') {
            signupMessage.css("color", "red");
            signupMessage.text("One of the entry fields is empty");
        }

        else {
            var request = {
                userName: userName.val(),
                userPassword: userPassword.val()
            };

            $.ajax({
                url: "/login",
                type: "POST",
                data: JSON.stringify(request),
                contentType: "application/json",
                success: function (data) {
                    //render the response received and also remove the field entries                    
                    userName.val('');
                    userPassword: userPassword.val('');
                    console.log(data);
                },
                error: function (data) {

                    signupMessage.css("color", "red");

                    if (data.status === 404) 
                        signupMessage.text("There is no user by this name");

                    else if (data.status === 401)
                        signupMessage.text("Incorrect password");

                    else if (data.status === 500)
                        signupMessage.text("Something went wrong on the server Please try again in some time");                    
                }
            });
        }
    });
});





