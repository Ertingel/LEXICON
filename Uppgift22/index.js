// 1
const list = document.getElementsByClassName("list")[0]

const entry1 = document.createElement("p")
entry1.innerText = "Entry 1"
list.appendChild(entry1)

// 2
const entry2 = document.createElement("p")
entry2.innerText = "Entry 2"
list.insertAdjacentElement("beforeend", entry2)

// 3
console.log(list.innerHTML)

// 4
const str1 = "<div>This is a div element as a string</div>"

// 5
//list.innerHTML = str1

// 6
list.insertAdjacentHTML("afterbegin", str1)

// 7
for (i = 3; i <= 7; i++) {
	const entry = document.createElement("p")
	entry.innerText = `Entry ${i}`
	list.insertAdjacentElement("beforeend", entry)
}

// 8
console.log(list.children.length)

// 9
document.getElementsByClassName("owner")[0].innerText = "Your name"

// 10
const entry_replace = document.createElement("p")
entry_replace.innerText = "Entry replace"
list.insertAdjacentElement("beforeend", entry_replace)

list.replaceChild(entry_replace, list.children[0])

// 11
const entry_replace2 = document.createElement("p")
entry_replace2.innerText = "Entry replace 2"
list.insertAdjacentElement("beforeend", entry_replace2)

list.replaceChild(entry_replace2, list.children[4])

// 12
list.removeChild(list.lastChild)
