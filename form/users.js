import { baseUrl } from "./config.js";


let users = []
const interests = {
    "1": "Computacion",
    "2": "Deportes",
    "3": "Musica",
    "4": "Videojuegos",
}

const inSpanishPlease = {
    "ID":"Id",
    "USERNAME": "Nombre",
    "EMAIL": "Email",
    "BIRTHDAY": "Fecha de nacimiento",
    "SEX": "Genero",
    "INTERESTS": "Intereses",
}

const actionsStyles = "display:flex;gap:1rem;padding:0.5rem 1rem;"

const $ = (selector) => document.querySelector(selector)

const TABLE = $("#usersTable")
const updateModal = $("#userUpdate")
const deleteModal = $("#userDelete")
const cancelUpdate = $("#cancelUpdate")
const cancelDelete = $("#cancelDelete")
const updateFormData = $(".userData")
const deleteFormData = $(".u")

const getInterests= () => {
const interests = []
const inputsInterest = document.querySelectorAll("#interests")
inputsInterest.forEach(interest =>{
  if(interest.checked){
    interests.push(interest.value)
  }
})
return interests
}

const showModalUpdate = async (i) => {
    const user = users[i]
    updateFormData.innerHTML = ""
    for (const [key, value] of Object.entries(user)) {
        const label = document.createElement("label")
        label.setAttribute("htmlFor", key)
        label.style.cssText="display:grid"
        label.style.width= "100%"
        label.style.gridTemplateColumns = "1fr 1fr"
        const fieldName = document.createElement("label")
        fieldName.innerText = inSpanishPlease[key] + ":"
        label.appendChild(fieldName)
        let field = null;

        if (key !== "SEX" || key !== "INTERESTS") {
            field = document.createElement("input")
            field.placeholder = ""
            const type = key === "BIRTHDAY" ? "date" : "text"
            field.setAttribute("type", type)
            field.setAttribute("name", key.toLowerCase())
            field.setAttribute("id", key.toLowerCase())
            field.value = value
        }

        if (key === "SEX") {
            field = document.createElement("select")
            field.setAttribute("name", key.toLowerCase())
            field.setAttribute("id", key.toLowerCase())
            field.innerHTML = `
            <option value="1" ${1 == value && "selected"}>Masculino</option>
            <option value="2" ${2 == value && "selected"}>Femenino</option>
            `
        }

        if (key === "INTERESTS") {
            field = document.createElement("div")
            field.setAttribute("class", "checks")
            const interests = value.split(",").map(i => Number(i))
                field.innerHTML = `
                <label>Intereses:</label>
                <label class="pointer">
                  <input
                    type="checkbox"
                    name="interests"
                    id="interests"
                    ${interests.includes(1) && "checked"}
                    value="1"
                  />
                  Computación
                </label>
                <label class="pointer">
                  <input
                    type="checkbox"
                    name="interests"
                    id="interests"
                    ${interests.includes(2) && "checked"}
                    value="2"
                  />
                  Deportes
                </label>
                <label class="pointer">
                  <input
                    type="checkbox"
                    name="interests"
                    id="interests"
                    ${interests.includes(3) && "checked"}
                    value="3"
                  />
                  Música
                </label>
                <label class="pointer">
                  <input
                    type="checkbox"
                    name="interests"
                    id="interests"
                    ${interests.includes(4) && "checked"}
                    value="4"
                  />
                  Video juegos
                </label>
                `
        }

        label.appendChild(field)
        label.style.display = key === "ID" ? "none": "grid"
        updateFormData.appendChild(label)
    }
    updateModal.showModal()
    const formUpdate = $(".formUpdate")
    formUpdate.addEventListener("submit", async function(e){
      e.preventDefault()
      const user =Object.fromEntries(new FormData(e.target).entries())
      user.interests = getInterests()
      const res = await fetch(`${baseUrl}updateUser.php`,{method:"POST", body: JSON.stringify(user)})
      const data = await res.json()
      alert(data.status)
      updateModal.close()
      main()
    })
}
const showModalDelete = async (i) => {
  deleteModal.showModal()
  
}


cancelUpdate.addEventListener("click", () => updateModal.close())
cancelDelete.addEventListener("click", () => deleteModal.close())




const fetchUsers = () => fetch(`${baseUrl}/users.php`)

async function main() {
  const res = await fetchUsers();
  users = await res.json();
  TABLE.innerHTML = ""
  for (let i = 0; i < users.length; i++) {
      const tr = document.createElement("tr")
      for (const [key, value] of Object.entries(users[i])) {
          const td = document.createElement("td")

          if (key === "INTERESTS") {
            console.log(value)
              const interestsArray = value.split(",").map(interest => interests[`${interest}`])
              console.log(interestsArray)
              td.innerHTML = `${interestsArray.join(", ")}`
          }
          else if (key === "SEX") {
              td.innerHTML = value == 1 ? "Hombre" : "Mujer"
          }
          else {
              td.innerHTML = `${value}`
          }
          tr.appendChild(td)
      }
      const td = document.createElement("td")
      td.style.cssText = actionsStyles
      const buttonDelete = document.createElement("button")
      buttonDelete.innerText = "Eliminar"
      buttonDelete.addEventListener("click", function () { showModalDelete(i) })
      const buttonEdit = document.createElement("button")
      buttonEdit.addEventListener("click", function () { showModalUpdate(i) })
      buttonEdit.innerText = "Editar"
      td.appendChild(buttonDelete)
      td.appendChild(buttonEdit)
      tr.appendChild(td)
      TABLE.appendChild(tr)
  }

}
main()