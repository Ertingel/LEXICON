Document.prototype.ready = () => {
	return new Promise((resolve, reject) => {
		if (document.readyState === "complete") resolve(document)
		else
			document.addEventListener("DOMContentLoaded", () => {
				resolve(document)
			})
	})
}

function make(parent, type, { id, class: class_, ...data }) {
	const e = document.createElement(type)

	if (id) e.id = id
	if (class_) {
		if (typeof class_ === "string") e.classList.add(class_)
		else e.classList.add(...class_)
	}
	if (data) for (const [key, value] of Object.entries(data)) e[key] = value
	if (parent) parent.appendChild(e)

	return e
}

document
	.ready()
	.then(async () =>
		(await fetch("https://majazocom.github.io/Data/pokemons.json")).json()
	)
	.then(data => {
		const pokemonList = document.getElementById("pokemon-list")
		console.log("Pokemon List", data)

		data.forEach(pokemon =>
			make(pokemonList, "p", { innerHTML: pokemon.name })
		)
	})
	.then(async () =>
		(await fetch("https://majazocom.github.io/Data/dogs.json")).json()
	)
	.then(data => {
		const dogList = document.getElementById("dog-list")
		console.log("Dog List", data)

		data.forEach(dog => make(dogList, "p", { innerHTML: dog.name }))
	})
	.then(async () =>
		(await fetch("https://majazocom.github.io/Data/books.json")).json()
	)
	.then(data => {
		const bookList = document.getElementById("book-list")
		console.log("Book List", data)

		data.filter(book => book.pages < 500).forEach(book =>
			make(bookList, "p", { innerHTML: book.title })
		)
	})
	.then(async () =>
		(await fetch("https://majazocom.github.io/Data/attendees.json")).json()
	)
	.then(data => {
		const atendantList = document.getElementById("atendant-list")
		console.log("Atendant List", data)

		data.filter(atendant => atendant.attending).forEach(atendant =>
			make(atendantList, "p", { innerHTML: atendant.name })
		)
	})
