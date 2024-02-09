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

function makeTable(parent, data, params = {}) {
	const table = make(parent, "table", params)
	const tbody = make(table, "tbody", {})

	Object.entries(data).forEach(([key, value]) => {
		const tr = make(tbody, "tr", {})

		key = key.replaceAll("_", " ")
		make(tr, "th", { innerHTML: `${key}:` })
		make(tr, "th", { innerHTML: value })
	})
}

function viewProduct(beer) {
	const modal = document.getElementById("modal")

	modal.innerHTML = ""
	const figure = make(modal, "figure", { class: "image" })
	make(figure, "img", { class: "", src: beer.image_url })
	make(modal, "h1", { class: "name", innerHTML: beer.name })

	make(modal, "h2", { class: "tagline", innerHTML: beer.tagline })
	make(modal, "p", { class: "description", innerHTML: beer.description })
	make(modal, "h2", { class: "tip-title", innerHTML: "Brewing Tip:" })
	make(modal, "p", { class: "tip", innerHTML: beer.brewers_tips })

	const Hops = [
		...new Set(beer.ingredients.hops.map(item => item.name)),
	].join("<br>")
	const Malt = [
		...new Set(beer.ingredients.malt.map(item => item.name)),
	].join("<br>")
	const Yeast = beer.ingredients.yeast
	const Pairing = beer.food_pairing.join("<br>")

	makeTable(
		modal,
		{
			Date: beer.first_brewed,
			Volume: `${beer.volume.value} ${beer.volume.unit}`,
			ABV: beer.abv,
			Hops,
			Malt,
			Yeast,
			Pairing,
		},
		{ class: "info" }
	)

	modal.showModal()
}

let curentPage = 1
let curentFilter = ""
async function viewPage(page = 1, filter = "") {
	const list = document.getElementById("list")
	const moreArea = document.getElementById("more-area")

	moreArea.classList.add("loading")
	const data = await memoizedFetch(
		`https://api.punkapi.com/v2/beers?page=${page}&per_page=15${filter}`
	)

	data.forEach(beer => {
		const li = make(list, "li", {})
		const figure = make(li, "figure", {})

		if (beer.image_url) make(figure, "img", { src: beer.image_url })

		make(li, "h1", { innerHTML: beer.name })
		make(li, "p", { innerHTML: beer.tagline })

		li.onclick = e => {
			viewProduct(beer)
		}
	})

	moreArea.classList.remove("loading")
}

async function init() {
	viewPage()

	document.getElementById("modal").onclick = e => {
		const rect = modal.getBoundingClientRect()
		if (
			rect.top > e.clientY ||
			e.clientY > rect.top + rect.height ||
			rect.left > e.clientX ||
			e.clientX > rect.left + rect.width
		)
			modal.close()
	}

	document.getElementById("show-more").onclick = e => {
		viewPage(++curentPage, curentFilter)
	}

	document.getElementById("search-form").onsubmit = function (e) {
		curentPage = 1
		curentFilter = [...e.target.children].reduce((acc, c) => {
			if (c.value != "") {
				if (c.type === "text")
					acc += `&${c.id}=${c.value.replaceAll(" ", "_")}`
				else if (c.type === "number") {
					if (c.id.startsWith("brewed_"))
						acc += `&${c.id}=01-${c.value}`
					else acc += `&${c.id}=${c.value}`
				}
			}
			return acc
		}, "")

		document.getElementById("list").innerHTML = ""
		viewPage(curentPage, curentFilter)

		return false
	}
}

document.ready().then(async () => init())
