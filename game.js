var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var playerScore = 0;
var animateHead= true;
var colorBlindness=false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    if(colorBlindness){
        playSoundwav(randomChosenColour+"-voice");
    }
}
function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}
function playSoundwav(name){
    var sound = new Audio("./sounds/" + name + ".wav");
    sound.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
//answer checking solution
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            playerScore++;
            $("h2").text("Player Score : " + playerScore);
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
//user clicks button
$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(this.id);
    playSound(this.id);
    
    checkAnswer(userClickedPattern.length - 1);
})
//game starting code
$(document).keypress(function () {
    if (!start) {
        $("h1").text("Level " + level);
        $("h2").text("Player Score : " + playerScore);

        nextSequence();
        start = true;
    }
})
//start over function
function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
    playerScore = 0;
    // colorBlindness=false;
}
$("#how-to-play").click(function () {
    animatePress(this.id);
})
$("#colorblind").click(function () {
    animatePress(this.id);
    if(colorBlindness){colorBlindness=false}
    else{
        colorBlindness=true;
    }
    
    if($("#colorblind").text()==="Add Colorblind Aid"){
        for(var i=0;i<buttonColours.length;i++){
            $("#"+buttonColours[i]).text(buttonColours[i]);
        }
        $(".btn").css("color","black");
        $(".btn").css("font-size","40px");
        $("#colorblind").text("Remove Colorblind Aid");
    }
    else if($("#colorblind").text()==="Remove Colorblind Aid"){
        for(var i=0;i<buttonColours.length;i++){
            $("#"+buttonColours[i]).text("");
        }
        $("#colorblind").text("Add Colorblind Aid");
    }
    
})
