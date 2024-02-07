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

async function setPage(url = "https://swapi.dev/api/people/?page=1") {
	const list = document.getElementById("page")
	list.innerHTML = '<div class="loader"></div>'

	const page = await (await fetch(url)).json()
	console.log(page)

	document.getElementById("prev-page").onclick = e => {
		if (page.previous) setPage(page.previous)
	}

	document.getElementById("next-page").onclick = e => {
		if (page.next) setPage(page.next)
	}

	const pageCount = Math.ceil(page.count / 10)
	const pageIndex = url.match(
		/^https:\/\/swapi\.dev\/api\/people\/\?page=(\d+)$/u
	)[1]
	document.getElementById(
		"page-num"
	).innerHTML = `${pageIndex} / ${pageCount}`

	list.innerHTML = ""
	const ul = make(list, "ul", {})

	page.results.forEach(character => {
		make(ul, "li", {
			innerHTML: character.name,
		})
	})

	return page
}

document.ready().then(async () => {
	setPage()
})
