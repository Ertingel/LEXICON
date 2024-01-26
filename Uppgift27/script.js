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
	//const todoAddButton = document.getElementById("todo-add-button")

	const todoList = document.getElementById("todo-list")

	let draggedItem = null
	const getDragAfterElement = y => {
		return [...todoList.childNodes].reduce(
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

	todoList.ondragstart = e => {
		console.log(e)

		if (draggedItem) draggedItem.style.visibility = "visible"
		draggedItem = e.target

		setTimeout(() => {
			if (draggedItem) draggedItem.style.visibility = "hidden"
		}, 0)
	}

	todoList.ondragend = e => {
		console.log(e)
		if (draggedItem) draggedItem.style.visibility = "visible"
		draggedItem = null
	}

	todoList.ondragover = e => {
		//console.log(e)
		e.preventDefault()
		if (!draggedItem) return

		const afterElement = getDragAfterElement(e.clientY)
		if (afterElement == null) todoList.appendChild(draggedItem)
		else todoList.insertBefore(draggedItem, afterElement)
	}

	const removeTodo = entry => {
		todoList.removeChild(entry)
	}

	const addTodo = data => {
		const item = make(null, "li", {
			class: "todo",
			draggable: "true",
		})

		make(item, "input", {
			type: "checkbox",
		})

		make(item, "input", {
			type: "text",
			value: data,
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
