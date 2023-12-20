let canvas
let resizeObserver
let requestAnimation
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
	const date = new Date()

	const time =
		(date.getHours() +
			(date.getMinutes() +
				(date.getSeconds() + date.getMilliseconds() / 1000) / 60) /
				60) /
		24

	draw_clock(time)

	window.cancelAnimationFrame(requestAnimation)
	requestAnimation = window.requestAnimationFrame(event => {
		update()
	})
}

function draw_clock(time) {
	ctx.save()
	ctx.scale(canvas.width / 2, canvas.height / 2)
	ctx.translate(1, 1)
	ctx.rotate(Math.PI)

	draw_back(ctx, time)
	draw_marks(ctx, time)
	draw_hour_hand(ctx, time)
	draw_minute_hand(ctx, time)
	draw_second_hand(ctx, time)

	ctx.restore()
}

function draw_back(ctx, time) {
	ctx.save()

	ctx.fillStyle = "#fff"

	ctx.beginPath()
	ctx.arc(0, 0, 1, 0, Math.PI * 2, true)
	ctx.fill()

	ctx.restore()
}

function draw_marks(ctx, time) {
	ctx.save()

	ctx.strokeStyle = "#000"
	ctx.lineWidth = 0.01
	ctx.lineCap = "round"

	const hour_step = ((Math.PI / 180) * 360) / 12
	const minute_step = hour_step / 5

	for (let a = 0; a < Math.PI * 2; a += minute_step) {
		const is_hour =
			Math.abs(((a + hour_step / 2) % hour_step) - hour_step / 2) < 0.001

		ctx.beginPath()
		ctx.moveTo(0, is_hour ? 0.8 : 0.85)
		ctx.lineTo(0, 0.9)
		ctx.stroke()

		ctx.rotate(minute_step)
	}

	ctx.restore()
}

function draw_hour_hand(ctx, time) {
	ctx.save()

	ctx.strokeStyle = "#f55e5e"
	ctx.lineWidth = 0.02
	ctx.lineCap = "round"

	ctx.rotate(Math.PI * 2 * time)

	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(0, 0.7)
	ctx.stroke()

	ctx.restore()
}

function draw_minute_hand(ctx, time) {
	ctx.save()

	ctx.strokeStyle = "#000"
	ctx.lineWidth = 0.01
	ctx.lineCap = "round"

	ctx.rotate(Math.PI * 2 * time * 24)

	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(0, 0.8)
	ctx.stroke()

	ctx.restore()
}

function draw_second_hand(ctx, time) {
	ctx.save()

	ctx.strokeStyle = "#000"
	ctx.lineWidth = 0.005
	ctx.lineCap = "round"

	ctx.rotate(Math.PI * 2 * time * 24 * 60)

	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(0, 0.9)
	ctx.stroke()

	ctx.restore()
}
