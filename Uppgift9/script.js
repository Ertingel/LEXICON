let canvas
let resizeObserver
let ctx

window.addEventListener("DOMContentLoaded", event => {
	canvas = document.getElementById("analog-clock")
	ctx = canvas.getContext("2d")

	const resize_canvas = event => {
		canvas.width = Math.round(
			window.getComputedStyle(canvas).width.replace("px", "")
		)
		canvas.height = Math.round(
			window.getComputedStyle(canvas).height.replace("px", "")
		)

		update()
	}

	resizeObserver = new ResizeObserver(resize_canvas).observe(canvas)

	resize_canvas()
})

function update() {
	draw_clock(0)
}

function draw_clock(time) {
	ctx.save()
	ctx.scale(canvas.width / 2, canvas.height / 2)
	ctx.translate(1, 1)

	ctx.fillStyle = "#fff"

	ctx.beginPath()
	ctx.arc(0, 0, 1, 0, Math.PI * 2, true)
	ctx.fill()

	ctx.restore()
}
