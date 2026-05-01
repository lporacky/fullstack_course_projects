buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var randomChosenColour;
var randomNumber;


function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 3);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
    playSound(randomChosenColour);
}

function isClicked() {
    $(".btn").click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
}

isClicked();


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(document).keypress(function() {
    startOver();
    nextSequence();
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}