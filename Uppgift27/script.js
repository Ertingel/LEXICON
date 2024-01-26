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

	/*
	todoList.ondragover = e => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	todoList.ondrop = e => {
		e.preventDefault()
		const data = e.dataTransfer.getData("text/html")
		console.log(data)
		e.target.appendChild(document.getElementById(data))
	}
	*/

	let draggedItem = null
	const getDragAfterElement = (container, y) => {
		const draggableElements = [
			...container.querySelectorAll("li:not(.dragging)"),
		]

		return draggableElements.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect()
				const offset = y - box.top - box.height / 2
				if (offset < 0 && offset > closest.offset) {
					return {
						offset: offset,
						element: child,
					}
				} else {
					return closest
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
			}
		).element
	}

	todoList.ondragstart = e => {
		draggedItem = e.target
		console.log(draggedItem)
		setTimeout(() => {
			e.target.style.visibility = "hidden"
		}, 0)
	}
	todoList.ondragend = e => {
		console.log(draggedItem)
		setTimeout(() => {
			e.target.style.visibility = "visible"
			draggedItem = null
		}, 0)
	}

	todoList.ondragover = e => {
		console.log(draggedItem)
		e.preventDefault()
		const afterElement = getDragAfterElement(todoList, e.clientY)
		const currentElement = document.querySelector(".dragging")
		if (afterElement == null) {
			todoList.appendChild(draggedItem)
		} else {
			todoList.insertBefore(draggedItem, afterElement)
		}
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
