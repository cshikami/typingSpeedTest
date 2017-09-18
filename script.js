const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	if (time <= 9) {
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {

	let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++; //every thousandth of a second, add 1

	timer[0] = Math.floor((timer[3]/100)/60); //timer[3] (every thousandth of a second) / 100 is every 1 second / 60 seconds is minutes) 
	timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60)); // (every thousandth of a second) / 100 is every 1 second - (every thousandth of a second) / 100 is every 1 second / 60 seconds is minutes * 60 seconds is seconds) 
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); //every thousandth of a second -   (every thousandth of a second) / 100 is every 1 second - (every thousandth of a second) / 100 is every 1 second / 60 seconds is minutes * 60 seconds is seconds) * 100 is hundredths of a second -    (every thousandth of a second) / 100 is every 1 second / 60 seconds is minutes) * 6000, so every time minutes reaches 100 so we don't count upwards from there (6000 is from 60 * 100 (for each second, go up to 100))
}

// Match the text entered with the provided text on the page:
function spellCheck() {
	let textEntered = testArea.value;
	let originTextMatch = originText.substring(0, textEntered.length);

	if (textEntered === originText) {
		clearInterval(interval);
		testWrapper.style.borderColor = "#429890";

	} else {
		if (textEntered == originTextMatch) {
			testWrapper.style.borderColor = "#65CCf3";
		} else {
			testWrapper.style.borderColor = "#E95D0F";
		}
	}
}

// Start the timer:
function start() {
	let textEnteredLength = testArea.value.length;
	if (textEnteredLength === 0 && !timerRunning) { //textEnteredLength is 0 and timerRunning is false
		timerRunning = true;
		interval = setInterval(runTimer, 10); //runTimer every 10 milliseconds (thousandth of a second)
	}
}

// Reset everything:
function reset() {
	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0];
	timerRunning = false;

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
