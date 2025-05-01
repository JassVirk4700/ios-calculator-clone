// **Initial code of js for backup** 
let string = "0";
let display = document.getElementById("display");
let fade_display = document.getElementById("fade-display");
let buttons = document.querySelectorAll(".btn");
const operators = ["+", "-", "x", "÷", "%"];
let operator = ""; // Variable to store the operator clicked

display.innerHTML = string; // Display the initial value of string

// fun to remove the last character from the string
function removeCharacter(str) {
  let newString = str.slice(0, -1);
  return newString;
}

// main working of the calculator
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {

    let clickedButton = e.target.textContent; // Get the text content of the clicked button
      
    if (clickedButton == "=") {
        fade_display.innerHTML = string;
        string = eval(string);
        string = string.toString();
        display.innerHTML = string;
    }

    else if (clickedButton == "AC") {
        string = "0";
        display.innerHTML = string;
        fade_display.innerHTML = "";
    }
        
    else if (clickedButton == "←") {
        if (string.length == 1) {
            if (string == "0") {
                string = "0";
                display.innerHTML = string;
            }
            else {
                string = "0";
                display.innerHTML = string;
            }
        }
        else if (string.length > 1) {
            new_str = removeCharacter(string);
            string = new_str;
            display.innerHTML = string;
        }
    }

    // If the user clicks on a operator button
    else if (operators.includes(clickedButton)) {
        const lastChar = string.slice(-1); 
        operator = clickedButton; // Get the operator clicked

        // Convert visual operator to evaluation operator
        if (operator === "x") operator = "*";
        if (operator === "÷") operator = "/";
        if (operator === "%") operator = "/100*";

        if (!["+", "-", "*", "/", "%"].includes(lastChar)) {
            // No operator at the end, just append converted operator
            string += operator;
            display.innerHTML = string;
        } else {
            // Replace last operator with the new one
            string = string.slice(0, -1) + operator;
            display.innerHTML = string;
        }

    }
        
    // If the user clicks on a number button
    else {
        // If user clicks on 0, and the string is already 0, do not add another 0 or operator
        if (string.length == 1) {
            if (string == "0") {
                if (clickedButton == "0") {
                    string = "0";
                    display.innerHTML = string;
                } else if (clickedButton == ".") {
                    string += ".";
                    display.innerHTML = string;
                } else if (clickedButton == "00") {
                    string = "0";
                    display.innerHTML = string;
                } else if (clickedButton == "+" || clickedButton == "-" || clickedButton == "÷" || clickedButton == "x" || clickedButton == "%") {
                    string = "0";
                    display.innerHTML = string;
                }
                else {
                    string = clickedButton;
                    display.innerHTML = string;
                }
            }
            else {
                string += clickedButton;
                display.innerHTML = string;
                }
        }
            
        // If length is not equals to 1, add the number to the string
        else {
            string = string + clickedButton;
            display.innerHTML = string;
        }
    }
  });
});
