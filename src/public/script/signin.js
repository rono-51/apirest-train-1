//*Html elements
const inputs = document.querySelectorAll('input');
const button = document.querySelector('.btn-submmit');
const form = document.querySelector('form')
const message = document.querySelector('.message-error')

//*Results from the validation
let eachResult = []

//*Regular expressions
expReg = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/
}

//*Regular expresions in an array
const arrayExpReg = Object.values(expReg);

//*Validation function
function validationForm() {
    //*Cicle for validation each input with index
    for(let index = 0; index < inputs.length; index++) {
        eachResult.push(arrayExpReg[index].test(inputs[index].value))
        if(eachResult[index] === false) {
            return false
        }
    }
    //*Comprobation
    if (eachResult[0] && eachResult[1]) {
        return true
    }
}

//*Submmit button 
button.addEventListener('click', (e) => {
    e.preventDefault()
    if (validationForm()) {
        form.submit()
    } else {
        form.reset()
        eachResult = []
    }
})

inputs[0].addEventListener('keyup', () => {
    message.classList.add('active')
})