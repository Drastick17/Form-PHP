const users = []
const TABLE = document.getElementById("usersTable")
import { baseUrl } from "./config.js";

const fetchUsers = () => fetch(`${baseUrl}/users.php`)

async function main() {
    const res = await fetchUsers();
    const users = await res.json();
    for (let i = 0; i < users.length; i++) {
        // const tr = document.createElement("tr")
        // for ([key, value] of Object.entries(users[i])) {
        //     const td = document.createElement("td")

        //     if (key === "INTERESTS") {
        //         const interests = {
        //             "1": "Computacion",
        //             "2": "Deportes",
        //             "3": "Musica",
        //             "4": "Videojuegos",
        //         }
        //         const interestsArray = value.map(interest => interests[interest])
        //         td.innerHTML = `${interestsArray.join(", ")}`
        //     }
        //     else if (key === "SEX") {
        //         td.innerHTML = value == 1 ? "Hombre" : "Mujer"
        //     }
        //     else {
        //         td.innerHTML = `${value}`
        //     }
        //     tr.appendChild(td)
        // }
        // TABLE.appendChild(tr)
    }

}
main()