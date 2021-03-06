var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// var hbs = require('express-handlebars');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();


// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// require("./controller/scraper.js")(app);

//Require routes
// require("./routes/routes.js");

// Connect to the Mongo DB
mongoose.Promise = Promise;


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeHomework";
mongoose.connect(MONGODB_URI,{
   useMongoClient: true } )



// Routes

// A GET route for scraping the chicago tribune website
app.get("/scrape", function(req, res) {
 
  axios.get("http://www.chicagotribune.com").then(function(response) {
   
    var $ = cheerio.load(response.data);
    
    $("article h2").each(function(i, element) {
      
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
       // result.summary = $(this)
       // .children("a")
       // .text();
       // result.note = $(this)


      // Create a new Article using the `result` object built from scraping
      db.Article
        .create(result)
        .then(function(dbArticle) {
       
          res.send("scrape complete");
          
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
  });
});


// Route for getting all Articles from the db
app.get("/articles", function(req, res) {

  db.Article
  .find({})
  .sort({_id: -1})
  .then(function(dbArticle){
    res.json(dbArticle)
  })
  .catch(function(err){
    res.json(err)
  })

});



//Route to get Notes
app.get("/note/:id", function(req, res){
	db.Article
	.findOne({_id: req.params.id})
	.populate("note")
	.then(function(dbNotes){
		res.send(dbNotes)
	}).catch(function(err){
		res.json(err)
	})
})

//Route to post notes
app.post("/note/:id", function(req, res){
	db.Note
	.create(req.body)
	.then(function(dbNotes){
		return db.Article.findOneAndUpdate(
			{_id: req.params.id},
			{$push:{note: dbNotes._id} } ,
			{new: true}
			)
	}).then(function(dbNotes){
		res.send(dbNotes.note)
	}).catch(function(err){
		res.json(err)
	})
})

//Route to Delete Notes
app.post("/deleteNote/:id", function(req, res){
	db.Note
	.findByIdAndRemove({_id: req.params.id}, function(err){
		res.send(err)
	})
})


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});