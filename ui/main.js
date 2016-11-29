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
            $("#logout_button").show();
            $("#logout_button").html("<button>LOGOUT</button>");
        }
        
    });

    

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
                    userPassword.val('');
                    
                    signupMessage.show();
                    
                },
                error: function (data) {
                    signupMessage.css("color", "red");
                    signupMessage.text("Sorry this username is taken please try another one");
                    userName.val('');
                    userPassword.val('');
                    signupMessage.show();
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
                    userPassword.val('');
                    loginMessage.css("color", "green");
                    loginMessage.text(data);
                    loginMessage.show();
                    
                    //activate the logout button
                    $("#logout_button").show();
                    $("#logout_button").html("<button>LOGOUT</button>");
                },
                error: function (error) {

                    loginMessage.css("color", "red");
                    
                    if (error.status === 404) 
                        loginMessage.text("There is no user by this name");

                    else if (error.status === 401)
                        loginMessage.text("Incorrect password");

                    else if (error.status === 500)
                        loginMessage.text("Something went wrong on the server Please try again in some time");

                    else if (error.status === 403)
                        loginMessage.text(error.responseText);
                    
                    loginMessage.show();                    
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
                $("#signup_message").hide();
                logout.show();         
            },

            error: function (data) {
                logout.css("color", "red");
                logout.text("Something went wrong please try again");
                logout.show();
            }
        });
    });
});
