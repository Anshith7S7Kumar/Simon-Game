userClickedPattern = [];

gamePattern = [];

buttonColours = ['red', 'blue', 'green', 'yellow'];

var level = 0;

var gameStarted = false;




$(".btn").click(function(event) {
    var theID = event.target.id;
    playSound(theID);
});



$(".btn").click(function(event) {
  var uID = event.target.id;
  $("#" + uID).addClass("pressed");
  setTimeout(function(){
    $("#" + uID).removeClass("pressed");
  }, 100);
});

function playSound(sound) {

    switch (sound) {
        case 'red':
          var red = new Audio('sounds/red.mp3');
          red.play();
          break;
        case 'blue':
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
          break;
        case 'green':
            var green = new Audio('sounds/green.mp3');
            green.play();
          break;
        case 'yellow':
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
          break;
        default:
          var wrong = new Audio('sounds/wrong.mp3');
          wrong.play();
      }
    
};

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; 
  gamePattern.push(randomChosenColour); 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  

};

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function() {

  if(!gameStarted) {

    $("#level-title").text("Level " + level);

    nextSequence();

    gameStarted = true;

  }  
  
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {

    
    console.log("wrong");

    playSound("sounds/wrong.mp3");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  
}


function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


















