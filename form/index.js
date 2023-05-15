import { baseUrl } from "./config.js";
const schema = {
    name: '',
    email: '',
    birthdate: '',
    sex: '',
    interests: []
}

const $ = (selector) => document.querySelector(selector)
const $all = (selector) => document.querySelectorAll(selector)

const saveUser = () => new Promise((resolve, reject) => {
    fetch(baseUrl, { method: "POST", body: JSON.stringify(schema) })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(e => reject(e))
})

const verifyBeforeToSent = () => {
    let numErrors = 0
    const setError = (name) => {
        const field = $(`input[name="${name}"]`)
        field.style.borderColor = "red"
        field.style.outlineColor = "red"
        const span = $(`span[error="${name}"]`)
        span.style.color = "rgb(255,0,0)"
        span.innerHTML = "Campo Obligatorio"
    }
    if (!schema.name) {
        setError('name')
        numErrors++;
    }
    if (!schema.email) {
        setError('email')
        numErrors++;
    }
    if (!schema.birthdate) {
        setError('birthdate')
        numErrors++;
    }
    if (!schema.sex) {
        const span = $(`span[error="sex"]`)
        span.style.color = "rgb(255,0,0)"
        span.innerHTML = "Campo Obligatorio"
        numErrors++;
    }
    if (schema.interests.length === 0) {
        const span = $(`span[error="interests"]`)
        span.style.color = "rgb(255,0,0)"
        span.innerHTML = "Escoja almenos un interes"
        numErrors++;
    }
    return numErrors === 0
}

const showMessage = (message, type) => {
    const types = {
        error: 'red',
        exito: 'green'
    }
    const popup = document.createElement('div')
    const p = document.createElement('p')

    popup.style.backgroundColor = types[type];
    popup.style.color = "#fff";
    popup.style.position = "absolute";
    popup.style.top = "2rem";
    popup.style.right = "2rem";
    popup.style.padding = "1rem 2rem";
    popup.style.fontSize = "1rem";
    popup.style.borderRadius = "6px";
    p.innerText = message;
    popup.appendChild(p)
    body.appendChild(popup)
    setTimeout(() => {
        popup.remove()
    }, 2000)
}

const form = $('.userForm')
const body = $('body')

form.addEventListener('change', handleErrorsForm)
form.addEventListener('keydown', handleErrorsForm)
form.addEventListener('keyup', handleErrorsForm)

function handleErrorsForm(e) {
    let newInterests = []
    const span = $(`span[error="${e.target.name}"`)
    const type = e.target.getAttribute('type')
    const verifyErrors = () => {
        const field = e.target
        if (type === 'checkbox') {
            if (field.checked) {
                newInterests.push(e.target.value);
            } else {
                const filteredNewInterests = schema.interests.filter(interest => interest !== e.target.value)
                newInterests = filteredNewInterests
            }

            if (newInterests.length === 0) {
                span.style.color = "rgb(255,0,0)"
                span.innerHTML = "Almenos escoja un interes"
            } else {
                span.style.color = "#000"
                span.innerHTML = ""
            }

        } else {
            if (!field.value.trim()) {
                field.style.borderColor = "red"
                field.style.outlineColor = "red"
                span.style.color = "rgb(255,0,0)"
                span.innerHTML = "Campo Obligatorio"
            } else {
                field.style.borderColor = 'black'
                field.style.outlineColor = "blue"
                span.style.color = "rgb(0,0,0)"
                span.innerHTML = ""
            }
        }

    }

    verifyErrors()

    if (e.target.name !== "interests") {
        schema[e.target.name] = e.target.value
    } else {
        schema.interests = newInterests
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    verifyBeforeToSent()
    if (verifyBeforeToSent()) {
        const res = await saveUser()
        if (res.status === "Exito") {
            showMessage('Se ha agregado el usuario con exito', "exito")
        } else {
            showMessage('No se ha agregado el usuario', "error")
        }
    }
})



// function register() {
//     const email = document.getElementById('email')
//     const name = document.getElementById('name')
//     const birthDate = document.getElementById('birthdate')
//     const sex = document.getElementById('sex')
//     const interests = document.querySelectorAll('#interests');

//     errors = []

//     if (!verifyRequired(email)) {
//         errors.push('Falta el email')
//     }

//     if (!verifyRequired(name)) {
//         errors.push('Falta el nombre')
//     }

//     if (!verifyRequired(birthDate)) {
//         errors.push('Falta la fecha de nacimiento')
//     }

//     if (!verifyAge(birthDate.value)) {
//         errors.push('Usted debe ser mayor de edad para poder registrarse')
//     }

//     if (!verifyRequired(sex)) {
//         errors.push('Falta el sexo')
//     }

//     if (!verifyRequiredInterests(interests)) {
//         errors.push('Debe seleccionar por lo menos una categoría de interés')
//     }

//     if (errors.length > 0) {
//         setDialog()
//         openDialog()
//         return
//     }

//     const request = {
//         name: name.value,
//         email: email.value,
//         birthdate: birthDate.value,
//         sex: sex.value,
//         interests: Array.from(interests).filter(interest => interest.checked).map(i => i.value)
//     }

//     console.log(request)


// }

// function verifyRequired(element) {
//     if (element.value == '') {
//         element.setAttribute('class', 'required-failed')
//         return false;
//     }
//     element.removeAttribute('class')
//     return true;
// }

// function verifyRequiredInterests(interests) {
//     let result = false
//     interests.forEach(interest => {
//         if (interest.checked) {
//             result = true
//         }
//     })
//     return result
// }

// function verifyAge(stringbirthDate) {
//     const birthDate = new Date(stringbirthDate)
//     const now = new Date()
//     const enlapsedTime = now - birthDate
//     const age = enlapsedTime / (1000 * 60 * 60 * 24 * 365.25)
//     if (age < 18) {
//         return false;
//     }
//     return true;
// }


// function setDialog() {
//     html = '<ol>'
//     errors.forEach(error => {
//         html += '<li>' + error + '</li>'
//     })
//     html += '</ol>'
//     const dialogForm = document.querySelector('.dialog-message')
//     dialogForm.innerHTML = html
// }

// function openDialog() {
//     const dialog = document.getElementById('dialog')
//     dialog.setAttribute('style', 'display:flex')
// }

// function closeDialog() {
//     const dialog = document.getElementById('dialog')
//     dialog.setAttribute('style', 'display:none')
// }

