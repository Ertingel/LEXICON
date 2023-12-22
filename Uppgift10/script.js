function add_to_cart(image_src) {
	const element = document.createElement("img")
	element.setAttribute("src", image_src)
	element.classList.add("zoom")

	document.getElementById("basket").appendChild(element)

	setTimeout(() => {
		element.remove()
	}, 1000)
}
