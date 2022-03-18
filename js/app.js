const frog = document.querySelector("#frog");
const display = document.querySelector("#stats");
const winCon = document.querySelector("#finArea");
const roadOne = document.querySelector("#road1");
const gameAr = document.querySelector("#gameArea");

const enmElOne = document.querySelector("#enemy");
const enmElTwo = document.querySelector("#enemy2");
const enmElThree = document.querySelector("#enemy3");
const enmElFour = document.querySelector("#enemy4");
const log1 = document.querySelector("#log");
const log2 = document.querySelector("#log2");
const log3 = document.querySelector("#log3");
const log4 = document.querySelector("#smlLog");
let alive = true;
let onTree = false;
let win = false;
let mov = 1;
let iD = null;
let idEnm = null;
let idEnm1 = null;
let idEnm2 = null;
let idEnm3 = null;
let idLog = null;
let idLog2 = null;
let idLog3 = null;
let idLog4 = null;
frog.style.top = `0px`;
frog.style.left = `250px`;
let carString = [enmElOne, enmElTwo, enmElThree, enmElFour];
let carId = [idEnm, idEnm1, idEnm2, idEnm3];
let treeStringR = [log1, log3];
let treeIdR = [idLog, idLog3];
let treeStringL = [log2, log4];
let treeIdL = [idLog2, idLog4];

init();
randomCarTree();
//listens to key stokes. basically the controls
document.addEventListener("keydown", moveFrg);

//restarts Game
function init() {
  frog.style.top = `0px`;
  frog.style.left = `250px`;
  console.log("init");
  alive = true;
  win = false;
  // Needs a clear function so that it works better
  // randomCarTree();
  //display.innerHTML = "Let's Play Frogger"
}

//renders Lose or win for right now
function render() {
  document.addEventListener("keydown", moveFrg);
  if (alive === false) {
    display.innerHTML = "You Lost";
    init();
  }
  if (win === true) {
    display.innerHTML = "You are the Best";
    init();
  }
}

//Randomizes cars and Tree Positions before the game starts for 'unqiue' games
function randomCarTree() {
  for (i = 0; i < 4; i++) {
    ranSpeed = Math.floor(Math.random() * 5)+2;
    ranCarOne = Math.floor(Math.random() * 700);
    carString[i].style.left = ranCarOne + "px";
    myMoveEnm(carString[i], carId[i], ranCarOne, ranSpeed);
  }
  for (i = 0; i < 2; i++) {
    ranSpeed = Math.floor(Math.random() * 5) + 8;
    ranTreePlace = Math.floor(Math.random() * 600);
    myMoveTree(treeStringR[i], treeIdR[i], ranTreePlace, ranSpeed);
  }

  myMoveBigTreeL(treeStringL[0], treeIdL[0], 100, 15,600);
  myMoveTreeL(treeStringL[1], treeIdL[1], 400, 15,500);
}

//function that moves frog
function moveFrg(e) {
  //this remove keystokes being read so that you dont ultimate speed
  document.removeEventListener("keydown", moveFrg, false);
  mov = 1;
  let hopSpeed = 7;

  //depending on which keystroke you hit its runs a setInterval thats "hops" to
  //its location
  if (e.key === "s") {
    iD = setInterval(frgHop, hopSpeed, "down", frog.style.top);
  } else if (e.key === "d") {
    iD = setInterval(frgHop, hopSpeed, "right", frog.style.left);
    // frog.style.left = `${parseInt(frog.style.left) + mov}px`;
  } else if (e.key === "a") {
    iD = setInterval(frgHop, hopSpeed, "left", frog.style.left);
  } else if (e.key === "w") {
    if (frog.style.top != `0px`) {
      iD = setInterval(frgHop, hopSpeed, "up", frog.style.top);
    }
  }
}

//function that gives frog smooth hop
function frgHop(directs, cangeVal) {
  if (mov === 50) {
    console.log(frog.offsetTop);
    console.log(winCon.offsetTop);
    clearInterval(iD);
    if (frog.offsetTop === winCon.offsetTop) {
      win = true;
    }
    render();
  }
  if (mov === 120) {
    clearInterval(iD);
  }
  if (directs === "down") {
    // console.log(directs);
    frog.style.top = parseInt(cangeVal) + mov + `px`;
    mov++;
  } else if (directs === "right") {
    frog.style.left = parseInt(cangeVal) + mov + `px`;
    mov++;
  } else if (directs === "left") {
    frog.style.left = parseInt(cangeVal) - mov + `px`;
    mov++;
  } else if (directs === "up") {
    frog.style.top = parseInt(cangeVal) - mov + `px`;
    mov++;
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
    if (pos == -50) {
      enm.style.left = `600px`;
      pos = 600;
      carLength = 50;
      enm.style.width = 50 + "px";
    }else if(pos <= 0 && pos >= -49){
      enm.style.width = carLength + "px";
      pos--;
      carLength--;
    } 
    else {
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
    if (pos == -150){ 
      pos = 550;
      enm.style.width = 150 + "px";
      logLength = 150;
    }else if(pos <= 0 && pos >= -149){
      enm.style.width = logLength + "px";
      pos--;
      logLength--;
    } 
    else {
      pos--;
      enm.style.left = pos + "px";
      detectOnTree(enm);
    }
  }
}

// Move row two of trees left to right
function myMoveBigTreeL(enm, id, posistion, speed) {
  //console.log(enm);
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == 500) {
      enm.style.left = `-200px`;
      pos = -160;
    // }else if(pos >= 0 && pos <= 150){
    //   enm.style.width = logLength + "px";
    //   pos++;
    //   logLength++;
    }  
    else {
      pos++;
      enm.style.left = pos + "px";
      detectOnTreeL(enm);
    }
  }
}

function myMoveTreeL(enm, id, posistion, speed) {
  //console.log(enm);
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, speed);
  function Drive() {
    if (pos == 450) {
      enm.style.left = `-300px`;
      pos = -250;
    // }else if(pos >= 0 && pos <= 150){
    //   enm.style.width = logLength + "px";
    //   pos++;
    //   logLength++;
    }  
    else {
      pos++;
      enm.style.left = pos + "px";
      detectOnTreeL(enm);
    }
  }
}



//enemy dectect function to see if the car hit the frog
function detect(en) {
  if (
    frog.offsetTop >= en.offsetTop &&
    frog.offsetTop <= parseInt(en.offsetTop) + 49
  ) {
    if (
      parseInt(frog.offsetLeft) + 50 === en.offsetLeft ||
      parseInt(frog.offsetLeft) === en.offsetLeft
    ) {
      alive = false;
      render();
      console.log("Front hit");
    } else if (
      parseInt(frog.offsetLeft) + 50 === parseInt(en.offsetLeft) + 50 ||
      parseInt(frog.offsetLeft) === parseInt(en.offsetLeft) + 50
    ) {
      alive = false;
      render();
    }
  }
}

//detection function for tress moving from left to right
function detectOnTreeL(en) {
  // if (frog.offsetTop > 37 && frog.offsetTop < 133) {
  if (
    frog.offsetTop <= en.offsetTop &&
    frog.offsetTop >= parseInt(en.offsetTop) + 49
  ) {
    if (
      parseInt(frog.offsetLeft) > en.offsetLeft &&
      parseInt(frog.offsetLeft) < parseInt(en.offsetLeft + 150)
    ) {
      console.log("on tree");
    } else {
      console.log("you drowned");
      alive = false;
      render();
    }
  }
}

//dtection function for trees moving from rigt to left so frogger can live
function detectOnTree(en) {
  //myMoveTree(frog, iD,this.posistion,this.speed);
  // if (frog.offsetTop > 37 && frog.offsetTop < 133) {
  if (
    frog.offsetTop >= en.offsetTop &&
    frog.offsetTop <= parseInt(en.offsetTop) + 49
  ) {
    if (
      parseInt(frog.offsetLeft) > en.offsetLeft &&
      parseInt(frog.offsetLeft) < parseInt(en.offsetLeft + 150)
    ) {
      //tree movement almost achieved??????
      //myMoveTreeFrog(frog)
      console.log("on tree");
    } else {
      console.log("you drowned");
      alive = false;
      render();
    }
  }
}
// //function for making frog move with tree this is a hard maybe
//   function myMoveTreeFrog(enm){
// //console.log(enm);
//  let pos = parseInt(frog.offsetLeft);
//  clearInterval(iD);
//  iD = setInterval(Drive, 10);
//  function Drive() {
//   if (pos == 0) {
//     alive = false;
//   } else {
//     pos--s;
//     enm.style.left = pos + "px";
//   }
// }
// }
