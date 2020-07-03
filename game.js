var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = true;
var level = 0;


//Function to randomly pick a number from 0 - 4(execluded)
function nextSequence() {
    //Generating random number from 0-4 Execluding 4
    var randomNumber = Math.floor(Math.random() * 4);
    //passing that random number as an index of the buttonColors array
    var randomChosenColour = buttonColours[randomNumber];
    //pushing that buttonColor string value in the gamePattern array
    gamePattern.push(randomChosenColour);

    //Animate Flash Selected Button color (according to random value)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Play sound of the random choosen color
    playSound(randomChosenColour);

    //so this func. is never called by keyboard again , only if user loses
    gameStarted = false;

    //empty the user clicked array so the user must start clicking from the beginning.
    userClickedPattern = [];

    //update the H1 text to the current level
    $("h1").text("level " + level);

    //increase the current level state for the next func. call
    level++;
}





//Detect which key is clicked via mouse and also animate that button
$(".btn").on("click", function () {

    if (!gameStarted) {
        //Passing the id of the clicked button
        var userChosenColor = $(this).attr("id");
        //pushing that buttonClicked id into the UserClicked Array
        userClickedPattern.push(userChosenColor);

        //Playing unique sound of the clicked button
        playSound(userChosenColor);
        //Animate the button
        animatePress(userChosenColor);

        //checking the answer for every click untill conditions are met!
        checkAnswer(userClickedPattern.length - 1);
    }
})




//Detect which key is pressed via keyboard
$(document).on("keydown", function (event) {
    //one time keyboard press only (when starting the game or restarting the game due to losing)
    if (gameStarted) {
        nextSequence();
    }
})


function checkAnswer(currentLevel) {

    //we compare the content of both gamePattern & userClickedPattern arrays , as soon as they met the same length , and content , winning.
    //even if userClickedPattern Array is not yet the same length as the gamePattern , having the current exact content will make it equal to it.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            //changing text for 1 sec then load next level
            $("h1").text("Correct!");
            setTimeout(() => {
                //get another buttonColor added to the gamePattern array and the user must start clicking from the beginning to get the right pattern.
                nextSequence();
            }, 1000);
        }
    } else {
        //responsible for changing the text to GameOver , reseting variables and arrays , also a lil bit of red BG .
        gameOver();

    }

}

//Function to play sound receiving the buttonName as string value
function playSound(sound) {
    var soundToPlay = new Audio("sounds/" + sound + ".mp3");
    soundToPlay.play();
}

//Function to animate the clicked buttons for a certian amount of time
function animatePress(currentColor) {

    // console.log(currentColor);

    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function gameOver() {
    $("body").addClass("game-over");

    $("h1").text("Wrong!");
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    setTimeout(() => {
        $("h1").text("Press A Key to Start");
    }, 1000);

    //Reset the Game
    gamePattern = [];
    level = 0;
    gameStarted = true;

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 1000);
}