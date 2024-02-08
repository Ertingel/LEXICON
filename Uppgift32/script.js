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

let cache = {}
async function memoizedFetch(url) {
	if (url in cache) return cache[url]

	let data = await (await fetch(url)).json()
	cache[url] = data

	if (url.startsWith("https://api.punkapi.com/v2/beers?page="))
		data.forEach(beer => {
			cache[`https://api.punkapi.com/v2/beers/${beer.id}`] = beer
		})

	return data
}

function viewProduct(beer) {
	const modal = document.getElementById("modal")

	const figure = make(modal, "figure", {})
	make(figure, "img", { src: beer.image_url })
	make(modal, "h1", { innerHTML: beer.name })
	make(modal, "p", { innerHTML: beer.tagline })

	modal.showModal()
}

let curentPage = 1
async function viewPage(page = 1) {
	const list = document.getElementById("list")

	const data = await memoizedFetch(
		`https://api.punkapi.com/v2/beers?page=${page}&per_page=24`
	)

	data.forEach(beer => {
		const li = make(list, "li", {})
		const figure = make(li, "figure", {})
		make(figure, "img", { src: beer.image_url })
		make(li, "h1", { innerHTML: beer.name })
		make(li, "p", { innerHTML: beer.tagline })

		li.onclick = e => {
			viewProduct(beer)
		}
	})
}

async function init() {
	viewPage()

	document.getElementById("Show More").onclick = e => {
		e.target.style.display = "none"

		viewPage(++curentPage).then(() => {
			e.target.style.display = "block"
		})
	}
}

document.ready().then(async () => init())
