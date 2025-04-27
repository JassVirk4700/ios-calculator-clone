let string = "";
let buttons = document.querySelectorAll('.btn')
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if(e.target.textContent == '=') {
            
        }
        string = string + e.target.textContent;
        document.querySelector('input').value = string;
    })
})