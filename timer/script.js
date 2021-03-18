//declaration of the seconds, minutes and hours
let seconds = 0; 
let min = 0;
let hours = 0;
 
const refreshTimer =()=>{ 
    let timer = document.querySelector(".timer"); //gets the timer element
    timer.textContent = `${hours < 10? '0' + hours : hours}:${min < 10? '0' + min : min}:${seconds < 10? '0' + seconds : seconds}`; // show the hours, and if it's less than 10, adds a 0 to the number
}
refreshTimer();

const add1sec = ()=>{ //
    seconds++; //adds 1 second to the seconds timer
    if (seconds === 60){ // if theres 60 seconds, reset tha value to zero and adds 1 min
        seconds = 0;
        min++;
    }
    if (min === 60){ //if theres 60 minutes, reset tha value to zero and adds 1 hour
        min = 0;
        hours++;
    }
}

let time; // sets a variable to store the interval in the global scope
//adds 1 second to the secs each second and refresh the screen
const startCount = ()=> {
    pauseCount();
    stopBlinkText();
    time = setInterval(()=>{ add1sec(); refreshTimer();}, 1000);
    return time; //return the interval to the time variable
}

const pauseCount = ()=> clearInterval(time); //stop the count

const resetCount = ()=>{ //stops the count and reset the time to zero
    pauseCount();
    stopBlinkText();
    seconds = 0; 
    min = 0;
    hours = 0;
    refreshTimer();
}
// gets the buttons
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
const buttonsContainer = document.querySelector(".buttons-container");

startButton.addEventListener("click", startCount);
pauseButton.addEventListener("click", pauseCount);
pauseButton.addEventListener("click", ()=>{
    stopBlinkText();
    blinkText = setInterval(()=>{
        let timer = document.querySelector(".timer");
        timer.classList.toggle("timer-freezed");
    }, 1000);
    return blinkText;
})
resetButton.addEventListener("click", resetCount);
buttonsContainer.addEventListener("click", (e)=>{
    turnButtonsOff();
    turnButtonsOn(e.target.className);
})

function clickedButton(e){
    turnButtonsOff;
    turnButtonsOn(e.target)
}

function turnButtonsOff(){
    startButton.classList.remove("start-button-on");
    pauseButton.classList.remove("pause-button-on");
    resetButton.classList.remove("reset-button-on");
}

function turnButtonsOn(button){
    Button = document.querySelector(`.${button}`);
    Button.classList.add(`${button}-on`);
}

const stopBlinkText = ()=>{
    clearInterval(blinkText);
    let timer = document.querySelector(".timer");
    timer.classList.remove("timer-freezed");
}

let blinkText;