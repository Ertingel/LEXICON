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

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const year = day * 365

	if (delta / second < 1) return "Now"
	if (delta / minute < 1) return `${Math.floor(delta / second)}sec ago`
	if (delta / hour < 1) return `${Math.floor(delta / minute)}min ago`

	const clock = `${String(time.getHours()).padStart(2, "0")}:${String(
		time.getMinutes()
	).padStart(2, "0")}`

	if (delta / day < 1) return `${clock} Today`

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

	if (delta / year < 1) return `${month_name} ${clock}`

	return `${time.getFullYear()}-${
		time.getMonth() + 1
	}-${time.getDate()} ${clock}`
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

	const addTodo = ({ text, time = new Date() }) => {
		const item = make(null, "li", {
			class: "todo-item",
			draggable: "true",
		})

		make(item, "input", {
			class: "completed",
			type: "checkbox",
		})

		make(item, "input", {
			class: "text",
			type: "text",
			placeholder: "Delete?",
			value: text,
			onchange: e => {
				if (/^\s*$/gu.test(e.target.value)) removeTodo(item)
			},
		})

		make(item, "input", {
			class: "remove",
			type: "button",
			value: "✕",
			onclick: () => {
				removeTodo(item)
			},
		})

		const timeElement = make(item, "time", {
			class: "date",
			value: time,
			innerHTML: getTimeStr(time),
		})
		timeElement.setAttribute("datetime", time.toString())

		todoList.prepend(item)
	}

	window.setInterval(e => {
		document.querySelectorAll("time.date").forEach(e => {
			const str = getTimeStr(e.value)
			if (str !== e.value) e.innerText = getTimeStr(e.value)
		})
	}, 15000)

	addTodo({ text: "Pizza", time: new Date(new Date() - 100000000) })
	addTodo({ text: "Taco", time: new Date(new Date() - 10000000) })
	addTodo({ text: "Snacks", time: new Date(new Date() - 1000000) })

	todoAdd.onsubmit = function (e) {
		if (!/^\s*$/gu.test(todoAddText.value))
			addTodo({
				text: todoAddText.value,
				time: new Date(),
			})

		todoAddText.value = ""

		return false
	}
}
