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

function getTimeStr(time) {
	const now = new Date()
	const delta = now - time

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const year = day * 365

	if (delta / second < 1) return "Now"
	if (delta / minute < 1) return `${Math.floor(delta / second)}sec Ago`
	if (delta / hour < 1) return `${Math.floor(delta / minute)}min Ago`

	const clock = `${String(time.getHours()).padStart(2, "0")}:${String(
		time.getMinutes()
	).padStart(2, "0")}`

	if (delta / day < 1 && now.getDate() === time.getDate())
		return `${clock} Today`

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

function makeDragable(element, onchange) {
	let draggedItem = null

	const getDragAfterElement = y =>
		[...element.childNodes].reduce(
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

	element.ondragstart = e => {
		if (draggedItem) draggedItem.style.visibility = ""
		draggedItem = e.target

		setTimeout(() => {
			if (draggedItem) draggedItem.style.visibility = "hidden"
		}, 0)
	}

	element.ondragend = e => {
		if (draggedItem) draggedItem.style.visibility = ""
		draggedItem = null

		if (onchange) onchange()
	}

	element.ondragover = e => {
		e.preventDefault()
		if (!draggedItem) return

		const afterElement = getDragAfterElement(e.clientY)
		if (afterElement == null) element.appendChild(draggedItem)
		else element.insertBefore(draggedItem, afterElement)
	}
}

function initTodoAdd(onadd) {
	const todoAdd = document.getElementById("todo-add")
	const todoAddText = document.getElementById("todo-add-text")
	const todoAddTag = document.getElementById("todo-add-tag")

	todoAdd.onsubmit = e => {
		if (/^\s*$/gu.test(todoAddTag.value)) todoAddTag.value = ""

		if (!/^\s*$/gu.test(todoAddText.value)) {
			onadd({
				text: todoAddText.value,
				completed: false,
				tag: todoAddTag.value,
				time: new Date(),
			})

			todoAddTag.value = ""
		}

		todoAddText.value = ""

		return false
	}

	return todoAdd
}

function initTodoFilter(todoList) {
	const text = document.getElementById("todo-filter-text")
	const clear = document.getElementById("todo-filter-clear")

	const filter = () => {
		const list = Array.from(todoList.children)

		if (text.value === "") {
			list.forEach(e => {
				e.style.display = "grid"
			})
			return
		}

		const pattern = new RegExp(text.value.match(/\S+/gu).join("|"), "giu")

		list.forEach(e => {
			const data = e.getData()
			console.log(pattern.test(data.text), pattern.test(data.tag))
			e.style.display =
				pattern.test(data.text) || pattern.test(data.tag)
					? "grid"
					: "none"
		})
	}

	text.onchange = e => {
		if (/^\s*$/gu.test(e.target.value)) e.target.value = ""
		filter()
	}

	text.onkeyup = e => {
		if (/^\s*$/gu.test(e.target.value)) e.target.value = ""
		filter()
	}

	clear.onclick = e => {
		text.value = ""
		filter()
	}
}

function makeTodoItem(
	{ text = "", completed = false, tag = "", time = new Date() },
	onchange,
	onremove
) {
	if (text === "") return

	const item = make(null, "li", {
		class: "todo-item",
		draggable: "true",
	})

	const textElement = make(item, "input", {
		class: "text",
		type: "text",
		placeholder: "Delete?",
		value: text,
		onchange: e => {
			if (/^\s*$/gu.test(e.target.value)) onremove(item)
			else onchange(item)
		},
	})

	const tagElement = make(item, "input", {
		class: "tag",
		type: "text",
		placeholder: "Untagged",
		value: tag,
		onchange: e => {
			if (/^\s*$/gu.test(e.target.value)) e.target.value = ""

			onchange(item)
		},
	})

	const completedElement = make(item, "input", {
		class: "completed",
		type: "checkbox",
		checked: completed,
		onchange: e => {
			onchange(item)
		},
	})

	make(item, "input", {
		class: "remove",
		type: "button",
		value: "✕",
		onclick: () => {
			onremove(item)
		},
	})

	const timeElement = make(item, "time", {
		class: "date",
		value: time,
		innerHTML: getTimeStr(time),
	})
	timeElement.setAttribute("datetime", time.toString())

	item.getData = () => {
		return {
			text: textElement.value,
			completed: completedElement.checked,
			tag: tagElement.value,
			time,
		}
	}

	return item
}

window.onload = () => {
	const todoList = document.getElementById("todo-list")

	const save_state = () => {
		const data = {
			list: Array.from(todoList.children).map(e => e.getData()),
		}
		console.log("saved", data)
		localStorage.setItem("todo", JSON.stringify(data))
	}

	initTodoFilter(todoList)
	makeDragable(todoList, () => save_state())

	const removeTodo = entry => {
		todoList.removeChild(entry)
		save_state()
	}

	const addTodo = data => {
		todoList.appendChild(
			makeTodoItem(
				data,
				item => save_state(),
				item => removeTodo(item)
			)
		)
	}

	window.setInterval(e => {
		document.querySelectorAll("time.date").forEach(e => {
			const str = getTimeStr(e.value)
			if (str !== e.value) e.innerText = getTimeStr(e.value)
		})
	}, 15000)

	initTodoAdd(data => {
		addTodo(data)
		save_state()
	})

	const set_list = list => list.forEach(e => addTodo(e))

	const load_state = () => {
		let data

		try {
			data = JSON.parse(localStorage.getItem("todo"))
			data.list.forEach(e => (e.time = new Date(e.time)))
		} catch (error) {
			data = {
				list: [
					{
						text: "Pizza",
						tag: "Food",
						time: new Date(new Date() - 100000000),
					},
					{
						text: "Taco",
						tag: "Food",
						time: new Date(new Date() - 10000000),
						completed: true,
					},
					{
						text: "Snacks",
						tag: "Food",
						time: new Date(new Date() - 1000000),
					},
				],
			}
		}

		set_list(data.list)
		console.log("loaded", data)
	}

	load_state()
}
