var started = false;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var buttonColours = ["blue", "green", "yellow", "red"];

document.addEventListener("keypress", () => {
  if (started == false) {
    document.getElementById("level-title").innerText = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerText = `Level ${level}`;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    var userChosenColor = event.target.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});
function animatePress(color) {
  document.querySelector("#" + color).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + color).classList.remove("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}w
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").innerText =
      "Game Over, Press any key to restart";
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    startOver();
  }
}
