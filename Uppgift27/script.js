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

	const addTodo = data => {
		const item = make(todoList, "li", {
			class: "todo",
		})

		make(item, "input", {
			type: "checkbox",
		})

		make(item, "input", {
			type: "button",
			value: "-",
		})

		make(item, "input", {
			type: "text",
			value: data,
		})

		make(item, "input", {
			type: "button",
			value: "⭡",
		})

		make(item, "input", {
			type: "button",
			value: "⭣",
		})
	}

	addTodo("Pizza")

	todoAdd.onsubmit = function (e) {
		if (todoAddText.value.length > 0) {
			addTodo(todoAddText.value)
			todoAddText.value = ""
		}

		return false
	}
}
