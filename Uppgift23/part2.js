// 1
document.getElementsByClassName("logo-text")[0].style.color = "#384241"

// 2
document.querySelector("header").style.justifyContent = "flex-start"

// 3
document.querySelector("header").style.borderBottomColor = "lightgray"

// 4
document.getElementById("recipe-name").innerHTML = "Frozen Cheescake"

// 5
document
	.getElementsByClassName("time-container")[0]
	.children[0].classList.add("material-icons")

// 6
document.getElementsByClassName("time")[0].innerHTML = "60+ min"

// 7
document.querySelector("img").src = "./assets/frozen-cheesecake-slice.jpg"

// 8
document.getElementsByClassName(
	"ingredients-container"
)[0].style.backgroundColor = "#f9f9f9"

// 9
document.getElementsByClassName("ingredients-list-bottom")[0].innerHTML =
	"<li>15st digistivetex</li><li>Lite smör</li>"

// 10
document.getElementsByClassName(
	"ingredients-list-paste"
)[0].children[2].innerHTML = "3tsk vaniljsocker"

// 11
const ingredient = document.createElement("li")
ingredient.innerHTML = "400g naturell philadelphiaost"

document
	.getElementsByClassName("ingredients-list-paste")[0]
	.appendChild(ingredient)

// 12
document.querySelector("h3.instructions.shadow").classList.remove("shadow")

// 13

document.getElementsByClassName("instructions-list")[0].children[1].innerHTML =
	"Separera ägggulor och äggvitor. Äggvitorna lägger du i en stor bunke, äggulorna i en liten bunke. "

document.getElementsByClassName("instructions-list")[0].children[8].innerHTML =
	"Ställ in i frysen över natten."
