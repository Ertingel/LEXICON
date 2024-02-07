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

function addUnit(value, unit) {
	if (value == "0") return "unknown"
	return value == "unknown" ? value : `${value}${unit}`
}

let cache = {}
async function fetchData(url) {
	if (!(url in cache)) {
		let data = await (await fetch(url)).json()

		if (data.results)
			data.results.forEach(e => {
				if (e.url)
					e.id = +e.url.match(
						/^https:\/\/swapi\.dev\/api\/[^\/]+\/(\d+)\/$/u
					)[1]
			})

		if (data.url)
			data.id = data.url.match(
				/^https:\/\/swapi\.dev\/api\/[^\/]+\/(\d+)\/$/u
			)[1]

		cache[url] = data
		return data
	}
	return cache[url]
}

function makeTable(parent, data) {
	const table = make(parent, "table", {})
	const tbody = make(table, "tbody", {})

	Object.entries(data).forEach(([key, value]) => {
		const tr = make(tbody, "tr", {})

		key = key.replaceAll("_", " ")
		make(tr, "th", { innerHTML: `${key}:` })
		make(tr, "th", { innerHTML: value })
	})
}

async function setHomePlanet(url) {
	const homePlanet = document.getElementById("home-planet")

	if (!url) {
		homePlanet.innerHTML = ""
		make(homePlanet, "h3", {
			innerHTML: "Unknown",
		})
		return
	}

	homePlanet.innerHTML = '<div class="loader"></div>'
	const planet = await fetchData(url)

	if (planet.name == "unknown") {
		homePlanet.innerHTML = ""
		make(homePlanet, "h3", {
			innerHTML: "Unknown",
		})
		return
	}

	homePlanet.innerHTML = ""
	make(homePlanet, "h3", {
		innerHTML: planet.name,
	})

	makeTable(homePlanet, {
		Rotation_period: addUnit(planet.rotation_period, "h"),
		Orbital_period: addUnit(planet.orbital_period, " days"),
		Diameter: addUnit(planet.diameter, "km"),
		Climate: planet.climate,
		Gravity: planet.gravity,
		Terrain: planet.terrain,
	})
}

let selectedCharacterID = -1
let selectedCharacterButton = null
async function setCharacter(data) {
	selectedCharacterID = data.id

	const characterInfo = document.getElementById("character-info")
	characterInfo.innerHTML = ""

	make(characterInfo, "h3", {
		innerHTML: data.name,
	})

	makeTable(characterInfo, {
		Height: addUnit(data.height, "cm"),
		Mass: addUnit(data.mass, "kg"),
		Hair_color: data.hair_color,
		Skin_color: data.skin_color,
		Eye_color: data.eye_color,
		Birth_year: data.birth_year,
		Gender: data.gender,
	})

	setHomePlanet(data.homeworld)
}

function getPageNum(url) {
	return url.match(/^https:\/\/swapi\.dev\/api\/people\/\?page=(\d+)$/u)[1]
}

let pageCount = 9
async function setPage(url = "https://swapi.dev/api/people/?page=1") {
	selectedCharacterButton = null

	const list = document.getElementById("page")
	const prevPage = document.getElementById("prev-page")
	const nextPage = document.getElementById("next-page")
	const nextNum = document.getElementById("page-num")

	list.innerHTML = '<div class="loader"></div>'
	prevPage.onclick = e => {}
	nextPage.onclick = e => {}

	const pageIndex = getPageNum(url)
	nextNum.innerHTML = `${pageIndex} / ${pageCount}`
	const page = await fetchData(url)

	pageCount = Math.ceil(page.count / 10)
	nextNum.innerHTML = `${pageIndex} / ${pageCount}`

	prevPage.onclick = e => {
		if (page.previous) setPage(page.previous)
	}

	nextPage.onclick = e => {
		if (page.next) setPage(page.next)
	}

	list.innerHTML = ""
	const ul = make(list, "ul", {})

	page.results.forEach(character => {
		const li = make(ul, "li", {})
		const button = make(li, "button", {
			innerHTML: character.name,
			onclick: e => {
				setCharacter(character)

				if (selectedCharacterButton)
					selectedCharacterButton.classList.remove("selected")
				selectedCharacterButton = e.target
				selectedCharacterButton.classList.add("selected")
			},
		})

		if (character.id == selectedCharacterID) {
			selectedCharacterButton = button
			button.classList.add("selected")
		}
	})

	return page
}

document.ready().then(async () => {
	setPage()
})
