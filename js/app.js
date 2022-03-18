const frog = document.querySelector("#frog");
const btnElO = document.querySelector("#One");
const btnElTW = document.querySelector("#Two");
const btnElTH = document.querySelector("#Three");
const display = document.querySelector('#stats');
const winCon = document.querySelector('#finArea');
const roadOne = document.querySelector('#road1');
const gameAr = document.querySelector('#gameArea');

const enmElOne = document.querySelector("#enemy");
const enmElTwo = document.querySelector("#enemy2");
const enmElThree = document.querySelector("#enemy3");
const log1 = document.querySelector('#log');
const log2 = document.querySelector('#log2');
const log3 = document.querySelector('#log3');
//console.log(btnElO);
let alive = true;
let onTree = false;
let win = false;
let pos = 10;
let posr = 10;
let mov = 1;
let iD = null;
let idEnm = null;
let idEnm1 = null;
let idEnm2 = null;
let idLog = null;
let idLog2 = null;
let idLog3 = null;
let enemySpeed = 10;
frog.style.top = `0px`;
frog.style.left = `225px`;

enmElOne.style.left = `300px`;


//car ids for setIntervals
let idCar1 = null

//test test
// let div = document.createElement('div');
// div.className = "#enemy";
// winCon.appendChild(div);
//class to create Cars
class enmCar {
  constructor(rowLoc, roadLoc, id) {
    this.rowLoc = rowLoc;
    this.roadLoc = roadLoc;
    this.id = id;
    this.class = "car"
  }
  // placeCar (){
  //   gameAr.appendChild()
  // }
  // function myMoveEnm(enm,id) {
  //   //console.log(enm);
  //   let pos = 500;
  //   clearInterval(id);
  //   id = setInterval(Drive, 5);
  //   function Drive() {
  //     if (pos == -50) {
  //       enm.style.left = `500px`;
  //       pos = 500;
  //     } else {
  //       pos--;
  //       enm.style.left = pos + "px";
  //       detect(enm);
  //     }
  //   }
  // }

}

//let car1 = new enmCar("road1","300px",idCar1);





console.log(winCon.offsetTop);

//listens to key stokes. basically the controls
document.addEventListener("keydown", moveFrg);

btnElO.addEventListener("click", function(){
   myMoveEnm(enmElOne, idEnm, 300);
})
btnElTW.addEventListener("click", function(){
  myMoveEnm(enmElTwo, idEnm1, 500);
})
btnElTH.addEventListener("click", function(){
  myMoveEnm(enmElThree, idEnm2, 500);
})

myMoveTree(log1,idLog);
myMoveTree(log3,idLog3);
myMoveTreeL(log2,idLog2);



//restarts Game
function init(){
  frog.style.top = `0px`;
  frog.style.left = `225px`;
  console.log("init");
  alive = true;
  win = false;
  //display.innerHTML = "Let's Play Frogger"
}



//renders Lose or win for right now
function render(){
  document.addEventListener("keydown", moveFrg);
  if(alive === false){
    display.innerHTML = "You Lost";
    init();
  }
  if(win === true){
    display.innerHTML = "You are the Best";
    init();
  }
}



//function that gives frog smooth hop
function frgHop(directs, cangeVal) {
  
  if (mov === 50) {
    console.log(frog.offsetTop);
    console.log(winCon.offsetTop);
    clearInterval(iD);
    if(frog.offsetTop === winCon.offsetTop){
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

//function that moves frog
function moveFrg(e) {
  document.removeEventListener("keydown", moveFrg, false);
  mov = 1;

  //depending on which keystroke you hit its runs a setInterval thats "hops" to
  //its location
  if (e.key === "s") {
    iD = setInterval(frgHop, 5, "down", frog.style.top);
  } else if (e.key === "d") {
    iD = setInterval(frgHop, 5, "right", frog.style.left);
    // frog.style.left = `${parseInt(frog.style.left) + mov}px`;
  } else if (e.key === "a") {
    iD = setInterval(frgHop, 5, "left", frog.style.left);
  } else if (e.key === "w") {
    if (frog.style.top != `0px`) {
      iD = setInterval(frgHop, 5, "up", frog.style.top);
    }
  }
}

//moves ennemy/car accross screen right to Left
function myMoveEnm(enm,id,posistion) {
  //console.log(enm);
  let pos = posistion;
  clearInterval(id);
  id = setInterval(Drive, 5);
  function Drive() {
    if (pos == -50) {
      enm.style.left = `500px`;
      pos = 500;
    } else {
      pos--;
      enm.style.left = pos + "px";
      detect(enm);
    }
  }
}




//moves tree accross screen left to right
function myMoveTree(enm,id) {
  //console.log(enm);
  let pos = 500;
  clearInterval(id);
  id = setInterval(Drive, 15);
  function Drive() {
    if (pos == -100) {
      enm.style.left = `500px`;
      pos = 500;
    } else {
      pos--;
      enm.style.left = pos + "px";
      detectOnTree(enm);
    }
  }
}

function myMoveTreeL(enm,id) {
  //console.log(enm);
  let pos = -150;
  clearInterval(id);
  id = setInterval(Drive, 15);
  function Drive() {
    if (pos == 500) {
      enm.style.left = `-150px`;
      pos = -150;
    } else {
      pos++;
      enm.style.left = pos + "px";
      detectOnTree(enm);
    }
  }
}


//enemy dectect function to see if the car hit the frog
function detect(en) {
  // if (frog.offsetTop > 37 && frog.offsetTop < 133) {
    if (frog.offsetTop >= en.offsetTop && frog.offsetTop <= parseInt(en.offsetTop) + 49 ){
    if (
      parseInt(frog.offsetLeft) + 50 === en.offsetLeft ||
      parseInt(frog.offsetLeft) === en.offsetLeft
    ) {
      alive = false;
      render()
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

function detectOnTree(en) {
  // if (frog.offsetTop > 37 && frog.offsetTop < 133) {
    if (frog.offsetTop >= en.offsetTop && frog.offsetTop <= parseInt(en.offsetTop) + 49 ){
    if (
      parseInt(frog.offsetLeft) > en.offsetLeft && parseInt(frog.offsetLeft) < parseInt(en.offsetLeft +150)
    ) {
      console.log("on tree");
    }else{
      console.log("you drowned");
      alive = false;
      render();
    }
  }
}
