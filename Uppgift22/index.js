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
