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
		][time.getMonth()] + time.getDate()

	if (delta / year < 1) return `${month_name} ${clock}`

	return `${time.getFullYear()}-${
		time.getMonth() + 1
	}-${time.getDate()} ${clock}`
}

window.onload = () => {
	const todoAdd = document.getElementById("todo-add")
	const todoAddText = document.getElementById("todo-add-text")

	const todoList = document.getElementById("todo-list")

	let draggedItem = null

	const get_list = () => Array.from(todoList.children).map(e => e.getData())

	const save_state = () => {
		const data = {
			list: get_list(),
		}
		console.log("saved", data)
		localStorage.setItem("todo", JSON.stringify(data))
	}

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

		save_state()
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

		save_state()
	}

	const addTodo = ({
		text = "",
		completed = false,
		tag = "",
		time = new Date(),
	}) => {
		if (text === "") return

		const item = make(null, "li", {
			class: "todo-item",
			draggable: "true",
		})

		const completed_element = make(item, "input", {
			class: "completed",
			type: "checkbox",
			checked: completed,
			onchange: e => {
				save_state()
			},
		})

		const tag_element = make(item, "input", {
			class: "tag",
			type: "text",
			placeholder: "Untagged",
			value: tag,
			onchange: e => {
				if (/^\s*$/gu.test(e.target.value)) e.target.value = ""

				save_state()
			},
		})

		const text_element = make(item, "input", {
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

		item.getData = () => {
			return {
				text: text_element.value,
				completed: completed_element.checked,
				tag: tag_element.value,
				time,
			}
		}

		todoList.prepend(item)
	}

	window.setInterval(e => {
		document.querySelectorAll("time.date").forEach(e => {
			const str = getTimeStr(e.value)
			if (str !== e.value) e.innerText = getTimeStr(e.value)
		})
	}, 15000)

	todoAdd.onsubmit = function (e) {
		if (!/^\s*$/gu.test(todoAddText.value)) {
			addTodo({
				text: todoAddText.value,
				time: new Date(),
			})

			save_state()
		}

		todoAddText.value = ""

		return false
	}

	const set_list = list => [...list].reverse().forEach(e => addTodo(e))

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
