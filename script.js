const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberVal(num) {
	// replace the current dispaly value if first value is entered
	if (awaitingNextValue) {
		calculatorDisplay.textContent = num;
		awaitingNextValue = false;
	} else {
		// if the current display valure is 0
		const displayVal = calculatorDisplay.textContent;

		calculatorDisplay.textContent = displayVal === "0" ? num : displayVal + num;
	}
}
function addDecimal() {
	// if operator preseed dont add decimal
	if (awaitingNextValue) return;

	// if no decimal add one
	if (!calculatorDisplay.textContent.includes("."))
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}

// calculate first and sec value
const calculate = {
	"/": (firstNumber, secondNumber) => firstNumber / secondNumber,

	"*": (firstNumber, secondNumber) => firstNumber * secondNumber,

	"+": (firstNumber, secondNumber) => firstNumber + secondNumber,

	"-": (firstNumber, secondNumber) => firstNumber - secondNumber,

	"=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
	const currentValue = Number(calculatorDisplay.textContent);
	// to prevent multiple operator
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}
	// assign first value if no value
	if (!firstValue) firstValue = currentValue;
	else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
	}

	awaitingNextValue = true;
	operatorValue = operator;
}
// add event listner for number , operator , decimal
inputBtns.forEach((e) => {
	if (e.classList.length === 0)
		e.addEventListener("click", () => sendNumberVal(e.value));
	else if (e.classList.contains("operator"))
		e.addEventListener("click", () => useOperator(e.value));
	else if (e.classList.contains("decimal"))
		e.addEventListener("click", () => addDecimal());
});
// reset display
function resetAll() {
	firstValue = 0;
	operatorValue = "";
	awaitingNextValue = false;
	calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);
