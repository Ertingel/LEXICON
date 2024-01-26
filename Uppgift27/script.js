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

function getDragAfterElement(listElement, y) {
	return [...listElement.childNodes].reduce(
		(closest, child) => {
			if (
				child.style.visibility == "hidden" ||
				child.style.display == "none"
			)
				return closest

			const box = child.getBoundingClientRect()
			const offset = y - box.top - box.height / 2
			if (offset >= 0 || offset <= closest.offset) return closest

			return {
				offset: offset,
				element: child,
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element
}

function getTimeStr(time) {
	const now = new Date()
	const delta = now - time
	console.log(delta)

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const year = day * 365

	if (delta / second < 0) return "Now"
	if (delta / minute < 0) return `${delta / second} seconds ago`
	if (delta / hour < 0) return `${delta / minute} minutes ago`

	const clock = `${time.getHours()}:${time.getMinutes()}`
	if (delta / day < 0) return `${clock} today`

	const month_name =
		[
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		][time.getMonth()] +
		" " +
		time.getDate()

	if (delta / year < 0) return `${month_name} ${clock}`

	return `${time.getFullYear()}-${time.getDate()}-${time.getMonth()} ${clock}`
}

window.onload = () => {
	const todoAdd = document.getElementById("todo-add")
	const todoAddText = document.getElementById("todo-add-text")
	//const todoAddButton = document.getElementById("todo-add-button")

	const todoList = document.getElementById("todo-list")

	let draggedItem = null

	todoList.ondragstart = e => {
		if (draggedItem) draggedItem.style.visibility = ""
		draggedItem = e.target

		setTimeout(() => {
			if (draggedItem) draggedItem.style.visibility = "hidden"
		}, 0)
	}

	todoList.ondragend = e => {
		if (draggedItem) draggedItem.style.visibility = ""
		draggedItem = null
	}

	todoList.ondragover = e => {
		e.preventDefault()
		if (!draggedItem) return

		const afterElement = getDragAfterElement(todoList, e.clientY)
		if (afterElement == null) todoList.appendChild(draggedItem)
		else todoList.insertBefore(draggedItem, afterElement)
	}

	const removeTodo = entry => {
		todoList.removeChild(entry)
	}

	const addTodo = (data, time = new Date()) => {
		const item = make(null, "li", {
			class: "todo",
			draggable: "true",
		})

		make(item, "input", {
			class: "completed",
			type: "checkbox",
		})

		make(item, "input", {
			class: "text",
			type: "text",
			value: data,
			onchange: e => {
				if (/^\s*$/gu.test(e.target.value)) removeTodo(item)
			},
		})

		const timeElement = make(item, "time", {
			class: "time",
			value: time,
			innerHTML: getTimeStr(time),
		})
		timeElement.setAttribute("datetime", time.toString())

		make(item, "input", {
			class: "remove",
			type: "button",
			value: "✕",
			onclick: () => {
				removeTodo(item)
			},
		})

		todoList.prepend(item)
	}

	addTodo("Pizza")
	addTodo("Taco")
	addTodo("Snacks")

	todoAdd.onsubmit = function (e) {
		if (!/^\s*$/gu.test(todoAddText.value)) addTodo(todoAddText.value)

		todoAddText.value = ""

		return false
	}
}
