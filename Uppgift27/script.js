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

window.onload = () => {
	const todoAdd = document.getElementById("todo-add")
	const todoAddText = document.getElementById("todo-add-text")
	const todoAddButton = document.getElementById("todo-add-button")

	const todoList = document.getElementById("todo-list")

	const moveTodo = (entry, position) => {
		console.log(position, entry.previousSibling, entry.nextSibling)
		if (position == 0) return
		if (position < 0) todoList.insertBefore(entry, entry.previousSibling)
		else {
			if (entry.nextSibling) entry.nextSibling.after(entry)
			else todoList.insertBefore(entry, todoList.firstChild)
		}
	}

	const removeTodo = entry => {
		todoList.removeChild(entry)
	}

	const addTodo = data => {
		const item = make(null, "li", {
			class: "todo",
		})

		make(item, "input", {
			type: "checkbox",
		})

		make(item, "input", {
			class: "remove",
			type: "button",
			value: "✕",
			onclick: () => {
				removeTodo(item)
			},
		})

		make(item, "input", {
			type: "text",
			value: data,
			onchange: e => {
				if (e.target.value.length <= 0) removeTodo(item)
			},
		})

		make(item, "input", {
			type: "button",
			value: "⭡",
			onclick: () => {
				moveTodo(item, -1)
			},
		})

		make(item, "input", {
			type: "button",
			value: "⭣",
			onclick: () => {
				moveTodo(item, 1)
			},
		})

		todoList.prepend(item)
	}

	addTodo("Pizza")
	addTodo("Taco")
	addTodo("Snacks")

	todoAdd.onsubmit = function (e) {
		if (todoAddText.value.length > 0) {
			addTodo(todoAddText.value)
			todoAddText.value = ""
		}

		return false
	}
}
