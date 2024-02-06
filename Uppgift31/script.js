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
