// // Routes
// // dependencies
// var express = require('express');
// var Article = require('../models/Article');
// var Note = require('../models/Note');
// var app = express();
// var axios = require("axios");
// var cheerio = require("cheerio");
// var db = require("../models");
// var bodyParser = require("body-parser");




// // Routes

// // A GET route for scraping the chicago tribune website
// app.get("/scrape", function(req, res) {
 
//   axios.get("http://www.chicagotribune.com").then(function(response) {
   
//     var $ = cheerio.load(response.data);
    
//     $("article h2", "article p").each(function(i, element) {
      
//       var result = {};

//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");
//        result.summary = $(this)
//        .children("a")
//        .text();
//        result.note = $(this)


//       // Create a new Article using the `result` object built from scraping
//       db.Article
//         .create(result)
//         .then(function(dbArticle) {
       
//           res.send(dbArticle);
          
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           res.json(err);
//         });
//     });
//   });
// });


// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {

//   db.Article
//   .find({})
//   .sort({_id: -1})
//   .then(function(dbArticle){
//     res.json(dbArticle)
//   })
//   .catch(function(err){
//     res.json(err)
//   })

// });



// //Route to get Notes
// app.get("/note/:id", function(req, res){
// 	db.Article
// 	.findOne({_id: req.params.id})
// 	.populate("note")
// 	.then(function(dbNotes){
// 		res.send(dbNotes)
// 	}).catch(function(err){
// 		res.json(err)
// 	})
// })

// //Route to post notes
// app.post("/note/:id", function(req, res){
// 	db.Note
// 	.create(req.body)
// 	.then(function(dbNotes){
// 		return db.Article.findOneAndUpdate(
// 			{_id: req.params.id},
// 			{$push:{note: dbNotes._id} } ,
// 			{new: true}
// 			)
// 	}).then(function(dbNotes){
// 		res.send(dbNotes)
// 	}).catch(function(err){
// 		res.json(err)
// 	})
// })

// //Route to Delete Notes
// app.post("/deleteNote/:id", function(req, res){
// 	db.Note
// 	.findByIdAndRemove({_id: req.params.id}, function(err){
// 		res.send(err)
// 	})
// })

