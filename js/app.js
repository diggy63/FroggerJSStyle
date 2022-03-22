const frog = document.querySelector("#frog");
const midDisplay = document.querySelector("#midStats");
const winCon = document.querySelector("#finArea");
const roadOne = document.querySelector("#road");
const gameAr = document.querySelector("#gameArea");
const frogImg = document.querySelector("#frogImg").src;
const enmElOne = document.querySelector("#enemy");
const enmElTwo = document.querySelector("#enemy2");
const enmElThree = document.querySelector("#enemy3");
const enmElFour = document.querySelector("#enemy4");
const stats = document.querySelector("#stats");
const log1 = document.querySelector("#log");
const log2 = document.querySelector("#log2");
const log3 = document.querySelector("#log3");
const log4 = document.querySelector("#log4");
const startBtn = document.querySelector("#startButton");
const winTotal = document.querySelector("#winCount");
const loseTotal = document.querySelector("#loseCount");
const screenHieght = screen.width;
let hopSpeed = 7;
let phoneConstant = 1;
let reset = false;
let winCounter = 0;
let loseCounter = 0;
let count = 0;
let drowned = false;
let alive = true;
let win = false;
let mov = 1;
let iD = null;
let splashWinId = null;
let idEnm = null;
let idEnm1 = null;
let idEnm2 = null;
let idEnm3 = null;
let idLog = null;
let idLog2 = null;
let idLog3 = null;
let idLog4 = null;
let carString = [enmElOne, enmElTwo, enmElThree, enmElFour];
let carId = [idEnm, idEnm1, idEnm2, idEnm3];
let treeStringR = [log1, log3];
let treeIdR = [idLog, idLog3];
let treeStringL = [log2, log4];
let treeIdL = [idLog2, idLog4];
// console.dir(roadOne.clientHeight);

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

init();
startBtn.addEventListener("click", init);

//restarts Game
function init() {
  if (roadOne.clientHeight === 30) {
    phoneConstant = 3 / 5;
    //console.log(phoneConstant);
  }
  reset = true;
  document.querySelector("#frogImg").src = frogTurn.down;
  //This setTimeout lets the reset = true be read by all the setInterval loops
  //and gives them time to get to there clear postition before assigning 
  //new random values. So they wont glitch out
  setTimeout(function () {
    count = 0;
    drowned = false;
    frog.style.top = `0px`;
    frog.style.left = `250px`;
    document.querySelector("#frogImg").src = frogTurn.down;
    alive = true;
    win = false;
    reset = false;
    randomCarTree();
    document.addEventListener("keydown", moveFrg);
  }, 100);
}

//renders Lose or win for right now
function render() {
  
  //document.addEventListener("keydown", moveFrg);
  if (alive === false) {
    loseCounter++;
    midDisplay.innerHTML = "You Lost";
    loseTotal.innerHTML = loseCounter + "";
    return;
  }
  if (win === true) {
    midDisplay.innerHTML = "You are the Best, ";
    winCounter++;
    winAnimation();
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
    ranSpeed = Math.floor(Math.random() * 5) + 2;
    ranCarOne = Math.floor(Math.random() * 600);
    carString[i].style.left = ranCarOne + "px";
    myMoveEnm(carString[i], carId[i], ranCarOne, ranSpeed);
  }
  for (i = 0; i < 2; i++) {
    ranSpeed = Math.floor(Math.random() * 5) + 8;
    ranTreePlace = Math.floor(Math.random() * 550);
    myMoveTree(treeStringR[i], treeIdR[i], ranTreePlace, ranSpeed);
  }

  myMoveBigTreeL(treeStringL[0], treeIdL[0], 100, 15, -150, 20);
  //cannot do two logs yet the dectction only works for one row
  //myMoveBigTreeL(treeStringL[1], treeIdL[1], 300, 15, -300, 20);
}

//function that moves frog
function moveFrg(e) {
  //console.log("here");
  //this remove keystokes being read so that you dont ultimate speed
  document.removeEventListener("keydown", moveFrg, false);
  mov = 1;

  //depending on which keystroke you hit its runs a setInterval thats "hops" to
  //its location
  if (e.key === "s") {
    document.querySelector("#frogImg").src = frogTurn.down;
    iD = setInterval(frgHop, hopSpeed, "down", frog.style.top);
  } else if (e.key === "d") {
    document.querySelector("#frogImg").src = frogTurn.right;
    iD = setInterval(frgHop, hopSpeed, "right", frog.style.left);
    // frog.style.left = `${parseInt(frog.style.left) + mov}px`;
  } else if (e.key === "a") {
    document.querySelector("#frogImg").src = frogTurn.left;
    iD = setInterval(frgHop, hopSpeed, "left", frog.style.left);
  } else if (e.key === "w") {
    document.querySelector("#frogImg").src = frogTurn.up;
    if (frog.style.top != `0px`) {
      iD = setInterval(frgHop, hopSpeed, "up", frog.style.top);
    } else {
      document.addEventListener("keydown", moveFrg);
    }
  }
}

//function that gives frog smooth hop
function frgHop(directs, cangeVal) {
  //if(alive = false){
  if (mov === 50) {
    clearInterval(iD);
    render();
  }
  if (mov === 120) {
    clearInterval(iD);
  }
  if (directs === "down") {
    frog.style.top = parseInt(cangeVal) + mov + `px`;
    mov++;
    document.querySelector("#frogImg").src = frugHopDown[count];
  } else if (directs === "right") {
    frog.style.left = parseInt(cangeVal) + mov + `px`;
    mov++;
    document.querySelector("#frogImg").src = frugHopRight[count];
  } else if (directs === "left") {
    frog.style.left = parseInt(cangeVal) - mov + `px`;
    mov++;
    document.querySelector("#frogImg").src = frugHopLeft[count];
  } else if (directs === "up") {
    frog.style.top = parseInt(cangeVal) - mov + `px`;
    mov++;
    document.querySelector("#frogImg").src = frugHopUp[count];
  }
  if (mov % 10 === 0) {
    count++;
  }
}

//need to add one for the cars to move the other way
//moves ennemy/car accross screen right to Left
function myMoveEnm(enm, id, posistion, speed) {
  let carLength = 49;
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    //console.log(roadOne)
    if (pos == -100) {
      enm.style.left = `600px`;
      pos = 600;
      carLength = 50;
      enm.style.width = 50 + "px";
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
function myMoveTree(enm, id, posistion, speed) {
  let logLength = 150;

  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == -165) {
      pos = 550;
      enm.style.width = 150 + "px";
      logLength = 150;
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
function myMoveBigTreeL(enm, id, posistion, speed, startId, offesetL) {
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == 708 + startId) {
      pos = startId - 25;
    } else if (reset === true) {
      clearInterval(id);
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
    frog.offsetTop >= en.offsetTop &&
    frog.offsetTop <= parseInt(en.offsetTop) + 49
  ) {
    if (
      parseInt(frog.offsetLeft) <= parseInt(en.offsetLeft + 110) &&
      parseInt(frog.offsetLeft) >= en.offsetLeft
    ) {
      alive = false;
      document.querySelector("#frogImg").src = "../images/death.png";
      document.removeEventListener("keydown", moveFrg, false);
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
    frog.offsetTop <= parseInt(en.offsetTop) + 49
  ) {
    if (
      parseInt(frog.offsetLeft + offSet) >= en.offsetLeft &&
      parseInt(frog.offsetLeft) <= parseInt(en.offsetLeft + 150)
    ) {
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
    frog.offsetTop <= parseInt(en.offsetTop) + 48
  ) {
    if (
      parseInt(frog.offsetLeft) > en.offsetLeft &&
      parseInt(frog.offsetLeft) < parseInt(en.offsetLeft + 150)
    ) {
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
  let ani = 0;
  clearInterval(splashWinId);
  splashWinId = setInterval(slpashA, 100);
  function slpashA() {
    if (ani <= 7) {
      document.querySelector("#frogImg").src = splashAni[ani];
      ani++;
    } else {
      clearInterval(splashWinId);
    }
  }
}

//makes frogger jump back and forth when he Wins
function winAnimation() {
  //centerFrogger();
  console.log("here");
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
        document.querySelector("#frogImg").src = frugHopLeft[ani];
        ani++;
      } else {
        switchI = false;
        ani = 0;
      }
    } else if (switchI === false) {
      if (ani <= 4) {
        document.querySelector("#frogImg").src = frugHopRight[ani];
        ani++;
      } else {
        switchI = true;
        ani = 0;
      }
    }
  }
}


function centerFrogger() {
  if(parseInt(frog.style.left) > 250){
    document.querySelector("#frogImg").src = frogTurn.left;
    iD = setInterval(frgHop, hopSpeed, "left", frog.style.left);
    console.log("left");
  }else if(parseInt(frog.style.left) < 250){
    document.querySelector("#frogImg").src = frogTurn.right;
    iD = setInterval(frgHop, hopSpeed, "right", frog.style.left);
    console.log("left");
  }
}

function checkWin() {
  if (frog.offsetTop >= winCon.offsetTop - 5) {
    console.log("win check");
    win = true;
    render();
  }
}