$(document).ready(function() {
  renderButtons();
});

var topics = ["cat", "dog", "squirrel", "Darth Vader"];
var behaviour = 'empty';

function renderButtons() {
  $("#buttons").empty();
  for(var topic in topics) {
    renderButton(topics[topic]);
    //alert(topics[topic]);
  }
}

function renderButton(name) {
  var button = $("<button>").html(name);
  button.attr('class', 'userMessage');
  button.on('click', renderGifs);
  $("#buttons").append(button);
}

function renderGifs() {
  if(behaviour === 'empty') {
    $("#Gifs").empty();
  }
  var gifText = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifText + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var gifImage = $("<img>");
        gifImage.on('click', startStopGif);
        gifImage.attr('class', 'imageGif');
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-state", 'still');
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifDiv.append(gifImage);
        gifDiv.append($("<div>"));
        var ratingDiv = $("<div>").html("<b>Rating:</b> " + results[i].rating);
        ratingDiv.attr('class', 'userMessage');
        gifDiv.append(ratingDiv);
        var titleDiv = $("<div>").html("<b>Title:</b> " + results[i].title);
        titleDiv.attr('class', 'userMessage');
        gifDiv.append(titleDiv);
        $("#Gifs").append(gifDiv);
      }
    });
}

function startStopGif() {
  var state = $(this).attr('data-state');
  if(state === 'still') {
    $(this).attr("data-state", 'animate');
    $(this).attr("src", $(this).attr('data-animate'));
  } else {
    $(this).attr("data-state", 'still');
    $(this).attr("src", $(this).attr('data-still'));
  }
}

function addTopic() {
  var topic = $("#NewTopic").val();
  $("#NewTopic").val("");
  topics.push(topic);
  renderButtons();
}

function changeBehaviour() {
  var behaviourType = $("#behaviourType").attr("behaviour");
  if(behaviourType === 'empty') {
    $("#behaviourType").attr("behaviour", "append");
    $("#behaviourType").val("Behaviour: Append To End");
    behaviour = 'append';
  } else {
    $("#behaviourType").attr("behaviour", "empty");
    $("#behaviourType").val("Behaviour: Clear Every Time");
    behaviour = 'empty';
  }
  //alert(behaviour);
}
