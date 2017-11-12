var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/Article.js")
// scraping the chicago tribune website
module.exports = function(app){
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

      // Create a new Article using the `result` object built from scraping
      db.Article
        .create(result)
        .then(function(dbArticle) {
       
          res.send(dbArticle);
          res.save(function(err){})
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
  });
});
}

