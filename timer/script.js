//declaration of the seconds, minutes and hours
let seconds = 0; 
let min = 0;
let hours = 0;

const refreshTimer =()=>{ 
    let timer = document.querySelector(".timer"); //gets the timer element
    timer.textContent = `${hours < 10? '0' + hours : hours}:${min < 10? '0' + min : min}:${seconds < 10? '0' + seconds : seconds}`; // shows the hours, and if it's less than 10, adds a 0 to the number
}
refreshTimer(); //the program starts refreshing the timer

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
    pauseCount(); //start pausing the time if the button is already clicked, preventing possible bugs
    stopBlinkText(); //stop the blinking text if the timer was paused
    time = setInterval(()=>{ add1sec(); refreshTimer();}, 1000); //start counting the time and refresh the screen every second
    return time; //return the interval to the time variable
}

const pauseCount = ()=> clearInterval(time); //stop the count of the time

const resetCount = ()=>{ //stops the count and reset the time to zero
    pauseCount(); //stops the count
    stopBlinkText(); //stops the blinking text if was paused
    //reset the time
    seconds = 0; 
    min = 0;
    hours = 0;
    refreshTimer(); //update the timer
}

function clickedButton(e){
    turnButtonsOff(); //turns every button to the default color, preventing two buttons to be active at the same time
    turnButtonsOn(e.target.className); //selects the chosen color and turn to the active color
}

function turnButtonsOff(){ //turns each button to the default color
    startButton.classList.remove("start-button-on");
    pauseButton.classList.remove("pause-button-on");
    resetButton.classList.remove("reset-button-on");
}

function turnButtonsOn(button){ //receives an class name as a parameter
    Button = document.querySelector(`.${button}`); //selects the element by the class name
    Button.classList.add(`${button}-on`); //adds the chosen button to another color
}

let blinkText; //global variable asigned to the interval

const stopBlinkText = ()=>{ //stops the blinking text
    clearInterval(blinkText); //stops the blinking text
    let timer = document.querySelector(".timer"); //gets the timer element
    timer.classList.remove("timer-freezed"); //remove the colorful class
}


// gets the buttons and the buttons container
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
const buttonsContainer = document.querySelector(".buttons-container");

//events
startButton.addEventListener("click", startCount); //if the start button is clicked, start the count
pauseButton.addEventListener("click", pauseCount); //if the pause button is clicked, pause the count
pauseButton.addEventListener("click", ()=>{ //if the pause button is clicked, the text starts blink
    stopBlinkText(); // if already paused, stops the blinking text
    blinkText = setInterval(()=>{ 
        let timer = document.querySelector(".timer");
        timer.classList.toggle("timer-freezed");
    }, 1000); //each second, the color change to white/red
    return blinkText; //return the interval to the global scope, possibiliting to stop the interval
})
resetButton.addEventListener("click", resetCount); //if the reset button is clicked, reset the count
buttonsContainer.addEventListener("click", (e)=>{ //if any of the buttons is clicked, change the color of the chosen button
    clickedButton(e); //turns the chosen color to a different color
})