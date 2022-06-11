const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');
const buttonSubmit = document.getElementById('btn-submmit')
const form = document.querySelector('form');
const messageAlert = document.querySelector('.message-alert')

//* Result to verify all inputs and textarea
let result = []

//* regular phrases OBJECT
const expReg = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	password: /^.{4,12}$/ // 4 a 12 digitos.
}

//* transform obejct to array
const arrayExpReg = Object.values(expReg)

//* function to validate all inputs
function validateInput() {
    //* cicle for verify all inputs use regular expressions and push result to result array
    for (let index = 0; index < inputs.length; index++) {
        result.push(arrayExpReg[index].test(inputs[index].value))
        if (result[index] === false) {
            return false
        }
    }
    //* verify if textarea is empty
    textarea.value.length > 0 ? result.push(true) : result.push(false)

    //* validation result
    if (result[0] && result[1] && result[2] && result[3] && result[4]) {
        return true
    }
}

//* button for subbmit form
buttonSubmit.addEventListener('click', (e) => {
    //* function verify if the function 
    e.preventDefault()
    if (validateInput()) {
        form.submit()
    } else {
        //* Clean form if the result is false
        sendMessageAlert()
        form.reset()
        result = []
    }
})

inputs[0].addEventListener('keyup', () => {
    messageAlert.classList.remove('active')
})

function sendMessageAlert(e) {
    messageAlert.classList.add('active')
}