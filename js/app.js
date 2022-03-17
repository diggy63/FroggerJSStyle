const frog = document.querySelector('#square');
const btnEl = document.querySelector('button');
let pos = 10;
let posr = 10;
let mov = 1;
let iD = null;
document.addEventListener('keydown', move);

frog.style.top = `20px`;
frog.style.left = `20px`;

console.log(parseInt(frog.style.top));
//console.dir(frog);

btnEl.addEventListener("click", handleClick);

function handleClick(e){
    frog.style.top = `0px`;
    frog.style.left = `0px`;
    console.log("work")
}


function frgHop(directs,cangeVal){ 
    if(mov === 40){
        clearInterval(iD); 
    }
    if(directs === "down"){
    console.log(directs);
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



// function right(){
//     frog.style.left = `${posr}px`;
//     posr += 10;
// }
function move(e) {
    mov = 1;
    //clearInterval(iD);
    if (e.key === 's') {
    iD = setInterval(frgHop, 15, "down" ,frog.style.top);
    }else if (e.key === 'd') {
    iD = setInterval(frgHop, 15,"right", frog.style.left);
    // frog.style.left = `${parseInt(frog.style.left) + mov}px`;
   }else if (e.key === 'a') {
    iD = setInterval(frgHop, 15,"left", frog.style.left);
   }else if (e.key === 'w') {
    iD = setInterval(frgHop, 15,"up", frog.style.top);
   }
}

    
    
