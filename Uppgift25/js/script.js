// Code here!

// 1
document.querySelector("article.art-1 > h3").innerText = "Potato"

// 2
document.querySelector("header > nav").children[0].innerText = "Start"

// 3
document.querySelector("header > nav").children[2].innerText = "Mail Us"

// 4
document.querySelector("article.art-2 > p").innerText = "Potato"

// 5
const b = document.querySelector("article.art-2 > button")
b.style.backgroundColor = "red"
b.innerText = "Sell"

// 6
document.querySelector("article.art-3 > figure").style.backgroundColor = "green"

// 7
document.querySelector("footer > section > article > p").innerHTML =
	"Sinus skateboards <br> Rampsvägen 13 <br> 555 55, Railsnäs"

// 8
document.querySelectorAll("p").forEach(e => (e.style.color = "gray"))
