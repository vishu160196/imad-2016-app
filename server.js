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
 
app.get('/stylesheet.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'stylesheet.css'));
});

app.get("/main.js", function(req, res){
    res.sendFile(path.join(__dirname, "ui", "main.js"));
});

/*app.get("/madi", function(req, res){
    res.send(`
    <!DOCTYPE html>
<html>
	<head>
		<title>
			Madi the dinosaur
		</title>
		<link type="text/css" rel="stylesheet" href="/stylesheet.css">
		<script type="text/javascript" src="madi.js"></script>
	</head>

	<body style = "background-color: honeydew">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<div class="container">
			<h1 class="fancy" style="font-size: 67px; text-align: -webkit-left;">
				Madi The Dinosaur
				<img class="image-madi" src="/madi.png">
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
			
			<p class="paragraph-madi">
				Hi all welcome to Module madi. On this page I will tell you about my journey from
				near extinction to becoming the mascot of IMAD. As you may already know dinosaurs
				became extinct long back. However you may also know that only the fittest survive,
				so it was at that time when all my fellow mates struggled to survive with their old
				techniques that I took to app-development on my 16-bit machine (sounds quirky right?)
				and I have been developing and deploying apps for people since then.
			</p>

			<p class="paragraph-madi">
				So even when all my other mates continued to search for some means of survival, I was making big money
				at the same time. Today I have become the mascot of IMAD on the humble request of all
				the good folks at Hasura. I continue to tread this path and seek to become the greatest
				developers of all times
			</p>

			<p class="paragraph-madi">
				If you were inspired by my story then please do click
				on the 'Like' button below
			</p>

			<p class="paragraph-madi">
				P.S. The animation on the top left and right corners
				of the main page of this site was copied from <a href="https://www.google.com" style="color: green; text-decoration: none">Google</a>
				I mean only the idea was copied, the code is original 
			</p>
			
			<br>		
			<br>		
			<br>

			<div class="comments">

			</div>

			<div class="like">
				<button class="likeButton buttonStyle" onclick="requestLikeEndPoint()">Like <img src="/like.png" width="20px" height="20px"/></button>
				<span id="likespan">${likes} Likes</span>
			</div>		
		
		</div>

	</body>
</html>
`);
});*/

/*app.get("/madi", function(req, res){
    res.sendFile(path.join(__dirname, "ui", "madi.html"));
});*/

/*var comments = [];
app.get("/submit_comment", function(req, res){
    var comment = req.query.comment;
    comments.push(comment);
    res.send(JSON.stringify(comments));
})*/

app.get("/Koala", function(req, res){
    res.sendFile(path.join(__dirname, "ui", "Koala.html"));
})

app.get("/Foo", function(req, res){
    res.sendFile(path.join(__dirname, "ui", "Foo.html"));
})

app.get("/madi.png", function(req, res){
    res.sendFile(path.join(__dirname, "ui", "madi.png"));
});

app.get('/ui/Koala.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, "ui", 'Koala.jpg'));
});

app.get('/like.png', function (req, res) {
  res.sendFile(path.join(__dirname, "ui", 'like.png'));
});

app.get('/madi.js', function (req, res) {
  res.sendFile(path.join(__dirname, "ui", 'madi.js'));
});

var likes = 0;
app.get('/like', function (req, res) {
    likes++;
    res.send(likes.toString());
});

app.get('/madi', function (req, res) {
  res.sendFile(path.join(__dirname, "ui", 'madi.html'));
});