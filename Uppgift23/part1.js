// 1
console.log(document.getElementById("recipe-name").innerHTML)

// 2
console.log(document.getElementById("recipe-name").tagName)

// 3
console.log(
	window.getComputedStyle(document.getElementsByClassName("description")[0])
		.fontSize
)

// 4
console.log(document.querySelector("img").alt)

// 5
const img_element = document.querySelector("img")
const img = {
	src: img_element.src,
	width: img_element.width,
	height: img_element.height,
}

console.log(img)

// 6
console.log(
	document.getElementsByClassName("ingredients-list-paste")[0].children.length
)

// 7
console.log(
	document.getElementsByClassName("ingredients-list-paste")[0].children[3]
		.innerHTML
)

// 8
console.log(
	[...document.getElementsByClassName("instructions-list")[0].children].map(
		(e, i) => {
			return {
				order: i,
				text: e.innerHTML.replaceAll(/\n|\t/gu, ""),
			}
		}
	)
)
