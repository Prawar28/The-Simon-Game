var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $('#level-title').text('Level ' + level);


  var color = buttonColors[randomNumber];
  var nextBlock = $('#' + color);
  nextBlock.fadeOut(100).fadeIn(100);
  playSound(color);

  gamePattern.push(color);
  userClickedPattern.length = 0;
}


function animatePress(name) {

  $('#' + name).addClass('pressed');
  setTimeout(function() {
    $('#' + name).removeClass('pressed');
  }, 100);
}

function checkAnswer(level) {
  if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) {
    console.log('success');
  } else {
    console.log('fail')
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game over, Press any key to Restart.');
    gameStarted = false;
    startOver();
  }

  if (userClickedPattern.length == level && gameStarted) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

$('.btn').click(function() {
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(level);

});


$(document).keydown(function(event) {

  if (!gameStarted) {
    $('#level-title').text('Level 0');
    gameStarted = true;
    nextSequence();
  }
});
