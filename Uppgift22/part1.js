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
