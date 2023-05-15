
function verifyRequired(element) {

    if (element.value == '') {
        element.setAttribute('style', 'border-color:red')
    } else {
        element.removeAttribute('style')
    }
}

function verifyInterests() {
    const interests = document.querySelectorAll('#interests')

    for (let i = 0; i < interests.length; i++) {
        if (interests[i].checked) {
            return true
        }
    }
    return false
}

function verifyNotEmpty(element) {
    if (element.value == '') {
        element.setAttribute('style', 'border-color:red')
        return false
    }
    return true
}

function showErrors(errors) {
    let messageError = 'Se encontraron los siguientes errores en el formulario: \n'
    for (i = 0; i < errors.length; i++) {
        // messageError = messageError + errors[i] + '\n'
        messageError += errors[i] + '\n'
    }
    alert(messageError)
}

function register() {

    let errors = []

    if (!verifyInterests()) {
        errors.push('Debe seleccionar por lo menos un interés')
    }
    const email = document.getElementById('email')
    if (!verifyNotEmpty(email)) {
        errors.push('Debe escribir un correo electrónico')
    }

    const name = document.getElementById('name')
    if (!verifyNotEmpty(name)) {
        errors.push('Debe escribir un nombre')
    }
    const birthDate = document.getElementById('birthdate')
    if (!verifyNotEmpty(birthDate)) {
        errors.push('Debe seleccionar una fecha de nacimiento')
    }
    const sex = document.getElementById('sex')
    if (!verifyNotEmpty(sex)) {
        errors.push('Debe seleccionar un sexo')
    }

    if (errors.length > 0) {
        showErrors(errors)
        return
    }

    const interests = document.querySelectorAll('#interests')

    let selectedInterests = []

    for (let i = 0; i < interests.length; i++) {
        if (interests[i].checked) {
            selectedInterests.push(interests[i].value)
        }
    }

    const request = {
        email: email.value,
        name: name.value,
        birthdate: birthDate.value,
        sex: sex.value,
        interests: selectedInterests
    }

    users.push(request)

    alert('Usted se ha registrado satisfactoriamente')
    //addToUsertList(request)
    fetch("http://localhost/api/", {method: "POST", body: JSON.stringify(request) })
        .then(res => res.json())
        .then(data => {
            addToUsertList(request)
        })
        .catch(e => console.log(e))
}

function addToUsertList(request) {
    const TABLE = document.getElementById("usersTable")
    const tr = document.createElement("tr")
    for ([key, value] of Object.entries(request)) {
        const td = document.createElement("td")


        if (key === "interests") {
            const interests = {
                "1": "Computacion",
                "2": "Deportes",
                "3": "Musica",
                "4": "Videojuegos",
            }
            const interestsArray = value.map(interest => interests[interest])
            td.innerHTML = `${interestsArray.join(", ")}`
        }
        else if (key === "sex") {
            td.innerHTML = value == 1 ? "Hombre" : "Mujer"
        }
        else {
            td.innerHTML = `${value}`
        }
        tr.appendChild(td)
    }
    TABLE.appendChild(tr)
}
