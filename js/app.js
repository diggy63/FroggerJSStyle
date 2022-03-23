
//=============> Audio Constants <==========================================
const winSound = new Audio("audio/win sound 2-1.wav")
const hopSound = new Audio("audio/SFX_Jump_07.wav");
const spalshSound = new Audio("audio/sound-frogger-plunk.wav");
spalshSound.volume = .3;
const plunckedSound = new Audio("audio/sound-frogger-squash.wav");
plunckedSound.volume = .3;
const theme = new Audio('audio/froggerTheme.mp3');
theme.loop = true;
theme.volume = 0.04;


//=============> grabing everything we need from the Page <==================
const contorller = document.querySelector("#dPad")
const btnToStart = document.querySelector("#displayNone");
const wrapper = document.querySelector("#wrapper");
const startScreen = document.querySelector("#startScreen");
const frogImg = document.querySelector("#frogImg");
const testRoad = document.querySelector(".road");
const frog = document.querySelector("#frog");
const midDisplay = document.querySelector("#midStats");
const winCon = document.querySelector("#finArea");
const roadOne = document.querySelector(".road");
const gameAr = document.querySelector("#gameArea");
const carOne = document.querySelector("#car");
const carTwo = document.querySelector("#car2");
const carThree = document.querySelector("#car3");
const carFour = document.querySelector("#car4");
const stats = document.querySelector("#stats");
const log1 = document.querySelector("#log");
const log2 = document.querySelector("#log2");
const log3 = document.querySelector("#log3");
const log4 = document.querySelector("#log4");
const startBtn = document.querySelector("#startButton");
const testBtn = document.querySelector("#testerButton");
const winTotal = document.querySelector("#winCount");
const loseTotal = document.querySelector("#loseCount");
let hopSpeed = 7;
let phoneConstant = 1;
let reset = false;
let winCounter = 0;
let loseCounter = 0;
let count = 0;
let onTree = false;
let drowned = false;
let alive = true;
let win = false;
let mov = 1;

//this id values are for the multiple set intervals we need to run the game
let idEnm = null,
  idEnm1 = null,
  idEnm2 = null,
  idEnm3 = null,
  idLog = null,
  idLog2 = null,
  idLog3 = null,
  idLog4 = null,
  testId = null,
  splashWinId = null,
  iD = null,
  displayId = null;
let carString = [carOne, carTwo, carThree, carFour];
let carId = [idEnm, idEnm1, idEnm2, idEnm3];
let treeStringR = [log1, log3];
let treeIdR = [idLog, idLog3];
let treeStringL = [log2, log4];
let treeIdL = [idLog2, idLog4];
const goFrogDisplay = ["GO", "FROGGER", "GO"];

//object with static positions for the frogger when he turns
const frogTurn = {
  down: "../images/frogStatic.png",
  right: "../images/frogStaticRight.png",
  left: "../images/frogStaticLeft.png",
  up: "../images/frogStaticUp.png",
};

//all the hop animation image array
const frugHopDown = [
  "../images/frogStatic.png",
  "../images/frogJumpDown1.png",
  "../images/frogJumpDown2.png",
  "../images/frogJumpDown3.png",
  "../images/frogJumpDown4.png",
];
const frugHopUp = [
  "../images/frogStaticUp.png",
  "../images/frogJumpUp1.png",
  "../images/frogJumpUp2.png",
  "../images/frogJumpUp3.png",
  "../images/frogJumpUp4.png",
];
const frugHopLeft = [
  "../images/frogStaticLeft.png",
  "../images/frogJumpLeft1.png",
  "../images/frogJumpLeft2.png",
  "../images/frogJumpLeft3.png",
  "../images/frogJumpLeft4.png",
];
const frugHopRight = [
  "../images/frogStaticRight.png",
  "../images/frogJumpRight1.png",
  "../images/frogJumpRight2.png",
  "../images/frogJumpRight3.png",
  "../images/frogJumpRight4.png",
];
//spalsh animation array
const splashAni = [
  "../images/splash.png",
  "../images/splash 2.png",
  "../images/splash 3.png",
  "../images/splash 4.png",
  "../images/splash 5.png",
  "../images/splash 6.png",
  "../images/splash 7.png",
  "../images/BLANK_ICON.png",
];


contorller.addEventListener("click", moveFrg);

startBtn.addEventListener("click", init);
btnToStart.addEventListener("click", changeDisplay);
// testBtn.addEventListener("click", createNewCar);

//function that starts the Game and clears the Screen
function changeDisplay() {
  startScreen.style.display = "none";
  wrapper.style.display = "block";
  init();
  //theme.play();
}


//restarts Game
function init() {
  goFroggerScript();
  //this function checks to see if the viewpoint is for a phone
  //I need to use this because I am using relative display for my game area
  if (roadOne.clientHeight === 30) {
    phoneConstant = 3 / 5;
    phoneCDetect = 1/4;
    //console.log(phoneConstant);
  }else{
    phoneConstant = 1;
  }
  reset = true;
  frogImg.src = frogTurn.down;
  //This setTimeout lets the reset = true be read by all the setInterval loops
  //and gives them time to get to there clear postition before assigning
  //new random values. So they wont glitch out
  setTimeout(function () {
    count = 0;
    drowned = false;
    frog.style.top = `0px`;
    frog.style.left = (250 * phoneConstant) + `px`;
    document.querySelector("#frogImg").src = frogTurn.down;
    alive = true;
    win = false;
    reset = false;
    randomCarTree();
    document.addEventListener("keydown", moveFrg);
  }, 100);
}



//renders Lose or win
function render() {
  if (alive === false) {
    clearInterval(displayId);
    loseCounter++;
    midDisplay.innerHTML = "You Lost";
    loseTotal.innerHTML = loseCounter + "";
    return;
  }
  if (win === true) {
    clearInterval(displayId);
    midDisplay.innerHTML = "You Win. Press Start to Replay";
    winCounter++;
    winAnimation();
    winSound.play();
    winTotal.innerHTML = winCounter + ``;
    return;
  }
  document.addEventListener("keydown", moveFrg);
  count = 0;
  checkWin();
}



//Randomizes cars and Tree Positions before the game starts for 'unqiue' games
function randomCarTree() {
  for (i = 0; i < 4; i++) {
    ranSpeed = ((Math.floor((Math.random() * 5) + 2 - winCounter))/ phoneConstant);
    ranCarOne = Math.floor(Math.random() * 600);
    carString[i].style.left = (ranCarOne * phoneConstant) + "px";
    moveCar(carString[i], carId[i], ranCarOne, ranSpeed);
  }
  for (i = 0; i < 2; i++) {
    ranSpeed = Math.floor(Math.random() * 5 + 8 - winCounter);
    ranTreePlace = Math.floor(Math.random() * 550);
    moveTreeRL(treeStringR[i], treeIdR[i], ranTreePlace, ranSpeed);
  }

  moveTreeLR(treeStringL[0], treeIdL[0], 100, 15, -150, 20);
  //cannot do two logs yet the dectction only works for one row
  //myMoveBigTreeL(treeStringL[1], treeIdL[1], 300, 15, -300, 20);
}



//function that moves frog listen to the Keystoke of the keyboard then send the move direction to my movement function
function moveFrg(e) {
  //this remove keystokes being read so that you dont gain ultimate speed
  document.removeEventListener("keydown", moveFrg, false);
  console.log(e.target.id);
  mov = 1;

  //depending on which keystroke you hit its runs a setInterval thats "hops" to
  //its location
  if (e.key === "s" || e.target.id === "downPad") {
    frogImg.src = frogTurn.down;
    iD = setInterval(frgHop, hopSpeed, "down", frog.style.top);
  } else if (e.key === "d" || e.target.id === "rightPad") {
    if (frog.style.left != (500 * phoneConstant) + `px`) {
      frogImg.src = frogTurn.right;
      iD = setInterval(frgHop, hopSpeed, "right", frog.style.left);
    } else {
      createKeyboardListen();
    }
  } else if (e.key === "a" || e.target.id === "leftPad") {
    if (frog.style.left != `0px`) {
      frogImg.src = frogTurn.left;
      iD = setInterval(frgHop, hopSpeed, "left", frog.style.left);
    } else {
      createKeyboardListen();
    }
  } else if (e.key === "w" || e.target.id === "upPad") {
    frogImg.src = frogTurn.up;
    if (frog.style.top != `0px`) {
      iD = setInterval(frgHop, hopSpeed, "up", frog.style.top);
    } else {
      createKeyboardListen();
    }
  } else {
    createKeyboardListen();
  }
}



//function that gives frog smooth hop
function frgHop(directs, cangeVal) {
  if(alive === false){
    clearInterval(iD);
    frogImg.src = "../images/death.png";
    return;
  }
  if (mov === (50 * phoneConstant)) {
    console.log(frog.offsetTop);
    clearInterval(iD);
    render();
  }
  if (mov === 120) {
    clearInterval(iD);
  }
  if (directs === "down") {
    frog.style.top = parseInt(cangeVal) + mov + `px`;
    mov++;
    frogImg.src = frugHopDown[count];
  } else if (directs === "right") {
    frog.style.left = parseInt(cangeVal) + mov + `px`;
    mov++;
    frogImg.src = frugHopRight[count];
  } else if (directs === "left") {
    frog.style.left = parseInt(cangeVal) - mov + `px`;
    mov++;
    frogImg.src = frugHopLeft[count];
  } else if (directs === "up") {
    frog.style.top = parseInt(cangeVal) - mov + `px`;
    mov++;
    frogImg.src = frugHopUp[count];
  }
  if (mov % 10 === 0) {
    count++;
  }
}



//need to add one for the cars to move the other way?
//moves ennemy/car accross screen right to Left
function moveCar(enm, id, posistion, speed) {
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == (-100 * phoneConstant)) {
      pos = (550 * phoneConstant);
    } else if (reset === true) {
      clearInterval(id);
    } else {
      pos--;
      enm.style.left = pos + "px";
      detect(enm);
    }
  }
}

//moves tree accross screen right to left
function moveTreeRL(enm, id, posistion, speed) {
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == (-165 * (phoneConstant))) {
      pos =(550 * phoneConstant);
    } else if (reset === true) {
      clearInterval(id);
    } else {
      pos--;
      enm.style.left = pos + "px";
      detectOnTree(enm, id);
    }
  }
}

// Move row two of trees left to right
function moveTreeLR(enm, id, posistion, speed, startId, offesetL) {
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == (550 * phoneConstant)) {
      pos = -160;
    } else if (reset === true) {
      clearInterval(id);s
    } else {
      pos++;
      enm.style.left = pos + "px";
      detectOnTreeL(enm, offesetL, id);
    }
  }
}

//enemy dectect function to see if the car hit the frog. If frog is hit it changes into a death symbol and you lose ability to move.
function detect(en) {
  if (alive === false) {
    return;
  }
  if (
    frog.offsetTop >= parseInt(en.offsetTop) - (15 * phoneCDetect) &&
    frog.offsetTop <= parseInt(en.offsetTop) + (49 * phoneConstant)
  ) {
    console.log("here");
    if (
      parseInt(frog.offsetLeft) <= parseInt(en.offsetLeft + 80) &&
      parseInt(frog.offsetLeft) >= en.offsetLeft
    ) {
      alive = false;
      frogImg.src = "../images/death.png";
      document.removeEventListener("keydown", moveFrg, false);
      plunckedSound.play();
      render();
    }
  }
}

//detection function for tress moving from left to right
function detectOnTreeL(en, offSet, id) {
  if (alive === false) {
    return;
  }
  if (
    frog.offsetTop >= en.offsetTop &&
    frog.offsetTop <= parseInt(en.offsetTop) + (49 * phoneConstant)
  ) {
    if (
      parseInt(frog.offsetLeft + offSet) >= en.offsetLeft &&
      parseInt(frog.offsetLeft) <= parseInt(en.offsetLeft + (150 * phoneConstant))
    ) {
      onTree = true;
      frog.style.left = parseInt(frog.style.left) + 1 + `px`;
    } else {
      clearInterval(id);
      drowned === true;
      splashAnimation();
      document.removeEventListener("keydown", moveFrg, false);
      alive = false;
      render();
    }
  }
}

//detection function for trees moving from rigt to left so frogger can live
function detectOnTree(en, id) {
  if (alive === false) {
    return;
  }
  if (
    frog.offsetTop >= en.offsetTop &&
    frog.offsetTop <= parseInt(en.offsetTop) + (48 * phoneConstant)
  ) {
    if (
      parseInt(frog.offsetLeft) > en.offsetLeft &&
      parseInt(frog.offsetLeft) < parseInt(en.offsetLeft + (150 * phoneConstant))
    ) {
      onTree = true;
      frog.style.left = parseInt(frog.style.left) - 1 + `px`;
    } else {
      clearInterval(id);
      drowned === true;
      splashAnimation();
      document.removeEventListener("keydown", moveFrg, false);
      alive = false;
      render();
    }
  }
}

// animation when the frog falls into the water. Runs for 7 seconds then stops
function splashAnimation() {
  spalshSound.play("splash");
  let ani = 0;
  clearInterval(splashWinId);
  splashWinId = setInterval(slpashA, 100);
  function slpashA() {
    if (ani <= 7) {
      frogImg.src = splashAni[ani];
      ani++;
    } else {
      clearInterval(splashWinId);
    }
  }
}

//makes frogger jump back and forth when he Wins
function winAnimation() {
  //centerFrogger();
  let ani = 0;
  let switchI = true;
  clearInterval(splashWinId);
  splashWinId = setInterval(winA, 100);

  function winA() {
    if (reset === true) {
      clearInterval(splashWinId);
    }
    if (switchI) {
      if (ani <= 4) {
        frogImg.src = frugHopLeft[ani];
        ani++;
      } else {
        switchI = false;
        ani = 0;
      }
    } else if (switchI === false) {
      if (ani <= 4) {
        frogImg.src = frugHopRight[ani];
        ani++;
      } else {
        switchI = true;
        ani = 0;
      }
    }
  }
}

function centerFrogger() {
  if (parseInt(frog.style.left) > 250) {
    frogImg.src = frogTurn.left;
    iD = setInterval(frgHop, hopSpeed, "left", frog.style.left);
  } else if (parseInt(frog.style.left) < 250) {
    frogImg.src = frogTurn.right;
    iD = setInterval(frgHop, hopSpeed, "right", frog.style.left);
  }
}
//specific function to check for the win con of the game
function checkWin() {
  if (frog.offsetTop >= winCon.offsetTop - 5) {
    console.log("win check");
    win = true;
    render();
  }
}

//Run the go Frogger go chant in the display screen while you play the game
function goFroggerScript() {
  midDisplay.innerHTML = ``;
  let anima = 0;
  clearInterval(displayId);
  displayId = setInterval(slpashA, 1000);
  function slpashA() {
    if (anima <= 2) {
      midDisplay.innerHTML = midDisplay.innerHTML + goFrogDisplay[anima] + ` `;
      anima++;
    } else {
      midDisplay.innerHTML = ``;
      anima = 0;
    }
  }
}

//creates Listener to key strokes when you need your key strokes to  working
function createKeyboardListen() {
  document.addEventListener("keydown", moveFrg);
}
// function that creates new care on a new Div. Test function for maybe future
// randomness if i would like to add that.

// function createNewCar (){
//   ranCarOne = Math.floor(Math.random() * 600);
//   let newDiv = document.createElement(`div`);
//   ranSpeed = Math.floor((Math.random() * 5));
//   newDiv.className = "carClass";
//   newDiv.innerHTML = '<img src="images/GreenCar.png" alt="Green Car in fourth row" />';
//   testRoad.append(newDiv);
//   myMoveEnm(newDiv, testId, 0, ranSpeed);

// }


// let indexTxt = 0;
// const introTxt = "Welcome to my rendition of Frogger using only html, css, and javascript. To control our little frog body we can use w to move up up, a to move left, s to move down, and d to move right. Try and reach the bottom grassy area without falling into the water or being run over. Enjoy.";
// const speed = 40;
// function () {
//   if (i < txt.length) {
//     document.getElementById("instruct").innerHTML += txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
// }