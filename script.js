const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

function sendNumberVal(num) {
	// if the current display valure is 0
	const displayVal = calculatorDisplay.textContent;

	calculatorDisplay.textContent = displayVal === "0" ? num : displayVal + num;
}

// add event listner for number , operator , decimal
inputBtns.forEach((e) => {
	if (e.classList.length === 0)
		e.addEventListener("click", () => sendNumberVal(e.value));
	else if (e.classList.contains("operator"))
		e.addEventListener("click", () => sendNumberVal(e.value));
	else if (e.classList.contains("decimal"))
		e.addEventListener("click", () => sendNumberVal(e.value));
});

// reset display
function resetAll() {
	calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);
