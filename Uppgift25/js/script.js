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

// 9
document.querySelectorAll("button").forEach(e => (e.innerText = "add to cart"))

// 10
document.querySelector("header > nav").children[0].classList.add("active")

// 11
const logo = document.querySelector("img.logo")
logo.classList.remove("logo")

// 12
document
	.querySelector("header > nav")
	.insertAdjacentHTML("afterbegin", '<a href="#">nytt</a>')

// 13
document.querySelector("main").insertAdjacentHTML(
	"beforeend",
	`
	<article class="art-4">
		<figure><img src="img/hoodie-forrest.png" alt="hoodie"></figure>
		<h2>Sinus Hoodie</h2>
		<h3>Forrest</h3>
		<p style="color: gray;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, dolores.</p>
		<button>add to cart</button>
	</article>
	`
)

// 14
logo.onclick = () => console.log("found you!")

// 15
document.querySelectorAll("main > article").forEach(e => {
	const label = e.querySelector("h3").innerHTML
	e.onclick = () => console.log(`Hi, Im article ${label}`)
})
