// Routes
// dependencies
var express = require('express');
var Article = require('../models/Article');
var Note = require('../models/Note');
var scraper = require('../controller/scraper');
var app = express();
var scraperFunction = require("../controller/scraper.js")(app);




// Route for getting all Articles from the db
app.get("/articles", function(req, res) {

 Article.find({})
  .then(function(dbArticle){
    res.render('index', {title: "NewsScraper", article: dbArticle})
  })
  .catch(function(err){
    res.json(err)
  })

});

//scrape articles route
app.get("/scrape", function(req, res){
  scraper.scraperFunction(function(){
    response.redirect("/")
  })
})


module.exports = app