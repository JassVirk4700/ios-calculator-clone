let string = "0";                 // Used for evaluation
let displayString = "0";         // Visible to user
let display = document.getElementById("display");
const fade_display = document.getElementById("fade-display");
const buttons = document.querySelectorAll(".btn");
const operators = ["+", "-", "x", "÷", "%"];
let operator = "";

// *Initial display*
display.innerHTML = displayString;

// ---Essential Functions--- 

// To remove last character
function removeCharacter(str) {
  return str.slice(0, -1);
}

// To Prevent multiple decimals in a number group
function canAddDecimal() {
  const lastOperatorIndex = Math.max(
    ...operators.map(op => displayString.lastIndexOf(op))
  );
  const currentNumberSegment = displayString.slice(lastOperatorIndex + 1);
  return !currentNumberSegment.includes(".");
}

// To Handle operator conversion for string evaluation
function getEvalOperator(op) {
  if (op === "x" || op === "*") return "*";
  if (op === "÷") return "/";
  if (op === "%") return "/100*";
  return op;
}

// To Check if the character is an operator
function isOperator(char) {
    return ['+', '-', '×','*','/','÷','%','/100*','.'].includes(char);
}
  
// Equal symbol handling
function handleEqual() {
    const currentText = display.textContent.trim();
    const lastChar = currentText.slice(-1);

    // Check if last character is an operator
    if (isOperator(lastChar)) {
      return; // Do nothing
    }
    // Else evaluate the expression
    else {
      fade_display.innerHTML = displayString;
      string = eval(string).toString();
      displayString = string;
      display.innerHTML = displayString;
    }
  }
// ---End of essential functions---

// ---Main calculator logic---
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    let clickedButton = e.target.textContent;
    if (clickedButton === "=") {
        handleEqual();
    }

    else if (clickedButton === "AC") {
      string = "0";
      displayString = "0";
      fade_display.innerHTML = "";
      display.innerHTML = displayString;
    }

    else if (clickedButton === "←") {
      if (string.length === 1) {
        string = displayString = "0";
      } else {
        string = removeCharacter(string);
        displayString = removeCharacter(displayString);
      }
      display.innerHTML = displayString;
    }

    // Operator handling
    else if (operators.includes(clickedButton)) {
      const lastChar_string = string.slice(-1);
      operator = clickedButton;
      const evalOperator = getEvalOperator(operator);

      if (!["+", "-", "*", "/", "%"].includes(lastChar_string)) {
        string += evalOperator;
        displayString += operator;
      } else {
        string = string.slice(0, -1) + evalOperator;
        displayString = displayString.slice(0, -1) + operator;
      }
      display.innerHTML = displayString;
    }

    // Number or decimal input
    else {
      if (displayString === "0") {
        if (clickedButton === "0" || clickedButton === "00") {
          return;
        } else if (clickedButton === ".") {
          string += ".";
          displayString += ".";
        } else if (operators.includes(clickedButton)) {
          return;
        } else {
          string = clickedButton;
          displayString = clickedButton;
        }
      } else {
        if (clickedButton === "." && !canAddDecimal()) {
          return; // Prevent extra decimal in current number
        }
        string += clickedButton;
        displayString += clickedButton;
      }
      display.innerHTML = displayString;
    }
  });
});

// ---End of main calculator logic---

// ---Keyboard input support---

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const isNumber = !isNaN(key) || key === ".";
  const isOperator = ["+", "-", "*", "/", "x", "÷"].includes(key);

  const relevantKeys = [
    "Enter", "Backspace", "Escape", "+", "-", "*", "/", ".", 
    ...Array(10).map(n => n.toString())
  ];
  if (relevantKeys.includes(key)) event.preventDefault();

  if (key === "Enter") {
    fade_display.innerHTML = displayString;
    string = eval(string).toString();
    displayString = string;
    display.innerHTML = displayString;
  } 
  else if (key === "Backspace") {
    if (string.length === 1) {
      string = displayString = "0";
    } else {
      string = removeCharacter(string);
      displayString = removeCharacter(displayString);
    }
    display.innerHTML = displayString;
  } 
  else if (key === "Escape") {
    string = "0";
    displayString = "0";
    display.innerHTML = displayString;
    fade_display.innerHTML = "";
  } 
  else if (isNumber || isOperator) {
    let clickedButton = key;
    if (key === "*") clickedButton = "x";
    else if (key === "/") clickedButton = "÷";

    const buttonElement = Array.from(buttons).find((button) => button.textContent === clickedButton);
    if (buttonElement) {
      buttonElement.click();
    }
  }
});

// ---End of Keyboard input support---

// ---Auto-scrolling to left-end (logic)---

// Observer for auto-scrolling when content updates
const scroll_div = document.getElementById("query-result");
const observer = new MutationObserver(() => {
    scroll_div.scrollLeft = scroll_div.scrollWidth;
  });
  
// Start observing text/content changes
observer.observe(scroll_div, {
    childList: true,       // Listen for child text updates
    subtree: true,         // Observe deeper elements (e.g., h3 inside)
    characterData: true    // Detect direct text changes
 });
  
// ---End of auto-scrolling logic---