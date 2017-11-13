
$("#scrapebutton").on("click", function(data){



})
// Grab the articles as a json
$.getJSON("/articles", function(data) {


  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var articleTitles = $("<div id='card-content' data-id= '" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link +"</div>");

    var articleSummary = $("<div id = 'card-title'>" + data[i].summary + "</div>")
   

    var button = $("<input href='#noteModal' class='waves-effect waves-light btn modal-trigger' value='Add Note' />");

    $("#article").append(articleTitles, articleSummary, button)


  }
});



//Show Notes Modal to Add in Notes
$("#noteModal").modal({


})

$("#note").on("click", function(noteShow){


	noteShow.stopImmediatePropagation();

	var buttonForNotes = $(this).attr("id");



	readNotes(buttonForNotes);

	$("#noteModal").modal('open');

	$("#note").on("click", function(noteShow){
		noteShow.preventDefault();

		var noteText = $("#noteText").val();

		$.post("/note/" + buttonForNotes, $("#noteForm").serialize())
		.done(function(data){
			readNotes(data);
		})
		.catch(function(err){
			console.log(err)
		})

	})
})


//Function to read notes
function readNotes (id){
	//show messages in the note already
	$(".messages-collection").show();

	//read the note
	$.get("/note" + id, function (data){
		//populate notes
		for (var i = 0; i < data.length; i++){
			var note = $(
				'<li class="note collection-item">' + '<p>' + (i+1) + ': ' + data[i].noteText + '</p>' + '<button class ="individualNoteButton waves effect waves-indigo btn-flat indigo" data-currentButtonId="' + data[i]._id + '">Delete ' + (i+1) + '</button>' + '</li>');

			//append note to div
			$(".messages-collection").append(note)
		}
	})
	.then(function(){
		//deleting notes
		$(".individualNoteButton").on("click", function(){

			var currentButtonId = $(this).data.currentButtonId;

			$.post("/deleteNote/" + currentButtonId.currentbuttonid, $("#noteForm").serialize())
			.done(function(data){
				$("#noteModal").modal("close")
			})

			.catch(function(){
				console.log("Notes are unable to be collected at this time")
			})
		})
	})


}



console.log("saved button")





 // "<div class='row'<div class = 'card-content white-text'> <span data-id='" + data[i]._id + "'>" + data[i].title + "</span></div></div" + "<div class='card-action'></div></div>"



