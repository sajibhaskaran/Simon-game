//setting up global variables.
var turnArr = [];
var copyArr = [];
var turn = 0;
var strictMode;
// control button events.
$("document").ready(function() {
  $(".start").addClass("active");
  $(".strict").addClass("active")
  $(".button").addClass("active");

});

$(".on").on("click", function() {
  clearGame();
  $(".label-on").toggleClass("mode");
  $(".label-strict").removeClass("mode");
  $(".start").toggleClass("active");
  $(".strict").toggleClass("active");
  strictMode = false;
  $("input").val() == "" ? $("input").val("--") : $("input").val("");
});

$(".strict").on("click", function() {
  $(".label-strict").toggleClass("mode");
  strictMode = !strictMode;
  console.log(strictMode);
});

$(".start").click(function() {
  $(this).css("opacity", "1");
  clearGame();
  startGame();
});

$(".button").on("click", function() {
  $(".button").addClass("active");
  var matchColor = $(this).data('name');
  litColor(matchColor);
  match(matchColor);
});

// starter function.
function startGame() {
  turn++;
  $("input").val(turn);
  var color = getColor();
  turnArr.push(color);
  playGame();
}
// main function to start the game.
function playGame() {
  var gameSpeed;// increaing the gameSpeed as game progresses.
  if (turn < 6) gameSpeed = 1200;
  else if (turn > 6 && turn < 11) gameSpeed = 900;
  else gameSpeed = 700;
 // check if the game is won at turn 20.
  if (turn > 20) {
    $("input").val("WON!");
    window.setTimeout(function() {
      clearGame();
      startGame();
    }, 4000);
  } else {
    $(".button").addClass("active");
    var i = 0;
    copyArr = turnArr.slice(0);
    var interval = setInterval(function() {
      litColor(turnArr[i]);// calling the animation.   
      i++;
      if (i >= turnArr.length) {
        clearInterval(interval);
      }
    }, gameSpeed);
  }
  $(".button").removeClass("active");
}


// function to see if the user input match the turns.
function match(matchColor) {
  $(".button").addClass("active");
  var color = copyArr.shift();
  
  if (matchColor == color && copyArr.length === 0) {
    console.log("test1");
    copyArr.splice(0, copyArr.length);
    window.setTimeout(function() {
      startGame();
    }, 1000);
  } else if (matchColor != color && strictMode) {
    innerLit();   
    clearGame();
    window.setTimeout(function() {
      startGame();
    }, 1000);

  } else if (matchColor != color) {
    console.log("test3");
    innerLit();
    copyArr.splice(0, copyArr.length);
    window.setTimeout(function() {
    playGame();
    }, 1000);
  } else $(".button").removeClass("active");
  }// end of match function.

/******* Helper functions.. **********/
function clearGame() {
  copyArr.splice(0, copyArr.length);
  turnArr.splice(0, turnArr.length);
  turn = 0;
}
function getColor() {
  switch (Math.floor((Math.random() * 4) + 1)) {
    case 1:
      color = "red";
      break;
    case 2:
      color = "blue";
      break;
    case 3:
      color = "green";
      break;
    case 4:
      color = "yellow";
      break;
  }
  return color
}

function litColor(color) {

  var id = "." + color;
  document.getElementById(color).play();
  var tileLit = $(id).addClass("lit");
  window.setTimeout(function() {
    tileLit.removeClass("lit");
  }, 600)

}

function innerLit() {

  var tileLit = $(".inner").addClass("inner-lit");
  window.setTimeout(function() {
    tileLit.removeClass("inner-lit");
  }, 1000)

}