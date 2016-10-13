var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on 
port ${port}!`);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});







/*---------------------------------------------------------------------Sources------------------------------------------------------------*/

app.get('/stylesheet.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'stylesheet.css'));
});

app.get("/madi.js", function(req, res){
    res.sendFile(path.join(__dirname, "ui", "madi.js"));
});

app.get("/foo.js", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "foo.js"));
});

app.get("/koala.js", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "koala.js"));
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/






/*---------------------------------------------------------------------Pages------------------------------------------------------------*/

app.get("/madi", function(req, res){
    res.send(`
<!DOCTYPE html>
<html>
	<head>
		<title>
			Madi the dinosaur
		</title>
		<link type="text/css" rel="stylesheet" href="/stylesheet.css">
		<script type="text/javascript" src="/madi.js"></script>
	</head>

	<body style="background-color: honeydew" onpageshow="requestComments()">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<div class="container">
			<h1 class="fancy" style="font-size: 67px; text-align: left;">
				Madi The Dinosaur
			    <img src="/madi.png" width="220" height="222" style="float: right">
			</h1>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<hr class="style5">
			<br>
			<br>
			<p class="paragraph">
				Hi all welcome to Module madi. On this page I will tell you about my journey from
				near extinction to becoming the mascot of IMAD. As you may already know dinosaurs
				became extinct long back. However you may also know that only the fittest survive,
				so it was at that time when all my fellow mates struggled to survive with their old
				techniques that I took to app-development on my 16-bit machine (sounds quirky right?)
				and I have been developing and deploying apps for people since then.
			</p>

			<p class="paragraph">
				So even when all my other mates continued to search for some means of survival, I was making big money
				at the same time. Today I have become the mascot of IMAD on the humble request of all
				the good folks at Hasura. I continue to tread this path and seek to become the greatest
				developers of all times
			</p>

			<p class="paragraph">
				If you were inspired by my story then please do click
				on the 'Like' button below
			</p>

			<p class="paragraph">
				P.S. The animation on the top left and right corners
				of the main page of this site was copied from <a href="https://www.google.com" style="color: green; text-decoration: none">Google</a>
				I mean only the idea was copied, the code is original
			</p>
			<br>
			<br>
			<br>
			<hr class="style5">
			<br>
			<div class="like">
				<button class="likeButton buttonStyle" onclick="requestLikeEndPoint()">Like <img src="/like.png" width="20" height="20"></button>
				<span id="likespan">${madi_likes} Likes</span>
			</div>

            <div class="comments">
		<br>
                <div id="placeholderReplace">
                    <textarea cols="55" id="commentsBox" placeholder="Add a comment..." onclick="appearCommentButton()" ></textarea>
                </div>
                <br/>
                <br/>
                <div id="appearCommentButton" style="float:left">
                </div>
				<br>
                <hr style="margin-right:40px"/>
				<br>
                <br/>

                <span id="prev_comments">
                </span>
            </div>
			<br>
			<br>
			<br>
			<br>
			<br>
		</div>
	</body>
</html>
`);
});


app.get("/Koala", function (req, res) {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>
        The endangered Koala
    </title>
    <link type="text/css" rel="stylesheet" href="/stylesheet.css">
    <script type="text/javascript" src="/koala.js"></script>
</head>

<body style="background-color: honeydew" onpageshow="requestComments()">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <div class="container">
        <h1 class="fancy" style="font-size: 67px; text-align: left;">
            The endangered Koala
            <img src="/Koala.jpg" width="165" height="150" style="float: right">
        </h1>
        <br>
        <br>
        <hr class="style5">
        <br>
        <br>

        <p class="paragraph">
            Hello everyone!! let me introduce myself!!! I am Koala and I know how to make a phoolmala?!?! not funny?? never mind...So let me
            brief you about why I am here and how I came here. The users of Windows7 OS should check the "Sample Pictures" directory in the "Pictures"
            directory of their systems......the dev is a real animal lover and took my picture from there!!!!! Anyways now that I am here I would
            like to create awareness among folks regarding wildlife conservation and destroying natural habitats of animals......
        </p>

        <p class="paragraph">
            So let me first tell you that I am a native of Australia (.au TLD) and some pesky humans are creating a ruckus, cutting
            trees like paper. In April 2012, the Australian Government declared the Koala as "VULNERABLE" across the entire state.
            Upon receiving advice from the Threatened Species Scientific Council, Minister Tony Burke listed the Koala as a threatened species
            under the EPBC Act. Research conducted by the AKF strongly suggests the Koala's conservation status should be upgraded to
            "CRITICALLY ENDANGERED" in the South East Queensland Bioregion.
        </p>

        <p class="paragraph">
            Koalas are in serious decline suffering from the effects of habitat destruction, domestic dog attacks, bushfires and road accidents.
            The Australian Koala Foundation estimates that there are less than 100,000 Koalas left in the wild, possibly as few as 43,000.
            You can see how we determined those figures <a href="https://www.savethekoala.com/our-work/bobs-map" style="color: green; text-decoration: none">here</a>.
        </p>
        <img src="https://www.savethekoala.com/sites/default/files/images/koalaendangered1.jpg"/>
        <p class="paragraph">
            So i guess this much is enough to describe my pitiable situation. If you are humane and care for your hairy friends (like me) then
            please show your support by LIKing this post and do leave a comment.
        </p>

        <br>
        <br>
        <br>
        <hr class="style5">
        <br>
        <div class="like">
            <button class="likeButton buttonStyle" onclick="requestLikeEndPoint()">Like <img src="/like.png" width="20" height="20"></button>
            <span id="likespan">${koala_likes} Likes</span>
        </div>

        <div class="comments">
            <br>
            <div id="placeholderReplace">
                <textarea cols="55" id="commentsBox" placeholder="Add a comment..." onclick="appearCommentButton()"></textarea>
            </div>
            <br />
            <br />
            <div id="appearCommentButton" style="float:left">
            </div>
            <br>
            <hr style="margin-right:40px" />
            <br>
            <br />

            <span id="prev_comments">
            </span>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</body>
</html>`);
});


app.get("/Foo", function (req, res) {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>
        The loyal dog Foo
    </title>
    <link type="text/css" rel="stylesheet" href="/stylesheet.css">
    <script type="text/javascript" src="/foo.js"></script>
</head>

<body style="background-color: honeydew" onpageshow="requestComments()">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <div class="container">
        <h1 class="fancy" style="font-size: 67px; text-align: left;">
            The loyal dog Foo
            <img src="/foo.jpg" width="177" height="222" style="float: right; padding-top:18px">
        </h1>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <hr class="style5">
        <br>
        <br>
        <p class="paragraph" style="font-family:cursive">
            *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff*
            *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff*
            *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff*
            *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff*
            *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff*
        </p>

        <h1 class="fancy" style="font-size: 40px; text-align: left;">
            The above translates as
        </h1>

        <p class="paragraph">
            Oh yeah!! so hi all, the name's foo, and probably you know me too!!! that rhymes bub doesn't it? thankyou, thankyou I know I
            am cool!!!! So I heard the dev's making his first webapp, and decided to jump in too. Trust me bro this guy is way cooler than
            you can imagine. He started his journey with POP and is now jumping to OOP (a natural progression isn't it). He has made some really
            cool stuff and is on a rampage when it comes to programming. Oh and yes I heard madi saying there's some animation on the main page
            !? I didn't see any.....maybe the dev's having a hard time with animations, though i did see 2 canvases on the main page.......
        </p>

        <p class="paragraph">
            So if you wanna party hard and code harder press the LIKE button below and don't forget to mention a comment about the cool guy
            I've been talking of for so long!!!! *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff* *Ruff Ruff*!!!!!
        </p>

        <p class="paragraph">
            P.S. The last few lines cannot be translated since they contain strong language which is inappropriate to display.....This dog is a
            real riot.
        </p>
        <br>
        <br>
        <br>
        <hr class="style5">
        <br>
        <div class="like">
            <button class="likeButton buttonStyle" onclick="requestLikeEndPoint()">Like <img src="/like.png" width="20" height="20"></button>
            <span id="likespan">${foo_likes} Likes</span>
        </div>

        <div class="comments">
            <br>
            <div id="placeholderReplace">
                <textarea cols="55" id="commentsBox" placeholder="Add a comment..." onclick="appearCommentButton()"></textarea>
            </div>
            <br />
            <br />
            <div id="appearCommentButton" style="float:left">
            </div>
            <br>
            <hr style="margin-right:40px" />
            <br>
            <br />

            <span id="prev_comments">
            </span>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</body>
</html>`);
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/





/*---------------------------------------------------------------------Likes------------------------------------------------------------*/

var madi_likes = 0;
app.get('/madi/like', function (req, res) {
    madi_likes++;
    res.send(madi_likes.toString());
});

var foo_likes = 0;
app.get('/foo/like', function (req, res) {
    foo_likes++;
    res.send(foo_likes.toString());
});

var koala_likes = 0;
app.get('/koala/like', function (req, res) {
    koala_likes++;
    res.send(koala_likes.toString());
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/






/*---------------------------------------------------------------------Comments-------------------------------------------------------------*/
var madi_comments = [];
app.get("/madi/submit_comment", function (req, res) {
    var comment = req.query.comment;

    if (comment === "")
        res.send(JSON.stringify(madi_comments));
    else {
        madi_comments.push(comment);
        res.send(JSON.stringify(madi_comments));
    }
});

var foo_comments = [];
app.get("/foo/submit_comment", function (req, res) {
    var comment = req.query.comment;

    if (comment === "")
        res.send(JSON.stringify(foo_comments));
    else {
        foo_comments.push(comment);
        res.send(JSON.stringify(foo_comments));
    }
});

var koala_comments = [];
app.get("/koala/submit_comment", function (req, res) {
    var comment = req.query.comment;

    if (comment === "")
        res.send(JSON.stringify(koala_comments));
    else {
        koala_comments.push(comment);
        res.send(JSON.stringify(koala_comments));
    }
});
/*---------------------------------------------------------------------------------------------------------------------------------------*/





/*---------------------------------------------------------------------Images------------------------------------------------------------*/

app.get('/person.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'person.png'));
});

app.get("/foo.jpg", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "foo.jpg"));
});

app.get("/madi.png", function (req, res) {
    res.sendFile(path.join(__dirname, "ui", "madi.png"));
});

app.get('/Koala.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'Koala.jpg'));
});

app.get('/like.png', function (req, res) {
    res.sendFile(path.join(__dirname, "ui", 'like.png'));
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/