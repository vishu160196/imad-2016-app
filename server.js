// JavaScript source code
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: crypto.randomBytes(32).toString(),
    cookie: { maxAge: 1000 * 60 * 24 * 60 * 30 }
}));

// create a config to configure both pooling behavior
// and client options
var config = {
    user: 'vishu160196', //env var: PGUSER
    database: 'vishu160196', //env var: PGDATABASE
    password: process.env.DB_PASSWORD, //env var: PGPASSWORD
    host: 'db.imad.hasura-app.io', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pool(config);

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(port, function () {
    console.log(`IMAD course app listening on port ${port}!`);
});


/*---------------------------------------------------------------------------------------------------------------------------------------*/

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/stylesheet.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'stylesheet.css'));
});



/*---------------------------------------------------------------------Scripts------------------------------------------------------------*/

app.get("/ui/carsExpt.js", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "carsExpt.js"));
});

app.get("/ui/main.js", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "main.js"));
});

app.get("/ui/jquery-3.1.1.js", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "jquery-3.1.1.js"));
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/






/*---------------------------------------------------------------------Pages------------------------------------------------------------*/

var car = {
    carName: '',
    title: '',
    heading: '',
    mainImageSrc: '',
    mainContent: '',
    likes: 0    
};

function createTemplate(pageData) {
    var title = pageData.title, pageHeading = pageData.heading, mainImageSrc = pageData.mainImageSrc, mainContent = pageData.mainContent, likes = pageData.likes;

    var htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>
                ${title}
            </title>
            <link type="text/css" rel="stylesheet" href="/stylesheet.css">
            <script src="/ui/jquery-3.1.1.js"></script>
            <script type="text/javascript" src="/ui/carsExpt.js"></script>
        </head>

        <body>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <header>
                <img src="/ui/audi-logo.png" height="180" width="300">
                <br>
                <br>
                <nav style="font-size : 40px; padding-bottom : 20px">

                    <a class="navigation" href="/">
                        HOME
                    </a>|

                    <a class="navigation" href="/about">
                        ABOUT
                    </a>|

                    <div class="navigation cars">
                        CARS
                        <div class="cars-content">
                            <a href="/cars/a3">A3</a>
                            <a href="/cars/a4">A4</a>
                            <a href="/cars/s5">S5</a>
                            <a href="/cars/a6">A6</a>
                            <a href="/cars/a8l">A8 L</a>
                            <a href="/cars/q3">Q3</a>
                            <a href="/cars/q5">Q5</a>
                            <a href="/cars/q7">Q7</a>
                            <a href="/cars/rs6">RS 6</a>
                            <a href="/cars/rs7">RS 7</a>
                            <a href="/cars/tt">TT</a>
                            <a href="/cars/r8">R8</a>
                        </div>
                    </div> |

                    <a class="navigation" href="http://www.audi.in/sea/brand/in.html">
                        WEBSITE
                    </a>

                </nav>
            </header>
            <div class="container">
                <h1 id="heading" class="fancy" style="font-size: 67px; text-align: center">
                    ${pageHeading}
                </h1>
                <p style="text-align:center">
                    <img ${mainImageSrc}>
                </p>
                <br>
                <br>
                <br>
                <hr class="style5">
                <br>
                <br>

                <div id="mainContent">
                    ${mainContent}
                </div>

                <br>
                <br>
                <br>
                <hr class="style5">
                <br><br><br><br>
                <div class="like">
                    <button id="likeButton" class="buttonStyle">Like <img src="/like.png" width="20" height="20"></button>
                    <span id="likespan">${likes} Likes</span>
                </div>

                <div class="comments">
                    <br>
                    <div id="placeholderReplace">
                        <h1 class ="fancy" style="text-align: left">
                            Own this car? Leave a feedback!
                        </h1>
                        <textarea cols="55" id="feedback" placeholder="Leave a feedback"></textarea>
                    </div>
                    <br>
                    <br>
                    <div id="appearFeedbackButton" style="float:left">
                        <button class ="buttonStyle" id="submitButton">Submit</button>
                    </div>
                    <br>
                    <hr style="margin-right:40px" />
                    <br>
                    <br>

                    <div id="prevFeedbacks">
                    </div>
                </div>
                <br>
                <br>
                <br>
                <br>
                <br>
            </div>
        </body>
        </html>`;

    return htmlTemplate;
}


app.get('/cars/:carName', function (req, res) {

    var carName = req.params.carName;

    //fetch data from db corresponding to carName
    pool.query("SELECT * FROM cars WHERE car_name= ($1);", [carName], function (err, result) {

        if (err) {
            res.status(500).send(err.toString());
        }

        else {
            //fill the car object's properties from that data
            car.carName = result.rows[0].car_name;
            car.title = result.rows[0].title;
            car.heading = result.rows[0].heading;
            car.mainImageSrc = result.rows[0].main_image_src;
            car.mainContent = result.rows[0].main_content;
            car.likes = result.rows[0].likes;

            //pass the object as argument to createTemplate() and send back the return value
            res.send(createTemplate(car));
        }
    });    
});


/*---------------------------------------------------------------------------------------------------------------------------------------*/





/*---------------------------------------------------------------------Likes------------------------------------------------------------*/

app.get('/cars/like/:carName', function (req, res) {
    var carName = req.params.carName;

    //fetch number of likes from db
    pool.query("SELECT likes FROM cars WHERE car_name= ($1);", [carName], function (err, result) {

        if (err) {
            res.status(500).send(err.toString());
        }

        else {

            //increment number of likes by one
            var likes = result.rows[0].likes;
            likes++;

            //write number of likes to db
            pool.query("UPDATE cars SET likes = ($1) WHERE car_name = ($2);", [likes.toString(), carName], function (err, result) {
                if (err)
                    res.status(500).send(err.toString());
                else {
                    //send back new number of likes
                    res.send(likes.toString());
                }
            });            
        }
    });    
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/






/*---------------------------------------------------------------------Feedbacks-------------------------------------------------------------*/

app.get('/cars/:carName/submit_feedback', function (req, res) {
    
    var feedback = req.query.feedback;
    var carName = req.params.carName;

    if (feedback === '') {
        // fetch all feedbacks from db corresponding to carName
        pool.query("SELECT review FROM reviews WHERE car_name= $1", [carName], function (err, result) {

            if (err)
                res.status(500).send(err.toString());
            else {
                var reviews = [];
                for (var i = 0; i < result.rows.length; i++)
                    reviews.push(result.rows[i].review);

                // send back as JSON string
                res.send(JSON.stringify(reviews));
            }
        });        
    }

    else {
        //fetch all reviews from db and make an array of reviews
        pool.query("SELECT review FROM reviews WHERE car_name= $1;", [carName], function (err, result) {

            if (err)
                res.status(500).send(err.toString());
            else {
                
                //write to db the new feedback
                pool.query("INSERT INTO reviews VALUES($1, $2, $3);", [carName, feedback, req.session.auth.userName], function (err, result) {
                    if (err)
                        res.status(500).send(err.toString());
                    
                });
            }
        });        
    }
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/






/*---------------------------------------------------------------------Create new user-------------------------------------------------------------*/

function hash(userPassword, salt) {
    var hashedPassword;

    hashedPassword = crypto.pbkdf2Sync(userPassword, salt, 100000, 512, 'sha512').toString('hex');

    return ['pbkdf2Sync', salt, hashedPassword].join('#');
}

app.post('/create-user', function (req, res) {
    //extract username and password sent by the user from message body
    var userName = req.body.userName;
    var userPassword = req.body.userPassword;
    var salt = crypto.randomBytes(256).toString('hex');

    userPassword = hash(userPassword, salt);

    //create a new entry in users table
    pool.query("INSERT INTO users(user_name, hashed_password) VALUES ($1, $2);", [userName, userPassword], function (err, result) {
        if (err) 
            res.status(500).send(err.toString());
        
        else 
            res.send('User created succesfully');        
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/






/*---------------------------------------------------------------------Login/Logout-------------------------------------------------------------*/

app.post('/login', function (req, res) {
    var userName = req.body.userName;
    var userPassword = req.body.userPassword;


    pool.query("SELECT * FROM users WHERE user_name = $1", [userName], function (err, result) {
        if (err) 
            res.status(500).send(err.toString());
        
        else {
            if (result.rows.length === 0)
                res.status(404).send('Username not found');

            else {
                var actualPassPhrase = result.rows[0].hashed_password;
                var salt = actualPassPhrase.split('#')[1];

                userPassword = hash(userPassword, salt);

                if (userPassword === actualPassPhrase) 
                {
                    //start session
                    req.session.auth = {userName: result.rows[0].user_name};

                    res.send(`Welcome ${userName}`);
                }
             
                else
                    res.status(401).send("Incorrect password");                
            }
        }
    });
});

app.get('/login-check', function (req, res) {
    res.send(req.session.auth.userName);
});

app.get('/logout', function (req, res) {
    delete req.session.auth;
    res.send('Logged out succesfully');
});

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/







/*---------------------------------------------------------------------Images------------------------------------------------------------*/

app.get('/person.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'person.png'));
});

app.get('/like.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'like.png'));
});

app.get('/ui/audi-logo.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'audi-logo.png'));
});

app.get('/ui/audi-tt.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'audi-tt.png'));
});

app.get('/ui/audi.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'audi.png'));
});

app.get('/site-logo.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'site-logo.ico'));
});
/*---------------------------------------------------------------------------------------------------------------------------------------*/

