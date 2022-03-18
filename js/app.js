const frog = document.querySelector('#frog');
const btnEl = document.querySelector('button');
const enmEl = document.querySelector('#enemy')
let pos = 10;
let posr = 10;
let mov = 1;
let iD = null;
let idEnm = null;
let enemySpeed = 10;
frog.style.top = `0px`;
frog.style.left = `0px`;

//listens to key stokes. basically the controls
document.addEventListener('keydown', moveFrg);
btnEl.addEventListener("click", myMove);

//function that gives frog smooth hop
function frgHop(directs,cangeVal){ 
    if(mov === 50){
        clearInterval(iD); 
    }
    if(mov === 120){
        clearInterval(iD); 
    }

    if(directs === "down"){
   // console.log(directs);
    frog.style.top = parseInt(cangeVal) + mov + `px`;
    mov++;
    }else if(directs === "right"){
        frog.style.left = parseInt(cangeVal) + mov + `px`;
        mov++;
    }else if(directs === "left"){
        frog.style.left = parseInt(cangeVal) - mov + `px`;
        mov++;
    }else if(directs === "up"){
        frog.style.top = parseInt(cangeVal) - mov + `px`;
        mov++;
    }
}



//function that moves from
function moveFrg(e) {
    mov = 1;
    //clearInterval(iD);
    if (e.key === 's') {
    iD = setInterval(frgHop, 5, "down" ,frog.style.top);
    }else if (e.key === 'd') {
    iD = setInterval(frgHop, 5,"right", frog.style.left);
    // frog.style.left = `${parseInt(frog.style.left) + mov}px`;
   }else if (e.key === 'a') {
    iD = setInterval(frgHop, 5,"left", frog.style.left);
   }else if (e.key === 'w') {
     if(frog.style.top != `0px`){ 
    iD = setInterval(frgHop, 5,"up", frog.style.top);
   }
  }
}

    
//moves ennemy/car accross screen
function myMove(e) {   
    let pos = 500;
    clearInterval(idEnm);
    idEnm = setInterval(frame, 10);
    function frame() {
      if (pos == 0) {
        enmEl.style.left = `500px`;
        pos = 500;
      } else {
        pos--; 
        enmEl.style.left = pos + 'px'; 
        detect(enmEl);
      }
    }
  }

//enemy dectect function to see if they hit the frog
function detect(en){
  let legnth = 5;
  console.log(frog.offsetTop > 85);
  if(frog.offsetTop > 37 && frog.offsetTop < 133 ){

  if((parseInt(frog.offsetLeft) + 50) === en.offsetLeft || (parseInt(frog.offsetLeft) + 25) === en.offsetLeft ){
    console.log(frog.offsetLeft);
    console.log(en.offsetLeft);
    console.log("hit");
  }
  // if(frog.offsetTop > 25 && frog.offsetTop < 90 ){

  //   if((parseInt(frog.offsetleft)) === en.offsetLeft || (parseInt(frog.offsetLeft) + 50) === en.offsetLeft ){
  //     console.log(frog.offsetLeft);
  //     console.log(en.offsetLeft);
  //     console.log("hit");
  //   }
  // }
}
 }


