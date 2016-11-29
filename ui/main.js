// JavaScript source code

$(document).ready(function () {

    //check whether the client is logged in or not
    
    $.ajax({
        url: "/login-check",
        type: "GET",
        success: function (data) {
            $("#login_message").css("color", "green");
            $("#login_message").text(`Welcome ${data}`);

            //activate the logout button
            $("#logout_button").css("display", "");
            $("#logout_button").html("<button>LOGOUT</button>");
        }
        
    });

    

    var car1 = $("#car1");
    var car2 = $("#car2");
    car1.animate({ left: '0%' }, 3000);

    car2.animate({ left: '80%' }, 3000);
    
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
            loginMessage.css("color", "red");
            loginMessage.text("One of the entry fields is empty");
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
                    loginMessage.css("color", "green");
                    loginMessage.text(data);

                    //activate the logout button
                    $("#logout_button").css("display", "");
                    $("#logout_button").html("<button>LOGOUT</button>");
                },
                error: function (data) {

                    loginMessage.css("color", "red");

                    if (data.status === 404) 
                        loginMessage.text("There is no user by this name");

                    else if (data.status === 401)
                        loginMessage.text("Incorrect password");

                    else if (data.status === 500)
                        loginMessage.text("Something went wrong on the server Please try again in some time");                    
                }
            });
        }
    });

    $("#logout_button").click(function () {

        var logout = $("#logout_button");
        $.ajax({
            url: "/logout",
            type: "GET",
            
            
            success: function (data) {
                //render the response received and also remove the logout button                    
                logout.css("color", "blue");
                logout.text(data);
                $("#login_message").hide();
                
            },
            error: function (data) {

                logout.css("color", "red");

                logout.text("Something went wrong please try again");
            }
        });
    });
});





