let string = "0";                 // Used internally for evaluation
let displayString = "0";         // What user sees
let display = document.getElementById("display");
let fade_display = document.getElementById("fade-display");
let buttons = document.querySelectorAll(".btn");
const operators = ["+", "-", "x", "÷", "%"];
let operator = "";

display.innerHTML = displayString;

// fun to remove the last character from a string
function removeCharacter(str) {
  return str.slice(0, -1);
}

// main working of the calculator
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    let clickedButton = e.target.textContent;

    if (clickedButton == "=") {
      fade_display.innerHTML = displayString;
      string = eval(string).toString();
      displayString = string;
      display.innerHTML = displayString;
    }

    else if (clickedButton == "AC") {
      string = "0";
      displayString = "0";
      display.innerHTML = displayString;
      fade_display.innerHTML = "";
    }

    else if (clickedButton == "←") {
      if (string.length === 1) {
        string = displayString = "0";
      }
      else {
        string = removeCharacter(string);
        displayString = removeCharacter(displayString);
      }
      display.innerHTML = displayString;
    }

    // If the user clicks an operator
    else if (operators.includes(clickedButton)) {
      console.log('clicked operator:', clickedButton);
      const lastChar_string = string.slice(-1);
      operator = clickedButton;

      let evalOperator = operator;
      if (operator === "x") evalOperator = "*";
      if (operator === "÷") evalOperator = "/";
      if (operator === "%") evalOperator = "/100*";

      if (!["+", "-", "*", "/", "%"].includes(lastChar_string)) {
        string += evalOperator;
        displayString += operator;
      }
      else {
        string = string.slice(0, -1) + evalOperator;
        displayString = displayString.slice(0, -1) + operator;  
      }
      display.innerHTML = displayString;
    }

    // If the user clicks a number or decimal
    else {
      if (displayString.length === 1 && displayString === "0") {
        if (clickedButton === "0" || clickedButton === "00") {
          // Stay at 0
        }
        else if (clickedButton === ".") {
          string += ".";
          displayString += ".";
        }
        else if (operators.includes(clickedButton)) {
          // Do nothing if operator is clicked first
        }
        else {
          string = clickedButton;
          displayString = clickedButton;
        }
      }
      else {
        string += clickedButton;
        displayString += clickedButton;
      }
        
      display.innerHTML = displayString;
    }
  });
});
// Add event listener for keyboard input