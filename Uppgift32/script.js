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
async function fetchData(url) {
	if (url in cache) return cache[url]

	let data = await (await fetch(url)).json()
	cache[url] = data
	return data
}

async function init() {
	const list = document.getElementById("list")

	const data = await fetchData(
		"https://api.punkapi.com/v2/beers?page=1&per_page=25"
	)

	console.log(data)
}

document.ready().then(async () => init())
